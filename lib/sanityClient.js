import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'c3twwalw', // ← 固定（envは使わない）
  dataset: 'production',                                // ← 固定文字列
  apiVersion: '2024-01-01',                             // ← 固定文字列
  useCdn: process.env.NODE_ENV === 'production',        // 開発: false / 本番: true
  perspective: 'published'                              // draft除外
});
