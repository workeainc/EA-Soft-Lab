const fs = require('fs');
const path = require('path');

// Import all test classes
const CrossBrowserTester = require('./cross-browser-test.js');
const MobileTester = require('./mobile-test.js');
const PerformanceTester = require('./performance-test.js');
const AccessibilityTester = require('./accessibility-test.js');
const SEOTester = require('./seo-test.js');
const CMSTester = require('./cms-test.js');
const E2ETester = require('./e2e-test.js');

class MasterTestRunner {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🚀 Starting Comprehensive Testing Suite...');
    console.log('=' .repeat(60));
    
    const testSuites = [
      { name: 'Cross-Browser Testing', tester: new CrossBrowserTester() },
      { name: 'Mobile Responsiveness Testing', tester: new MobileTester() },
      { name: 'Performance Testing', tester: new PerformanceTester() },
      { name: 'Accessibility Testing', tester: new AccessibilityTester() },
      { name: 'SEO Validation Testing', tester: new SEOTester() },
      { name: 'CMS Functionality Testing', tester: new CMSTester() },
      { name: 'End-to-End Testing', tester: new E2ETester() }
    ];

    for (const suite of testSuites) {
      console.log(`\n📋 Running ${suite.name}...`);
      console.log('-'.repeat(40));
      
      try {
        await suite.tester.runTests();
        this.results.push({
          suite: suite.name,
          status: 'COMPLETED',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error(`❌ Error in ${suite.name}:`, error.message);
        this.results.push({
          suite: suite.name,
          status: 'FAILED',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    this.generateComprehensiveReport();
  }

  generateComprehensiveReport() {
    const endTime = Date.now();
    const totalDuration = endTime - this.startTime;
    
    // Read individual test reports
    const testReports = this.readTestReports();
    
    const comprehensiveReport = {
      timestamp: new Date().toISOString(),
      totalDuration: `${Math.round(totalDuration / 1000)}s`,
      testSuites: this.results,
      individualReports: testReports,
      summary: this.generateSummary(testReports),
      recommendations: this.generateRecommendations(testReports)
    };

    const reportPath = path.join(__dirname, 'test-results', 'comprehensive-test-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(comprehensiveReport, null, 2));

    // Generate HTML report
    this.generateHTMLReport(comprehensiveReport);

    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`⏱️  Total Duration: ${comprehensiveReport.totalDuration}`);
    console.log(`📋 Test Suites: ${this.results.length}`);
    console.log(`✅ Completed: ${this.results.filter(r => r.status === 'COMPLETED').length}`);
    console.log(`❌ Failed: ${this.results.filter(r => r.status === 'FAILED').length}`);
    console.log(`📄 JSON Report: ${reportPath}`);
    console.log(`🌐 HTML Report: ${path.join(__dirname, 'test-results', 'test-report.html')}`);
    
    // Display summary
    console.log('\n📈 SUMMARY:');
    Object.entries(comprehensiveReport.summary).forEach(([category, score]) => {
      const status = score >= 80 ? '🟢' : score >= 60 ? '🟡' : '🔴';
      console.log(`${status} ${category}: ${score}%`);
    });
  }

  readTestReports() {
    const reportsDir = path.join(__dirname, 'test-results');
    const reports = {};
    
    if (fs.existsSync(reportsDir)) {
      const files = fs.readdirSync(reportsDir);
      files.forEach(file => {
        if (file.endsWith('-report.json')) {
          try {
            const reportPath = path.join(reportsDir, file);
            const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
            const category = file.replace('-test-report.json', '');
            reports[category] = report;
          } catch (error) {
            console.error(`Error reading report ${file}:`, error.message);
          }
        }
      });
    }
    
    return reports;
  }

  generateSummary(testReports) {
    const summary = {};
    
    Object.entries(testReports).forEach(([category, report]) => {
      if (report.passed !== undefined && report.totalTests !== undefined) {
        summary[category] = Math.round((report.passed / report.totalTests) * 100);
      } else if (report.accessibilityScore !== undefined) {
        summary[category] = report.accessibilityScore;
      } else if (report.seoScore !== undefined) {
        summary[category] = report.seoScore;
      } else if (report.cmsScore !== undefined) {
        summary[category] = report.cmsScore;
      } else if (report.e2eScore !== undefined) {
        summary[category] = report.e2eScore;
      } else {
        summary[category] = 0;
      }
    });
    
    return summary;
  }

  generateRecommendations(testReports) {
    const recommendations = [];
    
    // Performance recommendations
    if (testReports.performance) {
      const perf = testReports.performance;
      if (perf.averageLoadTime > 3000) {
        recommendations.push('Optimize page load times - consider image compression and code splitting');
      }
      if (perf.coreWebVitalsSummary) {
        const vitals = perf.coreWebVitalsSummary;
        if (vitals.lcp.poor > 0) {
          recommendations.push('Improve Largest Contentful Paint (LCP) - optimize above-the-fold content');
        }
        if (vitals.cls.poor > 0) {
          recommendations.push('Reduce Cumulative Layout Shift (CLS) - set explicit dimensions for images');
        }
      }
    }
    
    // Accessibility recommendations
    if (testReports.accessibility) {
      const a11y = testReports.accessibility;
      if (a11y.accessibilityScore < 90) {
        recommendations.push('Improve accessibility - add missing alt text and ARIA labels');
      }
    }
    
    // SEO recommendations
    if (testReports.seo) {
      const seo = testReports.seo;
      if (seo.seoScore < 90) {
        recommendations.push('Enhance SEO - add missing meta tags and structured data');
      }
    }
    
    // Mobile recommendations
    if (testReports.mobile) {
      const mobile = testReports.mobile;
      if (mobile.passed < mobile.totalTests) {
        recommendations.push('Improve mobile responsiveness - test on more devices');
      }
    }
    
    return recommendations;
  }

  generateHTMLReport(report) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EA Soft Lab - Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; }
        .metric h3 { margin: 0 0 10px 0; color: #374151; }
        .metric .score { font-size: 2em; font-weight: bold; }
        .score.good { color: #10b981; }
        .score.warning { color: #f59e0b; }
        .score.poor { color: #ef4444; }
        .recommendations { background: #fef3c7; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .recommendations h3 { color: #92400e; margin-top: 0; }
        .recommendations ul { margin: 0; padding-left: 20px; }
        .recommendations li { margin-bottom: 8px; color: #92400e; }
        .timestamp { text-align: center; color: #6b7280; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>EA Soft Lab - Comprehensive Test Results</h1>
        
        <div class="summary">
            ${Object.entries(report.summary).map(([category, score]) => {
                const status = score >= 80 ? 'good' : score >= 60 ? 'warning' : 'poor';
                const icon = score >= 80 ? '🟢' : score >= 60 ? '🟡' : '🔴';
                return `
                <div class="metric">
                    <h3>${category}</h3>
                    <div class="score ${status}">${icon} ${score}%</div>
                </div>`;
            }).join('')}
        </div>
        
        ${report.recommendations.length > 0 ? `
        <div class="recommendations">
            <h3>Recommendations</h3>
            <ul>
                ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div class="timestamp">
            <p>Report generated on ${new Date(report.timestamp).toLocaleString()}</p>
            <p>Total duration: ${report.totalDuration}</p>
        </div>
    </div>
</body>
</html>`;

    const htmlPath = path.join(__dirname, 'test-results', 'test-report.html');
    fs.writeFileSync(htmlPath, html);
  }
}

// Run all tests if this file is executed directly
if (require.main === module) {
  const runner = new MasterTestRunner();
  runner.runAllTests().catch(console.error);
}

module.exports = MasterTestRunner; 