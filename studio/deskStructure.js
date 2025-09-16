// Sanity Studio のデスク構成（左サイドバーのカスタム構造）
// - 記事(article)を「分類(type)」ごとにリスト表示できるようにします
// - 未分類（type 未設定）も別項目として表示します
const TYPES = [
  { title: 'スポット', value: 'spot' },
  { title: 'グルメ',   value: 'food' },
  { title: '交通',     value: 'transport' },
  { title: '宿泊',     value: 'hotel' },
  { title: 'コラム',   value: 'column' },
]

// 分類ごとのリスト項目を生成するヘルパー
// - S は Structure Builder
// - title はサイドバー表示名, type は article.type の値
const byType = (S, title, type) =>
  S.listItem()
    .id(`articles-${type}`)
    .title(title)
    .schemaType('article')
    .child(
      S.documentList()
        .id(`articles-${type}-list`)
        .title(title)
        .schemaType('article')
        // 指定 type の article のみを抽出
        .filter('_type == "article" && type == $type')
        .params({ type })
        // 公開日 → 更新日の優先で降順ソート
        .defaultOrdering([
          { field: 'publishedAt', direction: 'desc' },
          { field: '_updatedAt', direction: 'desc' }
        ])
    )

export default function deskStructure(S) {
  return S.list()
    .title('Content')
    .items([
      // すべてを出したくなければ、この項目は入れない。必要ならコメントアウト解除。
      // S.listItem()
      //   .id('all-articles')
      //   .title('すべての記事')
      //   .schemaType('article')
      //   .child(
      //     S.documentList()
      //       .id('all-articles-list')
      //       .title('すべての記事')
      //       .schemaType('article')
      //       .filter('_type == "article"')
      //       .defaultOrdering([
      //         { field: 'publishedAt', direction: 'desc' },
      //         { field: '_updatedAt', direction: 'desc' }
      //       ])
      //   ),

      // 分類ごとの絞り込みリスト
      ...TYPES.map(t => byType(S, t.title, t.value)),

      S.divider(),

      // 未分類（type未設定のもの）
      S.listItem()
        .id('articles-uncategorized')
        .title('未分類（分類なし）')
        .schemaType('article')
        .child(
          S.documentList()
            .id('articles-uncategorized-list')
            .title('未分類（分類なし）')
            .schemaType('article')
            // type フィールドが未定義の article を抽出
            .filter('_type == "article" && !defined(type)')
            // 公開日 → 更新日の優先で降順ソート
            .defaultOrdering([
              { field: 'publishedAt', direction: 'desc' },
              { field: '_updatedAt', direction: 'desc' }
            ])
        ),

    ])
}
