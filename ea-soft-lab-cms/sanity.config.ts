import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'EA Soft Lab CMS',

  projectId: 'oxjbgkqf',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Authentication configuration
  auth: {
    loginMethod: 'token',
    redirectOnSingle: true,
  },
})
