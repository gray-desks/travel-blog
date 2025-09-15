// 記事詳細ページのローディングUI（スケルトン）
export default function ArticleLoading() {
  return (
    <article className="narrow" aria-hidden>
      <div className="skeleton" style={{ width: '70%', height: 30, borderRadius: 8 }} />
      <div className="skeleton" style={{ width: 120, height: 14, borderRadius: 6, marginTop: 8 }} />
      <div className="skeleton" style={{ width: '100%', height: 220, borderRadius: 12, margin: '16px 0' }} />
      <div className="prose" style={{ fontSize: 16 }}>
        <p className="skeleton-line" />
        <p className="skeleton-line" />
        <p className="skeleton-line short" />
        <div className="skeleton" style={{ width: '100%', height: 160, borderRadius: 12, margin: '12px 0' }} />
        <p className="skeleton-line" />
        <p className="skeleton-line short" />
      </div>
    </article>
  )
}

