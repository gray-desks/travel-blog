export const metadata = {
  title: 'ブログ',
  description: 'Sanity読み取り専用・最小MVPブログ'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', lineHeight: 1.6 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}