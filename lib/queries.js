// GROQ queries for travel blog articles (schema-compliant)

// Article list query (latest 20 articles)
export const articlesQuery = `
*[_type == "article"] | order(publishedAt desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  type,
  placeName,
  prefecture,
  lang,
  "coverImageUrl": coverImage.asset->url,
  "excerpt": content[_type == "block"][0].children[0].text
}`;

// Article detail query by slug
export const articleBySlugQuery = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  type,
  placeName,
  prefecture,
  lang,
  content,
  "coverImageUrl": coverImage.asset->url,
  "galleryImages": gallery[].asset->url,
  tags
}`;

// Articles by type query
export const articlesByTypeQuery = `
*[_type == "article" && type == $type] | order(publishedAt desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  type,
  placeName,
  prefecture,
  lang,
  "coverImageUrl": coverImage.asset->url,
  "excerpt": content[_type == "block"][0].children[0].text
}`;

// Articles by prefecture query
export const articlesByPrefectureQuery = `
*[_type == "article" && prefecture == $prefecture] | order(publishedAt desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  type,
  placeName,
  prefecture,
  lang,
  "coverImageUrl": coverImage.asset->url,
  "excerpt": content[_type == "block"][0].children[0].text
}`;

// Japanese articles only (for MVP)
export const japaneseArticlesQuery = `
*[_type == "article" && lang == "ja"] | order(publishedAt desc)[0...20]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  type,
  placeName,
  prefecture,
  "coverImageUrl": coverImage.asset->url,
  "excerpt": content[_type == "block"][0].children[0].text
}`;