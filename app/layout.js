import './styles.css'

export const metadata = {
  title: 'ブログ',
  description: 'Sanity読み取り専用・最小MVPブログ'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', lineHeight: 1.6 }}>
        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="brand">
              <span className="brand-logo" aria-hidden="true">旅</span>
              <span className="brand-name">旅ログ</span>
            </a>
          </div>
        </header>
        <main className="container" style={{ padding: '24px' }}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="footer-hero">
            <div className="container footer-inner">
              <div className="footer-brand">
                <span className="brand-logo" aria-hidden="true">旅</span>
                <div>
                  <div className="brand-name">旅ログ</div>
                  <div className="footer-tagline">日本の旅の記録をゆるく発信</div>
                </div>
              </div>
              <div className="footer-stats">
                <div className="stat-card"><div className="stat-num">20+</div><div className="stat-label">都道府県</div></div>
                <div className="stat-card"><div className="stat-num">x</div><div className="stat-label">観光</div></div>
                <div className="stat-card"><div className="stat-num">x</div><div className="stat-label">グルメ</div></div>
              </div>
            </div>
          </div>
          <div className="container footer-bottom">
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:8 }}>
              <a href="/privacy" style={{ color:'#cbd5e1', textDecoration:'underline' }}>プライバシーポリシー</a>
            </div>
            © {new Date().getFullYear()} 旅ログ
          </div>
        </footer>
      </body>
    </html>
  );
}
