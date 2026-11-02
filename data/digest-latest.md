# CDG Watch 日次ダイジェスト 2026-11-03

collect.jsで40件を収集試行したが、重複排除(焼き直し記事判定・既存URL一致)と
上限1000件への自動トリミングにより、最終的にデータへ残った新規項目は5件。
summary null だったこの5件(本日新規分のみ、前日からの持ち越しなし)を処理。
要約2件・取得不可3件(アクセス不可、いずれもSPAM_URL_RE非該当のため削除せず
「(要約取得不可)」を設定して据え置き)。無関係記事としての削除は0件。

- **コム デ ギャルソン・オム×ニューバランス「1890A」11月6日発売** — ブラック・
  ベージュの2色展開で、2026年1月のパリ・メンズコレクションで初披露されたモデルの
  商品化。既存の `productDrops`(2026-11-06)に同発売日の項目が既に登録済みのため
  カレンダーへの追加操作なし。
  [dscene magazine](https://www.designscene.net/2026/11/comme-des-garcons-x-new-balance-1890a.html)

- ⚠古 **川久保玲インタビュー(Dezeen、2019年)** — 「服そのものではなく会社を
  設計している」と述べ、芸術家・デザイナーという枠に自分を当てはめない姿勢や、
  スケッチをせず言葉と議論から発想する制作プロセスについて語った旧インタビュー記事。
  Google Newsフィード経由で本日拾われたバックログ項目。
  [Dezeen](https://www.dezeen.com/2019/05/09/rei-kawakubo-comme-des-garcons-interview/)

取得不可: 3件。
- Athlon Sports「Comme des Garçons x Nike Air Max Dolce 'Triple Black'」(403)。
  既存cluster `nike-airmax-dolcesp` に同一コラボの記事が複数あるため、同クラスターに
  紐付け。
- British GQ「Nike and Comme Des Garçons Play」(取得不可)。
- 朝日新聞「コムデギャルソン×ジュンヤ・ワタナベ 秋冬メンズ」(取得不可、publishedAt
  2021年のバックログ項目)。

cluster整理: 新規cluster作成なし。NB1890A項目は既存の `cdg-newbalance-1890a` を
再利用、Athlon Sports項目は既存の `nike-airmax-dolcesp` を再利用。

重要度: NB1890A(発売日確定の公式コラボ)を importance 2、Dezeenインタビュー
(旧記事・小ネタ)を importance 1 に設定。importance 3 の大型ニュースはなし。

リリースカレンダー: 本日処理分の新規発売日はproductDropsに既登録済みのもののみで
追加操作なし。storeLaunches: 本日はJST火曜のため対象外(月曜のみ更新)。

directiveラベルのopen Issue: #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`
タグ付け)を確認したが、本日もcdg-freak.comの新規記事自体が収集されず、完了条件の
進展なし。既存タグ付け5件は維持されており異常なし。変化がないためコメント追加は
見送り。

未処理の残りsummary null: 0件。本日分は全件処理完了。
