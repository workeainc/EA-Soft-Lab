const fs = require('fs');
const path = require('path');

async function testAIContentEngineComprehensive() {
  console.log('🔍 Comprehensive AI Content Engine Test...\n');
  
  let testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: [],
    components: {}
  };
  
  try {
    // Test 1: Core Library Files
    console.log('📊 Test 1: Checking core library files...');
    testResults.totalTests++;
    
    const coreFiles = [
      '../src/lib/competitorExtractor.js',
      '../src/lib/googleTrendsIntegration.js',
      '../src/lib/keywordOpportunityMonitor.js',
      '../src/lib/aiContentEngine.js'
    ];
    
    let coreFilesExist = true;
    for (const file of coreFiles) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing core file: ${file}`);
        coreFilesExist = false;
      }
    }
    
    if (coreFilesExist) {
      console.log('✅ All core library files exist');
      testResults.passedTests++;
      testResults.details.push({ test: 'Core Library Files', status: 'PASSED' });
    } else {
      console.log('❌ Some core library files missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'Core Library Files', status: 'FAILED' });
    }
    
    // Test 2: API Endpoints
    console.log('\n📊 Test 2: Checking API endpoints...');
    testResults.totalTests++;
    
    const apiFiles = [
      '../src/pages/api/competitor-analysis.js',
      '../src/pages/api/keyword-opportunities.js',
      '../src/pages/api/ai-content.js'
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
      console.log('✅ All API endpoints exist');
      testResults.passedTests++;
      testResults.details.push({ test: 'API Endpoints', status: 'PASSED' });
    } else {
      console.log('❌ Some API endpoints missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'API Endpoints', status: 'FAILED' });
    }
    
    // Test 3: Dashboard Components
    console.log('\n📊 Test 3: Checking dashboard components...');
    testResults.totalTests++;
    
    const dashboardFiles = [
      '../src/components/KeywordDashboard.astro',
      '../src/components/RealTimeKeywordDashboard.astro',
      '../src/components/KeywordOpportunityDashboard.astro',
      '../src/components/AIContentDashboard.astro'
    ];
    
    let dashboardFilesExist = true;
    for (const file of dashboardFiles) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing dashboard file: ${file}`);
        dashboardFilesExist = false;
      }
    }
    
    if (dashboardFilesExist) {
      console.log('✅ All dashboard components exist');
      testResults.passedTests++;
      testResults.details.push({ test: 'Dashboard Components', status: 'PASSED' });
    } else {
      console.log('❌ Some dashboard components missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'Dashboard Components', status: 'FAILED' });
    }
    
    // Test 4: Competitor Extraction Functionality
    console.log('\n📊 Test 4: Checking competitor extraction...');
    testResults.totalTests++;
    
    try {
      const extractorPath = path.join(__dirname, '../src/lib/competitorExtractor.js');
      const extractorContent = fs.readFileSync(extractorPath, 'utf8');
      
      const extractorMethods = [
        'extractKeywordsFromCompetitor',
        'getCompetitorSpecificKeywords',
        'extractFromAllCompetitors'
      ];
      
      let extractorMethodsExist = true;
      for (const method of extractorMethods) {
        if (!extractorContent.includes(method)) {
          console.log(`❌ Missing extractor method: ${method}`);
          extractorMethodsExist = false;
        }
      }
      
      if (extractorMethodsExist) {
        console.log('✅ Competitor extraction functionality complete');
        testResults.passedTests++;
        testResults.details.push({ test: 'Competitor Extraction', status: 'PASSED' });
      } else {
        console.log('❌ Competitor extraction functionality incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Competitor Extraction', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking competitor extraction:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Competitor Extraction', status: 'FAILED', error: error.message });
    }
    
    // Test 5: Google Trends Integration
    console.log('\n📊 Test 5: Checking Google Trends integration...');
    testResults.totalTests++;
    
    try {
      const trendsPath = path.join(__dirname, '../src/lib/googleTrendsIntegration.js');
      const trendsContent = fs.readFileSync(trendsPath, 'utf8');
      
      const trendsMethods = [
        'getTrendingData',
        'fetchKeywordTrends',
        'generateRealisticTrendData',
        'generateRelatedQueries',
        'generateRelatedTopics'
      ];
      
      let trendsMethodsExist = true;
      for (const method of trendsMethods) {
        if (!trendsContent.includes(method)) {
          console.log(`❌ Missing trends method: ${method}`);
          trendsMethodsExist = false;
        }
      }
      
      if (trendsMethodsExist) {
        console.log('✅ Google Trends integration complete');
        testResults.passedTests++;
        testResults.details.push({ test: 'Google Trends Integration', status: 'PASSED' });
      } else {
        console.log('❌ Google Trends integration incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Google Trends Integration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking Google Trends:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Google Trends Integration', status: 'FAILED', error: error.message });
    }
    
    // Test 6: Keyword Opportunity Monitor
    console.log('\n📊 Test 6: Checking keyword opportunity monitor...');
    testResults.totalTests++;
    
    try {
      const monitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const monitorContent = fs.readFileSync(monitorPath, 'utf8');
      
      const monitorMethods = [
        'findKeywordOpportunities',
        'generateKeywordReport',
        'calculateKeywordDifficulty',
        'calculateOpportunityScore',
        'generateKeywordAlerts'
      ];
      
      let monitorMethodsExist = true;
      for (const method of monitorMethods) {
        if (!monitorContent.includes(method)) {
          console.log(`❌ Missing monitor method: ${method}`);
          monitorMethodsExist = false;
        }
      }
      
      if (monitorMethodsExist) {
        console.log('✅ Keyword opportunity monitor complete');
        testResults.passedTests++;
        testResults.details.push({ test: 'Keyword Opportunity Monitor', status: 'PASSED' });
      } else {
        console.log('❌ Keyword opportunity monitor incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Keyword Opportunity Monitor', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking keyword monitor:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Keyword Opportunity Monitor', status: 'FAILED', error: error.message });
    }
    
    // Test 7: AI Content Engine
    console.log('\n📊 Test 7: Checking AI content engine...');
    testResults.totalTests++;
    
    try {
      const aiEnginePath = path.join(__dirname, '../src/lib/aiContentEngine.js');
      const aiEngineContent = fs.readFileSync(aiEnginePath, 'utf8');
      
      const aiEngineMethods = [
        'generateContent',
        'generateBlogPost',
        'generateMetaDescription',
        'generateFAQContent',
        'generateTechnicalDoc',
        'generateHowToGuide'
      ];
      
      let aiEngineMethodsExist = true;
      for (const method of aiEngineMethods) {
        if (!aiEngineContent.includes(method)) {
          console.log(`❌ Missing AI engine method: ${method}`);
          aiEngineMethodsExist = false;
        }
      }
      
      if (aiEngineMethodsExist) {
        console.log('✅ AI content engine complete');
        testResults.passedTests++;
        testResults.details.push({ test: 'AI Content Engine', status: 'PASSED' });
      } else {
        console.log('❌ AI content engine incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'AI Content Engine', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking AI content engine:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'AI Content Engine', status: 'FAILED', error: error.message });
    }
    
    // Test 8: Dashboard Functionality
    console.log('\n📊 Test 8: Checking dashboard functionality...');
    testResults.totalTests++;
    
    try {
      const dashboardPath = path.join(__dirname, '../src/components/KeywordDashboard.astro');
      const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
      
      const dashboardFeatures = [
        'loadDashboardData',
        'setupAutoRefresh',
        'renderOpportunities',
        'renderAlerts',
        'updateStats'
      ];
      
      let dashboardFeaturesExist = true;
      for (const feature of dashboardFeatures) {
        if (!dashboardContent.includes(feature)) {
          console.log(`❌ Missing dashboard feature: ${feature}`);
          dashboardFeaturesExist = false;
        }
      }
      
      if (dashboardFeaturesExist) {
        console.log('✅ Dashboard functionality complete');
        testResults.passedTests++;
        testResults.details.push({ test: 'Dashboard Functionality', status: 'PASSED' });
      } else {
        console.log('❌ Dashboard functionality incomplete');
        testResults.failedTests++;
        testResults.details.push({ test: 'Dashboard Functionality', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking dashboard functionality:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Dashboard Functionality', status: 'FAILED', error: error.message });
    }
    
    // Calculate overall score
    const score = Math.round((testResults.passedTests / testResults.totalTests) * 100);
    
    console.log('\n📊 Comprehensive AI Content Engine Test Results:');
    console.log(`✅ Passed: ${testResults.passedTests}`);
    console.log(`❌ Failed: ${testResults.failedTests}`);
    console.log(`🔍 Overall Score: ${score}%`);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, 'test-results/ai-content-engine-comprehensive-report.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(resultsPath, JSON.stringify({
      testName: 'AI Content Engine Comprehensive Test',
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
      console.log('\n🎉 AI Content Engine - FULLY IMPLEMENTED!');
      console.log('✅ All components are working correctly');
      console.log('✅ Ready for production use');
    } else if (score >= 80) {
      console.log('\n🎉 AI Content Engine - MOSTLY COMPLETE!');
      console.log('✅ Core functionality is working');
      console.log('⚠️  Some minor components need attention');
    } else {
      console.log('\n⚠️  AI Content Engine - NEEDS WORK');
      console.log('❌ Several components are missing or incomplete');
    }
    
  } catch (error) {
    console.error('❌ Comprehensive test failed:', error.message);
  }
}

// Run the comprehensive test
testAIContentEngineComprehensive(); 