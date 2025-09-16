// 記事詳細ページのローディングUI（スケルトン）
// - App Router の loading.js は同階層の page.js の非同期読み込み時に表示されます
// - 本番/開発いずれでも、データ取得の待機中にプレースホルダを見せて体感速度を上げます
export default function ArticleLoading() {
  return (
    // 本文レイアウトと同じ幅を維持（スクロールジャンプを避ける）
    // aria-hidden: スクリーンリーダーには読み上げさせない
    <article className="narrow" aria-hidden>
      {/* タイトル行のスケルトン */}
      <div className="skeleton" style={{ width: '70%', height: 30, borderRadius: 8 }} />
      {/* 日付などサブ情報のスケルトン */}
      <div className="skeleton" style={{ width: 120, height: 14, borderRadius: 6, marginTop: 8 }} />
      {/* メイン画像のスケルトン（16:9） */}
      <div className="skeleton" style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: 12, margin: '16px 0' }} />
      {/* 本文の段落・画像のダミー行を数本表示 */}
      <div className="prose" style={{ fontSize: 16 }}>
        <p className="skeleton-line" />
        <p className="skeleton-line" />
        <p className="skeleton-line short" />
        {/* 記事内の画像ブロック相当のスケルトン（16:9） */}
        <div className="skeleton" style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: 12, margin: '12px 0' }} />
        <p className="skeleton-line" />
        <p className="skeleton-line short" />
      </div>
    </article>
  )
}
