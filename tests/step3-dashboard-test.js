const fs = require('fs');
const path = require('path');

async function testRealTimeDashboard() {
  console.log('🔍 Testing Step 3: Real-time Monitoring Dashboard...\n');
  
  let testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: []
  };
  
  try {
    // Test 1: Check if dashboard component exists
    console.log('📊 Test 1: Checking dashboard component...');
    testResults.totalTests++;
    
    const dashboardPath = path.join(__dirname, '../src/components/KeywordDashboard.astro');
    if (fs.existsSync(dashboardPath)) {
      console.log('✅ Dashboard component exists');
      testResults.passedTests++;
      testResults.details.push({ test: 'Dashboard Component', status: 'PASSED' });
    } else {
      console.log('❌ Dashboard component missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'Dashboard Component', status: 'FAILED' });
    }
    
    // Test 2: Check if dashboard has required features
    console.log('\n📊 Test 2: Checking dashboard features...');
    testResults.totalTests++;
    
    try {
      const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
      
      const requiredFeatures = [
        'KeywordDashboard',
        'refreshBtn',
        'opportunitiesList',
        'alertsList',
        'trendingList',
        'totalOpportunities',
        'highTrending',
        'lowCompetition',
        'totalCompetitors'
      ];
      
      let featuresExist = true;
      for (const feature of requiredFeatures) {
        if (!dashboardContent.includes(feature)) {
          console.log(`❌ Missing feature: ${feature}`);
          featuresExist = false;
        }
      }
      
      if (featuresExist) {
        console.log('✅ All required dashboard features implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Dashboard Features', status: 'PASSED' });
      } else {
        console.log('❌ Some dashboard features missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Dashboard Features', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking dashboard features:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Dashboard Features', status: 'FAILED', error: error.message });
    }
    
    // Test 3: Check for real-time functionality
    console.log('\n📊 Test 3: Checking real-time functionality...');
    testResults.totalTests++;
    
    try {
      const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
      
      const realtimeFeatures = [
        'setupAutoRefresh',
        'loadDashboardData',
        'setInterval',
        'animate-pulse',
        'Live'
      ];
      
      let hasRealtimeFeatures = true;
      for (const feature of realtimeFeatures) {
        if (!dashboardContent.includes(feature)) {
          console.log(`❌ Missing real-time feature: ${feature}`);
          hasRealtimeFeatures = false;
        }
      }
      
      if (hasRealtimeFeatures) {
        console.log('✅ Real-time functionality implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Real-time Features', status: 'PASSED' });
      } else {
        console.log('❌ Real-time functionality incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Real-time Features', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking real-time features:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Real-time Features', status: 'FAILED', error: error.message });
    }
    
    // Test 4: Check for API integration
    console.log('\n📊 Test 4: Checking API integration...');
    testResults.totalTests++;
    
    try {
      const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
      
      if (dashboardContent.includes('/api/keyword-opportunities') && 
          dashboardContent.includes('fetch') &&
          dashboardContent.includes('POST')) {
        console.log('✅ API integration implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'API Integration', status: 'PASSED' });
      } else {
        console.log('❌ API integration missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'API Integration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking API integration:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'API Integration', status: 'FAILED', error: error.message });
    }
    
    // Test 5: Check for responsive design (fixed)
    console.log('\n📊 Test 5: Checking responsive design...');
    testResults.totalTests++;
    
    try {
      const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
      
      // Check for actual responsive Tailwind classes
      const responsiveClasses = [
        'grid-cols-1',
        'md:grid-cols-',
        'lg:grid-cols-',
        'sm:px-',
        'lg:px-'
      ];
      
      let hasResponsiveDesign = true;
      for (const responsiveClass of responsiveClasses) {
        if (!dashboardContent.includes(responsiveClass)) {
          console.log(`❌ Missing responsive class: ${responsiveClass}`);
          hasResponsiveDesign = false;
        }
      }
      
      if (hasResponsiveDesign) {
        console.log('✅ Responsive design implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Responsive Design', status: 'PASSED' });
      } else {
        console.log('❌ Responsive design incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Responsive Design', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking responsive design:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Responsive Design', status: 'FAILED', error: error.message });
    }
    
    // Calculate score
    const score = Math.round((testResults.passedTests / testResults.totalTests) * 100);
    
    console.log('\n📊 Step 3 Test Results:');
    console.log(`✅ Passed: ${testResults.passedTests}`);
    console.log(`❌ Failed: ${testResults.failedTests}`);
    console.log(`🔍 Score: ${score}%`);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, 'test-results/step3-dashboard-report.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(resultsPath, JSON.stringify({
      testName: 'Step 3: Real-time Monitoring Dashboard',
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
      console.log('\n🎉 Step 3: Real-time Monitoring Dashboard - COMPLETE!');
      console.log('✅ Ready to proceed to Step 4: AI Content Generation');
    } else {
      console.log('\n⚠️  Step 3: Real-time Monitoring Dashboard - INCOMPLETE');
      console.log('Some components need to be implemented or fixed.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testRealTimeDashboard(); 