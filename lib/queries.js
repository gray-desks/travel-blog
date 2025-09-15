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
    groq: `*[${cond}] | order(coalesce(publishedAt, _updatedAt) desc)[${from}...${to}]{
      _id, title, "slug": slug.current, publishedAt,
      mainImage{asset->{url}}, type, prefecture, lang
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
