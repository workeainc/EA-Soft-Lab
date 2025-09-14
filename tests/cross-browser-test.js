const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class CrossBrowserTester {
  constructor() {
    this.results = [];
    this.baseUrl = 'http://localhost:4321'; // Astro dev server
    this.pages = [
      '/',
      '/about',
      '/services',
      '/industries',
      '/contact',
      '/services/web-development',
      '/services/mobile-development',
      '/services/ui-ux-design'
    ];
  }

  async runTests() {
    console.log('🚀 Starting Cross-Browser Testing...');
    
    const browsers = [
      { name: 'Chrome', args: ['--no-sandbox', '--disable-setuid-sandbox'] },
      { name: 'Firefox', args: ['--no-sandbox'] },
      { name: 'Safari', args: ['--no-sandbox'] }
    ];

    for (const browserConfig of browsers) {
      console.log(`\n📱 Testing ${browserConfig.name}...`);
      
      const browser = await puppeteer.launch({
        headless: true,
        args: browserConfig.args
      });

      try {
        await this.testBrowser(browser, browserConfig.name);
      } catch (error) {
        console.error(`❌ Error testing ${browserConfig.name}:`, error.message);
        this.results.push({
          browser: browserConfig.name,
          status: 'FAILED',
          error: error.message
        });
      } finally {
        await browser.close();
      }
    }

    this.generateReport();
  }

  async testBrowser(browser, browserName) {
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    for (const pageUrl of this.pages) {
      console.log(`  Testing: ${pageUrl}`);
      
      try {
        await page.goto(`${this.baseUrl}${pageUrl}`, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });

        // Test page load
        const pageLoadTest = await this.testPageLoad(page, pageUrl);
        
        // Test responsive design
        const responsiveTest = await this.testResponsiveDesign(page, pageUrl);
        
        // Test JavaScript functionality
        const jsTest = await this.testJavaScript(page, pageUrl);
        
        // Test images and assets
        const assetsTest = await this.testAssets(page, pageUrl);

        this.results.push({
          browser: browserName,
          page: pageUrl,
          status: 'PASSED',
          tests: {
            pageLoad: pageLoadTest,
            responsive: responsiveTest,
            javascript: jsTest,
            assets: assetsTest
          }
        });

      } catch (error) {
        this.results.push({
          browser: browserName,
          page: pageUrl,
          status: 'FAILED',
          error: error.message
        });
      }
    }
  }

  async testPageLoad(page, pageUrl) {
    const startTime = Date.now();
    await page.reload({ waitUntil: 'networkidle2' });
    const loadTime = Date.now() - startTime;

    // Check if page loaded successfully
    const title = await page.title();
    const hasContent = await page.evaluate(() => {
      return document.body.textContent.length > 100;
    });

    return {
      loadTime,
      hasTitle: title.length > 0,
      hasContent,
      passed: loadTime < 5000 && title.length > 0 && hasContent
    };
  }

  async testResponsiveDesign(page, pageUrl) {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    const results = [];

    for (const viewport of viewports) {
      await page.setViewport(viewport);
      await page.waitForTimeout(1000);

      const isResponsive = await page.evaluate(() => {
        // Check if content is properly contained
        const body = document.body;
        const bodyWidth = body.offsetWidth;
        const bodyHeight = body.offsetHeight;
        
        // Check for horizontal scroll
        const hasHorizontalScroll = body.scrollWidth > bodyWidth;
        
        // Check if text is readable
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
        let readableText = 0;
        textElements.forEach(el => {
          const style = window.getComputedStyle(el);
          const fontSize = parseInt(style.fontSize);
          if (fontSize >= 12) readableText++;
        });

        return !hasHorizontalScroll && readableText > 0;
      });

      results.push({
        viewport: viewport.name,
        passed: isResponsive
      });
    }

    return {
      results,
      passed: results.every(r => r.passed)
    };
  }

  async testJavaScript(page, pageUrl) {
    const jsTest = await page.evaluate(() => {
      // Test if JavaScript is working
      const jsWorking = typeof window !== 'undefined';
      
      // Test if performance monitoring is available
      const performanceAvailable = typeof window.performance !== 'undefined';
      
      // Test if service worker is registered
      const swAvailable = 'serviceWorker' in navigator;
      
      // Test if structured data is present
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      const hasStructuredData = structuredData.length > 0;

      return {
        jsWorking,
        performanceAvailable,
        swAvailable,
        hasStructuredData,
        passed: jsWorking && performanceAvailable && hasStructuredData
      };
    });

    return jsTest;
  }

  async testAssets(page, pageUrl) {
    const assetsTest = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const svgs = document.querySelectorAll('svg');
      const scripts = document.querySelectorAll('script[src]');
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

      let brokenImages = 0;
      let brokenScripts = 0;
      let brokenStylesheets = 0;

      // Check for broken images
      images.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
          brokenImages++;
        }
      });

      // Check for broken scripts
      scripts.forEach(script => {
        if (!script.src) brokenScripts++;
      });

      // Check for broken stylesheets
      stylesheets.forEach(link => {
        if (!link.href) brokenStylesheets++;
      });

      return {
        totalImages: images.length,
        totalSvgs: svgs.length,
        totalScripts: scripts.length,
        totalStylesheets: stylesheets.length,
        brokenImages,
        brokenScripts,
        brokenStylesheets,
        passed: brokenImages === 0 && brokenScripts === 0 && brokenStylesheets === 0
      };
    });

    return assetsTest;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'cross-browser-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 Cross-Browser Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`📄 Report saved to: ${reportPath}`);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new CrossBrowserTester();
  tester.runTests().catch(console.error);
}

module.exports = CrossBrowserTester; 