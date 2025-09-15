import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '56px 0' }}>
      <div className="card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div className="card-body">
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>ページが見つかりません</h1>
          <p className="muted" style={{ marginTop: 8 }}>URLをご確認ください。</p>
          <p style={{ marginTop: 16 }}>
            <Link href="/" className="btn-primary" style={{ padding:'10px 16px', borderRadius:8, textDecoration:'none', background:'#111', color:'#fff' }}>トップに戻る</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
