export const articlesQuery = `
*[_type == "article"] | order(coalesce(publishedAt, _updatedAt) desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage{asset->{url}},
  type, prefecture, placeName, lang, tags
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
  type, prefecture, placeName, lang, tags,
  "translationId": translationOf->_id
}
`;