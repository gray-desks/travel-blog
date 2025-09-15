import Link from 'next/link';
import { client } from '../lib/sanityClient';
import { japaneseArticlesQuery } from '../lib/queries';

export const revalidate = 60; // ISR 60秒

export default async function Page() {
  const articles = await client.fetch(japaneseArticlesQuery);

  return (
    <main>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>旅ブログ</h1>
      <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
        {articles.map((article) => (
          <li key={article._id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <Link href={`/articles/${article.slug}`} style={{ fontSize: 18, fontWeight: 600, textDecoration: 'underline' }}>
              {article.title}
            </Link>
            <div style={{ margin: '6px 0 0', fontSize: 12, color: '#888' }}>
              {article.type} • {article.prefecture}
              {article.placeName && ` • ${article.placeName}`}
            </div>
            {article.excerpt && (
              <p style={{ margin: '6px 0 0', color: '#666', fontSize: 14 }}>{article.excerpt}</p>
            )}
            {article.coverImageUrl && (
              <img
                src={article.coverImageUrl}
                alt=""
                style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: 4, marginTop: 8 }}
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}