import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client } from '../../../lib/sanityClient';
import { articleBySlugQuery } from '../../../lib/queries';
import { renderPortableTextLite } from '../../../lib/portableTextLite';

export const revalidate = 60;

export default async function ArticlePage({ params }) {
  const article = await client.fetch(articleBySlugQuery, { slug: params.slug });

  if (!article) return notFound();

  const typeLabels = {
    spot: 'スポット',
    food: '食事',
    transport: '交通',
    hotel: 'ホテル',
    note: 'メモ'
  };

  return (
    <article>
      <Link href="/" style={{ color: '#666', textDecoration: 'underline', fontSize: 14 }}>
        ← 一覧に戻る
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 16 }}>{article.title}</h1>

      <div style={{ margin: '12px 0', fontSize: 14, color: '#888' }}>
        <span style={{ background: '#f0f0f0', padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>
          {typeLabels[article.type] || article.type}
        </span>
        <span>{article.prefecture}</span>
        {article.placeName && <span> • {article.placeName}</span>}
      </div>

      {article.publishedAt && (
        <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>
          {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
        </p>
      )}

      {article.coverImageUrl && (
        <img
          src={article.coverImageUrl}
          alt=""
          style={{ width: '100%', borderRadius: 6, margin: '16px 0' }}
        />
      )}

      <div
        style={{ marginTop: 20, fontSize: 16, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{
          __html: renderPortableTextLite(article.content)
        }}
      />

      {article.galleryImages && article.galleryImages.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>ギャラリー</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {article.galleryImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt=""
                style={{ width: '100%', borderRadius: 4, aspectRatio: '4/3', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>
      )}

      {article.tags && article.tags.length > 0 && (
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #eee' }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px 0', color: '#666' }}>タグ</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {article.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  background: '#f8f8f8',
                  padding: '4px 8px',
                  borderRadius: 12,
                  fontSize: 12,
                  color: '#666'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}