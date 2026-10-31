# CDG Watch 日次ダイジェスト 2026-11-01

collect.jsで5件追加(総件数は上限1000件のため自動で切り詰め)。summary nullだった5件
(本日新規分のみ、前日からの持ち越しなし)を全件処理(要約2件・取得不可3件)。無関係記事
としての削除はなし。

- **CDG、渋谷PARCOでポップアップ開催中(〜11/17)** — 11月20日の同館常設店オープンに
  先駆けたポップアップ。ヴァンズ・アルファインダストリーズとのコラボ商品を先行販売し、
  11/7には別の新コラボを初披露予定。
  [fashionsnap](https://www.fashionsnap.com/article/2026-10-31/cdg-popup-shibuyaparco/)

- ⚠古 **表参道トレーディングミュージアムで新進デザイナーのバッグ展示販売** — 川久保玲氏に
  見出された深川詔平「ワンラインドローイング」のバッグ3型を、東京・パリ・ニューヨークの
  直営店で同時展開(記事自体は2014年初出、Google Newsフィード経由で本日再出現)。
  [WWDJAPAN](https://www.wwdjapan.com/articles/227418)

取得不可: 3件。GQ(New Balance 1890Aコラボ記事)、The Cut(Olivia Kim記事)、
British Vogue(新ブランドCDG発表記事)はいずれもCondé Nast系サイトで、WebFetch・
archive.orgスナップショット経由でも本文取得不可(bot対策と見られる)。SPAM_URL_RE該当
の既知スパムドメインではないため削除はせず`summary`に「(要約取得不可)」を設定して据え置き。
いずれも⚠古(publishedAtが数ヶ月〜数年前)。

cluster整理: New Balance 1890A関連のGQ記事に既存cluster`cdg-newbalance-1890a`、
渋谷PARCOポップアップ記事に既存cluster`cdg-shibuya-parco-popup-2026`を付与(新規cluster
作成なし)。

リリースカレンダー: 本日分の記事に記載の発売日・開催日(渋谷PARCOポップアップ10/31〜11/17、
11/20常設店オープン、New Balance 1890A 11/6発売、限定コラボ11/7)はいずれも既存の
productDrops(10/30・10/31分の収集時に登録済み)と同一事象のため新規追加なし。
storeLaunches(月曜更新対象)は本日JST日曜のため対象外。

directiveラベルのopen Issue: #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`
タグ付け)を確認。本日はcdg-freak.comの新規記事自体が収集されなかったため、完了条件
(新規ガイド/スケジュールページへの自動タグ付けの実データ確認)の進展はなし。既存の
タグ付け5件は維持されており異常なし。Issueはopenのまま継続(コメント追加は見送り、
前回コメントから内容に変化がないため)。

未処理の残りsummary null: 0件。本日分は全件処理完了。
