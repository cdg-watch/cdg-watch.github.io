# X投稿ドラフト 2026-07-27

## 本日の投稿(確定)

本日は見送り。

理由: digest-latest.mdの3件はすべてSNKRDUNKの二次流通(中古)出品で、方針により対象外。
items.json直近7日以内(二次流通除く)の候補22件も確認したが、既出トピックの重複か、
核心情報を欠く記事、またはスパム的なコンテンツのみだった。

見送った項目:
- Rolling Stone Philippines ジョフ会長インタビュー(公開7/24) — 7/25に投稿済みと同一記事のため重複
- stupidDOPE「Future×PLAY CDG×Converse」/Trend Hunter/Hypebeast(いずれも同一コラボ) —
  7/22投稿済みのPLAY×Converse Chuck Taylor 70s(Robert Nava)の重複取材
- FINE Homes and Living/Breizh-info「Corteiz×CDG」比較コラム — 両ブランドの姿勢を論じる
  意見記事で価格・発売日等の核心情報を含まない(7/24・7/25にも同種の理由で見送り済み)
- Highsnobiety「Nike ACG Air Max Goadome Low」 — CDGとの公式コラボではなく、デザインが
  CDGの美学に似ているという第三者の論評記事(7/24にも同種の理由で見送り済み)
- SNKRDUNK「プレイCDG Tシャツ6選」 — 二次流通プラットフォームの編集記事で、紹介の新商品
  自体も2024年9月発売の既存品のため鮮度・方針どちらの基準も満たさない
- Yahoo!ニュース「コラボシューズ5選」中のCDG×ナイキ「フィールド ジェネラル 82」 —
  7/18投稿済みと同一コラボの街角スナップで新情報なし
- lechodelabaie.fr / tennis.fi / Universidad de Sevilla(cicus.us.es)計6件 — タイトルが
  文法崩壊したSEOスパムサイト。1件をWebFetchで確認したところ404で実体なし

無理に基準を下げず、翌日以降の新着を待ちます。

## 今週の改善メモ

今週(7/20〜7/26)は、Corteiz×CDG比較コラム・Highsnobietyの非公式コラボ論評・
Future×PLAY×Converseの重複取材という同じ3件が、7/24〜7/27の4日間ずっとitems.json
7日ウィンドウに居座り続け、日ごとに同じ「意見記事で核心情報なし」「公式コラボでない」
「重複取材」という結論をWebFetch/WebSearchで再確認する作業が発生した(本日はうち2件を
改めてWebFetchで再検証した)。
改善案: 一度「構造的に対象外」(公式コラボでない/意見記事で核心情報なし/二次流通媒体の
編集記事、など鮮度が理由でなく方針が理由の除外)と判定したURLは、posted-log.mdとは別に
再利用可能な短い「除外済みリスト」(例: data/excluded-log.md)に1行残す運用にすると、
翌日以降は再検証せずそのリストを見て即座にスキップでき、7日間で最大4回分のWebFetch/
WebSearchを節約できる。鮮度切れ(7日ウィンドウ外)になった行はリストから自然に削除して
よい。sns-notes.mdはまだ未作成のため、投稿の反応面の振り返りは今週も実施できていない。
