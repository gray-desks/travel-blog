import { notFound } from 'next/navigation'
import { client } from '../../../lib/sanityClient'
import { articleBySlugQuery } from '../../../lib/queries'
import { renderPortableTextLite } from '../../../lib/portableTextLite'

export const revalidate = 60

export default async function ArticlePage({ params }) {
  const article = await client.fetch(articleBySlugQuery, { slug: params.slug })
  if (!article) return notFound()

  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>{article.title}</h1>
      {article.publishedAt && (
        <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>
          {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
        </p>
      )}
      {article.mainImage?.asset?.url && (
        <img
          src={article.mainImage.asset.url}
          alt=""
          style={{ width: '100%', borderRadius: 6, margin: '16px 0' }}
        />
      )}
      <div
        style={{ marginTop: 12, fontSize: 16 }}
        dangerouslySetInnerHTML={{ __html: renderPortableTextLite(article.body) }}
      />
    </article>
  )
}