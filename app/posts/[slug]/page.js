import { notFound } from 'next/navigation';
import { client } from '../../../lib/sanityClient';
import { renderPortableTextLite } from '../../../lib/portableTextLite';

export const revalidate = 60;

export default async function PostPage({ params }) {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      body,
      "imageUrl": coalesce(mainImage.asset->url, "")
    }
    `,
    { slug: params.slug }
  );

  if (!post) return notFound();

  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>{post.title}</h1>
      {post.publishedAt && (
        <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>
          {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
        </p>
      )}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          style={{ width: '100%', borderRadius: 6, margin: '16px 0' }}
        />
      )}
      <div
        style={{ marginTop: 12, fontSize: 16 }}
        dangerouslySetInnerHTML={{
          __html: renderPortableTextLite(post.body)
        }}
      />
    </article>
  );
}