# CDG Watch 日次ダイジェスト 2026-11-07

collect.jsで52件を収集試行(焼き直し記事1件をスキップ)、実際に新規追加されたのは
summary null 3件(他は既存URLとの重複または更新扱い)。上限1000件への自動トリミ
ングが発動し、2021年の古い記事3件が削除されたが、いずれも要約取得不可のプレース
ホルダーのみで要約済み完成データの削除は無し(Issue #41の観測対象だが本日は被害
軽微)。

summary nullだった新規3件を全件処理。要約3件・取得不可0件・無関係記事としての
削除は無し。

- **CDG渋谷PARCOポップアップ、Stüssyとのコラボカプセルが11月7日発売** —
  限定12スタイル、CDGは7日・8日朝に入場抽選を実施。既存cluster
  `cdg-shibuya-parco-popup-2026`に追加、`productDrops`のコラボ相手を
  「未発表」から確定情報に更新。
  [finally offline](https://www.finallyoffline.com/article/stussy-cdg-shibuya-parco-lottery-november-7-w3k8q5mx)

- **⚠古 ブルックス ブラザーズ×eYe ジュンヤワタナベマン、2026秋冬3型が
  10月16日発売済み** — カシミヤ混ブレザー(19.8万円)・モールスキンパンツ
  (9.9万円)・ボタンダウンシャツ(各7.15万円)。すでに発売済みのため
  `productDrops`への追加は無し。
  [CDG FREAK](https://cdg-freak.com/news/eye-junya-watanabe-man-brooks-brothers-2026/)

- **⚠古 コム デ ギャルソン オム×ニューバランス「1906R」、2023年11月発売の
  旧記事がGoogle Newsフィード経由で遅れて流入** — ブラック/ホワイト2色、
  46,200円。3年前の記事のため`productDrops`への追加は無し。
  [スニーカーウォーズ](https://sneakerwars.jp/items/view/18439)

重複削除: 無し。無関係記事としての削除: 無し。

cluster整理: 新規cluster作成は無し。Stüssyコラボ記事を既存cluster
`cdg-shibuya-parco-popup-2026`に追加(命名ゆれ防止のため既存clusterを再利用)。

重要度: Stüssyコラボ・ブルックス ブラザーズコラボをimportance 2(いずれも
コラボ新作のため)、1906R旧記事はimportance 1(3年前の既出ニュースのため)。
importance 3の大型ニュースはなし。

リリースカレンダー: `productDrops`の既存11/7エントリ(コラボ相手未発表)を
Stüssyとのコラボと確定して更新。他2件は発売日が過去のため新規追加は無し。
storeLaunches: 本日はJST土曜のため対象外(月曜のみ更新)。

directiveラベルのopen Issue対応:
- Issue #41(MAX_ITEMSトリムによるデータ損失): 本日のトリムは取得不可プレース
  ホルダー3件のみの削除で、要約済み完成データの削除は無し。対応案(上限引き上げ/
  要約済み優先保護/アーカイブ分離)は11/3提示済みのまま変わらず、snowの方針決定
  を待つ(無断実装は不可のため実装は見送り、監督コメントで観測結果のみ報告)。
- Issue #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`タグ付け):
  本日収集したcdg-freak.com記事(ブルックス ブラザーズ×eYeコラボ)は通常の
  ニュース記事で`参考ガイド`該当なし(誤検知なし)。実装は既に完了済みのため
  進展のみ観測。

未処理の残りsummary null: 0件。本日分は全件処理完了。
