import {defineType} from 'sanity'

/*
  Portable Text 用スキーマ: blockContent
  - 記事本文に使用するリッチテキスト定義です。
  - "of" の配列で許可するブロック（テキストブロック/画像 等）を列挙します。
  - styles, lists, marks, annotations を調整して、編集時の選択肢を制御します。
*/
export default defineType({
  name: 'blockContent',
  title: '本文',
  type: 'array',
  of: [
    {
      // テキストブロック（段落/見出し/引用 など）
      type: 'block',
      // 利用可能なスタイル（Studioのドロップダウンに表示）
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'}
      ],
      // 箇条書き（必要に応じて番号付き等も追加可能）
      lists: [{title: 'Bullet', value: 'bullet'}],
      // インライン装飾（太字/斜体）と注釈（リンクなど）
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'}
        ],
        annotations: [
          {
            // リンク注釈（URL 入力）
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{name: 'href', type: 'url', title: 'URL'}]
          }
        ]
      }
    },
    // 画像ブロック（hotspot 有効: 画像のフォーカス位置を保持）
    {type: 'image', options: {hotspot: true}}
  ]
})
