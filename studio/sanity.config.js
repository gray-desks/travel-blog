import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'travel_studio',
  title: 'Travel Blog Studio',
  projectId: 'c3twwalw',  // ← 固定（envは使わない）
  dataset: 'production',  // ← 固定
  plugins: [deskTool()],
  schema: {types: schemaTypes}
})