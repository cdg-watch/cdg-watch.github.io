# CDG Watch 日次ダイジェスト 2026-11-28

collect.jsで新規6件収集。`summary: null` の6件を処理(要約3件・削除1件[無関係記事]・
取得不可2件[アクセス遮断/リンク切れ])。12月1日発売のウォレット・コム デ ギャルソン
新作小型財布とパルファムのミニチュア香水セットが今日の主な新情報。

## 今日の要点

- [ウォレット・コム デ ギャルソン「EXTRA SMALL」を12月1日(火)発売｜パルファムの9ml香水5種セットも - CDG FREAK](https://cdg-freak.com/news/wallet-cdg-extra-small-parfums-2026/) — フック付きの新作小型財布3型(16,500〜30,800円)と、新作「トゥー ベチバー」を含む香水ミニチュアセット(26,400円)が12/1に正規取扱店で発売。
- [ウォレット・コム デ ギャルソンの"小さめ"財布＆ポーチ、アクセサリー感覚で使えるフック付き - fashion-press.net](https://www.fashion-press.net/news/153960) — 上記財布の詳細(二つ折りジップ30,800円/L字型ジップ17,600円/ジップポーチ16,500円)。
- [コム デ ギャルソン・パルファムの香水セット、ベチバーなど5つの香りを"小石型"ミニボトルで - fashion-press.net](https://www.fashion-press.net/news/153961) — 上記香水セットの詳細。
- [川久保玲がデザインした BE@RBRICK のフィギュアやアパレル全22型が COMME des GARÇONS の各店に集結 - Hypebeast](https://hypebeast.com/jp/2026/11/berbrick-comme-des-garcons-holiday-campaign-info) — 既報(cluster `cdg-bearbrick-holidays-2026`、12/1〜28開催)の別媒体フォロー。本文はアクセス遮断(HTTP 202/空応答)で要約取得不可、タイトルから既存clusterへ分類。

⚠古(公開日が本日から7日より前): [フィギュア BE@RBRICK シリーズ10 １箱 シークレット コムデギャルソン - CII Blog](https://www.ciiblog.in/detail/66532558436)(publishedAt 2026-11-01) — リンク先が404(Page not found)で恒久的にアクセス不可のため取得不可のまま。SPAM_URL_RE未登録のドメインのため削除はせず据え置き。

二次流通: 本日処理分に二次流通記事は含まれない。

リリースカレンダー: `data/schedule.json` に12/1発売のウォレットEXTRA SMALL/パルファム
ミニチュアセットを新規追加(1件)。既報のマリメッコ・ベアブリックの12/1エントリは
重複のため追加せず。storeLaunchesは本日(JST 11/28・土曜)が月曜ではないため対象外。
過去1年より古い項目の削除もなし。

重要度: ウォレット/パルファム関連3件・Hypebeastのベアブリック記事はいずれも
importance=2(公式新作発表・既報コラボの継続フォロー)。

タグ: ウォレット/パルファム関連3件は`新作`。Hypebeast記事は自動タグが「川久保玲」
の語でインタビュー扱いになっていたため、実際は新作コラボ告知のため`新作`+`コラボ`に
修正(既存cluster `cdg-bearbrick-holidays-2026`を再利用)。

重複整理: 削除1件。10 Magazine「都築響一氏がファッションコレクターに迫る」記事
(写真集『Happy Victims』の紹介記事で、コムデギャルソンは「買い求める仏教僧」という
一文の例示のみで主題ではない)。

cluster: 新規cluster `cdg-wallet-parfums-extrasmall-2026` を作成(ウォレットEXTRA
SMALL・パルファムミニチュアセットの3件に付与)。既存clusterでの代替候補なし。

directive: `directive`ラベルのopen Issueは1件(#44, SNS 2段階クエリ方式)。
11/20付でsnowが「進展があるまで日次コメントは控える」と決定済みのため、状況に
変化がなく本日は対応・コメントなし(SNS運用エージェント側の継続観察事項であり、
日次データ収集エージェントの対応範囲外)。
