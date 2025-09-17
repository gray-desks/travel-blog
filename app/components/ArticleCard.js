'use client'

// Next.js のクライアント遷移用コンポーネント
// 記事詳細ページへのリンク生成に使用します
import Link from 'next/link'
import ImageWithSpinner from '@components/ImageWithSpinner'

// 英語の分類値を日本語ラベルに変換
const TYPE_LABELS = {
  spot: '観光スポット',
  food: 'グルメ',
  transport: '交通',
  hotel: '宿泊',
  column: 'コラム',
}

// 記事カードを描画するプレゼンテーショナルコンポーネント
// props: article（記事データ: slug, title, mainImage, type, prefecture, publishedAt 等）
export default function ArticleCard({ article }) {
  // slug が無い場合は遷移先が生成できないため描画を行わない
  if (!article?.slug) return null
  // 詳細ページへのリンク URL を生成（slug は URL エンコード）
  const href = `/articles/${encodeURIComponent(article.slug)}`
  // メイン画像の URL を取得。未設定時は空文字でフェールセーフ
  const img = article?.mainImage?.asset?.url || ''
  const thumbs = Array.isArray(article?.galleryPreview)
    ? article.galleryPreview.map(i => i?.asset?.url).filter(Boolean)
    : []
  const total = typeof article?.galleryCount === 'number' ? article.galleryCount : thumbs.length
  const moreCount = Math.max(0, total - thumbs.length)

  return (
    <article className="card">
      {/* 画像・ラベルを含むメディア領域 */}
      <div className="card-media">
        {/* アクセシビリティのためリンクに aria-label を付与 */}
        <Link prefetch href={href} aria-label={article.title || '記事を見る'}>
          {img ? (
            // 画像がある場合は Next.js の最適化 Image を使用
            <div className="card-img" style={{ position:'relative', overflow:'hidden' }}>
              <ImageWithSpinner
                src={img}
                alt={article.title || ''}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectFit: 'cover' }}
                priority={false}
              />
            </div>
          ) : (
            // 画像が無い場合はプレースホルダー要素を表示（装飾のみのため aria-hidden）
            <div className="card-img" aria-hidden="true" />
          )}
        </Link>
        {/* 記事分類のラベル（CSSクラスは英語値を使用し、表示は日本語に変換） */}
        {article.type && (
          <span className={`card-label card-label--${article.type}`}>
            {TYPE_LABELS[article.type] || article.type}
          </span>
        )}
      </div>
      {/* テキスト本文領域 */}
      <div className="card-body">
        {/* 記事タイトル：詳細ページへのリンク。見た目を周囲と統一 */}
        <h2 className="card-title">
          <Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
            {article.title}
          </Link>
        </h2>
        {/* ギャラリーがある場合は先頭数枚をサムネイルで表示し、枚数が多ければ +n を表示 */}
        {(total > 0) && (
          <div className="card-gallery" aria-label="ギャラリー">
            {thumbs.map((url, idx) => (
              <Link key={idx} href={href} aria-label={`ギャラリー画像 ${idx + 1}`}> 
                <ImageWithSpinner src={url} alt="" width={36} height={36} className="thumb-img" />
              </Link>
            ))}
            {moreCount > 0 && (
              <Link href={href} className="thumb-more" aria-label={`他 ${moreCount} 枚`}>
                +{moreCount}
              </Link>
            )}
          </div>
        )}
        {/* メタ情報（都道府県・公開日）。存在する項目のみ出力 */}
        <div className="meta">
          {article.prefecture && <span aria-label="都道府県">📍 {article.prefecture}</span>}
          {article.publishedAt && (
            // 時間情報は <time> 要素でマークアップし、ja-JP ロケールで日付表示
            <time dateTime={article.publishedAt} className="muted" aria-label="公開日">
              🗓 {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </time>
          )}
        </div>
      </div>
    </article>
  )}
