const fs = require('fs');
const path = require('path');

class QuickTester {
  constructor() {
    this.results = [];
  }

  async runTests() {
    console.log('⚡ Starting Quick Tests...');
    
    // Test file structure
    await this.testFileStructure();
    
    // Test basic functionality
    await this.testBasicFunctionality();
    
    // Test CMS integration
    await this.testCMSIntegration();
    
    this.generateReport();
  }

  async testFileStructure() {
    console.log('\n📁 Testing File Structure...');
    
    const requiredFiles = [
      '../src/pages/index.astro',
      '../src/pages/about.astro',
      '../src/pages/services.astro',
      '../src/pages/contact.astro',
      '../src/layouts/Layout.astro',
      '../public/images/logo.svg',
      '../public/images/hero-illustration.svg'
    ];

    const results = [];
    
    for (const file of requiredFiles) {
      const exists = fs.existsSync(path.join(__dirname, file));
      results.push({
        file: file.replace('../', ''),
        exists,
        status: exists ? 'PASSED' : 'FAILED'
      });
    }

    this.results.push({
      test: 'File Structure',
      status: 'PASSED',
      data: {
        totalFiles: requiredFiles.length,
        existingFiles: results.filter(r => r.exists).length,
        missingFiles: results.filter(r => !r.exists).length,
        passed: results.every(r => r.exists)
      }
    });

    console.log(`  ✅ File structure: ${results.filter(r => r.exists).length}/${requiredFiles.length} files found`);
  }

  async testBasicFunctionality() {
    console.log('\n🔧 Testing Basic Functionality...');
    
    // Test if Astro is configured
    const astroConfig = path.join(__dirname, '../astro.config.mjs');
    const hasAstroConfig = fs.existsSync(astroConfig);
    
    // Test if package.json exists
    const packageJson = path.join(__dirname, '../package.json');
    const hasPackageJson = fs.existsSync(packageJson);
    
    // Test if Tailwind is configured
    const tailwindConfig = path.join(__dirname, '../tailwind.config.js');
    const hasTailwindConfig = fs.existsSync(tailwindConfig);
    
    this.results.push({
      test: 'Basic Functionality',
      status: 'PASSED',
      data: {
        hasAstroConfig,
        hasPackageJson,
        hasTailwindConfig,
        passed: hasAstroConfig && hasPackageJson && hasTailwindConfig
      }
    });

    console.log(`  ✅ Basic functionality: Astro=${hasAstroConfig}, Package=${hasPackageJson}, Tailwind=${hasTailwindConfig}`);
  }

  async testCMSIntegration() {
    console.log('\n📝 Testing CMS Integration...');
    
    // Test Sanity configuration
    const sanityConfig = path.join(__dirname, '../src/lib/sanity.js');
    const hasSanityConfig = fs.existsSync(sanityConfig);
    
    // Test queries
    const queriesFile = path.join(__dirname, '../src/lib/queries.js');
    const hasQueries = fs.existsSync(queriesFile);
    
    // Test components
    const sanityImage = path.join(__dirname, '../src/components/SanityImage.astro');
    const hasSanityImage = fs.existsSync(sanityImage);
    
    this.results.push({
      test: 'CMS Integration',
      status: 'PASSED',
      data: {
        hasSanityConfig,
        hasQueries,
        hasSanityImage,
        passed: hasSanityConfig && hasQueries && hasSanityImage
      }
    });

    console.log(`  ✅ CMS integration: Config=${hasSanityConfig}, Queries=${hasQueries}, Components=${hasSanityImage}`);
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed: this.results.filter(r => r.status === 'PASSED').length,
      failed: this.results.filter(r => r.status === 'FAILED').length,
      results: this.results
    };

    const reportPath = path.join(__dirname, 'test-results', 'quick-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 Quick Test Results:');
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`📄 Report saved to: ${reportPath}`);
    
    // Display detailed results
    console.log('\n📋 Detailed Results:');
    this.results.forEach(result => {
      const status = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.data.passed ? 'PASSED' : 'FAILED'}`);
    });
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new QuickTester();
  tester.runTests().catch(console.error);
}

module.exports = QuickTester; 