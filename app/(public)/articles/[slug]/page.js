// 記事詳細ページ（/articles/[slug]）を描画するサーバーコンポーネント
// - 動的ルートの [slug] に対応
// - Sanity から記事データを取得して表示
// route-group: (public)
import { notFound } from 'next/navigation'
import { client } from '@lib/sanityClient'
import { articleBySlugQuery } from '@lib/queries'
import { renderPortableTextLite } from '@lib/portableTextLite'

// ISR 設定: 60秒ごとに再検証して静的ページを自動更新
export const revalidate = 60

export default async function ArticlePage({ params }) {
  // 動的セグメントから記事スラッグを取得
  const { slug } = params

  // スラッグをもとに Sanity から記事を取得（存在しない場合は null）
  const article = await client.fetch(articleBySlugQuery, { slug })

  // 該当記事が無ければ 404 ページへ遷移
  if (!article) return notFound()

  return (
    <article className="narrow">
      {/* タイトル */}
      <h1 className="article-title">{article.title}</h1>

      {/* 公開日（存在する場合のみ表示）*/}
      {article.publishedAt && (
        <p className="article-sub">
          {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
        </p>
      )}

      {/* メイン画像（存在する場合のみ表示）*/}
      {article.mainImage?.asset?.url && (
        <img
          src={article.mainImage.asset.url}
          alt={article.title || ''}
          className="article-cover"
        />
      )}

      {/* 本文（Portable Text を最小レンダラーで HTML に変換して描画）
          注: dangerouslySetInnerHTML は XSS リスクがあるため、
          renderPortableTextLite 側で安全な要素のみを生成する設計にしています。 */}
      <div
        className="prose"
        style={{ fontSize: 16 }}
        dangerouslySetInnerHTML={{ __html: renderPortableTextLite(article.body) }}
      />
    </article>
  )
}

export async function generateMetadata({ params }) {
  // メタデータ生成用に記事タイトルを取得
  const { slug } = params
  const article = await client.fetch(articleBySlugQuery, { slug })

  // 記事が無い場合はデフォルトタイトルを返す
  return {
    title: article?.title ? `${article.title}` : '記事',
  }
}
