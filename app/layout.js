// ルートレイアウト: 全ページ共通のHTML骨組みとグローバルスタイルを提供
// - App Router の layout.js は子ページを受け取り、共通ヘッダー/フッターを適用
// - Server Component（デフォルト）
import './styles.css'

export const metadata = {
  // 既定のメタデータ（各ページの generateMetadata/metadata で上書き可能）
  title: 'ブログ',
  description: 'Sanity読み取り専用・最小MVPブログ'
};

export default function RootLayout({ children }) {
  return (
    // 言語属性を付与したHTMLルート
    <html lang="ja">
      {/* グローバルなボディ設定と共通のレイアウト枠 */}
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', lineHeight: 1.6 }}>
        {/* サイト共通ヘッダー */}
        <header className="site-header">
          <div className="container header-inner">
            {/* サイトロゴ／ブランド（トップへのリンク） */}
            <a href="/" className="brand">
              <span className="brand-logo" aria-hidden="true">旅</span>
              <span className="brand-name">旅ログ</span>
            </a>
          </div>
        </header>

        {/* ページ固有コンテンツを描画するメイン領域 */}
        <main className="container" style={{ padding: '24px' }}>
          {children}
        </main>

        {/* サイト共通フッター */}
        <footer className="site-footer">
          {/* 視覚的なヒーローブロック（ブランド/簡易統計） */}
          <div className="footer-hero">
            <div className="container footer-inner">
              {/* ブランド表示（ロゴ + キャッチ） */}
              <div className="footer-brand">
                <span className="brand-logo" aria-hidden="true">旅</span>
                <div>
                  <div className="brand-name">旅ログ</div>
                  <div className="footer-tagline">日本の旅の記録をゆるく発信</div>
                </div>
              </div>
              {/* 簡易統計（ダミー） */}
              <div className="footer-stats">
                <div className="stat-card"><div className="stat-num">20+</div><div className="stat-label">都道府県</div></div>
                <div className="stat-card"><div className="stat-num">x</div><div className="stat-label">観光</div></div>
                <div className="stat-card"><div className="stat-num">x</div><div className="stat-label">グルメ</div></div>
              </div>
            </div>
          </div>

          {/* フッター下段: ページリンクとコピーライト */}
          <div className="container footer-bottom">
            <div className="footer-links footer-bottom-links">
              <a href="/privacy">プライバシーポリシー</a>
            </div>
            © {new Date().getFullYear()} 旅ログ
          </div>
        </footer>
      </body>
    </html>
  );
}
