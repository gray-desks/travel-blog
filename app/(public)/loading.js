// 公開ルート共通のローディングUI（一覧/静的ページ遷移時のスケルトン）
export default function Loading() {
  const cards = Array.from({ length: 12 })
  return (
    <main className="content-wide">
      {/* Hero スケルトン */}
      <section className="hero" aria-hidden>
        <div className="skeleton title" style={{ width: 280, height: 28, borderRadius: 8 }} />
        <div className="skeleton" style={{ width: 360, height: 18, marginTop: 8, borderRadius: 8 }} />
        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          <div className="skeleton" style={{ width: '100%', height: 40, borderRadius: 999 }} />
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr auto', alignItems: 'center' }}>
            <div className="skeleton" style={{ height: 40, borderRadius: 999 }} />
            <div className="skeleton" style={{ height: 40, borderRadius: 999 }} />
            <div className="skeleton" style={{ width: 120, height: 40, borderRadius: 999 }} />
          </div>
        </div>
      </section>

      {/* カードグリッドのスケルトン */}
      <section className="grid" aria-hidden>
        {cards.map((_, i) => (
          <article key={i} className="card">
            <div className="card-media">
              <div className="skeleton" style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: 12 }} />
            </div>
            <div className="card-body">
              <div className="skeleton" style={{ width: '80%', height: 18, borderRadius: 6 }} />
              <div className="skeleton" style={{ width: '40%', height: 12, borderRadius: 6, marginTop: 10 }} />
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
