# 旅ブログ（Next.js + Sanity）

Next.js App Router と Sanity を用いた、読み取り専用の最小構成ブログです。記事は Sanity Studio で作成・更新し、フロントエンドは ISR により自動的に最新化されます。

## 技術スタック
- Next.js App Router（サーバーコンポーネントが既定）
- Sanity Studio（コンテンツ管理）
- GROQ（データ取得クエリ）
- Node.js 18 以上

## ディレクトリ構成（現状）
- `app/` — Next.js アプリ本体（ページ/レイアウト/スタイル/UI）
  - `app/components/` — 画面共通のプレゼンテーショナル/クライアントコンポーネント
  - `app/(public)/articles/[slug]/page.js` — 記事詳細ページ
  - `app/(public)/page.js` — 記事一覧・検索/フィルタ/ページング
  - `app/(public)/loading.js` — ローディングスケルトン
  - そのほか静的ページ（`/about`, `/contact`, `/privacy` 等）
- `lib/` — Sanity クライアント、GROQ クエリ、Portable Text の軽量レンダラ
- `studio/` — Sanity Studio（独立した `package.json` とスクリプト）
- `jsconfig.json` — パスエイリアス設定（`@lib/*`, `@components/*`）

補足: Studio の `.sanity/runtime` は開発サーバーが生成する一時ファイルで、手動編集は再起動で上書きされます。

## 実行コマンド
アプリ（プロジェクトルート）
- `npm run dev` — Next.js 開発サーバー起動
- `npm run build` — 本番ビルド
- `npm start` — 生成物を起動
  - サイトマップ: `/sitemap.xml` が自動生成されます

Studio（`cd studio`）
- `npm run dev` — Sanity Studio をローカル起動
- `npm run build` — Studio の静的ビルド
- `npm run deploy` — Studio を Sanity にデプロイ

## 設定と方針
- データセット: `production`（公開読み取りのみ）
- 認証: フロントエンドにシークレットは埋め込まない（読み取りのみ）
- Sanity クライアント: `lib/sanityClient.js` は `NEXT_PUBLIC_SANITY_PROJECT_ID` を使用（未設定時は開発向けフォールバックあり）
- パスエイリアス: `@lib/*`, `@components/*` を `jsconfig.json` で定義
- Next 設定: `next.config.js` で `images.domains` に `cdn.sanity.io` を許可
- 本番URL（任意）: `NEXT_PUBLIC_SITE_URL` を設定するとサイトマップの絶対URLを正しく生成できます（未設定時は `http://localhost:3000`）

## ページ構成（主要）
- `/` — 一覧/検索（`app/page.js`）
  - クエリ: `buildArticlesQuery({ q, type, prefecture, from, to })`
  - ISR: `revalidate = 60`
- `/articles/[slug]` — 記事詳細（`app/articles/[slug]/page.js`）
  - クエリ: `articleBySlugQuery`
  - Portable Text: `renderPortableTextLite` で安全な HTML に変換
  - ISR: `revalidate = 60`
- `/about`, `/contact`, `/privacy` — 静的ページ

## データ取得とレンダリング
- クライアント: `lib/sanityClient.js`（published のみ、CDN は本番で有効化）
- クエリ: `lib/queries.js`（`articleBySlugQuery`, `buildArticlesQuery`）
- 本文: `lib/portableTextLite.js` で対応ブロック（段落/h2/h3/h4/画像）とマーク（strong/em）のみを出力。テキストは HTML エスケープ済み

## コーディング規約（抜粋）
- 2 スペースインデント、シングルクオート推奨
- React はサーバーコンポーネントが既定。ブラウザ API を用いるもののみ `use client`
- ルーティングは `app/` のファイルベース（`page.js`、動的セグメントは `[slug]`）

## 手動動作確認（チェックリスト）
1. `npm run dev` を実行し、トップに記事一覧が表示される
2. 検索/絞り込み（`q`/`type`/`prefecture`）が期待通りに機能する
3. カードから記事詳細へ遷移し、タイトル/公開日/画像/本文が表示される
4. 存在しないスラッグで 404 ページが表示される
5. `/contact` でフォームから既定メーラーが起動する

## 開発メモ（現状に合わせた補足）
- コード内に日本語の解説コメントを追加済み（主要ファイル）
  - `app/not-found.js`, `app/components/*`, `lib/*`, `studio/*` など
- Studio の Desk 構成は `studio/deskStructure.js` で分類別のリストを提供
- Portable Text レンダラは最小限の機能に限定（セキュリティ重視）

既知のメモ
- `@components` エイリアスが利用可能です。`app/contact/page.js` のフォームインポートは `@components/ContactForm` の利用を推奨

## 今後の改善候補
- SEO ルートの追加（`app/robots.js`）
- E2E/ユニットテストの導入（Playwright/Jest）
- README の英語版とスクリーンショットの追加
