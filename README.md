# Next-Auth-Cloudflare-Starter

Bun ランタイムを使用し、Cloudflare Workers と Cloudflare D1 データベースへのデプロイを前提とした Next.js のスターターテンプレートです。
LP（公開ページ）と認証付きアプリページを分離し、ユーザー情報を Cloudflare D1 に永続化します。

## ✨ 特徴

- **Bun ランタイム**: 高速なインストール、実行、バンドルを実現。
- **データベース連携**: Cloudflare D1 にユーザー情報を保存。
- **Next.js App Router**: 最新の App Router を採用。
- **LP & アプリページの分離**: Route Groups (`(public)`と`(auth)`)を使用して、公開ページと認証必須ページを明確に分離。
- **認証機能**: Auth.js (NextAuth.js v5)と`@auth/drizzle-adapter`を使用。
- **Cloudflare への最適化**: Workers と D1 の連携を前提とした設定。
- **スタイリング**: Tailwind CSS を導入済み。
- **静的解析**: TypeScript と ESLint を標準装備。

## 💻 技術スタック

- [Bun](https://bun.sh/)
- [Next.js](https://nextjs.org/) (App Router)
- [Auth.js (NextAuth.js)](https://authjs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)

---

## 🚀 ローカル開発環境のセットアップ

### 1. 前提条件

- [Bun](https://bun.sh/docs/installation) がインストールされていること。
- [Cloudflare](https://dash.cloudflare.com/sign-up) アカウント。
- [GitHub](https://github.com/) アカウント。
- [Google Cloud](https://console.cloud.google.com/) アカウント。

### 2. プロジェクトの準備

リポジトリをクローンし、依存関係をインストールします。

```bash
git clone https://github.com/engineer-ba-sulto/next-auth-cloudflare-starter.git
cd next-auth-cloudflare-starter
bun install
```

### 3. Cloudflare D1 データベースの作成

D1 データベースを作成します。
ターミナルで以下のコマンドを実行してください。

```bash
# 例: my-app-db-dev
npx wrangler d1 create <your-db-name>
```

### 4. データベーススキーマの適用

作成した D1 データベースに、Auth.js が必要とするテーブルを作成します。

```bash
npx wrangler d1 migrations apply <your-db-name> --local
```

### 5. 環境変数の設定

まず、`.env.local.example`ファイルをコピーして`.env.local`を作成します。

```bash
cp .env.local.example .env.local
```

次に、`.env.local`ファイルを編集して、あなたのキーを設定してください。

- **`AUTH_SECRET`**:以下のコマンドで生成した値を設定します。

  ```bash
  openssl rand -base64 32
  ```

- **`AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`**: [GitHub OAuth App](https://github.com/settings/developers)を作成して取得した値を設定します。
  - **Authorization callback URL**: `http://localhost:8788/api/auth/callback/github`
- **`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`**: [OAuth 2.0 クライアント ID](https://console.cloud.google.com/apis/credentials) を作成して取得した値を設定します。
  - **承認済みのリダイレクト URI**: `http://localhost:8788/api/auth/callback/google`

### 6. 開発サーバーの起動

以下のコマンドで開発サーバーを起動します。

```bash
bun run dev
```

ブラウザで`http://localhost:3000`を開いてください。

---

## ☁️ 本番環境へのデプロイ

### 1. 本番用 D1 データベースの準備

本番環境に D1 データベースを設定し、スキーマを適用します。

```bash
# 本番環境DBにスキーマを適用
npx wrangler d1 migrations apply <your-db-name> --remote
```

### 2. `wrangler.jsonc` の設定

`wrangler.jsonc`を開き、あなたの本番環境に DB の情報を設定します。

```jsonc:wrangler.jsonc
"d1_databases": [
	{
		"binding": "DB",
		"database_name": "<your-db-name>",
		"database_id": "<your-db-id>",
		"migrations_dir": "./drizzle/migrations"
	}
]
```

### 3. 本番環境のシークレット設定

`.env.local`の内容を Cloudflare のシークレットとして登録します。

```bash
bunx wrangler secret put AUTH_SECRET
bunx wrangler secret put AUTH_GITHUB_ID
bunx wrangler secret put AUTH_GITHUB_SECRET
bunx wrangler secret put AUTH_GOOGLE_ID
bunx wrangler secret put AUTH_GOOGLE_SECRET
```

### 4. デプロイの実行

以下のコマンドで Cloudflare Workers にデプロイします。

```bash
bun run deploy
```

### 5. デプロイ後の最終設定

1.  **`AUTH_URL`シークレットの設定**: デプロイ完了後に表示された本番 URL (`https://...workers.dev`) をコピーし、シークレットとして登録します。

	```bash
	openssl rand -base64 32
	```

2.  **GitHub コールバック URL の更新**: GitHub の OAuth App 設定に戻り、**Authorization callback URL** を本番 URL に更新します。

  - `https://your-worker-name.your-subdomain.workers.dev/api/auth/callback/github`

3.  **Google コールバック URL の更新**: Google の OAuth App 設定に戻り、**承認済みのリダイレクト URI** を本番 URL に更新します。
  - `https://your-worker-name.your-subdomain.workers.dev/api/auth/callback/google`

これで全てのセットアップが完了です！

---

## 📁 ディレクトリ構造

```
app/
├── (public)/              # 誰でもアクセスできる公開ページ
├── (auth)/                # 認証が必須のページ
├── api/                   # APIルート (認証用など)
├── components/            # 共通UIコンポーネント
lib/
├── auth.ts                # Auth.jsの設定
└── ...
middleware.ts              # 認証チェックを行うミドルウェア
schema.sql                 # D1データベースのスキーマ
```

## 🤝 コントリビュート

改善の提案やバグ報告は、Issue や Pull Request でお気軽にお寄せください。

## 📝 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。
