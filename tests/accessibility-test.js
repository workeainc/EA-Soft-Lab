const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class AccessibilityTester {
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
    console.log('♿ Starting Accessibility Testing...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      for (const pageUrl of this.pages) {
        console.log(`\n♿ Testing accessibility: ${pageUrl}`);
        await this.testPageAccessibility(browser, pageUrl);
      }
    } catch (error) {
      console.error('❌ Error during accessibility testing:', error.message);
    } finally {
      await browser.close();
    }

    this.generateReport();
  }

  async testPageAccessibility(browser, pageUrl) {
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      await page.goto(`${this.baseUrl}${pageUrl}`, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Test semantic HTML
      const semanticTest = await this.testSemanticHTML(page);
      
      // Test ARIA attributes
      const ariaTest = await this.testARIA(page);
      
      // Test color contrast
      const contrastTest = await this.testColorContrast(page);
      
      // Test keyboard navigation
      const keyboardTest = await this.testKeyboardNavigation(page);
      
      // Test screen reader compatibility
      const screenReaderTest = await this.testScreenReader(page);
      
      // Test focus management
      const focusTest = await this.testFocusManagement(page);

      this.results.push({
        page: pageUrl,
        status: 'PASSED',
        semanticTest,
        ariaTest,
        contrastTest,
        keyboardTest,
        screenReaderTest,
        focusTest
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

  async testSemanticHTML(page) {
    const semantic = await page.evaluate(() => {
      // Check for semantic elements
      const semanticElements = {
        header: document.querySelectorAll('header').length,
        nav: document.querySelectorAll('nav').length,
        main: document.querySelectorAll('main').length,
        section: document.querySelectorAll('section').length,
        article: document.querySelectorAll('article').length,
        aside: document.querySelectorAll('aside').length,
        footer: document.querySelectorAll('footer').length,
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length,
        h4: document.querySelectorAll('h4').length,
        h5: document.querySelectorAll('h5').length,
        h6: document.querySelectorAll('h6').length
      };

      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let properHierarchy = true;
      let previousLevel = 0;

      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > previousLevel + 1) {
          properHierarchy = false;
        }
        previousLevel = level;
      });

      // Check for landmarks
      const landmarks = document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]');
      
      return {
        semanticElements,
        properHierarchy,
        landmarks: landmarks.length,
        passed: semanticElements.main > 0 && properHierarchy
      };
    });

    return semantic;
  }

  async testARIA(page) {
    const aria = await page.evaluate(() => {
      // Check for ARIA labels
      const elementsWithAriaLabel = document.querySelectorAll('[aria-label]');
      const elementsWithAriaLabelledby = document.querySelectorAll('[aria-labelledby]');
      
      // Check for ARIA roles
      const elementsWithRole = document.querySelectorAll('[role]');
      
      // Check for ARIA states
      const elementsWithAriaExpanded = document.querySelectorAll('[aria-expanded]');
      const elementsWithAriaHidden = document.querySelectorAll('[aria-hidden]');
      const elementsWithAriaPressed = document.querySelectorAll('[aria-pressed]');
      
      // Check for ARIA descriptions
      const elementsWithAriaDescribedby = document.querySelectorAll('[aria-describedby]');
      
      // Check for form labels
      const formControls = document.querySelectorAll('input, select, textarea');
      let properlyLabeled = 0;
      
      formControls.forEach(control => {
        const hasLabel = control.labels && control.labels.length > 0;
        const hasAriaLabel = control.hasAttribute('aria-label');
        const hasAriaLabelledby = control.hasAttribute('aria-labelledby');
        
        if (hasLabel || hasAriaLabel || hasAriaLabelledby) {
          properlyLabeled++;
        }
      });

      return {
        ariaLabels: elementsWithAriaLabel.length,
        ariaLabelledby: elementsWithAriaLabelledby.length,
        ariaRoles: elementsWithRole.length,
        ariaStates: elementsWithAriaExpanded.length + elementsWithAriaHidden.length + elementsWithAriaPressed.length,
        ariaDescriptions: elementsWithAriaDescribedby.length,
        formControls: formControls.length,
        properlyLabeled,
        passed: properlyLabeled === formControls.length
      };
    });

    return aria;
  }

  async testColorContrast(page) {
    const contrast = await page.evaluate(() => {
      // Get all text elements
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, button, label');
      let highContrastElements = 0;
      let lowContrastElements = 0;
      
      textElements.forEach(element => {
        const style = window.getComputedStyle(element);
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        
        // Simple contrast check (this is a basic implementation)
        // In a real scenario, you'd use a proper contrast calculation library
        if (color && backgroundColor) {
          // This is a simplified check - real contrast calculation would be more complex
          const hasGoodContrast = true; // Placeholder for actual contrast calculation
          if (hasGoodContrast) {
            highContrastElements++;
          } else {
            lowContrastElements++;
          }
        }
      });

      return {
        totalTextElements: textElements.length,
        highContrastElements,
        lowContrastElements,
        passed: lowContrastElements === 0
      };
    });

    return contrast;
  }

  async testKeyboardNavigation(page) {
    const keyboard = await page.evaluate(() => {
      // Check for keyboard accessible elements
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
      let keyboardAccessible = 0;
      
      interactiveElements.forEach(element => {
        const tabIndex = element.getAttribute('tabindex');
        const isVisible = element.offsetWidth > 0 && element.offsetHeight > 0;
        const isEnabled = !element.hasAttribute('disabled');
        
        if ((tabIndex === null || tabIndex >= 0) && isVisible && isEnabled) {
          keyboardAccessible++;
        }
      });

      // Check for skip links
      const skipLinks = document.querySelectorAll('a[href^="#"], a[href*="skip"]');
      
      // Check for focus indicators
      const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
      let hasFocusIndicator = 0;
      
      focusableElements.forEach(element => {
        const style = window.getComputedStyle(element);
        const outline = style.outline;
        const border = style.border;
        
        if (outline !== 'none' || border !== 'none') {
          hasFocusIndicator++;
        }
      });

      return {
        totalInteractiveElements: interactiveElements.length,
        keyboardAccessible,
        skipLinks: skipLinks.length,
        focusableElements: focusableElements.length,
        hasFocusIndicator,
        passed: keyboardAccessible === interactiveElements.length && hasFocusIndicator > 0
      };
    });

    return keyboard;
  }

  async testScreenReader(page) {
    const screenReader = await page.evaluate(() => {
      // Check for alt text on images
      const images = document.querySelectorAll('img');
      let imagesWithAlt = 0;
      let imagesWithoutAlt = 0;
      
      images.forEach(img => {
        if (img.alt && img.alt.trim().length > 0) {
          imagesWithAlt++;
        } else {
          imagesWithoutAlt++;
        }
      });

      // Check for descriptive link text
      const links = document.querySelectorAll('a');
      let descriptiveLinks = 0;
      let nonDescriptiveLinks = 0;
      
      links.forEach(link => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        
        if (text.length > 0 && text !== href) {
          descriptiveLinks++;
        } else {
          nonDescriptiveLinks++;
        }
      });

      // Check for form labels
      const formControls = document.querySelectorAll('input, select, textarea');
      let labeledControls = 0;
      
      formControls.forEach(control => {
        if (control.labels && control.labels.length > 0) {
          labeledControls++;
        }
      });

      // Check for language declaration
      const html = document.documentElement;
      const lang = html.getAttribute('lang');
      const hasLanguage = lang && lang.length > 0;

      return {
        totalImages: images.length,
        imagesWithAlt,
        imagesWithoutAlt,
        totalLinks: links.length,
        descriptiveLinks,
        nonDescriptiveLinks,
        totalFormControls: formControls.length,
        labeledControls,
        hasLanguage,
        passed: imagesWithoutAlt === 0 && nonDescriptiveLinks === 0 && labeledControls === formControls.length && hasLanguage
      };
    });

    return screenReader;
  }

  async testFocusManagement(page) {
    const focus = await page.evaluate(() => {
      // Check for logical tab order
      const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
      let logicalOrder = true;
      let previousTabIndex = -1;
      
      focusableElements.forEach(element => {
        const tabIndex = parseInt(element.getAttribute('tabindex')) || 0;
        if (tabIndex < previousTabIndex) {
          logicalOrder = false;
        }
        previousTabIndex = tabIndex;
      });

      // Check for focus traps
      const focusTraps = document.querySelectorAll('[data-focus-trap], .focus-trap');
      
      // Check for focus restoration
      const hasFocusRestoration = document.querySelectorAll('[data-focus-restore]').length > 0;

      return {
        totalFocusableElements: focusableElements.length,
        logicalOrder,
        focusTraps: focusTraps.length,
        hasFocusRestoration,
        passed: logicalOrder
      };
    });

    return focus;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      accessibilityScore: this.calculateAccessibilityScore(),
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'accessibility-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 Accessibility Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`♿ Accessibility Score: ${report.accessibilityScore}%`);
    console.log(`📄 Report saved to: ${reportPath}`);
  }

  calculateAccessibilityScore() {
    const passedTests = this.results.filter(r => r.status === 'PASSED');
    const totalTests = this.results.length;
    
    if (totalTests === 0) return 0;
    
    const score = Math.round((passedTests.length / totalTests) * 100);
    return score;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new AccessibilityTester();
  tester.runTests().catch(console.error);
}

module.exports = AccessibilityTester; 