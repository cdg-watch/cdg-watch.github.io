#!/usr/bin/env node
// 収集ソースの「スカウト」: 既存データとX(任意)から、直接ソース化する価値の
// ありそうなメディアを見つけて data/source-candidates.json にレポートする。
// 依存パッケージなし (Node 18+ の fetch を使用)。実行: node scripts/scout.js
//
// 仕組み:
//  1. items.json の記事を出典ドメイン別に集計(Google News の網羅フィードが
//     「よく取り上げるメディアの発見機」として機能する)
//  2. 直接ソース化済み・二次流通・転載ミラー系ドメインを除外
//  3. 上位候補についてRSSフィードの有無を自動調査(あれば collect.js に
//     そのまま追加できる)
//  4. 環境変数 X_BEARER_TOKEN があれば、X APIでギャルソン関連の高いいね投稿を
//     検索し、リンク先ドメインを候補に合流させる(トークンが無ければスキップ。
//     X検索APIは有料プランが必要)
//
// レポートを見て採否を判断し、採用するものは collect.js の SOURCES に
// PRで追加する(自動追加はしない。ノイズ源を勝手に増やさないための設計)。

import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const DATA_PATH = new URL("../data/items.json", import.meta.url).pathname;
const OUT_PATH = new URL("../data/source-candidates.json", import.meta.url)
  .pathname;

// 直接ソース化済みの記事ドメイン。collect.js の SOURCES に追加・削除したら
// ここも更新すること(フィードURLと記事URLのドメインが異なるソースがあるため
// 自動導出はせず手書きで対応を持つ)
const COVERED = [
  "cdg-freak.com",
  "hypebeast.com",
  "wwdjapan.com",
  "fashionsnap.com",
  "fullress.com",
  "sneakernews.com",
  "sneakerfiles.com",
  "godmeetsfashion.com",
  "fashion-press.net",
  "webuomo.jp", // Google News経由だが実質カバー済み
  "news.google.com", // 未解決の中継URL(ドメインとして無意味)
  // 2026-07-19 スカウト初回調査から採用(#16)
  "wwd.com",
  "highsnobiety.com",
  "anothermag.com",
  "senken.co.jp",
  "dazeddigital.com",
  "sneakerfreaker.com",
  "10magazine.com",
  "hubemag.com",
];

// 二次流通(サイトの方針で公式ニュースソースにはしない)
const RESALE_HOST_RE =
  /snkrdunk|mercari|rakuma|auctions?\.yahoo|2ndstreet|trefac|stockx|goat\.com|grailed/i;

// 転載・シンジケーション先(元記事メディアを直接ソース化する方が良い)。
// 候補から外さず note で注意書きする
const MIRROR_HOSTS = {
  "news.yahoo.co.jp": "転載先。URLが期限切れになるため直接ソース化は非推奨",
  "aol.com": "転載先(シンジケーション)。元メディアの特定を推奨",
  "shopping.yahoo.com": "転載先(シンジケーション)。元メディアの特定を推奨",
  "msn.com": "転載先(シンジケーション)。元メディアの特定を推奨",
};

const WINDOW_DAYS = 120; // 集計対象: fetchedAt がこの日数以内の記事
const MIN_COUNT = 2; // 候補に載せる最低記事数
const MAX_PROBE = 12; // RSS調査するドメイン数の上限(実行時間対策)

const UA = { "user-agent": "cdg-watch/1.0 (personal news aggregator)" };

function host(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// ドメインのRSSフィードを探す。トップページの <link rel="alternate"> を見た後、
// よくあるパスを直接試す。見つかったフィードURLか null を返す
async function findRss(h) {
  const looksLikeFeed = (text, ct) =>
    /<(rss|feed)[\s>]/.test(text.slice(0, 2000)) ||
    /(rss|atom|xml)/i.test(ct ?? "");
  try {
    const res = await fetch(`https://${h}/`, {
      headers: UA,
      signal: AbortSignal.timeout(12000),
    });
    if (res.ok) {
      const html = await res.text();
      const m = html.match(
        /<link[^>]+type="application\/(?:rss|atom)\+xml"[^>]+href="([^"]+)"/i
      );
      if (m) return new URL(m[1], `https://${h}/`).href;
    }
  } catch {}
  for (const path of ["/feed/", "/feed", "/rss.xml", "/feed.xml", "/atom.xml", "/rss"]) {
    try {
      const res = await fetch(`https://${h}${path}`, {
        headers: UA,
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) continue;
      const text = await res.text();
      if (looksLikeFeed(text, res.headers.get("content-type")))
        return `https://${h}${path}`;
    } catch {}
  }
  return null;
}

// X APIでギャルソン関連の高いいね投稿を検索し、リンク先を集計する。
// 検索APIは有料プラン限定のため、X_BEARER_TOKEN が無ければ null を返して
// スキップする(このスクリプトの他の機能には影響しない)
async function scoutX() {
  const token = process.env.X_BEARER_TOKEN;
  if (!token) return null;
  const query =
    '(コムデギャルソン OR "comme des garcons") has:links -is:retweet';
  const url =
    "https://api.x.com/2/tweets/search/recent?query=" +
    encodeURIComponent(query) +
    "&max_results=100&tweet.fields=public_metrics,entities";
  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}`, ...UA },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    console.error(`[X] HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return null;
  }
  const { data = [] } = await res.json();
  const MIN_LIKES = 20;
  const byHost = {};
  for (const t of data) {
    const likes = t.public_metrics?.like_count ?? 0;
    if (likes < MIN_LIKES) continue;
    for (const u of t.entities?.urls ?? []) {
      const link = u.unwound_url ?? u.expanded_url;
      const h = host(link);
      // X内部リンク(引用・画像等)は記事ではない
      if (!h || /(^|\.)(x\.com|twitter\.com|t\.co)$/.test(h)) continue;
      const e = (byHost[h] ??= { posts: 0, totalLikes: 0, exampleUrl: link });
      e.posts++;
      e.totalLikes += likes;
    }
  }
  return byHost;
}

async function main() {
  const { items } = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  const cutoff = Date.now() - WINDOW_DAYS * 864e5;

  // 1. ドメイン別に集計
  const byHost = {};
  for (const i of items) {
    if (Date.parse(i.fetchedAt ?? "") < cutoff) continue;
    const h = host(i.url);
    if (!h || COVERED.some((c) => h === c || h.endsWith("." + c))) continue;
    if (RESALE_HOST_RE.test(h)) continue;
    const e = (byHost[h] ??= { count: 0, examples: [] });
    e.count++;
    if (e.examples.length < 3) e.examples.push(i.title.slice(0, 60));
  }

  const candidates = Object.entries(byHost)
    .filter(([, v]) => v.count >= MIN_COUNT)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([h, v]) => ({
      host: h,
      articleCount: v.count,
      examples: v.examples,
      rss: undefined,
      note: MIRROR_HOSTS[h] ?? null,
    }));

  // 2. 上位候補のRSS有無を調査(転載ミラーは調査しない)
  for (const c of candidates.filter((c) => !c.note).slice(0, MAX_PROBE)) {
    c.rss = await findRss(c.host);
    console.log(
      `${String(c.articleCount).padStart(3)}件 ${c.host} → RSS: ${c.rss ?? "なし"}`
    );
  }

  // 3. X経由の人気リンク先(トークンがあれば)
  const xHosts = await scoutX();
  if (xHosts) {
    for (const [h, v] of Object.entries(xHosts)) {
      if (COVERED.some((c) => h === c || h.endsWith("." + c))) continue;
      if (RESALE_HOST_RE.test(h)) continue;
      const c = candidates.find((c) => c.host === h);
      if (c) c.x = v;
      else
        candidates.push({
          host: h,
          articleCount: 0,
          examples: [v.exampleUrl],
          rss: undefined,
          note: "X経由でのみ検出",
          x: v,
        });
    }
  }

  writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        windowDays: WINDOW_DAYS,
        xEnabled: !!xHosts,
        note:
          "collect.jsのSOURCES追加候補。rssがあるものはそのまま追加可能。" +
          "採用時はPRを出し、scout.jsのCOVEREDにも追記すること",
        candidates,
      },
      null,
      2
    ) + "\n"
  );
  console.log(
    `\n${candidates.length}候補を data/source-candidates.json に書き出した` +
      (xHosts ? "(X連携: 有効)" : "(X連携: X_BEARER_TOKEN未設定のためスキップ)")
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
