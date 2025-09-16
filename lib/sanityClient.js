// Sanity の読み取り専用クライアントを作成
// 注意: このアプリは公開読み取りのみ。トークンは埋め込まない
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c3twwalw'
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  // 環境変数が未設定の場合でも開発を継続できるよう暫定フォールバック
  // 本番では .env.local に NEXT_PUBLIC_SANITY_PROJECT_ID を設定してください
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[sanityClient] NEXT_PUBLIC_SANITY_PROJECT_ID is not set; falling back to default projectId')
  }
}

export const client = createClient({
  // プロジェクトID（env 優先。未設定時は既定にフォールバック）
  projectId,
  // データセットは本番の 'production' を固定で使用
  dataset: 'production',
  // API バージョンを固定してスキーマ変更の影響を回避
  apiVersion: '2024-01-01',
  // 量が多い GET を高速化するため、本番のみ CDN を使用
  useCdn: process.env.NODE_ENV === 'production',
  // 公開済み（published）のみを取得して draft を除外
  perspective: 'published'
});

// 使い方例：
// const data = await client.fetch(groq, params)
// - groq: lib/queries.js で定義したクエリ文字列
// - params: クエリパラメータ（例: { slug: 'my-article' }）
