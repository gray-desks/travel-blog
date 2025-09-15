# MVP Blog (Next.js + Sanity)

## 必要条件
- Node.js 18+
- Sanity プロジェクト（dataset: `production`、公開読み取り/CORS設定済）

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

3. 開発起動
   ```bash
   npm run dev
   # http://localhost:3000
   ```

## デプロイ
* Vercel の Environment Variables に以下を設定
  * `NEXT_PUBLIC_SANITY_PROJECT_ID`（値: あなたのprojectId）
* そのほか設定は不要（datasetはコード内で `production` 固定）

## メモ
* 記事は Sanity 管理。リポジトリ内に記事ファイルは持たない。
* Portable Text は `lib/portableTextLite.js` の簡易描画で当座対応（段階導入で `@portabletext/react` に差し替え可能）。
* ISR は `revalidate=60`。