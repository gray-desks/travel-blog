const TYPES = [
  { title: 'スポット', value: 'spot' },
  { title: 'グルメ',   value: 'food' },
  { title: '交通',     value: 'transport' },
  { title: '宿泊',     value: 'hotel' },
  { title: 'コラム',   value: 'column' },
]

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
        .filter('_type == "article" && type == $type')
        .params({ type })
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

      // 種別ごとの絞り込みリスト
      ...TYPES.map(t => byType(S, t.title, t.value)),

      S.divider(),

      // 未分類（type未設定のもの）
      S.listItem()
        .id('articles-uncategorized')
        .title('未分類（種別なし）')
        .schemaType('article')
        .child(
          S.documentList()
            .id('articles-uncategorized-list')
            .title('未分類（種別なし）')
            .schemaType('article')
            .filter('_type == "article" && !defined(type)')
            .defaultOrdering([
              { field: 'publishedAt', direction: 'desc' },
              { field: '_updatedAt', direction: 'desc' }
            ])
        ),

    ])
}