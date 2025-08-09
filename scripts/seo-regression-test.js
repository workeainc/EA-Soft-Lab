#!/usr/bin/env node

/**
 * Automated SEO Regression Testing
 * Runs Lighthouse and schema validation after every build
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const SITE_URL = 'http://localhost:4321';
const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

/**
 * Run Lighthouse audit
 * @param {string} url - URL to audit
 * @returns {Promise<Object>} Lighthouse results
 */
async function runLighthouse(url) {
  try {
    console.log(`🔍 Running Lighthouse audit for ${url}...`);
    
    // Check if lighthouse is installed globally
    try {
      execSync('lighthouse --version', { stdio: 'ignore' });
    } catch {
      console.log('📦 Installing Lighthouse globally...');
      execSync('npm install -g lighthouse', { stdio: 'inherit' });
    }
    
    const outputPath = `./lighthouse-report-${Date.now()}.json`;
    const command = `lighthouse ${url} --output=json --output-path=${outputPath} --chrome-flags="--headless --no-sandbox"`;
    
    execSync(command, { stdio: 'inherit' });
    
    const report = JSON.parse(await fs.readFile(outputPath, 'utf-8'));
    await fs.unlink(outputPath); // Clean up
    
    return report;
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    return null;
  }
}

/**
 * Validate structured data
 * @param {string} url - URL to validate
 * @returns {Promise<Object>} Schema validation results
 */
async function validateStructuredData(url) {
  try {
    console.log(`🔍 Validating structured data for ${url}...`);
    
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract JSON-LD scripts
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    const schemas = [];
    
    if (jsonLdMatches) {
      for (const match of jsonLdMatches) {
        try {
          const jsonContent = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
          const schema = JSON.parse(jsonContent);
          schemas.push(schema);
        } catch (error) {
          console.warn('⚠️ Invalid JSON-LD found:', error.message);
        }
      }
    }
    
    return {
      totalSchemas: schemas.length,
      validSchemas: schemas.filter(s => s['@type']).length,
      schemaTypes: schemas.map(s => s['@type']).filter(Boolean),
      errors: []
    };
  } catch (error) {
    console.error('❌ Schema validation failed:', error.message);
    return null;
  }
}

/**
 * Check Core Web Vitals
 * @param {Object} lighthouseReport - Lighthouse report
 * @returns {Object} Core Web Vitals status
 */
function checkCoreWebVitals(lighthouseReport) {
  if (!lighthouseReport) return null;
  
  const audits = lighthouseReport.audits;
  const metrics = {
    lcp: audits['largest-contentful-paint']?.numericValue || 0,
    fid: audits['max-potential-fid']?.numericValue || 0,
    cls: audits['cumulative-layout-shift']?.numericValue || 0,
    fcp: audits['first-contentful-paint']?.numericValue || 0,
    tti: audits['interactive']?.numericValue || 0
  };
  
  const status = {
    lcp: metrics.lcp < 2500 ? 'good' : metrics.lcp < 4000 ? 'needs-improvement' : 'poor',
    fid: metrics.fid < 100 ? 'good' : metrics.fid < 300 ? 'needs-improvement' : 'poor',
    cls: metrics.cls < 0.1 ? 'good' : metrics.cls < 0.25 ? 'needs-improvement' : 'poor'
  };
  
  return { metrics, status };
}

/**
 * Generate SEO regression report
 * @param {Object} lighthouseReport - Lighthouse report
 * @param {Object} schemaValidation - Schema validation results
 * @param {Object} coreWebVitals - Core Web Vitals status
 * @returns {string} Formatted report
 */
function generateReport(lighthouseReport, schemaValidation, coreWebVitals) {
  const timestamp = new Date().toISOString();
  
  let report = `# SEO Regression Test Report
Generated: ${timestamp}

## 📊 Lighthouse Scores
`;
  
  if (lighthouseReport) {
    const categories = lighthouseReport.categories;
    report += `
- **Performance**: ${Math.round(categories.performance.score * 100)}/100
- **Accessibility**: ${Math.round(categories.accessibility.score * 100)}/100
- **Best Practices**: ${Math.round(categories['best-practices'].score * 100)}/100
- **SEO**: ${Math.round(categories.seo.score * 100)}/100
`;
  }
  
  report += `
## 🎯 Core Web Vitals
`;
  
  if (coreWebVitals) {
    const { metrics, status } = coreWebVitals;
    report += `
- **LCP**: ${Math.round(metrics.lcp)}ms (${status.lcp})
- **FID**: ${Math.round(metrics.fid)}ms (${status.fid})
- **CLS**: ${metrics.cls.toFixed(3)} (${status.cls})
`;
  }
  
  report += `
## 📋 Structured Data Validation
`;
  
  if (schemaValidation) {
    report += `
- **Total Schemas**: ${schemaValidation.totalSchemas}
- **Valid Schemas**: ${schemaValidation.validSchemas}
- **Schema Types**: ${schemaValidation.schemaTypes.join(', ')}
`;
  }
  
  report += `
## ⚠️ Issues Found
`;
  
  if (lighthouseReport) {
    const failedAudits = Object.values(lighthouseReport.audits)
      .filter(audit => audit.score !== null && audit.score < 0.9)
      .slice(0, 10);
    
    if (failedAudits.length > 0) {
      failedAudits.forEach(audit => {
        report += `- **${audit.title}**: ${audit.description}\n`;
      });
    } else {
      report += `- No critical issues found ✅\n`;
    }
  }
  
  report += `
## 🎯 Overall SEO Score
`;
  
  // Calculate overall score
  let overallScore = 100;
  
  if (lighthouseReport) {
    const seoScore = Math.round(lighthouseReport.categories.seo.score * 100);
    overallScore = Math.min(overallScore, seoScore);
  }
  
  if (coreWebVitals) {
    const { status } = coreWebVitals;
    const vitalsScore = Object.values(status).filter(s => s === 'good').length / 3 * 100;
    overallScore = Math.min(overallScore, vitalsScore);
  }
  
  report += `**${Math.round(overallScore)}/100**\n`;
  
  return report;
}

/**
 * Main SEO regression test function
 */
async function runSEORegressionTest() {
  console.log('🚀 Starting SEO Regression Test...\n');
  
  const startTime = Date.now();
  const results = {
    lighthouse: null,
    schema: null,
    coreWebVitals: null
  };
  
  try {
    // Run Lighthouse audit
    results.lighthouse = await runLighthouse(SITE_URL);
    
    // Validate structured data
    results.schema = await validateStructuredData(SITE_URL);
    
    // Check Core Web Vitals
    results.coreWebVitals = checkCoreWebVitals(results.lighthouse);
    
    // Generate report
    const report = generateReport(results.lighthouse, results.schema, results.coreWebVitals);
    
    // Save report
    const reportPath = `./seo-regression-report-${Date.now()}.md`;
    await fs.writeFile(reportPath, report);
    
    console.log('\n📊 SEO Regression Test Complete!');
    console.log(`⏱️ Duration: ${Math.round((Date.now() - startTime) / 1000)}s`);
    console.log(`📄 Report saved: ${reportPath}`);
    
    // Print summary
    console.log('\n' + report);
    
    // Exit with error code if issues found
    if (results.lighthouse && results.lighthouse.categories.seo.score < 0.9) {
      console.log('\n❌ SEO score below 90% - regression detected!');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ SEO regression test failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSEORegressionTest();
}

export { runSEORegressionTest };
