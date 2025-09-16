import {defineType, defineField} from 'sanity'

/*
  Article ドキュメントスキーマ
  - 旅ブログの記事（title/slug/本文/画像 等）を管理します。
  - ここで定義したフィールドは Studio の入力フォームと API（GROQ）に反映されます。
  - フロント側では `lib/queries.js` の GROQ からこれらの項目を参照します。
*/

/*
  簡易 slugify 関数（外部依存なし）
  - Unicode 正規化 → 小文字化 → 記号除去 → 空白をハイフンに → 連続ハイフン圧縮 → 端のハイフン除去
  - 日本語など非 ASCII タイトルもそのまま保持（URL では自動エンコードされます）
  - タイトルが空や記号のみで slug が空になった場合のみ、フォールバック値を生成
    例: post-YYYYMMDD-xxxx
*/
const slugify = (input) => {
  const base = String(input || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '') // 文字/数字・空白・ハイフン以外を除去（Unicode対応）
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  // 日本語など非 ASCII も含め、生成結果があればそのまま使用
  if (base) return base
  const ts = new Date().toISOString().slice(0,10).replace(/-/g,'')
  return `post-${ts}-${Math.random().toString(36).slice(2,6)}`
}

// 都道府県の選択肢（日本語表示・そのまま保存）
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
  // スキーマ内部名（API 名）/ Studio 表示名 / ドキュメント種別
  name: 'article',
  title: 'Article',
  type: 'document',

  // ドキュメント初期値
  // - 言語: ja 固定
  // - 公開日時: 新規作成時に現在時刻を自動入力（ISO文字列）
  initialValue: () => ({
    lang: 'ja',
    publishedAt: new Date().toISOString()
  }),

  fields: [
    // タイトル（必須）: 一覧/詳細で表示される主要テキスト
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: r => r.required()
    }),

    // スラッグ（任意）: URL 用。英数字ハイフンに自動変換（日本語のみでもフォールバック生成）
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        // 生成元はタイトル
        source: doc => doc.title,
        maxLength: 96,
        slugify
      },
      // 一意性チェックは Sanity 既定ロジックに委譲
      // 入力は任意（自動生成ボタンでも、空のままでもOK）
      isUnique: (value, ctx) => ctx.defaultIsUnique(value, ctx)
    }),

    // 公開日時（任意）: 一覧の並び替え等で使用想定
    defineField({ name: 'publishedAt', title: '公開日時', type: 'datetime' }),

    // 言語（任意）: 既定は ja（initialValue で設定）
    defineField({ name: 'lang', title: 'Language', type: 'string' }),

    // 分類（任意）: 記事のタイプ分類（一覧フィルタで利用）
    defineField({
      name: 'type',
      title: '分類',
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

    // 都道府県（任意）: 日本国内のロケーション分類（一覧フィルタで利用）
    defineField({
      name: 'prefecture',
      title: '都道府県',
      type: 'string',
      options: { list: PREFS.map(p => ({title: p, value: p})) }
    }),

    // 場所名（任意）: 施設名やスポット名など自由入力
    defineField({ name: 'placeName', title: '場所名', type: 'string' }),

    // メイン画像: 記事のキービジュアル。hotspot 有効
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: { hotspot: true }
    }),

    // ギャラリー（任意）: 追補の画像群
    defineField({
      name: 'gallery',
      title: 'ギャラリー',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true }
      }]
    }),

    // 本文（Portable Text）: `blockContent` スキーマに基づくリッチテキスト/画像の配列
    // - 見出し、段落、リンク、画像などを Studio で柔軟に編集可能
    defineField({ name: 'body', title: '本文', type: 'blockContent' }),

    // タグ（任意）: 単純な文字列タグの配列
    defineField({ name: 'tags', title: 'タグ', type: 'array', of: [{type:'string'}] }),

    // 翻訳元参照（任意）: 多言語展開時に、元記事（同スキーマ）を参照
    defineField({
      name: 'translationOf',
      title: '翻訳元',
      type: 'reference',
      to: [{ type: 'article' }]
    })
  ],

  preview: {
    // Studio のリスト表示などで用いるプレビュー項目
    select: { title: 'title', media: 'mainImage', subtitle: 'lang' }
  }
})
