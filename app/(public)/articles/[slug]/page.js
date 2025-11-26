// 記事詳細ページ（/articles/[slug]）を描画するサーバーコンポーネント
// - 動的ルートの [slug] に対応
// - Sanity から記事データを取得して表示
// route-group: (public)
import { notFound } from 'next/navigation'
import { getArticleBySlugCached } from '@lib/queries'
import { renderPortableTextLite } from '@lib/portableTextLite'
import Gallery from '@components/Gallery'
import ArticleCover from '@components/ArticleCover'
import styles from './page.module.css'

// ISR 設定: 60秒ごとに再検証して静的ページを自動更新
export const revalidate = 60

export default async function ArticlePage({ params }) {
  // 動的セグメントから記事スラッグを取得
  const { slug } = params

  // スラッグをもとに Sanity から記事を取得（存在しない場合は null）
  const article = await getArticleBySlugCached(slug)

  // 該当記事が無ければ 404 ページへ遷移
  if (!article) return notFound()

  const TYPE_LABELS = {
    spot: '観光スポット',
    food: 'グルメ',
    transport: '交通',
    hotel: '宿泊',
    column: 'コラム',
  }

  const gallery = Array.isArray(article.gallery)
    ? article.gallery.map((g) => g?.asset?.url).filter(Boolean)
    : []
  const coverUrl = article.mainImage?.asset?.url || ''
  const allImages = [coverUrl, ...gallery.filter((u) => u !== coverUrl)].filter(Boolean)

  return (
    <article className={styles.container}>
      <div className={styles.card}>
        {/* カバー画像（カード最上部） */}
        <ArticleCover cover={coverUrl} title={article.title || ''} images={allImages} />

        {/* タイトル */}
        <h1 className={styles.title}>{article.title}</h1>

        {/* メタ情報（チップ型） */}
        <div className={styles.chips}>
          {article.type && (
            <span className={`${styles.chip} ${styles.chipType}`}>{TYPE_LABELS[article.type] || article.type}</span>
          )}
          {article.prefecture && <span className={styles.chip}>{article.prefecture}</span>}
          {article.placeName && <span className={styles.chip}>{article.placeName}</span>}
          {article.publishedAt && (
            <time className={`${styles.chip} ${styles.chipMuted}`} dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </time>
          )}
        </div>

        {/* 本文（Portable Text を最小レンダラーで HTML に変換して描画）*/}
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: renderPortableTextLite(article.body) }}
        />

        {/* ギャラリー（画像があれば） */}
        {gallery.length > 0 && (
          <section className={styles.gallerySection}>
            <Gallery images={gallery} />
          </section>
        )}

        {/* 一覧へ戻る */}
        <div className={styles.backLinkWrap}>
          <a href="/" className={styles.backLink}>← 記事一覧に戻る</a>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }) {
  // メタデータ生成用に記事タイトルを取得
  const { slug } = params
  const article = await getArticleBySlugCached(slug)

  // 記事が無い場合はデフォルトタイトルを返す
  return {
    title: article?.title ? `${article.title}` : '記事',
  }
}
