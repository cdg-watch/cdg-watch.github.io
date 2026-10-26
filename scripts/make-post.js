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
  // 箇条書きを拾う。現行形式「- **見出し** — 本文…。[ラベル](URL)」(本文末尾に
  // インラインMarkdownリンクでURLが埋め込まれる、AGENTS.md手順6の書式)と、
  // 旧形式「- **見出し**\n  本文\n  URL」(見出し・本文・URLが別行)の両方に対応する
  // (2026-08-24 Issue #27 → 同一行body化には対応したがインラインリンクは未対応のまま
  // 残っていた不具合を 2026-09-30 Issue #33 で修正)。
  // 見出し先頭の「⚠古」(AGENTS.md 2026-07-13指示: 7日超の古い記事につけるマーカー)が
  // あってもタイトルとして拾えるようにする。⚠古項目は末尾に回す(directive #36)。
  // 「⚠古」は「**」の内側(- **⚠古Title**)・外側(- ⚠古 **Title**)のどちらで
  // 書かれても拾えるようにする(directive #39: 2026-10-26分の実際のdigestが外側形式
  // だったためブロックが1件も検出できなかった)。
  // 本文が長めだと2行目以降に折り返り、URLが裸URL行ではなく独立行の
  // [ラベル](URL)形式になることがある(directive #39)。本文行の連結先を
  // 「裸URL行 or インラインリンク行に当たるまで」に汎化して対応する。
  const inlineLinkRe = /\[[^\]]*\]\((https?:\/\/[^\s)]+)\)\s*$/;
  const bareUrlRe = /^(https?:\/\/\S+)/;
  const lines = md.split("\n");
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const headM = lines[i].match(/^-\s*(.*)$/);
    if (!headM) continue;
    let rest = headM[1];
    let stale = false;
    const outerStaleM = rest.match(/^⚠古\s*/);
    if (outerStaleM) {
      stale = true;
      rest = rest.slice(outerStaleM[0].length);
    }
    const titleM = rest.match(/^\*\*(⚠古\s*)?(.+?)\*\*\s*(?:—\s*(.*))?$/);
    if (!titleM) continue;
    // 表示用titleは常に素の見出し(⚠古プレフィックスなし)。鮮度判定はstaleフラグのみで持つ
    // (directive #36追加対応: 旧実装はtitleにもプレフィックスが残り、全候補⚠古の週に
    // 投稿叩き台〈案A本文〉へ「⚠古」の文字列がそのまま混入していた)
    if (titleM[1]) stale = true;
    const title = titleM[2].trim();
    const bodyParts = [];
    if (titleM[3]) bodyParts.push(titleM[3].trim());
    let url = null;

    // タイトル行の本文末尾にインラインリンクがあれば現行形式としてそのまま拾う
    if (bodyParts.length) {
      const m = bodyParts[0].match(inlineLinkRe);
      if (m) {
        url = m[1];
        bodyParts[0] = bodyParts[0].slice(0, m.index).trim();
      }
    }

    let j = i + 1;
    // URLが見つかるまで続く行を本文として連結する(裸URL行・インラインリンク行の
    // いずれかに当たったら確定。次の項目やまとめの注記に入ったら諦める)
    while (!url && j < lines.length) {
      const t = lines[j].trim();
      if (!t) { j++; continue; }
      if (t.startsWith("-") || t.startsWith(">")) { j = -1; break; }
      const bareM = t.match(bareUrlRe);
      if (bareM) { url = bareM[1]; j++; break; }
      const inlineM = t.match(inlineLinkRe);
      if (inlineM) {
        const pre = t.slice(0, inlineM.index).trim();
        if (pre) bodyParts.push(pre);
        url = inlineM[1];
        j++;
        break;
      }
      bodyParts.push(t);
      j++;
    }

    if (j >= 0 && url) {
      blocks.push({ title, body: bodyParts.join(" ").trim(), url, stale });
      i = j - 1; // 消費した行を飛ばす
    }
  }
  // ⚠古(7日超)マーク項目は候補の末尾に回す(directive #36)。同一グループ内の
  // 元の順序は保つため、真偽値だけで安定ソートする
  blocks.sort((a, b) => Number(a.stale) - Number(b.stale));
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
