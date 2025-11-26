// シンプルなお問い合わせ導線（メール作成ボタン）
// - props で渡された宛先/件名/本文から mailto リンクを生成し、ボタンとして表示します
// - クリックすると既定のメーラーが起動し、新規メール作成画面を開きます
import styles from './ContactForm.module.css'

export default function ContactForm({ to, subject = '', body = '' }) {
  // mailto: スキームにクエリ（subject/body）を付与
  const mailto = buildMailto(to, subject, body)
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        {/* セクション見出し */}
        <div className={styles.label}>お問い合わせフォーム</div>
        {/* メール作成ボタン（mailto リンク） */}
        <a href={mailto} className="btn btn-primary">メールを送る</a>
      </div>
    </div>
  )
}

// mailto リンクを生成するヘルパー
// - to: 宛先メールアドレス
// - subject/body: 省略可能。存在する場合のみクエリに含める
function buildMailto(to, subject, body) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const qs = params.toString()
  // 宛先は安全のためエンコードして埋め込み
  return `mailto:${encodeURIComponent(to || '')}${qs ? `?${qs}` : ''}`
}
