export const articlesQuery = `
*[_type == "article"] | order(coalesce(publishedAt, _updatedAt) desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage{asset->{url}},
  type, region, prefecture, placeName, lang, tags
}
`;

export const articleBySlugQuery = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  body,
  mainImage{asset->{url}},
  gallery[]{asset->{url}},
  type, region, prefecture, placeName, lang, tags,
  "translationId": translationOf->_id
}
`;

// フェーズ2: 検索/フィルタ用（依存追加なし）
export const buildArticlesQuery = ({ q, type, region, prefecture, from = 0, to = 12 } = {}) => {
  const cond = [
    '_type == "article"',
    type ? 'type == $type' : null,
    region ? 'region == $region' : null,
    prefecture ? 'prefecture == $prefecture' : null,
    q ? '(title match $q || pt::text(body) match $q)' : null,
  ].filter(Boolean).join(' && ')

  return {
    groq: `*[${cond}] | order(coalesce(publishedAt, _updatedAt) desc)[${from}...${to}]{
      _id, title, "slug": slug.current, publishedAt,
      mainImage{asset->{url}}, type, region, prefecture, lang
    }`,
    params: {
      ...(type && { type }),
      ...(region && { region }),
      ...(prefecture && { prefecture }),
      ...(q && { q: `*${q}*` }),
    }
  }
}
