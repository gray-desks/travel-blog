// トップページ上部のヒーロー領域
// - タイトル/サブコピーを表示
// - 検索フォームなどの子要素（children）を内側に差し込むコンテナ
export default function Hero({ children }) {
  return (
    // 背景グラデーションや余白などは .hero クラス（グローバルCSS）で制御
    <section className="hero">
      {/* メイン見出し（キャッチコピー） */}
      <h1>日本全国の旅ログをお届け</h1>
      {/* サブコピー（説明文） */}
      <p className="hero-sub">楽しい発見、美味しい食べ物、文化体験を日本一周</p>
      {/* 子要素（検索フォームなど）をここに描画 */}
      {children}
    </section>
  )
}
