import Link from 'next/link'
import { client } from '../lib/sanityClient'
import { articlesQuery, buildArticlesQuery } from '../lib/queries'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import ResetButton from '../components/ResetButton'

export const revalidate = 60

export default async function Page({ searchParams }) {
  const q = searchParams?.q || ''
  const type = searchParams?.type || ''
  const prefecture = searchParams?.prefecture || ''
  const page = Math.max(1, Number(searchParams?.page) || 1)
  const pageSize = 12
  const from = (page - 1) * pageSize
  const to = page * pageSize + 1 // 次ページ有無の判定用に+1件

  const { groq, params } = buildArticlesQuery({ q, type, prefecture, from, to })
  const result = await client.fetch(groq, params)

  const filtered = Array.isArray(result) ? result.filter(a => a && a.slug) : []
  const visible = filtered.slice(0, pageSize)
  const hasNext = filtered.length > pageSize
  const hasFilter = Boolean(q || type || prefecture)

  return (
    <main>
      <Hero>
        <form method="get" className="filters hero-form" style={{ display:'grid', gap:12, gridTemplateColumns:'1fr' }}>
          <div className="filters-row" style={{ display:'grid', gap:12, gridTemplateColumns:'1fr' }}>
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
            <label htmlFor="type" className="sr-only">種別</label>
            <select id="type" name="type" defaultValue={type} aria-label="種別" style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, background:'#fff' }}>
              <option value="">種別（すべて）</option>
              <option value="spot">spot</option>
              <option value="food">food</option>
              <option value="transport">transport</option>
              <option value="hotel">hotel</option>
              <option value="column">column</option>
            </select>
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
            <div className="filters-actions" style={{ justifySelf:'end', display:'flex', gap:12 }}>
              <button type="submit" className="btn btn-primary">検索</button>
              <ResetButton />
            </div>
          </div>
        </form>
      </Hero>
      <section className="grid">
        {visible.map(a => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </section>
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
