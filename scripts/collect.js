#!/usr/bin/env node
// コムデギャルソン関連ニュースを RSS から収集し data/items.json に追記する。
// 依存パッケージなし (Node 18+ の fetch を使用)。実行: node scripts/collect.js

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const DATA_PATH = new URL("../data/items.json", import.meta.url).pathname;
const MAX_ITEMS = 1000;

const SOURCES = [
  {
    name: "CDG FREAK",
    url: "https://cdg-freak.com/feed/",
  },
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
  /SNKRDUNK|スニーカーダンク|スニダン|メルカリ|ラクマ|ヤフオク|Yahoo!オークション|セカンドストリート|2nd STREET|トレファク|StockX|GOAT|Grailed/i;

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

// 記事ページ(Google Newsは中継ページ)の og:image URL を取得。失敗時は null
export async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (cdg-watch thumbnail fetcher)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m =
      html.match(/property="og:image"[^>]*content="([^"]+)"/) ||
      html.match(/content="([^"]+)"[^>]*property="og:image"/);
    return m ? decodeEntities(m[1]) : null;
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
      const id = createHash("sha256")
        .update(item.title + (item.publisher ?? ""))
        .digest("hex")
        .slice(0, 16);
      if (known.has(id)) continue;
      known.add(id);
      const resale = RESALE_RE.test((item.publisher ?? "") + " " + item.title);
      added.push({
        id,
        ...item,
        feed: source.name,
        fetchedAt: new Date().toISOString(),
        summary: null, // 日次エージェントが日本語1〜2文で埋める
        tags: resale ? ["二次流通"] : [],
      });
    }
  }

  // フィードに画像が無かった新着(Google News等)はページの og:image で補完(最大40件)
  for (const it of added.filter((i) => !i.image).slice(0, 40)) {
    it.image = await fetchOgImage(it.url);
  }

  existing.items = [...added, ...existing.items]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, MAX_ITEMS);
  existing.updatedAt = new Date().toISOString();
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + "\n");
  console.log(`added ${added.length} items (total ${existing.items.length})`);
}

main();
