# NextAuth Cloudflare Starter

Bun ランタイムを使用し、Cloudflare Workers と Cloudflare D1 データベースへのデプロイを前提とした Next.js のスターターテンプレートです。  
LP（公開ページ）と認証付きアプリページを分離し、ユーザー情報を Cloudflare D1 に永続化します。

## ✨ 特徴

- **Bun ランタイム**: 高速なインストール、実行、バンドルを実現。
- **データベース連携**: Cloudflare D1 にユーザー情報を保存。
- **Next.js App Router**: 最新の App Router を採用。
- **LP & アプリページの分離**: Route Groups (`(public)`と`(auth)`)を使用して、公開ページと認証必須ページを明確に分離。
- **認証機能**: Auth.js (NextAuth.js v5)と`@auth/drizzle-adapter`を使用。
- **Cloudflare への最適化**: Workers と D1 の連携を前提とした設定。
- **スタイリング**: Tailwind CSS と shadcn/ui を導入済み。
- **UI コンポーネント**: shadcn/ui で構築された再利用可能なコンポーネント群。
- **静的解析**: TypeScript と ESLint を標準装備。

## 💻 技術スタック

- [Bun](https://bun.sh/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Auth.js (NextAuth.js)](https://authjs.dev/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Cloudflare Workers](https://workers.cloudflare.com/)

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

### 4. `wrangler.jsonc` の設定

D1 データベースを作成すると、設定情報が表示されます。  
表示された設定情報から`"database_name": "<your-db-name>"`と`"database_id": "<your-db-id>"`をコピーします。  
`wrangler.jsonc`を開き、DB のコピーした情報を貼り付けます。

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

### 5. データベーススキーマの適用

作成した D1 データベースに、Auth.js が必要とするテーブルを作成します。

```bash
npx wrangler d1 migrations apply <your-db-name> --local
```

### 6. ローカル環境の環境変数の設定

まず、`.env.local.example`ファイルをコピーして`.env.local`を作成します。

```bash
cp .env.local.example .env.local
```

次に、`.env.local`ファイルを編集して、あなたのキーを設定してください。

- **`AUTH_SECRET`**:以下のコマンドで生成した値を設定します。

  ```bash
  npx auth secret
  ```

- **`AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`**: [GitHub OAuth App](https://github.com/settings/developers)を作成して取得した値を設定します。
  - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
- **`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`**: [OAuth 2.0 クライアント ID](https://console.cloud.google.com/apis/credentials) を作成して取得した値を設定します。
  - **承認済みのリダイレクト URI**: `http://localhost:3000/api/auth/callback/google`

### 7. 開発サーバーの起動

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

### 2. 本番環境の環境変数の設定

1.  **`AUTH_URL`シークレットの設定**: デプロイ完了後に表示された本番 URL (`https://...workers.dev`) をコピーし、シークレットとして登録します。

    ```bash
    npx auth secret
    ```

2.  **GitHub コールバック URL の更新**: GitHub の OAuth App 設定に戻り、**Authorization callback URL** を本番 URL に更新します。

- `https://your-worker-name.your-subdomain.workers.dev/api/auth/callback/github`

3.  **Google コールバック URL の更新**: Google の OAuth App 設定に戻り、**承認済みのリダイレクト URI** を本番 URL に更新します。

- `https://your-worker-name.your-subdomain.workers.dev/api/auth/callback/google`

### 3. 本番環境のシークレット設定

`.env.local`の内容を Cloudflare のシークレットとして登録します。

```bash
npx wrangler secret put AUTH_SECRET
npx wrangler secret put AUTH_GITHUB_ID
npx wrangler secret put AUTH_GITHUB_SECRET
npx wrangler secret put AUTH_GOOGLE_ID
npx wrangler secret put AUTH_GOOGLE_SECRET
```

### 4. デプロイの実行

以下のコマンドで Cloudflare Workers にデプロイします。

```bash
bun run deploy
```

これで全てのセットアップが完了です！

---

## 📁 ディレクトリ構造

```
app/
├── _components/           # 共通UIコンポーネント
├── (auth)/                # 認証が必須のページ
├── (public)/              # 誰でもアクセスできる公開ページ
├── api/                   # APIルート (認証用など)
lib/
└── auth.ts                # Auth.jsの設定
drizzle/
└── schema/adapter.ts      # Drizzle ORMのスキーマ定義
```

## 🤝 コントリビュート

改善の提案やバグ報告は、Issue や Pull Request でお気軽にお寄せください。

## 📝 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。
