export default function ContactForm({ to, subject = '', body = '' }) {
  const mailto = buildMailto(to, subject, body)
  return (
    <div className="card">
      <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ fontWeight: 700 }}>お問い合わせフォーム</div>
        <a href={mailto} className="btn btn-primary">メールを送る</a>
      </div>
    </div>
  )
}

function buildMailto(to, subject, body) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const qs = params.toString()
  return `mailto:${encodeURIComponent(to || '')}${qs ? `?${qs}` : ''}`
}

