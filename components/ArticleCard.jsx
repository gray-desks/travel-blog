import Link from 'next/link'
import Badge from './Badge'

export default function ArticleCard({ article }) {
  if (!article?.slug) return null
  const href = `/articles/${encodeURIComponent(article.slug)}`
  const img = article?.mainImage?.asset?.url || ''

  return (
    <article className="card">
      <div className="card-media">
        <Link href={href} aria-label={article.title || '記事を見る'}>
          {img ? (
            <img className="card-img" src={img} alt={article.title || ''} />
          ) : (
            <div className="card-img" aria-hidden="true" />
          )}
        </Link>
        {article.type && (
          <span className={`card-label card-label--${article.type}`}>{article.type}</span>
        )}
      </div>
      <div className="card-body">
        <h2 className="card-title">
          <Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
            {article.title}
          </Link>
        </h2>
        <div className="meta">
          {article.prefecture && <span>{article.prefecture}</span>}
          {article.publishedAt && (
            <time dateTime={article.publishedAt} className="muted">
              {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </time>
          )}
        </div>
      </div>
    </article>
  )}
