// お問い合わせページ（/contact）
// - お問い合わせフォームのラッパー。メールリンクも併記
// route-group: (public)
import ContactForm from '@components/ContactForm'

// ISR: 60秒ごとに自動再検証（静的生成 + 更新）
export const revalidate = 60

// ページのメタデータ
export const metadata = {
  title: 'お問い合わせ | 旅ログ'
}

export default function ContactPage() {
  // 連絡先メールアドレス（ContactForm にも渡す）
  const email = 'contact.business2525@gmail.com'
  return (
    // 幅を狭めた本文レイアウト + 上下余白
    <main className="container narrow" style={{ padding: '32px 0' }}>
      {/* ページ見出しとリード文 */}
      <h1 className="article-title" style={{ marginBottom: 8 }}>お問い合わせ</h1>
      <p className="muted" style={{ marginBottom: 16 }}>
        ご意見・ご連絡は下記フォームまたはメールでお寄せください。
      </p>

      {/* フォーム本体（mailto でメーラー起動） */}
      <section style={{ marginBottom: 24 }}>
        <ContactForm to={email} />
      </section>

      {/* 代替導線：mailto が動作しない環境向けのプレーンなメールリンク */}
      <section className="card" style={{ marginTop: 16 }}>
        <div className="card-body">
          <div style={{ fontWeight:700, marginBottom:6 }}>メールでのご連絡</div>
          <p className="muted" style={{ margin: 0 }}>上のボタンでメーラーが開かない場合、下記アドレス宛に直接お送りください。</p>
          <p style={{ marginTop: 8 }}>
            <a href={`mailto:${email}`} style={{ textDecoration:'underline' }}>{email}</a>
          </p>
        </div>
      </section>
    </main>
  )
}
