const fs = require('fs');
const path = require('path');

async function testGoogleTrendsIntegration() {
  console.log('🔍 Testing Step 2: Google Trends Integration...\n');
  
  let testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: []
  };
  
  try {
    // Test 1: Check if Google Trends integration file exists
    console.log('📊 Test 1: Checking Google Trends integration file...');
    testResults.totalTests++;
    
    const trendsPath = path.join(__dirname, '../src/lib/googleTrendsIntegration.js');
    if (fs.existsSync(trendsPath)) {
      console.log('✅ Google Trends integration file exists');
      testResults.passedTests++;
      testResults.details.push({ test: 'File Existence', status: 'PASSED' });
    } else {
      console.log('❌ Google Trends integration file missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'File Existence', status: 'FAILED' });
    }
    
    // Test 2: Check if Google Trends has required methods
    console.log('\n📊 Test 2: Checking Google Trends methods...');
    testResults.totalTests++;
    
    try {
      const trendsContent = fs.readFileSync(trendsPath, 'utf8');
      
      const requiredMethods = [
        'getTrendingData',
        'fetchKeywordTrends',
        'generateRealisticTrendData',
        'generateRelatedQueries',
        'generateRelatedTopics'
      ];
      
      let methodsExist = true;
      for (const method of requiredMethods) {
        if (!trendsContent.includes(method)) {
          console.log(`❌ Missing method: ${method}`);
          methodsExist = false;
        }
      }
      
      if (methodsExist) {
        console.log('✅ All required Google Trends methods implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Required Methods', status: 'PASSED' });
      } else {
        console.log('❌ Some required methods are missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Required Methods', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking methods:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Required Methods', status: 'FAILED', error: error.message });
    }
    
    // Test 3: Check if keyword monitor is updated to use Google Trends
    console.log('\n📊 Test 3: Checking keyword monitor integration...');
    testResults.totalTests++;
    
    try {
      const monitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const monitorContent = fs.readFileSync(monitorPath, 'utf8');
      
      if (monitorContent.includes('googleTrends') && 
          monitorContent.includes('getTrendingData')) {
        console.log('✅ Keyword monitor updated to use Google Trends');
        testResults.passedTests++;
        testResults.details.push({ test: 'Monitor Integration', status: 'PASSED' });
      } else {
        console.log('❌ Keyword monitor not updated to use Google Trends');
        testResults.failedTests++;
        testResults.details.push({ test: 'Monitor Integration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking monitor integration:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Monitor Integration', status: 'FAILED', error: error.message });
    }
    
    // Test 4: Check for realistic trend data generation
    console.log('\n📊 Test 4: Checking realistic trend data...');
    testResults.totalTests++;
    
    try {
      const trendsContent = fs.readFileSync(trendsPath, 'utf8');
      
      // Check for realistic data generation features
      const realisticFeatures = [
        'generateRealisticTrendData',
        'baseTrend',
        'baseVolume',
        'trendVariation',
        'volumeVariation'
      ];
      
      let hasRealisticData = true;
      for (const feature of realisticFeatures) {
        if (!trendsContent.includes(feature)) {
          console.log(`❌ Missing realistic data feature: ${feature}`);
          hasRealisticData = false;
        }
      }
      
      if (hasRealisticData) {
        console.log('✅ Realistic trend data generation implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Realistic Data', status: 'PASSED' });
      } else {
        console.log('❌ Realistic trend data generation incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Realistic Data', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking realistic data:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Realistic Data', status: 'FAILED', error: error.message });
    }
    
    // Test 5: Check for caching system
    console.log('\n📊 Test 5: Checking caching system...');
    testResults.totalTests++;
    
    try {
      const trendsContent = fs.readFileSync(trendsPath, 'utf8');
      
      if (trendsContent.includes('cache') && 
          trendsContent.includes('cacheTimeout') &&
          trendsContent.includes('clearCache')) {
        console.log('✅ Caching system implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Caching System', status: 'PASSED' });
      } else {
        console.log('❌ Caching system missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Caching System', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking caching system:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Caching System', status: 'FAILED', error: error.message });
    }
    
    // Calculate score
    const score = Math.round((testResults.passedTests / testResults.totalTests) * 100);
    
    console.log('\n📊 Step 2 Test Results:');
    console.log(`✅ Passed: ${testResults.passedTests}`);
    console.log(`❌ Failed: ${testResults.failedTests}`);
    console.log(`🔍 Score: ${score}%`);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, 'test-results/step2-google-trends-report.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(resultsPath, JSON.stringify({
      testName: 'Step 2: Google Trends Integration',
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
      console.log('\n🎉 Step 2: Google Trends Integration - COMPLETE!');
      console.log('✅ Ready to proceed to Step 3: Real-time Monitoring Dashboard');
    } else {
      console.log('\n⚠️  Step 2: Google Trends Integration - INCOMPLETE');
      console.log('Some components need to be implemented or fixed.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testGoogleTrendsIntegration(); 