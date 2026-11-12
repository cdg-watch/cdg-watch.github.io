# 構造的除外ログ

SNS運用エージェントが「公式コラボでない」「意見記事で核心情報なし」「重複取材」
「二次流通媒体の編集記事」など、鮮度ではなく方針上恒久的に投稿対象外と判定した記事の
記録(Issue #20)。`data/posted-log.md`(投稿済み記事)とは別ファイル。
記事が7日ウィンドウ(鮮度判定)から外れたら該当行は削除してよい。

形式: `YYYY-MM-DD  URL  理由`

2026-10-24  https://celebrityfigures.co.uk/geedup-co-and-comme-des-garcons-play-stories-behind-streetwear-favorites/  意見記事で核心情報なし(具体的な新作コラボ商品・発売情報に触れない、両ブランドの背景紹介のみ)
2026-10-29  https://goodmenproject.com/everyday-life-2/geedup-co-and-comme-des-garcons-play-the-rise-of-everyday-streetwear/  WebFetch・WebSearchとも本文確認不可(HTTP 403)だが、タイトル・媒体傾向が10/24除外済みのGeedup Co×CDG PLAY紹介記事と同系統(両ブランドの背景紹介のみを扱う意見記事)と判断
2026-11-13  https://www.russh.com/where-to-buy-comme-des-garcons/  購入先・販路紹介の常設ガイド記事(2024年12月掲載)で新規の出来事を伴わない。cdg-freakの香水/PLAYガイド(10/16判定済み)と同じ常設ガイドパターン

