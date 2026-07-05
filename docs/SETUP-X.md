# X(旧Twitter)連携セットアップ手順

SNS運用エージェントが自動投稿するために、snow 本人が一度だけ行う準備。
これが終わるまではエージェントは「下書きモード」で `data/post-draft.md` を作り、
snow が手動でコピペ投稿する運用になる。

## 1. 発信用のXアカウントを作る

- CDG Watch 専用のアカウントを新規作成(例: @cdg_watch のような名前)。
- 個人アカウントとは分けることを推奨(運用と私生活の分離)。
- プロフィールに「非公式のファン情報アカウント」と明記(公式誤認の防止)。

## 2. X Developer でアプリを作り、キーを取得

1. https://developer.x.com/ にログイン(上記アカウントで)。
2. Free プランで Project + App を作成。
3. App の「Keys and tokens」から以下を取得:
   - **API Key** / **API Key Secret**(= Consumer Keys)
   - **Access Token** / **Access Token Secret**(User でログインした状態で発行)
4. App の権限を **Read and Write** にする(投稿するため。Read only だと投稿不可)。

> 注意: X の Free プランは「投稿」は可能だが「読み取り」はほぼ不可。
> CDG Watch は投稿しかしないので Free で足りる。将来分析が必要になったら再検討。

## 3. キーを安全に渡す(チャットに貼らない)

キーはパスワード同然。**この会話や公開リポジトリに絶対貼らない。**
セッション中の Claude に「Xのキーを設定したい」と伝えれば、以下のいずれかで
安全に登録する:

- ルーティン(クラウドエージェント)の環境変数/シークレットとして登録(推奨)
- あるいはローカルの環境変数として保持し、手動投稿の補助に使う

登録する環境変数名(scripts/post-x.js が参照):

```
X_API_KEY            = <API Key>
X_API_SECRET         = <API Key Secret>
X_ACCESS_TOKEN       = <Access Token>
X_ACCESS_SECRET      = <Access Token Secret>
```

## 4. 切り替え

キーが登録されると、SNSエージェントは下書きモードから**自動投稿モード**に切り替わる
(scripts/post-x.js が実投稿を行う)。まずは1日1本から始め、様子を見て調整する。

---

未実装メモ: `scripts/post-x.js`(X API v2 への投稿、OAuth1.0a 署名をゼロ依存で実装)は
キー準備後に実装する。それまでは下書き運用。
