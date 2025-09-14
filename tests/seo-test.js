const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class SEOTester {
  constructor() {
    this.results = [];
    this.baseUrl = 'http://localhost:4321';
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
    console.log('🔍 Starting SEO Validation Testing...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      for (const pageUrl of this.pages) {
        console.log(`\n🔍 Testing SEO: ${pageUrl}`);
        await this.testPageSEO(browser, pageUrl);
      }
    } catch (error) {
      console.error('❌ Error during SEO testing:', error.message);
    } finally {
      await browser.close();
    }

    this.generateReport();
  }

  async testPageSEO(browser, pageUrl) {
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      await page.goto(`${this.baseUrl}${pageUrl}`, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Test meta tags
      const metaTest = await this.testMetaTags(page);
      
      // Test structured data
      const structuredDataTest = await this.testStructuredData(page);
      
      // Test sitemap
      const sitemapTest = await this.testSitemap(page);
      
      // Test robots.txt
      const robotsTest = await this.testRobotsTxt(page);
      
      // Test canonical URLs
      const canonicalTest = await this.testCanonicalUrls(page);
      
      // Test Open Graph tags
      const ogTest = await this.testOpenGraph(page);

      this.results.push({
        page: pageUrl,
        status: 'PASSED',
        metaTest,
        structuredDataTest,
        sitemapTest,
        robotsTest,
        canonicalTest,
        ogTest
      });

    } catch (error) {
      this.results.push({
        page: pageUrl,
        status: 'FAILED',
        error: error.message
      });
    }

    await page.close();
  }

  async testMetaTags(page) {
    const meta = await page.evaluate(() => {
      // Check for essential meta tags
      const title = document.title;
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
      const author = document.querySelector('meta[name="author"]')?.getAttribute('content');
      const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content');
      const charset = document.querySelector('meta[charset]')?.getAttribute('charset');
      
      // Check for robots meta tag
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
      
      // Check for language
      const lang = document.documentElement.getAttribute('lang');
      
      // Validate title length
      const titleLength = title.length;
      const titleValid = titleLength >= 30 && titleLength <= 60;
      
      // Validate description length
      const descriptionLength = description ? description.length : 0;
      const descriptionValid = descriptionLength >= 120 && descriptionLength <= 160;
      
      return {
        hasTitle: title.length > 0,
        titleLength,
        titleValid,
        hasDescription: description !== null,
        descriptionLength,
        descriptionValid,
        hasKeywords: keywords !== null,
        hasAuthor: author !== null,
        hasViewport: viewport !== null,
        hasCharset: charset !== null,
        hasRobots: robots !== null,
        hasLanguage: lang !== null,
        passed: titleValid && descriptionValid && viewport !== null && charset !== null
      };
    });

    return meta;
  }

  async testStructuredData(page) {
    const structuredData = await page.evaluate(() => {
      // Check for JSON-LD structured data
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
      let validStructuredData = 0;
      let structuredDataTypes = [];
      
      jsonLdScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          if (data['@type']) {
            validStructuredData++;
            structuredDataTypes.push(data['@type']);
          }
        } catch (error) {
          // Invalid JSON
        }
      });
      
      // Check for microdata
      const microdataElements = document.querySelectorAll('[itemtype]');
      
      // Check for RDFa
      const rdfaElements = document.querySelectorAll('[typeof]');
      
      // Check for specific structured data types
      const hasOrganization = structuredDataTypes.includes('Organization');
      const hasWebSite = structuredDataTypes.includes('WebSite');
      const hasService = structuredDataTypes.includes('Service');
      const hasArticle = structuredDataTypes.includes('Article');
      const hasBreadcrumbList = structuredDataTypes.includes('BreadcrumbList');
      
      return {
        totalStructuredData: jsonLdScripts.length,
        validStructuredData,
        structuredDataTypes,
        microdataElements: microdataElements.length,
        rdfaElements: rdfaElements.length,
        hasOrganization,
        hasWebSite,
        hasService,
        hasArticle,
        hasBreadcrumbList,
        passed: validStructuredData > 0 && (hasOrganization || hasWebSite)
      };
    });

    return structuredData;
  }

  async testSitemap(page) {
    const sitemap = await page.evaluate(() => {
      // Check for sitemap link in robots.txt
      const robotsLink = document.querySelector('link[rel="sitemap"]');
      
      // Check for XML sitemap
      const sitemapUrl = '/sitemap.xml';
      
      return {
        hasSitemapLink: robotsLink !== null,
        sitemapUrl,
        passed: true // Will be validated by external check
      };
    });

    // Test sitemap accessibility
    try {
      const sitemapResponse = await page.goto(`${this.baseUrl}/sitemap.xml`);
      sitemap.status = sitemapResponse.status();
      sitemap.passed = sitemap.status === 200;
    } catch (error) {
      sitemap.status = 404;
      sitemap.passed = false;
    }

    return sitemap;
  }

  async testRobotsTxt(page) {
    const robots = await page.evaluate(() => {
      // Check for robots meta tag
      const robotsMeta = document.querySelector('meta[name="robots"]');
      const robotsContent = robotsMeta?.getAttribute('content');
      
      return {
        hasRobotsMeta: robotsMeta !== null,
        robotsContent,
        passed: robotsMeta !== null
      };
    });

    // Test robots.txt accessibility
    try {
      const robotsResponse = await page.goto(`${this.baseUrl}/robots.txt`);
      robots.status = robotsResponse.status();
      robots.passed = robots.status === 200;
    } catch (error) {
      robots.status = 404;
      robots.passed = false;
    }

    return robots;
  }

  async testCanonicalUrls(page) {
    const canonical = await page.evaluate(() => {
      // Check for canonical URL
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const canonicalUrl = canonicalLink?.getAttribute('href');
      
      // Check current URL
      const currentUrl = window.location.href;
      
      // Check for duplicate content
      const duplicateContent = document.querySelectorAll('meta[name="robots"][content*="noindex"]');
      
      return {
        hasCanonical: canonicalLink !== null,
        canonicalUrl,
        currentUrl,
        hasNoIndex: duplicateContent.length > 0,
        passed: canonicalLink !== null
      };
    });

    return canonical;
  }

  async testOpenGraph(page) {
    const openGraph = await page.evaluate(() => {
      // Check for Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
      const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content');
      const ogSiteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute('content');
      
      // Check for Twitter Card tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');
      const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
      
      return {
        hasOgTitle: ogTitle !== null,
        hasOgDescription: ogDescription !== null,
        hasOgImage: ogImage !== null,
        hasOgUrl: ogUrl !== null,
        hasOgType: ogType !== null,
        hasOgSiteName: ogSiteName !== null,
        hasTwitterCard: twitterCard !== null,
        hasTwitterTitle: twitterTitle !== null,
        hasTwitterDescription: twitterDescription !== null,
        hasTwitterImage: twitterImage !== null,
        passed: ogTitle !== null && ogDescription !== null && ogImage !== null
      };
    });

    return openGraph;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      seoScore: this.calculateSEOScore(),
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'seo-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 SEO Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`🔍 SEO Score: ${report.seoScore}%`);
    console.log(`📄 Report saved to: ${reportPath}`);
  }

  calculateSEOScore() {
    const passedTests = this.results.filter(r => r.status === 'PASSED');
    const totalTests = this.results.length;
    
    if (totalTests === 0) return 0;
    
    const score = Math.round((passedTests.length / totalTests) * 100);
    return score;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new SEOTester();
  tester.runTests().catch(console.error);
}

module.exports = SEOTester; 