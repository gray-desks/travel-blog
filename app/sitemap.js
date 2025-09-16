// App Router 用サイトマップ生成
// 参考: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import { client } from '@lib/sanityClient'
import { allArticleSlugsForSitemap } from '@lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap() {
  let articles = []
  try {
    articles = await client.fetch(allArticleSlugsForSitemap)
  } catch (e) {
    console.error('[sitemap] fetch failed', e?.message)
  }

  const latest = articles?.[0]?.lastmod || new Date().toISOString()

  const staticPages = [
    { path: '/', lastModified: latest },
    { path: '/about', lastModified: latest },
    { path: '/contact', lastModified: latest },
    { path: '/privacy', lastModified: latest },
  ]

  const staticEntries = staticPages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: p.lastModified,
  }))

  const articleEntries = (Array.isArray(articles) ? articles : []).map((a) => ({
    url: `${BASE_URL}/articles/${encodeURIComponent(a.slug)}`,
    lastModified: a.lastmod || latest,
  }))

  return [...staticEntries, ...articleEntries]
}

