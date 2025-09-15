export default function Hero({ children }) {
  return (
    <section className="hero">
      <h1>日本全国の旅ログをお届け</h1>
      <p className="hero-sub">楽しい発見、美味しい食べ物、文化体験を日本一周</p>
      {children}
    </section>
  )
}
