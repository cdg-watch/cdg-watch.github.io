#!/usr/bin/env node
// コムデギャルソン関連ニュースを RSS から収集し data/items.json に追記する。
// 依存パッケージなし (Node 18+ の fetch を使用)。実行: node scripts/collect.js

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const DATA_PATH = new URL("../data/items.json", import.meta.url).pathname;
const MAX_ITEMS = 1000;

const SOURCES = [
  {
    name: "Google News (日本語)",
    url: "https://news.google.com/rss/search?q=%22%E3%82%B3%E3%83%A0%E3%83%87%E3%82%AE%E3%83%A3%E3%83%AB%E3%82%BD%E3%83%B3%22&hl=ja&gl=JP&ceid=JP:ja",
  },
  {
    name: "Google News (English)",
    url: "https://news.google.com/rss/search?q=%22Comme+des+Gar%C3%A7ons%22&hl=en-US&gl=US&ceid=US:en",
  },
];

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

function parseRss(xml) {
  return [...xml.matchAll(/<item>(.*?)<\/item>/gs)].map(([, block]) => ({
    title: tag(block, "title"),
    url: tag(block, "link"),
    publishedAt: tag(block, "pubDate")
      ? new Date(tag(block, "pubDate")).toISOString()
      : null,
    publisher: tag(block, "source") || null,
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
      added.push({
        id,
        ...item,
        feed: source.name,
        fetchedAt: new Date().toISOString(),
        summary: null, // 日次エージェントが日本語1〜2文で埋める
        tags: [],
      });
    }
  }

  existing.items = [...added, ...existing.items]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, MAX_ITEMS);
  existing.updatedAt = new Date().toISOString();
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + "\n");
  console.log(`added ${added.length} items (total ${existing.items.length})`);
}

main();
