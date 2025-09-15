import { notFound } from 'next/navigation'
import { client } from '../../../lib/sanityClient'
import { articleBySlugQuery } from '../../../lib/queries'
import { renderPortableTextLite } from '../../../lib/portableTextLite'

export const revalidate = 60

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })
  if (!article) return notFound()

  return (
    <article className="narrow">
      <h1 className="article-title">{article.title}</h1>
      {article.publishedAt && (
        <p className="article-sub">
          {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
        </p>
      )}
      {article.mainImage?.asset?.url && (
        <img
          src={article.mainImage.asset.url}
          alt={article.title || ''}
          className="article-cover"
        />
      )}
      <div className="prose" style={{ fontSize: 16 }}
        dangerouslySetInnerHTML={{ __html: renderPortableTextLite(article.body) }}
      />
    </article>
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })
  return {
    title: article?.title ? `${article.title}` : '記事',
  }
}
