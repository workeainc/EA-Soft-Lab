const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class MobileTester {
  constructor() {
    this.results = [];
    this.baseUrl = 'http://localhost:4321';
    this.devices = [
      { name: 'iPhone 12', width: 390, height: 844, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1' },
      { name: 'Samsung Galaxy S20', width: 360, height: 800, userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36' },
      { name: 'iPad', width: 768, height: 1024, userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1' },
      { name: 'Desktop Mobile View', width: 375, height: 667, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    ];
    
    this.pages = [
      '/',
      '/about',
      '/services',
      '/contact',
      '/services/web-development',
      '/services/mobile-development'
    ];
  }

  async runTests() {
    console.log('📱 Starting Mobile Responsiveness Testing...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      for (const device of this.devices) {
        console.log(`\n📱 Testing ${device.name}...`);
        await this.testDevice(browser, device);
      }
    } catch (error) {
      console.error('❌ Error during mobile testing:', error.message);
    } finally {
      await browser.close();
    }

    this.generateReport();
  }

  async testDevice(browser, device) {
    const page = await browser.newPage();
    
    // Set device configuration
    await page.setUserAgent(device.userAgent);
    await page.setViewport({ width: device.width, height: device.height });

    for (const pageUrl of this.pages) {
      console.log(`  Testing: ${pageUrl}`);
      
      try {
        await page.goto(`${this.baseUrl}${pageUrl}`, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });

        const tests = {
          viewport: await this.testViewport(page, device),
          touchTargets: await this.testTouchTargets(page),
          navigation: await this.testNavigation(page),
          content: await this.testContent(page),
          performance: await this.testPerformance(page)
        };

        this.results.push({
          device: device.name,
          page: pageUrl,
          viewport: `${device.width}x${device.height}`,
          status: 'PASSED',
          tests
        });

      } catch (error) {
        this.results.push({
          device: device.name,
          page: pageUrl,
          viewport: `${device.width}x${device.height}`,
          status: 'FAILED',
          error: error.message
        });
      }
    }

    await page.close();
  }

  async testViewport(page, device) {
    const viewportTest = await page.evaluate((device) => {
      const body = document.body;
      const html = document.documentElement;
      
      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const hasViewportMeta = viewportMeta !== null;
      
      // Check if content fits viewport
      const bodyWidth = body.offsetWidth;
      const bodyHeight = body.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Check for horizontal scroll
      const hasHorizontalScroll = body.scrollWidth > viewportWidth;
      
      // Check for vertical scroll (should be allowed)
      const hasVerticalScroll = body.scrollHeight > viewportHeight;
      
      return {
        hasViewportMeta,
        contentFitsWidth: !hasHorizontalScroll,
        hasVerticalScroll,
        bodyWidth,
        bodyHeight,
        viewportWidth,
        viewportHeight,
        passed: hasViewportMeta && !hasHorizontalScroll
      };
    }, device);

    return viewportTest;
  }

  async testTouchTargets(page) {
    const touchTest = await page.evaluate(() => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"]');
      let validTouchTargets = 0;
      let invalidTouchTargets = 0;
      
      interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // WCAG guidelines: touch targets should be at least 44x44px
        if (width >= 44 && height >= 44) {
          validTouchTargets++;
        } else {
          invalidTouchTargets++;
        }
      });
      
      return {
        totalElements: interactiveElements.length,
        validTouchTargets,
        invalidTouchTargets,
        passed: invalidTouchTargets === 0
      };
    });

    return touchTest;
  }

  async testNavigation(page) {
    const navigationTest = await page.evaluate(() => {
      // Test hamburger menu (if exists)
      const hamburgerMenu = document.querySelector('[data-mobile-menu], .mobile-menu, .hamburger');
      const hasMobileMenu = hamburgerMenu !== null;
      
      // Test navigation links
      const navLinks = document.querySelectorAll('nav a, .navigation a');
      const navLinksCount = navLinks.length;
      
      // Test if navigation is accessible
      let accessibleNav = 0;
      navLinks.forEach(link => {
        const hasText = link.textContent.trim().length > 0;
        const hasHref = link.hasAttribute('href');
        if (hasText && hasHref) accessibleNav++;
      });
      
      return {
        hasMobileMenu,
        navLinksCount,
        accessibleNav,
        passed: navLinksCount > 0 && accessibleNav === navLinksCount
      };
    });

    return navigationTest;
  }

  async testContent(page) {
    const contentTest = await page.evaluate(() => {
      // Test text readability
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      let readableText = 0;
      let unreadableText = 0;
      
      textElements.forEach(element => {
        const style = window.getComputedStyle(element);
        const fontSize = parseInt(style.fontSize);
        const lineHeight = parseFloat(style.lineHeight);
        
        // Check if text is readable (font size >= 12px, line height >= 1.2)
        if (fontSize >= 12 && lineHeight >= 1.2) {
          readableText++;
        } else if (element.textContent.trim().length > 0) {
          unreadableText++;
        }
      });
      
      // Test images
      const images = document.querySelectorAll('img');
      let responsiveImages = 0;
      
      images.forEach(img => {
        const style = window.getComputedStyle(img);
        const maxWidth = style.maxWidth;
        const width = style.width;
        
        // Check if image is responsive
        if (maxWidth === '100%' || width === '100%' || img.hasAttribute('srcset')) {
          responsiveImages++;
        }
      });
      
      return {
        readableText,
        unreadableText,
        totalImages: images.length,
        responsiveImages,
        passed: unreadableText === 0 && responsiveImages === images.length
      };
    });

    return contentTest;
  }

  async testPerformance(page) {
    const performanceTest = await page.evaluate(() => {
      // Get performance metrics
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0;
      const domContentLoaded = navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0;
      
      // Check for lazy loading
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const hasLazyLoading = lazyImages.length > 0;
      
      // Check for service worker
      const hasServiceWorker = 'serviceWorker' in navigator;
      
      return {
        loadTime,
        domContentLoaded,
        hasLazyLoading,
        hasServiceWorker,
        passed: loadTime < 3000 && hasLazyLoading
      };
    });

    return performanceTest;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      devices: this.devices.map(d => d.name),
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'mobile-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 Mobile Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`📄 Report saved to: ${reportPath}`);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new MobileTester();
  tester.runTests().catch(console.error);
}

module.exports = MobileTester; 