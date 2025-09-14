const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testKeywordOpportunityMonitoring() {
  console.log('🔍 Testing Keyword Opportunity Monitoring Implementation...\n');
  
  let browser;
  let testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: []
  };
  
  try {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Test 1: Check if keyword monitoring files exist
    console.log('📊 Test 1: Checking file structure...');
    testResults.totalTests++;
    
    const filesToCheck = [
      '../src/lib/keywordOpportunityMonitor.js',
      '../src/pages/api/keyword-opportunities.js',
      '../src/pages/api/competitor-analysis.js',
      '../src/components/KeywordOpportunityDashboard.astro'
    ];
    
    let filesExist = true;
    for (const file of filesToCheck) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing file: ${file}`);
        filesExist = false;
      }
    }
    
    if (filesExist) {
      console.log('✅ All required files exist');
      testResults.passedTests++;
      testResults.details.push({ test: 'File Structure', status: 'PASSED' });
    } else {
      console.log('❌ Some required files are missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'File Structure', status: 'FAILED' });
    }
    
    // Test 2: Check keyword monitor implementation
    console.log('\n📊 Test 2: Checking keyword monitor implementation...');
    testResults.totalTests++;
    
    try {
      const keywordMonitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const keywordMonitorContent = fs.readFileSync(keywordMonitorPath, 'utf8');
      
      const requiredMethods = [
        'analyzeCompetitorKeywords',
        'getTrendingKeywords',
        'findKeywordOpportunities',
        'generateKeywordReport',
        'calculateKeywordDifficulty',
        'calculateOpportunityScore'
      ];
      
      let methodsExist = true;
      for (const method of requiredMethods) {
        if (!keywordMonitorContent.includes(method)) {
          console.log(`❌ Missing method: ${method}`);
          methodsExist = false;
        }
      }
      
      if (methodsExist) {
        console.log('✅ All required methods implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Keyword Monitor Methods', status: 'PASSED' });
      } else {
        console.log('❌ Some required methods are missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Keyword Monitor Methods', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking keyword monitor:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Keyword Monitor Methods', status: 'FAILED', error: error.message });
    }
    
    // Test 3: Check competitor configuration
    console.log('\n📊 Test 3: Checking competitor configuration...');
    testResults.totalTests++;
    
    try {
      const keywordMonitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const keywordMonitorContent = fs.readFileSync(keywordMonitorPath, 'utf8');
      
      // Check for competitor configuration
      if (keywordMonitorContent.includes('COMPETITOR_CONFIG') && 
          keywordMonitorContent.includes('competitors') &&
          keywordMonitorContent.includes('targetIndustries')) {
        console.log('✅ Competitor configuration found');
        testResults.passedTests++;
        testResults.details.push({ test: 'Competitor Configuration', status: 'PASSED' });
      } else {
        console.log('❌ Competitor configuration missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Competitor Configuration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking competitor configuration:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Competitor Configuration', status: 'FAILED', error: error.message });
    }
    
    // Test 4: Check API endpoints
    console.log('\n📊 Test 4: Checking API endpoint files...');
    testResults.totalTests++;
    
    const apiFiles = [
      '../src/pages/api/keyword-opportunities.js',
      '../src/pages/api/competitor-analysis.js'
    ];
    
    let apiFilesExist = true;
    for (const file of apiFiles) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing API file: ${file}`);
        apiFilesExist = false;
      }
    }
    
    if (apiFilesExist) {
      console.log('✅ All API endpoint files exist');
      testResults.passedTests++;
      testResults.details.push({ test: 'API Endpoints', status: 'PASSED' });
    } else {
      console.log('❌ Some API endpoint files are missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'API Endpoints', status: 'FAILED' });
    }
    
    // Test 5: Check dashboard component
    console.log('\n📊 Test 5: Checking dashboard component...');
    testResults.totalTests++;
    
    try {
      const dashboardPath = path.join(__dirname, '../src/components/KeywordOpportunityDashboard.astro');
      if (fs.existsSync(dashboardPath)) {
        const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
        
        if (dashboardContent.includes('KeywordOpportunityDashboard') && 
            dashboardContent.includes('opportunities') &&
            dashboardContent.includes('competitorAnalysis')) {
          console.log('✅ Dashboard component implemented');
          testResults.passedTests++;
          testResults.details.push({ test: 'Dashboard Component', status: 'PASSED' });
        } else {
          console.log('❌ Dashboard component incomplete');
          testResults.failedTests++;
          testResults.details.push({ test: 'Dashboard Component', status: 'FAILED' });
        }
      } else {
        console.log('❌ Dashboard component file missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Dashboard Component', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking dashboard component:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Dashboard Component', status: 'FAILED', error: error.message });
    }
    
    // Calculate score
    const score = Math.round((testResults.passedTests / testResults.totalTests) * 100);
    
    console.log('\n📊 Keyword Opportunity Monitoring Test Results:');
    console.log(`✅ Passed: ${testResults.passedTests}`);
    console.log(`❌ Failed: ${testResults.failedTests}`);
    console.log(`🔍 Score: ${score}%`);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, 'test-results/keyword-monitor-test-report.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(resultsPath, JSON.stringify({
      testName: 'Keyword Opportunity Monitoring',
      timestamp: new Date().toISOString(),
      score: score,
      summary: {
        totalTests: testResults.totalTests,
        passedTests: testResults.passedTests,
        failedTests: testResults.failedTests
      },
      details: testResults.details
    }, null, 2));
    
    console.log(`📄 Report saved to: ${resultsPath}`);
    
    if (score === 100) {
      console.log('\n🎉 Keyword Opportunity Monitoring Implementation: COMPLETE!');
    } else {
      console.log('\n⚠️  Keyword Opportunity Monitoring Implementation: INCOMPLETE');
      console.log('Some components need to be implemented or fixed.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testKeywordOpportunityMonitoring(); 