export const revalidate = 60

export const metadata = {
  title: 'プライバシーポリシー | 旅ログ'
}

export default function PrivacyPage() {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <main className="container narrow" style={{ padding: '32px 0' }}>
      <h1 className="article-title" style={{ marginBottom: 8 }}>プライバシーポリシー</h1>
      <p className="muted" style={{ marginBottom: 24 }}>施行日: <time dateTime={today}>{today}</time></p>

      <section className="prose" style={{ fontSize: 16 }}>
        <p>
          本サイト「旅ログ」（以下「当サイト」）は、ユーザーの皆さまの個人情報を適切に取り扱い、
          安心してご利用いただけるよう努めます。本ポリシーは当サイトにおける個人情報・Cookie等の取り扱い方針を定めるものです。
        </p>

        <h2>運営者情報</h2>
        <p>
          運営者名: <strong>（ご指定ください）</strong><br />
          連絡先: <strong>（ご指定のメールアドレス）</strong>
        </p>

        <h2>収集する情報</h2>
        <ul>
          <li>閲覧に伴い自動的に送信される情報（IPアドレス、ブラウザ情報等のアクセスログ）</li>
          <li>Cookie・類似技術による情報（後述）</li>
          <li>お問い合わせ時に任意で提供される情報（該当機能がある場合）</li>
        </ul>

        <h2>利用目的</h2>
        <ul>
          <li>コンテンツの表示・表示最適化（キャッシュや再検証を含む）</li>
          <li>不正アクセスの監視、安定運用のためのアクセス解析（統計情報）</li>
          <li>広告配信・効果測定（Google AdSense 等、後述）</li>
        </ul>

        <h2>Cookie と広告について</h2>
        <p>
          当サイトでは第三者配信事業者としての <strong>Google</strong> を含む事業者が、Cookie を使用してユーザーの過去のアクセス情報に基づき広告を配信する場合があります。
          Google の広告 Cookie を使用することで、Google やそのパートナーは当サイトや他サイトへのアクセス情報に基づく広告を表示できます。
        </p>
        <ul>
          <li>
            パーソナライズ広告を無効化するには Google 広告設定からオプトアウトできます:
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads</a>
          </li>
          <li>
            また、<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">Google ポリシー「パートナーのサイトやアプリでの Google によるデータ使用」</a> もご参照ください。
          </li>
        </ul>

        <h2>アクセス解析</h2>
        <p>
          現時点で当サイトに外部のアクセス解析ツールは導入していません。導入した場合は本ポリシーを更新し、ツール名・取得情報・オプトアウト方法を明示します。
        </p>

        <h2>第三者への提供</h2>
        <p>
          法令に基づく場合を除き、本人の同意なく個人情報を第三者へ提供しません。広告配信・表示最適化のために Cookie 情報が第三者に送信される場合があります（前述のとおり）。
        </p>

        <h2>外部リンク</h2>
        <p>
          当サイトからリンクする外部サイトの内容や個人情報保護について責任を負いません。各サイトのポリシーをご確認ください。
        </p>

        <h2>未成年の利用</h2>
        <p>
          13歳未満の方は、保護者の同意がない限り個人情報を提供しないでください。
        </p>

        <h2>ポリシーの改定</h2>
        <p>
          本ポリシーは必要に応じて改定します。重要な変更がある場合は当サイトで告知します。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          本ポリシーに関するお問い合わせは、上記「運営者情報」に記載の連絡先までご連絡ください。
        </p>
      </section>
    </main>
  )
}

