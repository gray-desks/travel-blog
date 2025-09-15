// トップページ（/）: 記事一覧 + 検索/絞り込み/ページングを提供するサーバーコンポーネント
// route-group: (public)
import Link from 'next/link'
import { client } from '@lib/sanityClient'
import { buildArticlesQuery } from '@lib/queries'
import Hero from '@components/Hero'
import ArticleCard from '@components/ArticleCard'
import ResetButton from '@components/ResetButton'

// ISR 設定: 60秒ごとに再検証して静的一覧を更新
export const revalidate = 60

export default async function Page({ searchParams }) {
  // URL クエリから検索条件を取得
  const params = searchParams
  const q = params?.q || ''
  const type = params?.type || ''
  const prefecture = params?.prefecture || ''
  // ページ番号（1始まり）を数値化し、最小値1に丸める
  const page = Math.max(1, Number(params?.page) || 1)
  // ページング：1ページの件数と取得範囲（次ページ判定のため +1 件 余分に取得）
  const pageSize = 12
  const from = (page - 1) * pageSize
  const to = page * pageSize + 1 // 次ページ有無の判定用に+1件

  // 検索条件から GROQ を生成し、Sanity から記事を取得
  const { groq, params: queryParams } = buildArticlesQuery({ q, type, prefecture, from, to })
  const result = await client.fetch(groq, queryParams)

  // 空要素や slug 未設定を除外してから、表示分にスライス
  const filtered = Array.isArray(result) ? result.filter(a => a && a.slug) : []
  const visible = filtered.slice(0, pageSize)
  // 次ページがあるか判定（+1 件取得済みなので、表示件数より多ければ次あり）
  const hasNext = filtered.length > pageSize
  // 何らかのフィルタが有効か
  const hasFilter = Boolean(q || type || prefecture)

  return (
    <main>
      {/* ヒーローセクション内に検索フォームを配置 */}
      <Hero>
        {/* GET クエリで絞り込み条件を付与するフォーム */}
        <form method="get" className="filters hero-form" style={{ display:'grid', gap:12, gridTemplateColumns:'1fr' }}>
          <div className="filters-row" style={{ display:'grid', gap:12, gridTemplateColumns:'1fr' }}>
            {/* キーワード検索（タイトル対象） */}
            <label htmlFor="q" className="sr-only">検索キーワード</label>
            <input
              type="text"
              name="q"
              id="q"
              placeholder="タイトルで検索"
              defaultValue={q}
              aria-label="タイトルを検索"
              style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, background:'#fff' }}
            />
          </div>
          <div className="filters-row" style={{ display:'grid', gap:12, gridTemplateColumns:'1fr 1fr auto', alignItems:'center' }}>
            {/* 種別フィルタ */}
            <label htmlFor="type" className="sr-only">種別</label>
            <select id="type" name="type" defaultValue={type} aria-label="種別" style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, background:'#fff' }}>
              <option value="">種別（すべて）</option>
              <option value="spot">spot</option>
              <option value="food">food</option>
              <option value="transport">transport</option>
              <option value="hotel">hotel</option>
              <option value="column">column</option>
            </select>
            {/* 都道府県フィルタ */}
            <label htmlFor="prefecture" className="sr-only">都道府県</label>
            <select id="prefecture" name="prefecture" defaultValue={prefecture} aria-label="都道府県" style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, background:'#fff' }}>
              <option value="">都道府県（すべて）</option>
              {[
                '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
                '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
                '新潟県','富山県','石川県','福井県','山梨県','長野県',
                '岐阜県','静岡県','愛知県','三重県',
                '滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県',
                '鳥取県','島根県','岡山県','広島県','山口県',
                '徳島県','香川県','愛媛県','高知県',
                '福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'
              ].map(p => (<option key={p} value={p}>{p}</option>))}
            </select>
            {/* 操作ボタン（検索実行／条件リセット） */}
            <div className="filters-actions" style={{ justifySelf:'end', display:'flex', gap:12 }}>
              <button type="submit" className="btn btn-primary">検索</button>
              <ResetButton />
            </div>
          </div>
        </form>
      </Hero>
      {/* 記事カードのグリッド一覧 */}
      <section className="grid">
        {visible.map(a => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </section>
      {/* ページャー（前/次）。1ページ目で前は非表示、次ページが無ければ次は非表示 */}
      {(hasNext || page > 1) && (
        <nav className="pager" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 16 }}>
          {page > 1 ? (
            <Link rel="prev" href={`/?${new URLSearchParams({ ...(q && {q}), ...(type && {type}), ...(prefecture && {prefecture}), page: String(page - 1) })}`}>
              ← 前のページ
            </Link>
          ) : <span />}
          <span className="muted" aria-live="polite">ページ {page}</span>
          {hasNext ? (
            <Link rel="next" href={`/?${new URLSearchParams({ ...(q && {q}), ...(type && {type}), ...(prefecture && {prefecture}), page: String(page + 1) })}`}>
              次のページ →
            </Link>
          ) : <span />}
        </nav>
      )}
      {/* 該当なしUI（フィルタ中はリセット導線を表示） */}
      {visible.length === 0 && (
        <div className="center" style={{ padding: '48px 0' }}>
          <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
            <div className="card-body" style={{ textAlign:'center' }}>
              <div style={{ fontWeight:800, marginBottom:6 }}>表示できる記事がありません</div>
              <div className="muted" style={{ marginBottom:12 }}>
                {hasFilter ? '条件に一致する記事がありません。条件を変更するか、リセットしてください。' : 'まだ記事がありません。'}
              </div>
              {hasFilter && (
                <Link href="/" className="btn-primary" style={{ padding:'10px 16px', borderRadius:8, textDecoration:'none', background:'#111', color:'#fff' }}>条件をリセット</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
