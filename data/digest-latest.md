# CDG Watch 日次ダイジェスト 2026-10-31

collect.jsで16件追加(総件数は上限1000件のため自動で切り詰め)。summary nullだった16件
(本日新規分のみ、前日からの持ち越しなし)を全件処理(要約13件・取得不可3件)。無関係記事
としての削除はなし。

- **コム デ ギャルソン・オム×ニューバランス「1890A」11/6発売** — タンとブラックの2色、
  各6万4900円。エプロンアッパーとABZORBミッドソールを採用し、全国のコム デ ギャルソン・
  オム取扱店で販売。[CDG FREAK](https://cdg-freak.com/news/homme-new-balance-1890a-2026/)

- **CDG渋谷PARCOポップアップ、10/31〜11/17開催** — Alpha Industries・OTW by Vansとの
  別注アウター・スニーカーを販売。11/7には未発表ブランドとの限定コラボカプセルを初披露。
  [CDG FREAK](https://cdg-freak.com/news/cdg-shibuya-parco-pop-up-2026/)

- ⚠古 **映画『Sense and Sensibility』の衣装デザインとコムデギャルソン** — 衣装デザイナーの
  グレース・スネルが、川久保玲による脱構築的なショー演出(服の内側の構造を見せる手法)から
  インスピレーションを得たと語る記事(10/20)。
  [The Set Set](https://thesetset.com/articles/grace-snell-sense-and-sensibility-costume-design-john-galliano)

- ⚠古 **2027年春夏パリ・コレクションのレビュー** — 前シーズンの黒一色から一転、デニムや
  ヒッコリーなど素朴なワークウェア素材を使った量感のあるドレスに鮮やかな色とテクスチャーの
  対比を取り入れた内容(有料会員限定、冒頭部分のみ確認、10/6)。
  [繊研新聞](https://senken.co.jp/posts/paris-261006)

- **コム デ ギャルソン・オムの軽量1stタイプGジャン** — デニム調ポリエステル素材、
  93,500円。色落ちしにくいカチオン染めとアルミ金具で軽量化したボックスシルエット。
  [UOMO](https://www.webuomo.jp/uomolist/lightouter30-2026aw/MRjkRQ/)

取得不可: 3件(ciiblog.in×2、mtv-handball.com×1)。いずれも404/503で本文取得不可のため
`summary`に「(要約取得不可)」を設定。SPAM_URL_RE該当の既知スパムドメインではないため
削除はせず据え置き。なお両ドメインとも見出しが文字列乱雑(キーワード詰め込み型)で
スパムサイトの疑いがあり、継続して取得不可が続く場合はSPAM_URL_RE追加を検討候補とする
(今回は月曜の週次作業外のため見送り)。
ELLE「Comme des Garçons Fans Reveal...」はWebFetchでは取得失敗したがcurl経由で本文を
確認できたため要約済み。Hypebeast・WWD(spring 2027 review)はcurl/WebFetch双方で
本文取得不可(Hypebeastはbot対策、WWDはペイウォール402)。

cluster整理: 既存clusterを再利用。ニューバランス1890A関連6件に`cdg-newbalance-1890a`
(既存cluster)、渋谷PARCOポップアップ関連2件に新規`cdg-shibuya-parco-popup-2026`、
27年春夏パリショー関連2件(本日分+WWD既存項目)に`cdg-ss27-show-paris`(既存cluster)を付与。

リリースカレンダー: productDropsに3件追加
(10/31 渋谷PARCOポップアップ開催、11/6 NB1890A発売、11/7 ポップアップ限定コラボカプセル発売)。
storeLaunches(月曜更新対象)は本日JST土曜のため対象外。

directiveラベルのopen Issue: #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`
タグ付け)を確認。既存5件のタグ付けは維持されており、本日新規収集したCDG FREAK記事2件
(ニュース記事)は`参考ガイド`タグが付与されずに正しく区別されていることを確認・Issueに
コメント済み。新規ガイド/スケジュールページ自体の収集はまだ無いため、完了条件の最終確認は
継続保留。

未処理の残りsummary null: 0件。本日分は全件処理完了。
