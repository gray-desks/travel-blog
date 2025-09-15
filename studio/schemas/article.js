import {defineType, defineField} from 'sanity'

// 依存なしの簡易 slugify（英数字とハイフンのみ）。日本語だけの時は安全なフォールバック。
const slugify = (input) => {
  const base = String(input || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '') // 文字/数字・空白・ハイフン以外を除去（Unicode対応）
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (/[a-z0-9]/.test(base)) return base
  const ts = new Date().toISOString().slice(0,10).replace(/-/g,'')
  return `post-${ts}-${Math.random().toString(36).slice(2,6)}`
}

// 都道府県（日本語表示・そのまま保存）
const PREFS = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県',
  '岐阜県','静岡県','愛知県','三重県',
  '滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県',
  '鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県',
  '福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'
]

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  // ドキュメント初期値（langのみ既定）
  initialValue: { lang: 'ja' },

  fields: [
    // 必須：title だけ
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: r => r.required()
    }),

    // 任意：slug（英数字にスラグ化。日本語タイトル時は安全フォールバック）
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: doc => doc.title,
        maxLength: 96,
        slugify
      },
      // 入力は任意（自動生成ボタンでも、空のままでもOK）
      isUnique: (value, ctx) => ctx.defaultIsUnique(value, ctx)
    }),

    // 任意：公開日時（並び替えに使用予定）
    defineField({ name: 'publishedAt', title: '公開日時', type: 'datetime' }),

    // 任意：概要（抜粋）
    defineField({
      name: 'excerpt',
      title: '概要（抜粋）',
      type: 'text',
      rows: 3
    }),

    // 任意：言語（既定 ja）
    defineField({ name: 'lang', title: 'Language', type: 'string' }),

    // 任意：タイプ
    defineField({
      name: 'type',
      title: '種別',
      type: 'string',
      options: {
        list: [
          {title: 'スポット', value: 'spot'},
          {title: 'グルメ', value: 'food'},
          {title: '交通', value: 'transport'},
          {title: '宿泊', value: 'hotel'},
          {title: 'コラム', value: 'column'}
        ]
      }
    }),

    // 任意：都道府県
    defineField({
      name: 'prefecture',
      title: '都道府県',
      type: 'string',
      options: { list: PREFS.map(p => ({title: p, value: p})) }
    }),

    // 任意：場所名
    defineField({ name: 'placeName', title: '場所名', type: 'string' }),

    // 画像（mainImage 1本化）
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: '代替テキスト' }]
    }),

    // 任意：ギャラリー
    defineField({
      name: 'gallery',
      title: 'ギャラリー',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'alt', type: 'string', title: '代替テキスト' }]
      }]
    }),

    // 本文（Portable Text）
    defineField({ name: 'body', title: '本文', type: 'blockContent' }),

    // 任意：タグ
    defineField({ name: 'tags', title: 'タグ', type: 'array', of: [{type:'string'}] }),

    // 任意：翻訳元参照
    defineField({
      name: 'translationOf',
      title: '翻訳元',
      type: 'reference',
      to: [{ type: 'article' }]
    })
  ],

  preview: {
    select: { title: 'title', media: 'mainImage', subtitle: 'lang' }
  }
})