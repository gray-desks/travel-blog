// Next.js の組み込みコンポーネント Link を読み込み
// クライアント遷移（ページ遷移時の高速化）に利用します
import Link from 'next/link';

// App Router の特殊ファイル "not-found.js"
// 存在しないパスにアクセスされた場合に自動的に表示される 404 ページの UI を定義します
export default function NotFound() {
  return (
    // 画面全体の主要コンテナ。上下に余白を付与して中央に配置しやすくします
    <main className="container" style={{ padding: '56px 0' }}>
      {/* 中央寄せのカード。最大幅を制限して視認性を上げます */}
      <div className="card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div className="card-body">
          {/* エラーメッセージの見出し（404 の主文） */}
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>ページが見つかりません</h1>
          {/* 補足説明：入力 URL の確認を促す */}
          <p className="muted" style={{ marginTop: 8 }}>URLをご確認ください。</p>
          {/* 行動導線：トップページへ戻るリンク（ボタン風の見た目） */}
          <p style={{ marginTop: 16 }}>
            <Link
              href="/"
              className="btn-primary"
              style={{ padding: '10px 16px', borderRadius: 8, textDecoration: 'none', background: '#111', color: '#fff' }}
            >
              トップに戻る
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
