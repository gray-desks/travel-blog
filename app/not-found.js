import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>ページが見つかりません</h1>
      <p style={{ marginTop: 8 }}>
        <Link href="/" style={{ textDecoration: 'underline' }}>トップに戻る</Link>
      </p>
    </main>
  );
}