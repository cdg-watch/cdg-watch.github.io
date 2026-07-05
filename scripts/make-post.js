#!/usr/bin/env node
// data/digest-latest.md の先頭トピックから X 投稿の下書きを組み立て、
// data/post-draft.md に書き出す。ゼロ依存。SNSエージェントがこれを叩き台に推敲する。
// 実投稿はしない(投稿は scripts/post-x.js が担当。X連携キーが揃ってから使う)。

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DIGEST = new URL("../data/digest-latest.md", import.meta.url).pathname;
const OUT = new URL("../data/post-draft.md", import.meta.url).pathname;
const SITE = "https://cdg-watch.github.io/";
const TAGS = "#コムデギャルソン #CommeDesGarcons #CDG";

function parseDigest(md) {
  // "- **見出し**\n  本文\n  URL" の箇条書きを拾う
  const blocks = [];
  const re = /- \*\*(.+?)\*\*\s*\n\s*(.+?)\n\s*(https?:\/\/\S+)/g;
  let m;
  while ((m = re.exec(md))) blocks.push({ title: m[1].trim(), body: m[2].trim(), url: m[3].trim() });
  return blocks;
}

function main() {
  if (!existsSync(DIGEST)) {
    console.error("digest-latest.md がありません。先に日次ダイジェストを生成してください。");
    process.exit(1);
  }
  const md = readFileSync(DIGEST, "utf8");
  const dateM = md.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateM ? dateM[1] : new Date().toISOString().slice(0, 10);
  const blocks = parseDigest(md);
  if (!blocks.length) {
    console.error("ダイジェストからトピックを抽出できませんでした。");
    process.exit(1);
  }

  const top = blocks[0];
  // 本文は文字数を抑える(URL・タグ・改行の余白を残す)
  const lead = top.body.length > 90 ? top.body.slice(0, 88) + "…" : top.body;
  // 単体投稿は記事の直リンク(読者は一次情報に直行でき、記事のOGカードが画像として出る)
  const single = `【CDG】${top.title}\n${lead}\n▼記事\n${top.url}\n${TAGS}`;

  // 複数トピックまとめ版はサイトへ誘導(複数話題の受け皿+自作ブランドカードが出る)
  const list = blocks.slice(0, 3).map((b) => `・${b.title}`).join("\n");
  const roundup = `今日のコムデギャルソン(${date})\n${list}\n▼まとめ\n${SITE}\n${TAGS}`;

  const draft = `# X投稿ドラフト ${date}

> このファイルは自動生成の叩き台。SNSエージェントが推敲し、実投稿またはsnowの手動投稿に使う。
> 目安: 日本語は全角1文字=2カウント、上限280カウント(=全角約140字)。URLは23カウント固定。

## 案A: 単体トピック(推奨・画像1枚添付想定)
\`\`\`
${single}
\`\`\`
関連画像: ${blocks[0] ? "(サイトの該当記事サムネを添付)" : "なし"}

## 案B: 今日のまとめ
\`\`\`
${roundup}
\`\`\`

## 元トピック
${blocks.slice(0, 3).map((b) => `- ${b.title}\n  ${b.url}`).join("\n")}
`;
  writeFileSync(OUT, draft);
  console.log(`post-draft.md を生成(トピック${blocks.length}件、先頭: ${top.title.slice(0, 30)})`);
}

main();
