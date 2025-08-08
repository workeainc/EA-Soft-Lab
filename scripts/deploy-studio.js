#!/usr/bin/env node

import { execSync } from 'child_process'
import { createClient } from '@sanity/client'

console.log('🚀 Starting Sanity Studio deployment...')

// Initialize Sanity client
const client = createClient({
  projectId: 'oxjbgkqf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function deployStudio() {
  try {
    console.log('📦 Building Sanity Studio...')
    
    // Build the studio
    execSync('npm run studio:build', { stdio: 'inherit' })
    
    console.log('🚀 Deploying Sanity Studio...')
    
    // Deploy the studio
    execSync('npm run studio:deploy', { stdio: 'inherit' })
    
    console.log('✅ Sanity Studio deployed successfully!')
    console.log('🌐 Your studio should be available at: https://easoftlab.com/studio')
    
    // Test the connection
    console.log('🔍 Testing Sanity connection...')
    const testQuery = await client.fetch('*[_type == "company"][0]')
    
    if (testQuery) {
      console.log('✅ Sanity connection successful!')
      console.log('📊 Found company data:', testQuery.name)
    } else {
      console.log('⚠️  No company data found. You may need to seed content.')
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    console.log('\n🔧 Troubleshooting steps:')
    console.log('1. Make sure you have SANITY_API_TOKEN set in your environment')
    console.log('2. Verify your Sanity project ID is correct: oxjbgkqf')
    console.log('3. Check that you have write permissions to the project')
    console.log('4. Try running: npm run studio:deploy manually')
  }
}

deployStudio()
