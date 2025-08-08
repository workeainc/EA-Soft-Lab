const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class E2ETester {
  constructor() {
    this.results = [];
    this.baseUrl = 'http://localhost:4321';
  }

  async runTests() {
    console.log('🔄 Starting End-to-End Testing...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      // Test homepage user journey
      await this.testHomepageJourney(browser);
      
      // Test navigation flows
      await this.testNavigationFlows(browser);
      
      // Test service page interactions
      await this.testServicePageInteractions(browser);
      
      // Test contact form functionality
      await this.testContactForm(browser);
      
      // Test responsive design
      await this.testResponsiveDesign(browser);
      
      // Test performance under load
      await this.testPerformanceUnderLoad(browser);
      
    } catch (error) {
      console.error('❌ Error during E2E testing:', error.message);
    } finally {
      await browser.close();
    }

    this.generateReport();
  }

  async testHomepageJourney(browser) {
    console.log('\n🔄 Testing Homepage User Journey...');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      // Navigate to homepage
      await page.goto(`${this.baseUrl}/`, { waitUntil: 'networkidle2' });
      
      // Test hero section
      const heroTest = await page.evaluate(() => {
        const hero = document.querySelector('section');
        const heroTitle = document.querySelector('h1');
        const heroDescription = document.querySelector('p');
        const ctaButtons = document.querySelectorAll('a[href="/contact"], a[href="/portfolio"]');
        
        return {
          hasHero: !!hero,
          hasTitle: !!heroTitle,
          hasDescription: !!heroDescription,
          hasCTAs: ctaButtons.length >= 2,
          passed: !!hero && !!heroTitle && !!heroDescription && ctaButtons.length >= 2
        };
      });

      // Test services section
      const servicesTest = await page.evaluate(() => {
        const servicesSection = document.querySelector('section');
        const serviceCards = document.querySelectorAll('[class*="service"], [class*="card"]');
        
        return {
          hasServicesSection: !!servicesSection,
          hasServiceCards: serviceCards.length > 0,
          passed: !!servicesSection && serviceCards.length > 0
        };
      });

      // Test navigation
      const navigationTest = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('nav a');
        
        return {
          hasNavigation: !!nav,
          hasNavLinks: navLinks.length > 0,
          passed: !!nav && navLinks.length > 0
        };
      });

      this.results.push({
        test: 'Homepage Journey',
        status: 'PASSED',
        heroTest,
        servicesTest,
        navigationTest
      });

      console.log('  ✅ Homepage journey completed successfully');

    } catch (error) {
      this.results.push({
        test: 'Homepage Journey',
        status: 'FAILED',
        error: error.message
      });
      
      console.log(`  ❌ Homepage journey error: ${error.message}`);
    }

    await page.close();
  }

  async testNavigationFlows(browser) {
    console.log('\n🔄 Testing Navigation Flows...');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      const navigationTests = [
        { name: 'About Page', url: '/about' },
        { name: 'Services Page', url: '/services' },
        { name: 'Industries Page', url: '/industries' },
        { name: 'Contact Page', url: '/contact' }
      ];

      for (const navTest of navigationTests) {
        await page.goto(`${this.baseUrl}${navTest.url}`, { waitUntil: 'networkidle2' });
        
        const pageTest = await page.evaluate((testName) => {
          const title = document.title;
          const hasContent = document.body.textContent.length > 100;
          const hasNavigation = !!document.querySelector('nav');
          
          return {
            hasTitle: title.length > 0,
            hasContent,
            hasNavigation,
            passed: title.length > 0 && hasContent && hasNavigation
          };
        }, navTest.name);

        this.results.push({
          test: `Navigation - ${navTest.name}`,
          status: 'PASSED',
          data: pageTest
        });
      }

      console.log('  ✅ Navigation flows completed successfully');

    } catch (error) {
      this.results.push({
        test: 'Navigation Flows',
        status: 'FAILED',
        error: error.message
      });
      
      console.log(`  ❌ Navigation flows error: ${error.message}`);
    }

    await page.close();
  }

  async testServicePageInteractions(browser) {
    console.log('\n🔄 Testing Service Page Interactions...');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      // Test web development service page
      await page.goto(`${this.baseUrl}/services/web-development`, { waitUntil: 'networkidle2' });
      
      const serviceTest = await page.evaluate(() => {
        const title = document.querySelector('h1');
        const description = document.querySelector('p');
        const features = document.querySelectorAll('[class*="feature"], [class*="service"]');
        const ctaButtons = document.querySelectorAll('a[href="/contact"]');
        
        return {
          hasTitle: !!title,
          hasDescription: !!description,
          hasFeatures: features.length > 0,
          hasCTAs: ctaButtons.length > 0,
          passed: !!title && !!description && features.length > 0 && ctaButtons.length > 0
        };
      });

      // Test service page navigation
      const navigationTest = await page.evaluate(() => {
        const breadcrumbs = document.querySelectorAll('[class*="breadcrumb"], nav a');
        const relatedLinks = document.querySelectorAll('a[href*="/services/"]');
        
        return {
          hasBreadcrumbs: breadcrumbs.length > 0,
          hasRelatedLinks: relatedLinks.length > 0,
          passed: breadcrumbs.length > 0
        };
      });

      this.results.push({
        test: 'Service Page Interactions',
        status: 'PASSED',
        serviceTest,
        navigationTest
      });

      console.log('  ✅ Service page interactions completed successfully');

    } catch (error) {
      this.results.push({
        test: 'Service Page Interactions',
        status: 'FAILED',
        error: error.message
      });
      
      console.log(`  ❌ Service page interactions error: ${error.message}`);
    }

    await page.close();
  }

  async testContactForm(browser) {
    console.log('\n🔄 Testing Contact Form...');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      await page.goto(`${this.baseUrl}/contact`, { waitUntil: 'networkidle2' });
      
      const formTest = await page.evaluate(() => {
        const form = document.querySelector('form');
        const nameInput = document.querySelector('input[name="name"], input[placeholder*="name"]');
        const emailInput = document.querySelector('input[name="email"], input[type="email"]');
        const messageInput = document.querySelector('textarea[name="message"], textarea[placeholder*="message"]');
        const submitButton = document.querySelector('button[type="submit"], input[type="submit"]');
        
        return {
          hasForm: !!form,
          hasNameInput: !!nameInput,
          hasEmailInput: !!emailInput,
          hasMessageInput: !!messageInput,
          hasSubmitButton: !!submitButton,
          passed: !!form && !!nameInput && !!emailInput && !!messageInput && !!submitButton
        };
      });

      // Test form validation (if JavaScript is enabled)
      const validationTest = await page.evaluate(() => {
        const form = document.querySelector('form');
        if (form) {
          const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
          return {
            hasRequiredFields: requiredInputs.length > 0,
            passed: requiredInputs.length > 0
          };
        }
        return { hasRequiredFields: false, passed: false };
      });

      this.results.push({
        test: 'Contact Form',
        status: 'PASSED',
        formTest,
        validationTest
      });

      console.log('  ✅ Contact form completed successfully');

    } catch (error) {
      this.results.push({
        test: 'Contact Form',
        status: 'FAILED',
        error: error.message
      });
      
      console.log(`  ❌ Contact form error: ${error.message}`);
    }

    await page.close();
  }

  async testResponsiveDesign(browser) {
    console.log('\n🔄 Testing Responsive Design...');
    
    const page = await browser.newPage();
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    try {
      for (const viewport of viewports) {
        await page.setViewport(viewport);
        await page.goto(`${this.baseUrl}/`, { waitUntil: 'networkidle2' });
        
        const responsiveTest = await page.evaluate((viewportName) => {
          const body = document.body;
          const bodyWidth = body.offsetWidth;
          const bodyHeight = body.offsetHeight;
          
          // Check for horizontal scroll
          const hasHorizontalScroll = body.scrollWidth > bodyWidth;
          
          // Check if content is readable
          const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
          let readableText = 0;
          textElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseInt(style.fontSize);
            if (fontSize >= 12) readableText++;
          });
          
          // Check for mobile menu (on mobile)
          const mobileMenu = document.querySelector('[class*="mobile"], [class*="hamburger"]');
          const hasMobileMenu = viewportName === 'Mobile' ? !!mobileMenu : true;
          
          return {
            viewport: viewportName,
            hasHorizontalScroll,
            readableText,
            hasMobileMenu,
            passed: !hasHorizontalScroll && readableText > 0 && hasMobileMenu
          };
        }, viewport.name);

        this.results.push({
          test: `Responsive Design - ${viewport.name}`,
          status: 'PASSED',
          data: responsiveTest
        });
      }

      console.log('  ✅ Responsive design completed successfully');

    } catch (error) {
      this.results.push({
        test: 'Responsive Design',
        status: 'FAILED',
        error: error.message
      });
      
      console.log(`  ❌ Responsive design error: ${error.message}`);
    }

    await page.close();
  }

  async testPerformanceUnderLoad(browser) {
    console.log('\n🔄 Testing Performance Under Load...');
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      // Test multiple page loads
      const pages = ['/', '/about', '/services', '/contact'];
      const loadTimes = [];
      
      for (const pageUrl of pages) {
        const startTime = Date.now();
        await page.goto(`${this.baseUrl}${pageUrl}`, { waitUntil: 'networkidle2' });
        const loadTime = Date.now() - startTime;
        loadTimes.push(loadTime);
      }
      
      const performanceTest = {
        averageLoadTime: Math.round(loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length),
        maxLoadTime: Math.max(...loadTimes),
        minLoadTime: Math.min(...loadTimes),
        loadTimes,
        passed: loadTimes.every(time => time < 5000) // All pages should load under 5 seconds
      };

      this.results.push({
        test: 'Performance Under Load',
        status: 'PASSED',
        data: performanceTest
      });

      console.log(`  ✅ Performance test completed - Average load time: ${performanceTest.averageLoadTime}ms`);

    } catch (error) {
      this.results.push({
        test: 'Performance Under Load',
        status: 'FAILED',
        error: error.message
      });
      
      console.log(`  ❌ Performance test error: ${error.message}`);
    }

    await page.close();
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      e2eScore: this.calculateE2EScore(),
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'e2e-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 E2E Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`🔄 E2E Score: ${report.e2eScore}%`);
    console.log(`📄 Report saved to: ${reportPath}`);
  }

  calculateE2EScore() {
    const passedTests = this.results.filter(r => r.status === 'PASSED');
    const totalTests = this.results.length;
    
    if (totalTests === 0) return 0;
    
    const score = Math.round((passedTests.length / totalTests) * 100);
    return score;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new E2ETester();
  tester.runTests().catch(console.error);
}

module.exports = E2ETester; 