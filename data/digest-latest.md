# CDG Watch 日次ダイジェスト 2026-10-07

本日は新着記事の実質的な追加はありませんでした(collect.jsが取得した1件は後述の通りスパムと判明し削除)。そのため要約・タグ付け・カレンダー更新対象はなし。directive Issue #35(cluster分裂統合)に対応しました。

- **新規スパムドメイン `jordanrussiacenter.org` を検出・除外** — NYU附属ロシア研究センターの公式サイトが乗っ取られ、フリマ出品風タイトル(コムデギャルソン関連キーワード+「付属品完備」「電池切れ」等)でCDGキーワードを連結したスパムページをGoogle Newsに流していた。本文は既にハック除去済みでトップページにリダイレクトされ確認不可。`SPAM_URL_RE` に追加し、該当項目は無関係記事として削除(収集時点で1件→0件)。
- **directive #35: cluster分裂4組を統合** — New Balance 1890A関連(`nb-u1890a-cdghomme`→`cdg-newbalance-1890a`、計4件)、Nike LD-1000 Spirit Pink関連(`nike-ld1000-spiritpink`→`nike-ld1000-blackcdg-spiritpink`、計4件。IU7936-001という同一品番で同一リリースと確認できたため追加統合)、dot COMME/Kerry Taylorオークション関連(ハイフン有無の表記ゆれ、`dotcomme-kerrytaylor-auction2026`→`dotcomme-kerrytaylor-auction-2026`、計9件)、CDG Homme Plus×Air Jordan 11関連(3方向分裂を`cdg-hommeplus-airjordan11`に統一、計35件)。
- **誤クラスタ+summary入れ替わりバグを修正** — `nb-u1890a-cdghomme`内の1件("Comme des Garçons BLACK Just Dropped Their Nike LD-1000 Colab")は本来1890Aと無関係なLD-1000記事だった上、`summary`の内容がNew Balance 1890A関連の別記事のものと入れ替わっていた(逆の1890A記事side のsummaryもLD-1000の内容になっていた)。両者のsummaryを正しい内容に入れ替え、それぞれ正しいclusterに付け替えた。

補足: 本日の新着収集は1件(jordanrussiacenter.orgのスパム、削除済み)。実質新着0件のため要約・importance付与・リリースカレンダー追加の対象なし。storeLaunchesは月曜のみ更新のため本日(水曜)は対象外。directiveラベルのopen Issueは#35を確認・対応し、Issueにコメント済み。他に未対応のdirectiveはなし。
