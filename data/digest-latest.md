# CDG Watch 日次ダイジェスト 2026-11-24

collect.jsで新規4件収集。`summary: null` の4件を処理(要約3件・削除1件[無関係記事])。取得不可はなし。

## 今日の要点

- [コム デ ギャルソン×マリメッコ、花輪テキスタイルのトートバッグや“フルーツ柄”ショッパーバッグ - Fashion Press](https://www.fashion-press.net/news/153698) — マリメッコの生地を使ったトート・ショッパーバッグ計4種が12/1発売。価格は26,400〜27,500円、路面直営店とTRADING MUSEUMを除くコム デ ギャルソン店舗で取り扱う。
- [〈コム デ ギャルソン× マリメッコ〉のホリデー限定バッグ - ginzamag](https://ginzamag.com/categories/fashion/611259) — 同コラボを紹介する別ソース記事。Fashion Press記事と同一クラスター(`cdg-marimekko-bag-2026`)として統合。
- ⚠古 [This Is How COMME des GARÇONS Does a Box Logo - Highsnobiety](https://www.highsnobiety.com/p/cdg-t-shirt-ete-1986/) — 1986年春夏ショーのジャケットのプリントを使った「Été 1986」Tシャツ(1枚80ドル)がDover Street Marketなどで数量限定再入荷(Highsnobiety、publishedAt: 2025-07-25)。

⚠古(公開日が本日から7日より前): 上記3件中Highsnobiety記事のみ該当(publishedAtが2025年、fetchedAtは本日)。Google Newsフィード経由で初出から大きくずれて「新着」表面化したケース。

リリースカレンダー: Fashion Press記事のマリメッココラボ(発売日2026-12-01)をproductDropsに追加。storeLaunchesは本日(JST 11/24・火曜)が月曜ではないため対象外(更新なし)。過去1年より古い項目の削除もなし。

重要度: マリメッココラボ2件はimportance=2(公式コラボの新作発売)、Highsnobietyの再入荷記事はimportance=1(数量限定の再入荷のみで新作ではない)。

タグ: マリメッココラボ2件は`新作`、Highsnobiety記事は`再販/セール`。

重複整理: 削除1件(10 Magazine「Happy Victims」写真集紹介記事。コムデギャルソンは「買い求める仏教僧」という一文の言及のみで記事の主題ではないため、無関係記事として削除)。新規cluster `cdg-marimekko-bag-2026` を作成(既存clusterに同一コラボなし)。

directive: open Issue #45(make-post.jsの見出しリンク形式パース不具合)に対応。`titleM`(太字見出し前提)に加え、現行の`[見出し - 出典名](URL)`形式を認識する分岐を追加し、本日の digest-latest.md(旧版・リンク形式3件)で3件抽出、11/14分の旧形式(太字・複数行本文)digestでも1件抽出できることを確認(回帰なし)。Issueにコメント済み。Issue #44(SNS 2段階クエリ方式)はSNS運用エージェントの担当範囲のため本日の日次収集・要約作業では対応せず。
