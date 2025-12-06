// ルートレイアウト: 全ページ共通のHTML骨組みとグローバルスタイルを提供
// - App Router の layout.js は子ページを受け取り、共通ヘッダー/フッターを適用
// - Server Component（デフォルト）

import Script from 'next/script'

import './globals.css'
import styles from './layout.module.css'
import Header from '@components/Header'

const DEFAULT_ADSENSE_CLIENT = 'ca-pub-6855589905040705'
const ADSENSE_CLIENT = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || DEFAULT_ADSENSE_CLIENT).trim()

export const metadata = {
  title: {
    template: '%s | 旅ログ',
    default: '旅ログ - 気ままに綴る、旅の記録',
  },
  description: '週末の小旅行から心に残る絶景まで。訪れた場所の空気感や美味しい思い出を、写真とともにマイペースに残しています。',
  keywords: ['旅行', '観光', '写真', 'ブログ', 'グルメ'],
  authors: [{ name: 'Yamazaki' }],
  creator: 'Yamazaki',
  themeColor: '#be1e3e',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://example.com', // Replace with actual URL
    siteName: '旅ログ',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho+B1:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={styles.pageLayout}>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JY45KB4MTV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JY45KB4MTV');
          `}
        </Script>
        <Header />

        <div className={styles.mainContainer}>
          {children}
        </div>

        <footer className={styles.siteFooter}>
          <div className={styles.footerHero}>
            <div className={styles.footerInner}>
              <div className={styles.footerBrand}>
                <span className={styles.brandLogo} aria-hidden="true">旅</span>
                <div>
                  <div className={styles.brandName}>旅ログ</div>
                  <div className={styles.footerTagline}>日々の旅の記録をゆるく発信</div>
                </div>
              </div>
              <nav aria-label="フッターナビ" className={styles.footerNav}>
                <ul>
                  <li><a href="/">記事一覧</a></li>
                  <li><a href="/about">このサイトについて</a></li>
                  <li><a href="/contact">お問い合わせ</a></li>
                  <li><a href="/privacy">プライバシーポリシー</a></li>
                </ul>
              </nav>
            </div>
            <div className={styles.copyright}>
              © {new Date().getFullYear()} 旅ログ
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
