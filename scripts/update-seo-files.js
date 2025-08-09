#!/usr/bin/env node

/**
 * Script to update sitemap and robots.txt when new pages are added
 * Usage: node scripts/update-seo-files.js
 */

import { discoverPages, generateSitemapXML, generateRobotsTxt } from '../src/utils/pageDiscovery.js';
import fs from 'fs/promises';
import path from 'path';

const SITE_URL = 'https://easoftlab.com';

async function updateSEOFiles() {
  try {
    console.log('🔄 Updating SEO files...');
    
    // Discover all pages
    const pages = await discoverPages();
    console.log(`📄 Found ${pages.length} pages`);
    
    // Ensure dist directory exists
    const distDir = 'dist';
    try {
      await fs.access(distDir);
    } catch {
      console.log('📁 Creating dist directory...');
      await fs.mkdir(distDir, { recursive: true });
    }
    
    // Generate sitemap
    const sitemapXML = generateSitemapXML(pages, SITE_URL);
    await fs.writeFile('dist/sitemap.xml', sitemapXML);
    console.log('✅ Sitemap updated');
    
    // Generate robots.txt
    const robotsTxt = generateRobotsTxt(pages, SITE_URL);
    await fs.writeFile('dist/robots.txt', robotsTxt);
    console.log('✅ Robots.txt updated');
    
    // Log discovered pages
    console.log('\n📋 Discovered pages:');
    pages.forEach(page => {
      console.log(`  - ${page.url} (Priority: ${page.priority}, Change: ${page.changefreq})`);
    });
    
    console.log('\n🎉 SEO files updated successfully!');
  } catch (error) {
    console.error('❌ Error updating SEO files:', error);
    
    // In CI environment, don't fail the build
    if (process.env.CI) {
      console.log('⚠️ SEO files update failed in CI environment, but continuing build...');
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateSEOFiles();
}

export { updateSEOFiles };
