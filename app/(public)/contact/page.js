// お問い合わせページ（/contact）
// - お問い合わせフォームのラッパー。メールリンクも併記
// route-group: (public)
import ContactForm from '@components/ContactForm'
import styles from '../../static.module.css'

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>お問い合わせ</h1>
        <p className={styles.subtitle}>ご意見・ご連絡は下記フォームまたはメールでお寄せください。</p>
      </div>

      <div className={styles.content}>
        {/* フォーム本体（mailto でメーラー起動） */}
        <section style={{ marginBottom: 24 }}>
          <ContactForm to={email} />
        </section>

        {/* 代替導線：mailto が動作しない環境向けのプレーンなメールリンク */}
        <div style={{ marginTop: 24, padding: 20, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>メールでのご連絡</div>
          <p className={styles.muted} style={{ margin: 0 }}>上のボタンでメーラーが開かない場合、下記アドレス宛に直接お送りください。</p>
          <p style={{ marginTop: 8 }}>
            <a href={`mailto:${email}`} style={{ textDecoration: 'underline' }}>{email}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
