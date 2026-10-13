# CDG Watch 日次ダイジェスト 2026-10-14

- **Adrian Joffe: “Six Is New Again”(Dover Street Market Six展開)** — ロンドンのDover Street Marketで10/13からComme des Garçonsの雑誌『Six』を再現したインスタレーションが約1ヶ月展開、東京・青山店でも同様の展示。社長Adrian Joffeによればパリ・ロンドン・東京の3拠点限定で、通常東京限定のTシャツもロンドン店で購入可能。[AnOther](https://www.anothermag.com/art-photography/17567/comme-des-garcons-six-magazine-dover-street-market-frieze-adrian-joffe?utm_source=Link&utm_medium=Link&utm_campaign=RSSFeed&utm_term=adrian-joffe-six-is-new-again)

本日の新着2件のうち、WWD「Le Bon Marché、日本ファッションのアーカイブをオークションに」はペイウォール(HTTP 402)で本文未確認のため`summary: "(要約取得不可)"`のまま(スパムドメインではないため削除はせず)。火曜のためCDG FREAKの立ち上がり日程更新(月曜のみ)・週次振り返りは対象外。リリースカレンダーへの追加は本日要約分に未来の発売日・価格情報がないため該当なし。

directiveラベルのopen Issueは#36のみ(make-post.jsの⚠古優先バグ)。10/11-10/12にa2aec70で対応済みだが、監督レビューで2点が指摘されオープン継続中: (1) 実データでの検証待ち(10/13は新着0件でmake-post.js未実行)、(2) `parseDigest()`のtitleに「⚠古 」プレフィックスが残り、全候補⚠古の週に投稿叩き台へ混入する懸念。本日はこの(2)に対応し、titleからプレフィックスを除去(stale判定は既存の`stale`フラグのみで保持)、`node --check scripts/make-post.js`確認済み。Issueに対応コメントを残す。
