import Link from 'next/link'
import { client } from '../lib/sanityClient'
import { articlesQuery } from '../lib/queries'

export const revalidate = 60

export default async function Page() {
  const articles = await client.fetch(articlesQuery)

  return (
    <main>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>旅ブログ</h1>
      <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
        {articles.map(a => (
          <li key={a._id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <Link href={`/articles/${encodeURIComponent(a.slug)}`} style={{ fontSize: 18, fontWeight: 600, textDecoration: 'underline' }}>
              {a.title}
            </Link>
            {a.excerpt && <p style={{ margin: '6px 0 0', color: '#666', fontSize: 14 }}>{a.excerpt}</p>}
          </li>
        ))}
        {articles.length === 0 && <li>まだ記事がありません。</li>}
      </ul>
    </main>
  )
}