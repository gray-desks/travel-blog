// 単一記事を slug で取得する GROQ
// - slug は $slug パラメータで受け取り、最初の一致 [0] を返す
// - mainImage / gallery は asset の url をデリファレンスして取得
// - translationId は翻訳元ドキュメントの _id を参照
export const articleBySlugQuery = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  body,
  mainImage{asset->{url}},
  gallery[]{asset->{url}},
  type, prefecture, placeName, lang, tags,
  "translationId": translationOf->_id
}
`;

// 検索/フィルタ一覧の GROQ を動的生成
// - q: タイトル/本文に対する部分一致検索（ワイルドカード *...*）
// - type/prefecture: 完全一致フィルタ
// - from/to: ページネーション用のスライス範囲
export const buildArticlesQuery = ({ q, type, prefecture, from = 0, to = 12 } = {}) => {
  // 条件式を配列で組み立て、未指定は除外して AND 結合
  const cond = [
    '_type == "article"',
    type ? 'type == $type' : null,
    prefecture ? 'prefecture == $prefecture' : null,
    q ? '(title match $q || pt::text(body) match $q)' : null,
  ].filter(Boolean).join(' && ')

  return {
    // 公開日があればそれを、なければ更新日で降順ソートしてスライス
    // 一覧でもギャラリーの有無が分かるよう、先頭数枚と合計数を返す
    groq: `*[${cond}] | order(coalesce(publishedAt, _updatedAt) desc)[${from}...${to}]{
      _id, title, "slug": slug.current, publishedAt,
      mainImage{asset->{url}}, type, prefecture, lang,
      "galleryCount": count(gallery),
      "galleryPreview": gallery[0...4]{asset->{url}}
    }`,
    // GROQ へ渡すパラメータ。未指定は展開しない（スプレッドで条件付き追加）
    params: {
      ...(type && { type }),
      ...(prefecture && { prefecture }),
      // match 演算子用にワイルドカードで囲む（例: *keyword*）
      ...(q && { q: `*${q}*` }),
    }
  }
}

// キャッシュ付きのデータ取得（generateMetadata とページ本体の二重取得を防ぐ）
import { unstable_cache } from 'next/cache'
import { client } from './sanityClient'

// Sanity 取得のフェールセーフ: エラー時は null/[] を返す
async function safeFetch(groq, params) {
  try {
    return await client.fetch(groq, params)
  } catch (err) {
    console.error('[Sanity] fetch failed', { message: err?.message })
    return null
  }
}

export const getArticleBySlugCached = (slug) =>
  unstable_cache(
    async (s) => {
      const data = await safeFetch(articleBySlugQuery, { slug: s })
      return data || null
    },
    ['article-by-slug', String(slug || '')],
    { revalidate: 60 }
  )(slug)

// サイトマップ用: すべての記事のスラッグと最終更新日時
export const allArticleSlugsForSitemap = `
*[_type == "article" && defined(slug.current)]{
  "slug": slug.current,
  "lastmod": coalesce(publishedAt, _updatedAt)
} | order(lastmod desc)
`
/*
  GROQ クエリ置き場（Sanity 読み取り専用）
  - フロントエンドから Sanity API に渡すクエリ文字列/生成関数をまとめています。
  - export されるのは以下の2つ：
    1) articleBySlugQuery: 記事の詳細を slug で1件取得
    2) buildArticlesQuery: 一覧用クエリ（検索/絞り込み/ページング）を動的生成

  使い方（例）：
    const {groq, params} = buildArticlesQuery({ q: '京都', type: 'food', from: 0, to: 13 })
    const list = await client.fetch(groq, params)
    const article = await client.fetch(articleBySlugQuery, { slug: 'my-slug' })

  セキュリティに関して：
    - ユーザー入力は GROQ のパラメータとして渡し、クエリ文字列へ直接連結しないことで注入を避けます。
    - 本ファイルでは q/type/prefecture を params 経由で渡しています（q はワイルドカード *...* に整形）。
*/
