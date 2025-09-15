import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import deskStructure from './deskStructure'

// Sanity Studio のメイン設定
// - projectId / dataset は固定値（公開読み取り前提、Secretは使わない）
// - deskTool にデスク構成（左サイドバー）を渡す
// - schemas/index.js で集約したスキーマ群を登録
export default defineConfig({
  name: 'travel_studio',               // Studio の内部識別子
  title: 'Travel Blog Studio',         // Studio の表示タイトル
  projectId: 'c3twwalw',               // 固定（env は使わない）
  dataset: 'production',               // 固定（公開 read-only）
  plugins: [deskTool({ structure: deskStructure })],
  schema: {types: schemaTypes}
})
