// トップページ（/）: 記事一覧 + 検索/絞り込み/ページングを提供するサーバーコンポーネント
// route-group: (public)
import Link from 'next/link'
import { client } from '@lib/sanityClient'
import { buildArticlesQuery } from '@lib/queries'
import Hero from '@components/Hero'
import ArticleCard from '@components/ArticleCard'
import ResetButton from '@components/ResetButton'
import styles from '../page.module.css'

// ISR 設定: 60秒ごとに再検証して静的一覧を更新
export const revalidate = 60

export default async function Page({ searchParams }) {
  // URL クエリから検索条件を取得（Next 15: searchParams は await が必要）
  const params = await searchParams
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
  let result
  try {
    result = await client.fetch(groq, queryParams)
  } catch (err) {
    console.error('[Sanity] list fetch failed', { message: err?.message })
    result = []
  }

  // 空要素や slug 未設定を除外してから、表示分にスライス
  const filtered = Array.isArray(result) ? result.filter(a => a && a.slug) : []
  const visible = filtered.slice(0, pageSize)
  // 次ページがあるか判定（+1 件取得済みなので、表示件数より多ければ次あり）
  const hasNext = filtered.length > pageSize
  // 何らかのフィルタが有効か
  const hasFilter = Boolean(q || type || prefecture)

  return (
    <div className={styles.articlesLayout}>
      {/* ヒーローセクション内に検索フォームを配置 */}
      <Hero>
        {/* GET クエリで絞り込み条件を付与するフォーム */}
        <form method="get" className={styles.filters}>
          <div className={styles.filtersRow}>
            {/* キーワード検索（タイトル対象） */}
            <label htmlFor="q" className="sr-only">検索キーワード</label>
            <input
              type="text"
              name="q"
              id="q"
              placeholder="キーワードで検索"
              defaultValue={q}
              aria-label="キーワードで検索"
              className={styles.input}
            />
          </div>
          <div className={`${styles.filtersRow} ${styles.filtersRowSplit}`}>
            {/* 分類フィルタ */}
            <label htmlFor="type" className="sr-only">分類</label>
            <select id="type" name="type" defaultValue={type} aria-label="分類" className={styles.select}>
              <option value="">分類（すべて）</option>
              <option value="spot">観光スポット</option>
              <option value="food">グルメ</option>
              <option value="transport">交通</option>
              <option value="hotel">宿泊</option>
              <option value="column">コラム</option>
            </select>
            {/* 都道府県フィルタ */}
            <label htmlFor="prefecture" className="sr-only">都道府県</label>
            <select id="prefecture" name="prefecture" defaultValue={prefecture} aria-label="都道府県" className={styles.select}>
              <option value="">都道府県（すべて）</option>
              {[
                '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
                '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
                '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
                '岐阜県', '静岡県', '愛知県', '三重県',
                '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
                '鳥取県', '島根県', '岡山県', '広島県', '山口県',
                '徳島県', '香川県', '愛媛県', '高知県',
                '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
              ].map(p => (<option key={p} value={p}>{p}</option>))}
            </select>
            {/* 操作ボタン（検索実行／条件リセット） */}
            <div className={styles.filtersActions}>
              <button type="submit" className={styles.btnPrimary}>検索</button>
              <ResetButton className={styles.btnSecondary} />
            </div>
          </div>
        </form>
      </Hero>

      <h2 className={styles.sectionTitle}>Latest Entries</h2>

      {/* 記事カードのグリッド一覧 */}
      <section className={styles.grid}>
        {visible.map(a => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </section>
      {/* ページャー（前/次）。1ページ目で前は非表示、次ページが無ければ次は非表示 */}
      {(hasNext || page > 1) && (
        <nav className={styles.pager} aria-label="ページャー">
          <div className={styles.pagerInner}>
            {page > 1 ? (
              <Link
                className={styles.pagerBtn}
                rel="prev"
                href={`/?${new URLSearchParams({ ...(q && { q }), ...(type && { type }), ...(prefecture && { prefecture }), page: String(page - 1) })}`}
              >
                ← 前のページ
              </Link>
            ) : (
              <span className={`${styles.pagerBtn} ${styles.isDisabled}`} aria-disabled="true">← 前のページ</span>
            )}

            <ul className={styles.pagination} role="list">
              {page > 1 && (
                <li>
                  <Link
                    href={`/?${new URLSearchParams({ ...(q && { q }), ...(type && { type }), ...(prefecture && { prefecture }), page: String(page - 1) })}`}
                    className={styles.pageLink}
                  >
                    {page - 1}
                  </Link>
                </li>
              )}
              <li>
                <span className={`${styles.pageLink} ${styles.isCurrent}`} aria-current="page">{page}</span>
              </li>
              {hasNext && (
                <li>
                  <Link
                    rel="next"
                    href={`/?${new URLSearchParams({ ...(q && { q }), ...(type && { type }), ...(prefecture && { prefecture }), page: String(page + 1) })}`}
                    className={styles.pageLink}
                  >
                    {page + 1}
                  </Link>
                </li>
              )}
            </ul>

            {hasNext ? (
              <Link
                className={styles.pagerBtn}
                rel="next"
                href={`/?${new URLSearchParams({ ...(q && { q }), ...(type && { type }), ...(prefecture && { prefecture }), page: String(page + 1) })}`}
              >
                次のページ →
              </Link>
            ) : (
              <span className={`${styles.pagerBtn} ${styles.isDisabled}`} aria-disabled="true">次のページ →</span>
            )}
          </div>
        </nav>
      )}
      {/* 該当なしUI（フィルタ中はリセット導線を表示） */}
      {visible.length === 0 && (
        <div className={styles.emptyState}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div className={styles.emptyTitle}>表示できる記事がありません</div>
            <div className={styles.emptyDesc}>
              {hasFilter ? '条件に一致する記事がありません。条件を変更するか、リセットしてください。' : 'まだ記事がありません。'}
            </div>
            {hasFilter && (
              <Link href="/" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>条件をリセット</Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
