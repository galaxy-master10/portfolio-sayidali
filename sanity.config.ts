import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'sayidali-portfolio',
  title: 'Sayidali Portfolio',
  projectId: 'bxzly96g',
  dataset: 'production',
  plugins: [deskTool(), visionTool(), codeInput()], // Added codeInput here
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})