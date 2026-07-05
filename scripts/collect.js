#!/usr/bin/env node
// コムデギャルソン関連ニュースを RSS から収集し data/items.json に追記する。
// 依存パッケージなし (Node 18+ の fetch を使用)。実行: node scripts/collect.js

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

const DATA_PATH = new URL("../data/items.json", import.meta.url).pathname;
const MAX_ITEMS = 1000;

// ギャルソン関連判定(直接フィードは全記事が流れてくるためフィルタ必須)
const CDG_RE = /ギャルソン|Comme des Gar[cç]ons|COMME des GAR[CÇ]ONS/i;

const SOURCES = [
  {
    name: "CDG FREAK",
    url: "https://cdg-freak.com/feed/",
  },
  // 直接フィード(本物の記事URL+画像付き)。CDG関連記事のみ採用
  { name: "Hypebeast JP", url: "https://hypebeast.com/jp/feed", filter: CDG_RE },
  { name: "WWD JAPAN", url: "https://www.wwdjapan.com/feed", filter: CDG_RE },
  { name: "FASHIONSNAP", url: "https://www.fashionsnap.com/rss.xml", filter: CDG_RE },
  // Google News(網羅用。中継URLのため画像なし)
  {
    name: "Google News (日本語)",
    url: "https://news.google.com/rss/search?q=%22%E3%82%B3%E3%83%A0%E3%83%87%E3%82%AE%E3%83%A3%E3%83%AB%E3%82%BD%E3%83%B3%22&hl=ja&gl=JP&ceid=JP:ja",
  },
  {
    name: "Google News (English)",
    url: "https://news.google.com/rss/search?q=%22Comme+des+Gar%C3%A7ons%22&hl=en-US&gl=US&ceid=US:en",
  },
];

// 二次流通(リセール・中古・フリマ)系の出典は収集時点で自動タグ付けする
const RESALE_RE =
  /SNKRDUNK|スニーカーダンク|スニダン|メルカリ|ラクマ|ヤフオク|Yahoo!オークション|セカンドストリート|2nd STREET|トレファク|StockX|GOAT|Grailed|brute[-.]?(beauty|tokyo|store)?|ブルート/i;

// タイトルからカテゴリタグを機械的に推定(エージェントが後で精緻化する前の初期値)。
// 記事は複数タグを持ちうる。二次流通は RESALE_RE で別途付与。
const TAG_RULES = [
  ["コラボ", /コラボ|collab|\bx\b|×|nike|jordan|new balance|supreme|adidas|ナイキ|ジョーダン|ニューバランス/i],
  ["ショー/コレクション", /コレクション|collection|20\d\d\s?(春夏|秋冬|ss|fw|aw)|春夏|秋冬|runway|ランウェイ|ファッションウィーク|fashion week|ショー\b/i],
  ["新作", /新作|新商品|発売|リリース|入荷|登場|new arrival|drop|release|launch|お目見え/i],
  ["店舗", /オープン|開店|ポップアップ|pop[-\s]?up|期間限定|直営店|旗艦店|store opening|新店/i],
  ["インタビュー", /インタビュー|interview|語る|川久保玲|rei kawakubo|対談|独占/i],
  ["再販/セール", /セール|sale|再販|restock|再入荷|値下げ|割引|アウトレット/i],
];

function autoTags(title) {
  const tags = [];
  for (const [tag, re] of TAG_RULES) if (re.test(title)) tags.push(tag);
  return tags;
}

function decodeEntities(s) {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .trim();
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>(.*?)</${name}>`, "s"));
  return m ? decodeEntities(m[1]) : "";
}

// フィード内の画像URLを拾う(URLのみ。画像自体は保存しない)
function itemImage(block) {
  const enc = block.match(
    /<(?:enclosure|media:content|media:thumbnail)[^>]+url="([^"]+)"/
  );
  if (enc) return decodeEntities(enc[1]);
  const html = tag(block, "content:encoded") + tag(block, "description");
  const img = html.match(/<img[^>]+src="([^"]+)"/i);
  return img ? decodeEntities(img[1]) : null;
}

// Google News の中継URLから本物の記事URLを復元する(内部API batchexecute を使用)。
// 非公式手法のため、失敗が続く場合は仕様変更を疑うこと。失敗時は null
export async function resolveGoogleNewsUrl(gnUrl) {
  try {
    const id = new URL(gnUrl).pathname.split("/").pop();
    const pageRes = await fetch(gnUrl, {
      headers: { "user-agent": "Mozilla/5.0 (cdg-watch)" },
      signal: AbortSignal.timeout(15000),
    });
    const page = await pageRes.text();
    const ts = page.match(/data-n-a-ts="([^"]+)"/)?.[1];
    const sg = page.match(/data-n-a-sg="([^"]+)"/)?.[1];
    if (!ts || !sg) return null;
    const inner = JSON.stringify([
      "garturlreq",
      [["X", "X", ["X", "X"], null, null, 1, 1, "US:en", null, 1,
        null, null, null, null, null, 0, 1],
       "X", "X", 1, [1, 1, 1], 1, 1, null, 0, 0, null, 0],
      id, Number(ts), sg,
    ]);
    const body =
      "f.req=" +
      encodeURIComponent(JSON.stringify([[["Fbv4je", inner, null, "generic"]]]));
    const res = await fetch(
      "https://news.google.com/_/DotsSplashUi/data/batchexecute",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "user-agent": "Mozilla/5.0 (cdg-watch)",
        },
        body,
        signal: AbortSignal.timeout(15000),
      }
    );
    const text = await res.text();
    const m = text.match(/https?:(?:\\?\/){2}(?!news\.google)[^"\\]+/);
    return m ? m[0].replace(/\\\//g, "/") : null;
  } catch {
    return null;
  }
}

// デフォルト/ロゴ画像は代表画像として無価値なので除外する
const JUNK_IMG_RE =
  /ogp_default|default[-_]?ogp|no[-_]?image|noimage|logo|placeholder|googleusercontent/i;

// og:image がロゴ固定のサイト向けに、本文から商品画像を抜くサイト別ルール。
// パターンが変わったら該当サイトの行を直すだけで済むよう、ここに集約する。
function extractSiteImage(host, html) {
  if (/snkrdunk\.com$/.test(host)) {
    // 中古出品(apparel_used_listings)・新品(upload_bg_removed / images/products)
    const m = html.match(
      /https:\/\/cdn\.snkrdunk\.com\/(?:apparel_used_listings|used_listing|upload_bg_removed|images\/products)\/[^"\\ ]+\.(?:jpe?g|png|webp)/i
    );
    return m ? m[0] : null;
  }
  return null;
}

// 記事ページの代表画像URLを取得。og:image → twitter:image → 本文の最初の大きな
// <img> の順に試す。取得不可・ロゴのみの場合は null
export async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const html = await res.text();

    // サイト別ルール: og:image がロゴ固定だが本文に商品画像があるサイト
    const host = new URL(url).hostname;
    const siteImg = extractSiteImage(host, html);
    if (siteImg) return decodeEntities(siteImg);

    for (const re of [
      /property="og:image(?::secure_url)?"[^>]*content="([^"]+)"/,
      /content="([^"]+)"[^>]*property="og:image"/,
      /name="twitter:image(?::src)?"[^>]*content="([^"]+)"/,
    ]) {
      const m = html.match(re);
      if (m && !JUNK_IMG_RE.test(m[1])) return decodeEntities(m[1]);
    }
    // フォールバック: 本文の最初の実写画像(og:imageを持たないサイト向け)
    for (const m of html.matchAll(/<img[^>]+src="(https:\/\/[^"]+)"/gi)) {
      const src = m[1];
      if (!JUNK_IMG_RE.test(src) && /\.(jpe?g|png|webp)(\?|$)/i.test(src))
        return decodeEntities(src);
    }
    return null;
  } catch {
    return null;
  }
}

function parseRss(xml) {
  return [...xml.matchAll(/<item>(.*?)<\/item>/gs)].map(([, block]) => ({
    title: tag(block, "title"),
    url: tag(block, "link"),
    publishedAt: tag(block, "pubDate")
      ? new Date(tag(block, "pubDate")).toISOString()
      : null,
    publisher: tag(block, "source") || null,
    image: itemImage(block),
    _text:
      tag(block, "title") +
      " " +
      tag(block, "description").replace(/<[^>]+>/g, "").slice(0, 500),
  }));
}

async function main() {
  const existing = existsSync(DATA_PATH)
    ? JSON.parse(readFileSync(DATA_PATH, "utf8"))
    : { updatedAt: null, items: [] };
  const known = new Set(existing.items.map((i) => i.id));
  const added = [];

  for (const source of SOURCES) {
    let xml;
    try {
      const res = await fetch(source.url, {
        headers: { "user-agent": "cdg-watch/1.0 (personal news aggregator)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      xml = await res.text();
    } catch (err) {
      console.error(`[skip] ${source.name}: ${err.message}`);
      continue;
    }
    for (const item of parseRss(xml)) {
      if (!item.url || !item.title) continue;
      if (source.filter && !source.filter.test(item._text)) continue;
      delete item._text;
      const id = createHash("sha256")
        .update(item.title + (item.publisher ?? ""))
        .digest("hex")
        .slice(0, 16);
      if (known.has(id)) continue;
      known.add(id);
      const resale = RESALE_RE.test((item.publisher ?? "") + " " + item.title);
      const tags = resale ? ["二次流通"] : autoTags(item.title);
      added.push({
        id,
        ...item,
        feed: source.name,
        fetchedAt: new Date().toISOString(),
        summary: null, // 日次エージェントが日本語1〜2文で埋める
        tags,
      });
    }
  }

  // Google News の新着は本物の記事URLに差し替える(復元失敗時は中継URLのまま)
  for (const it of added.filter((i) => i.url.includes("news.google.com"))) {
    const real = await resolveGoogleNewsUrl(it.url);
    if (real) {
      it.url = real;
      if (RESALE_RE.test(real) && !it.tags.includes("二次流通"))
        it.tags.push("二次流通");
    }
  }

  // フィードに画像が無かった新着はページの og:image で補完(最大40件)。
  // Google News の中継ページは og:image がロゴ画像のため対象外
  for (const it of added
    .filter((i) => !i.image && !i.url.includes("news.google.com"))
    .slice(0, 40)) {
    it.image = await fetchOgImage(it.url);
  }

  existing.items = [...added, ...existing.items]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, MAX_ITEMS);
  existing.updatedAt = new Date().toISOString();
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + "\n");
  writeRss(existing.items);
  console.log(`added ${added.length} items (total ${existing.items.length})`);
}

// 自前のRSSフィードを生成(他ユーザーがFeedly等で購読できるようにする)
function writeRss(items) {
  const SITE = "https://cdg-watch.github.io/";
  const xesc = (s) =>
    (s ?? "").replace(/[<>&"']/g, (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c])
    );
  const entries = items
    .filter((i) => !(i.tags ?? []).includes("二次流通"))
    .slice(0, 50)
    .map(
      (i) => `    <item>
      <title>${xesc(i.title)}</title>
      <link>${xesc(i.url)}</link>
      <guid isPermaLink="false">${i.id}</guid>
      ${i.publishedAt ? `<pubDate>${new Date(i.publishedAt).toUTCString()}</pubDate>` : ""}
      <source url="${SITE}">${xesc(i.publisher ?? i.feed)}</source>
      ${i.summary ? `<description>${xesc(i.summary)}</description>` : ""}
    </item>`
    )
    .join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CDG Watch — コムデギャルソン情報トラッカー</title>
    <link>${SITE}</link>
    <description>コムデギャルソン関連の最新情報を毎日自動収集(非公式ファンサイト)</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${entries}
  </channel>
</rss>
`;
  writeFileSync(new URL("../feed.xml", import.meta.url).pathname, rss);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
