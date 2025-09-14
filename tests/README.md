# EA Soft Lab Testing Framework

This directory contains comprehensive testing scripts and tools for the EA Soft Lab website.

## Testing Structure

### 1. Cross-Browser Testing
- Browser compatibility tests
- Responsive design validation
- JavaScript functionality across browsers

### 2. Mobile Responsiveness Testing
- Device-specific testing
- Touch interaction validation
- Viewport testing

### 3. Performance Testing
- Core Web Vitals monitoring
- Page load time analysis
- Resource optimization validation

### 4. Accessibility Testing
- WCAG 2.1 compliance checks
- Screen reader compatibility
- Keyboard navigation testing

### 5. SEO Validation
- Meta tag verification
- Structured data validation
- Sitemap and robots.txt testing

### 6. CMS Functionality Testing
- Content management system tests
- Data fetching validation
- Fallback mechanism testing

## Test Scripts

- `cross-browser-test.js` - Cross-browser compatibility tests
- `mobile-test.js` - Mobile responsiveness tests
- `performance-test.js` - Performance monitoring tests
- `accessibility-test.js` - Accessibility compliance tests
- `seo-test.js` - SEO validation tests
- `cms-test.js` - CMS functionality tests
- `e2e-test.js` - End-to-end user journey tests

## Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm run test

# Run specific test categories
npm run test:cross-browser
npm run test:mobile
npm run test:performance
npm run test:accessibility
npm run test:seo
npm run test:cms
npm run test:e2e
```

## Test Results

Test results are saved in the `test-results/` directory with detailed reports for each test category. 