# CDG Watch

コムデギャルソン(Comme des Garçons)関連ニュースを毎日自動収集して一覧表示する個人プロジェクト。

- **収集**: `scripts/collect.js` が Google News RSS(日英)から記事メタデータを取得し `data/items.json` に蓄積(ゼロ依存、Node 18+)
- **表示**: `index.html`(GitHub Pages)が items.json をカード表示。検索・ソース絞り込み対応
- **運用**: Claude Code のスケジュールエージェントが毎朝実行(収集 → 日本語要約 → コミット)。詳細は [AGENTS.md](AGENTS.md)

## ローカルで見る

```sh
node scripts/collect.js   # データ収集
npx serve .               # または python3 -m http.server
```

## データについて

保存するのは記事のタイトル・URL・出典・日付と、自前の短い要約のみ。
記事本文・画像は保存しない。
