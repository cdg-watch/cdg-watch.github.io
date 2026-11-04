# CDG Watch 日次ダイジェスト 2026-11-05

collect.jsで52件を収集試行(焼き直し記事1件をスキップ)、実際に新規追加されたのは
11件(残り41件は既存URLと重複・内容更新扱い)。上限1000件への自動トリミングが
再度発動し、2019〜2021年の古い記事10件が削除された(うち4件は要約済みの完成データ。
Issue #41で7日連続の再発として記録済み)。

summary nullだった新規・バックログ計11件を全件処理。要約8件・取得不可0件(アクセス
不可だったSNKRDUNK記事はcurl経由で本文取得に成功)・無関係記事として削除2件
(Hamilton Collegeの記事〈CDGは協業先リストに名前が挙がるだけ〉、ginzamagのタグ
一覧ページ〈個別記事ではない〉)。

- **CDG×ディズニー「ミッキーマウス」&「BE@RBRICK」Tシャツ、11月20日発売** —
  渋谷PARCO初出店・同パルコ7周年記念。ミッキー柄15,400円、BE@RBRICK柄14,300円。
  `productDrops`に新規追加。
  [fullress](https://www.fullress.com/cdg-shibuya-parco-disney-mickey-mouse-bearbrick-t-shirt/)

- **コム デ ギャルソン・オム×ニューバランス「1890A」、追加ソース2件** —
  SNKRDUNKとYahoo!ニュースが抽選店舗・価格(64,900円)・機能面(ABZORBソール等)を
  紹介。11月6日発売は既存`productDrops`に登録済みのため追加操作なし。既存cluster
  `cdg-newbalance-1890a`を再利用。
  [SNKRDUNK](https://snkrdunk.com/articles/33677/) /
  [Yahoo!ニュース](https://news.yahoo.co.jp/articles/c8a4bf384ff8cbb000cadc58b8ee23990ce7bfb3)

- **プレイ・コム デ ギャルソン新作Tシャツ、11月7日発売の追加ソース** — CDG FREAKと
  fashionsnapが同じ新色情報(迷彩柄×ドット柄、青・赤が新色)を報道。既存の
  `productDrops`(2026-11-07)に登録済みの発売情報と同一のため追加操作なし。新規
  cluster `play-heart-camo-dot-tshirt-2026` を作成し、既存のファッションプレス記事
  (11/3)にも遡って付与。
  [CDG FREAK](https://cdg-freak.com/news/play-heart-camo-dot-t-shirt-2026/) /
  [fashionsnap](https://www.fashionsnap.com/article/2026-11-04/play-comme-des-garcons-new-t-shirt/)

⚠古 **バックログ3件を処理** — ジュンヤ ワタナベ マン×ニューバランス「P400」
(10/16発売済み、CDG FREAK)、CDG×The North Faceコラボ(2023年8月発売、
Highsnobiety)、コムデギャルソン「黒バラ」2022年秋冬コレクション(朝日新聞、
有料記事のプレビュー文から要約)。いずれも初出が7日以上前のため本項目に⚠古を付与。

無関係記事として削除: 2件。
- Hamilton College記事(卒業生の会社がブランド協業を仲介、CDGは名前が挙がるだけで
  内容に具体的言及なし)。
- ginzamag.com「#コムデギャルソン」タグ一覧ページ(関連記事が表示されておらず
  個別記事でもないため削除)。

cluster整理: 新規cluster `play-heart-camo-dot-tshirt-2026` を1件作成。
`cdg-shibuya-parco-popup-2026`・`cdg-newbalance-1890a` は既存clusterを再利用。

重要度: CDG×ディズニーTシャツ・1890A追加ソース・PLAY新作Tシャツをいずれも
importance 2に設定。バックログ3件とOCEANSスナップはimportance 1。importance 3の
大型ニュースはなし。

リリースカレンダー: CDG×ディズニーTシャツ(2026-11-20)を`productDrops`に新規追加。
1890A・PLAYTシャツは既登録のため追加操作なし。storeLaunches: 本日はJST木曜のため
対象外(月曜のみ更新)。

directiveラベルのopen Issue対応:
- Issue #41(MAX_ITEMSトリムによるデータ損失): 本日も要約済み4件(朝日新聞記事2件・
  SNKRDUNK二次流通記事1件・lee.hpplus.jp記事1件)を含む10件が削除され、7日連続の
  再発を確認。対応案(上限引き上げ/要約済み優先保護/アーカイブ分離)は11/3のコメント
  で提示済みのため、本日は観測結果のみIssueにコメントし、snowの方針決定を待つ
  (無断実装は不可のため実装は見送り)。
- Issue #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`タグ付け): 本日収集
  したcdg-freak.com記事2件(いずれも通常ニュース)はガイド/スケジュール系ページでは
  なかったため、確認用の新規データなし。進展なしのためコメントは見送り。

未処理の残りsummary null: 0件。本日分は全件処理完了。
