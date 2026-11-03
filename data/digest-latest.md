# CDG Watch 日次ダイジェスト 2026-11-04

collect.jsで44件を収集試行(焼き直し記事1件をスキップ)、最終的にデータへ残った
新規項目は44件(前日からの持ち越しsummary null 0件)。上限1000件への自動トリミング
が発動し、2019年の古い記事5件が削除された(うち4件は要約済みの完成データ。
Issue #41に経過を記録済み)。

summary nullだった本日新規分5件を処理。要約2件・取得不可2件(いずれもアクセス不可、
SPAM_URL_RE非該当のため削除せず「(要約取得不可)」を設定)・無関係記事として削除
1件(ginzamag.comのタグ一覧ページ、個別記事ではないため)。

- **コム デ ギャルソン・オム×ニューバランス「1890A」11月6日発売、追加情報** —
  Sole Retrieverがトリプルブラック・ウィートタンの2色展開を紹介。既存の
  `productDrops`(2026-11-06)に同発売情報が登録済みのためカレンダーへの追加操作なし。
  既存cluster `cdg-newbalance-1890a` を再利用。
  [Sole Retriever](https://www.soleretriever.com/news/articles/comme-de-garcons-homme-x-new-balance-1890a-pack-release-date-november-2026)

- **プレイ・コム デ ギャルソン新作Tシャツ、11月7日発売** — ハートモチーフに
  ドット柄・迷彩柄を組み合わせた新色4種、11,220円〜21,450円。全国のプレイ取扱店
  (青山店除く)で販売。`productDrops`に新規追加。
  [ファッションプレス](https://www.fashion-press.net/news/152769)

取得不可: 2件。
- WWD「Comme des Garçons Ups the Luxe on Balance's Sneaker Moccasin」(402、
  ペイウォール)。タイトル・画像ファイル名から同一の1890Aコラボ記事と判断できるため、
  本文は読めないままタグ(コラボ/新作)とcluster `cdg-newbalance-1890a` のみ付与。
- SNKRDUNK「コレクション登録数ランキングTOP10」(403)。

無関係記事として削除: 1件。
- ginzamag.com「#コムデギャルソン」タグ一覧ページ(個別記事ではなくタグ別記事リスト
  のため、要約せず削除)。

cluster整理: 新規cluster作成なし。NB1890A関連2件は既存の `cdg-newbalance-1890a` を
再利用。

重要度: NB1890A追加情報・PLAY新作Tシャツをともに importance 2 に設定。
importance 3の大型ニュースはなし。

リリースカレンダー: PLAY新作Tシャツ(2026-11-07)を`productDrops`に新規追加。
NB1890Aは既登録のため追加操作なし。storeLaunches: 本日はJST水曜のため対象外
(月曜のみ更新)。

directiveラベルのopen Issue対応:
- Issue #41(MAX_ITEMSトリムによるデータ損失): 対応案3つ(上限引き上げ/要約済み
  優先保護/アーカイブ分離)をコメントで提示。無断実装は不可のため実装は見送り。
  本日も要約済み4件を含む5件が削除されたため、再発をコメントで記録。
- Issue #40(10/30要約コミット未実行の原因調査): 原因不明のまま記録し、完了条件を
  満たしたためクローズ。
- Issue #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`タグ付け):
  本日もcdg-freak.comの新規ガイド/スケジュールページの収集がなく進展なし。
  既存タグ付け5件は維持。

未処理の残りsummary null: 0件。本日分は全件処理完了。
