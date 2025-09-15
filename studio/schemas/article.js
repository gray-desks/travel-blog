import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: r => r.required()
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: r => r.required()
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日時',
      type: 'datetime'
    }),
    defineField({
      name: 'excerpt',
      title: '概要（抜粋）',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'blockContent'
    })
  ],
  preview: {
    select: {title: 'title', media: 'mainImage', subtitle: 'slug.current'}
  }
})