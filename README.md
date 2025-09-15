# MVP Travel Blog (Next.js + Sanity)

## 概要
既存 Sanity プロジェクト（HIDE-Kanazawa/my-sanity-site）の `article` スキーマに対応した旅ブログのMVP実装。

## 必要条件
- Node.js 18+
- Sanity プロジェクト（dataset: `production`、公開読み取り/CORS設定済）

## スキーマ対応
- **Document Type**: `article` (not `post`)
- **主要フィールド**: title, slug, type, prefecture, placeName, publishedAt, coverImage, content, gallery, tags
- **コンテンツタイプ**: スポット、食事、交通、ホテル、メモ
- **Portable Text**: 見出し、画像、アフィリエイトブロック対応

## セットアップ
1. 依存をインストール
   ```bash
   npm install
   ```

2. 環境変数を設定（ローカル）
   ```bash
   # .env.local を作成
   echo "NEXT_PUBLIC_SANITY_PROJECT_ID=あなたのprojectId" > .env.local
   ```

3. Sanity接続テスト（推奨）
   ```bash
   node scripts/sanity-smoke-test.js
   ```

4. 開発起動
   ```bash
   npm run dev
   # http://localhost:3000
   ```

## ページ構成
- `/` - 日本語記事一覧（最新20件）
- `/articles/[slug]` - 記事詳細
- 記事詳細には位置情報、ギャラリー、タグ表示

## デプロイ
* Vercel の Environment Variables に以下を設定
  * `NEXT_PUBLIC_SANITY_PROJECT_ID`（値: あなたのprojectId）
* そのほか設定は不要（datasetはコード内で `production` 固定）

## 技術仕様
* **環境変数**: 1個のみ（`NEXT_PUBLIC_SANITY_PROJECT_ID`）
* **Dataset**: `production` 固定
* **認証**: 不要（公開読み取り）
* **ISR**: 60秒キャッシュ
* **依存関係**: 最小限（Next.js, React, @sanity/client のみ）

## ファイル構成
```
├── app/
│   ├── layout.js (ルートレイアウト)
│   ├── page.js (記事一覧)
│   ├── articles/[slug]/page.js (記事詳細)
│   └── not-found.js (404ページ)
├── lib/
│   ├── sanityClient.js (Sanity v3 クライアント)
│   ├── queries.js (GROQ クエリ定義)
│   ├── portableTextLite.js (軽量レンダラー)
│   └── schema-spec.json (スキーマ仕様)
├── scripts/
│   └── sanity-smoke-test.js (接続テスト)
├── SANITY_SCHEMA_SUMMARY.md (スキーマ文書)
└── README.md
```

## スキーマ詳細
詳細は `SANITY_SCHEMA_SUMMARY.md` を参照。

## 注意点
* Studio は別リポジトリで管理（このリポジトリには含まない）
* 読み取り専用フロントエンド（記事作成・編集機能なし）
* 多言語対応スキーマだが、MVPでは日本語記事のみ表示