import Link from 'next/link';
import { client } from '../lib/sanityClient';

export const revalidate = 60; // ISR 60秒

export default async function Page() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...20]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt
    }
  `);

  return (
    <main>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>ブログ</h1>
      <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
        {posts.map((p) => (
          <li key={p._id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <Link href={`/posts/${p.slug}`} style={{ fontSize: 18, fontWeight: 600, textDecoration: 'underline' }}>
              {p.title}
            </Link>
            {p.excerpt && (
              <p style={{ margin: '6px 0 0', color: '#666', fontSize: 14 }}>{p.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}