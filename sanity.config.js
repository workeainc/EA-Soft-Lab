import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemas'

export default defineConfig({
  name: 'default',
  title: 'EA Soft Lab CMS',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'oxjbgkqf',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
}) 