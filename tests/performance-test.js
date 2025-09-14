const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PerformanceTester {
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
    console.log('⚡ Starting Performance Testing...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      for (const pageUrl of this.pages) {
        console.log(`\n📊 Testing performance: ${pageUrl}`);
        await this.testPagePerformance(browser, pageUrl);
      }
    } catch (error) {
      console.error('❌ Error during performance testing:', error.message);
    } finally {
      await browser.close();
    }

    this.generateReport();
  }

  async testPagePerformance(browser, pageUrl) {
    const page = await browser.newPage();
    
    // Enable performance monitoring
    await page.setCacheEnabled(false);
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      // Navigate to page
      await page.goto(`${this.baseUrl}${pageUrl}`, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Wait for page to fully load
      await page.waitForTimeout(2000);

      // Get performance metrics
      const performanceMetrics = await this.getPerformanceMetrics(page);
      
      // Test Core Web Vitals
      const coreWebVitals = await this.testCoreWebVitals(page);
      
      // Test resource optimization
      const resourceOptimization = await this.testResourceOptimization(page);
      
      // Test caching
      const cachingTest = await this.testCaching(page);
      
      // Test image optimization
      const imageOptimization = await this.testImageOptimization(page);

      this.results.push({
        page: pageUrl,
        status: 'PASSED',
        performanceMetrics,
        coreWebVitals,
        resourceOptimization,
        cachingTest,
        imageOptimization
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

  async getPerformanceMetrics(page) {
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      return {
        // Navigation timing
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
        loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        firstByte: navigation ? navigation.responseStart - navigation.requestStart : 0,
        
        // Resource timing
        totalResources: performance.getEntriesByType('resource').length,
        totalSize: performance.getEntriesByType('resource').reduce((total, resource) => {
          return total + (resource.transferSize || 0);
        }, 0),
        
        // Memory usage
        memoryUsage: performance.memory ? {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        } : null
      };
    });

    return metrics;
  }

  async testCoreWebVitals(page) {
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        // LCP (Largest Contentful Paint)
        let lcp = 0;
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        let fid = 0;
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          fid = entries[0].processingStart - entries[0].startTime;
        }).observe({ entryTypes: ['first-input'] });

        // CLS (Cumulative Layout Shift)
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });

        // FCP (First Contentful Paint)
        let fcp = 0;
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          fcp = entries[0].startTime;
        }).observe({ entryTypes: ['paint'] });

        // TTI (Time to Interactive)
        let tti = 0;
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          tti = entries[entries.length - 1].startTime;
        }).observe({ entryTypes: ['measure'] });

        // Wait for metrics to be collected
        setTimeout(() => {
          resolve({
            lcp,
            fid,
            cls,
            fcp,
            tti,
            // Performance scores
            lcpScore: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor',
            fidScore: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor',
            clsScore: cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor',
            fcpScore: fcp < 1800 ? 'good' : fcp < 3000 ? 'needs-improvement' : 'poor',
            ttiScore: tti < 3800 ? 'good' : tti < 7300 ? 'needs-improvement' : 'poor'
          });
        }, 5000);
      });
    });

    return vitals;
  }

  async testResourceOptimization(page) {
    const optimization = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      
      // Check for minified resources
      const minifiedResources = resources.filter(resource => {
        const name = resource.name.toLowerCase();
        return name.includes('.min.') || name.includes('.minified.');
      });
      
      // Check for compressed resources
      const compressedResources = resources.filter(resource => {
        return resource.transferSize < resource.encodedBodySize;
      });
      
      // Check for lazy loading
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      // Check for preload/prefetch
      const preloadLinks = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
      
      return {
        totalResources: resources.length,
        minifiedResources: minifiedResources.length,
        compressedResources: compressedResources.length,
        lazyImages: lazyImages.length,
        preloadLinks: preloadLinks.length,
        passed: minifiedResources.length > 0 && compressedResources.length > 0
      };
    });

    return optimization;
  }

  async testCaching(page) {
    const caching = await page.evaluate(() => {
      // Check for service worker
      const hasServiceWorker = 'serviceWorker' in navigator;
      
      // Check for cache headers
      const cacheHeaders = document.querySelectorAll('meta[http-equiv="Cache-Control"]');
      
      // Check for ETags
      const hasETags = document.querySelectorAll('meta[name="ETag"]').length > 0;
      
      // Check for CDN usage
      const resources = performance.getEntriesByType('resource');
      const cdnResources = resources.filter(resource => {
        const name = resource.name.toLowerCase();
        return name.includes('cdn') || name.includes('cloudflare') || name.includes('aws');
      });
      
      return {
        hasServiceWorker,
        cacheHeaders: cacheHeaders.length,
        hasETags,
        cdnResources: cdnResources.length,
        passed: hasServiceWorker || cacheHeaders.length > 0
      };
    });

    return caching;
  }

  async testImageOptimization(page) {
    const imageOptimization = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      
      // Check for WebP support
      const webpImages = Array.from(images).filter(img => {
        return img.src.includes('.webp') || img.srcset?.includes('.webp');
      });
      
      // Check for responsive images
      const responsiveImages = Array.from(images).filter(img => {
        return img.srcset || img.sizes;
      });
      
      // Check for lazy loading
      const lazyImages = Array.from(images).filter(img => {
        return img.loading === 'lazy';
      });
      
      // Check for alt text
      const imagesWithAlt = Array.from(images).filter(img => {
        return img.alt && img.alt.trim().length > 0;
      });
      
      return {
        totalImages: images.length,
        webpImages: webpImages.length,
        responsiveImages: responsiveImages.length,
        lazyImages: lazyImages.length,
        imagesWithAlt: imagesWithAlt.length,
        passed: lazyImages.length > 0 && imagesWithAlt.length === images.length
      };
    });

    return imageOptimization;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      averageLoadTime: this.calculateAverageLoadTime(),
      coreWebVitalsSummary: this.summarizeCoreWebVitals(),
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'performance-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 Performance Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`⏱️ Average Load Time: ${report.averageLoadTime}ms`);
    console.log(`📄 Report saved to: ${reportPath}`);
  }

  calculateAverageLoadTime() {
    const loadTimes = this.results
      .filter(r => r.status === 'PASSED' && r.performanceMetrics)
      .map(r => r.performanceMetrics.loadComplete);
    
    return loadTimes.length > 0 
      ? Math.round(loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length)
      : 0;
  }

  summarizeCoreWebVitals() {
    const vitals = this.results
      .filter(r => r.status === 'PASSED' && r.coreWebVitals)
      .map(r => r.coreWebVitals);

    const summary = {
      lcp: { good: 0, needsImprovement: 0, poor: 0 },
      fid: { good: 0, needsImprovement: 0, poor: 0 },
      cls: { good: 0, needsImprovement: 0, poor: 0 },
      fcp: { good: 0, needsImprovement: 0, poor: 0 },
      tti: { good: 0, needsImprovement: 0, poor: 0 }
    };

    vitals.forEach(vital => {
      summary.lcp[vital.lcpScore]++;
      summary.fid[vital.fidScore]++;
      summary.cls[vital.clsScore]++;
      summary.fcp[vital.fcpScore]++;
      summary.tti[vital.ttiScore]++;
    });

    return summary;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new PerformanceTester();
  tester.runTests().catch(console.error);
}

module.exports = PerformanceTester; 