import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'travel_studio',
  title: 'Travel Blog Studio',
  projectId: 'c3twwalw',  // ← 固定（envは使わない）
  dataset: 'production',  // ← 固定
  plugins: [deskTool({ structure: deskStructure })],
  schema: {types: schemaTypes}
})