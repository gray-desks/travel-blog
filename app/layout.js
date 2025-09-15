// ルートレイアウト: 全ページ共通のHTML骨組みとグローバルスタイルを提供
// - App Router の layout.js は子ページを受け取り、共通ヘッダー/フッターを適用
// - Server Component（デフォルト）
import './styles.css'
import Header from '@components/Header'

export const metadata = {
  // 既定のメタデータ（各ページの generateMetadata/metadata で上書き可能）
  title: 'ブログ',
  description: 'Sanity読み取り専用・最小MVPブログ'
};

export default function RootLayout({ children }) {
  return (
    // 言語属性を付与したHTMLルート
    <html lang="ja">
      <head>
        {/* Sanity CDN への事前接続で画像読み込みを高速化 */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      {/* グローバルなボディ設定と共通のレイアウト枠 */}
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', lineHeight: 1.6, display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {/* サイト共通ヘッダー */}
        <Header />

        {/* ページ固有コンテンツを描画する主要コンテナ（各ページで <main> を持つためここは div） */}
        <div className="container" style={{ padding: '24px', flex: '1 0 auto' }}>
          {children}
        </div>

        {/* サイト共通フッター（1セクションに集約） */}
        <footer className="site-footer">
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
              {/* フッターナビ（重要ページ） */}
              <nav aria-label="フッターナビ">
                <ul style={{ listStyle: 'none', display: 'flex', gap: 16, margin: 0, padding: 0, flexWrap: 'wrap' }}>
                  <li><a href="/about" style={{ color: '#e2e8f0', textDecoration: 'none' }}>このサイトについて</a></li>
                  <li><a href="/contact" style={{ color: '#e2e8f0', textDecoration: 'none' }}>お問い合わせ</a></li>
                  <li><a href="/privacy" style={{ color: '#e2e8f0', textDecoration: 'none' }}>プライバシーポリシー</a></li>
                </ul>
              </nav>
            </div>
            {/* コピーライト（下段を廃止し、ここに統合） */}
            <div className="container" style={{ paddingTop: 12, textAlign: 'center', color: '#cbd5e1' }}>
              © {new Date().getFullYear()} 旅ログ
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
