# CDG Watch 日次ダイジェスト 2026-10-28

本日のcollect.js新着3件。うち2件を要約、1件(OCEANSのストリートスナップ。CDGジャケットは
多ブランド着用の中の1アイテムとして名前が出るだけでCDG関連ニュースと言えないため
items.jsonから削除)。

- **コムデギャルソン「GUERRILLA STORE FUKUOKA」10月27日オープン** —
  博多の新旗艦店オープンまでのつなぎとして、福岡市中央区薬院に期間限定店が開業。
  1階は傘下16ブランド、2階は本家ライン・ブラック コムデギャルソンとアーカイブ特価品・
  店舗限定アイテムを扱う。12月中旬頃まで営業予定。
  [CDG FREAK](https://cdg-freak.com/news/cdg-guerrilla-store-fukuoka-2026/)

- **CDG×Nike「Air Max Dolce 'Triple Black'」リセール相場ガイド** —
  2002年のAir Max Dolceを復刻したパテントレザーのローファー風モデルについて、
  正規販売店(Dover Street Market NY等)情報とStockXでのリセール相場
  (直近販売362ドル、過去12か月は270〜731ドル)を紹介する記事。
  [Yahoo (Athlon Sports)](https://shopping.yahoo.com/style/shoes/articles/comme-des-gar-ons-x-013618425.html)
  (既存cluster `nike-airmax-dolcesp` に統合)

- **BE@RBRICK シリーズ10 シークレット 買取情報** — コムデギャルソン柄BE@RBRICKの
  買取コレクターブログ記事。本文アクセス不可のため詳細未確認(要約取得不可)。
  [ciiblog.in](https://www.ciiblog.in/detail/33e42558436)

リリースカレンダー: 本日要約分に未来の発売日・入荷日の記載なし、productDrops追加なし
(Air Max Dolceの発売日2026-05-14は既に過去)。
storeLaunches(月曜更新対象): 本日はJST水曜のため対象外。

directiveラベルのopen Issue: #37(CDG FREAKガイド/スケジュールページへの`参考ガイド`
タグ付け)は実装済みで新規該当ページの収集待ちのまま。本日の新着にcdg-freak.comの
ガイド/スケジュール系ページなし、未更新。

cluster整理: 「GUERRILLA STORE FUKUOKA」関連で`cdg-guerrillastore-fukuoka`と
`cdg-guerrilla-fukuoka`の命名ゆれを発見し、後者を前者に統一(directive Issue #34対応)。
