import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // ← 環境変数はこれ1つのみ
  dataset: 'production',                                // ← 固定文字列
  apiVersion: '2024-01-01',                             // ← 固定文字列
  useCdn: true,                                         // 公開読み取り
  perspective: 'published'                              // draft除外
});