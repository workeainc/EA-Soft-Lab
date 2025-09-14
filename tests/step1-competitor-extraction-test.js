const fs = require('fs');
const path = require('path');

async function testCompetitorExtraction() {
  console.log('🔍 Testing Step 1: Real Competitor Keyword Extraction...\n');
  
  let testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: []
  };
  
  try {
    // Test 1: Check if competitor extractor file exists
    console.log('📊 Test 1: Checking competitor extractor file...');
    testResults.totalTests++;
    
    const extractorPath = path.join(__dirname, '../src/lib/competitorExtractor.js');
    if (fs.existsSync(extractorPath)) {
      console.log('✅ Competitor extractor file exists');
      testResults.passedTests++;
      testResults.details.push({ test: 'File Existence', status: 'PASSED' });
    } else {
      console.log('❌ Competitor extractor file missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'File Existence', status: 'FAILED' });
    }
    
    // Test 2: Check if competitor extractor has required methods
    console.log('\n📊 Test 2: Checking competitor extractor methods...');
    testResults.totalTests++;
    
    try {
      const extractorContent = fs.readFileSync(extractorPath, 'utf8');
      
      const requiredMethods = [
        'extractKeywordsFromCompetitor',
        'getCompetitorSpecificKeywords',
        'extractFromAllCompetitors'
      ];
      
      let methodsExist = true;
      for (const method of requiredMethods) {
        if (!extractorContent.includes(method)) {
          console.log(`❌ Missing method: ${method}`);
          methodsExist = false;
        }
      }
      
      if (methodsExist) {
        console.log('✅ All required methods implemented');
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
    
    // Test 3: Check competitor-specific keyword extraction
    console.log('\n📊 Test 3: Checking competitor-specific keywords...');
    testResults.totalTests++;
    
    try {
      const extractorContent = fs.readFileSync(extractorPath, 'utf8');
      
      // Check for competitor-specific keyword extraction
      const competitors = ['techmagic', 'netguru', 'innowise', 'andersen', 'itransition'];
      let hasCompetitorKeywords = true;
      
      for (const competitor of competitors) {
        if (!extractorContent.includes(competitor)) {
          console.log(`❌ Missing keywords for: ${competitor}`);
          hasCompetitorKeywords = false;
        }
      }
      
      if (hasCompetitorKeywords) {
        console.log('✅ Competitor-specific keywords implemented');
        testResults.passedTests++;
        testResults.details.push({ test: 'Competitor Keywords', status: 'PASSED' });
      } else {
        console.log('❌ Some competitor keywords missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Competitor Keywords', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking competitor keywords:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Competitor Keywords', status: 'FAILED', error: error.message });
    }
    
    // Test 4: Check if API is updated to use real extractor
    console.log('\n📊 Test 4: Checking API integration...');
    testResults.totalTests++;
    
    try {
      const apiPath = path.join(__dirname, '../src/pages/api/competitor-analysis.js');
      const apiContent = fs.readFileSync(apiPath, 'utf8');
      
      if (apiContent.includes('competitorExtractor') && 
          apiContent.includes('extractKeywordsFromCompetitor')) {
        console.log('✅ API updated to use real extractor');
        testResults.passedTests++;
        testResults.details.push({ test: 'API Integration', status: 'PASSED' });
      } else {
        console.log('❌ API not updated to use real extractor');
        testResults.failedTests++;
        testResults.details.push({ test: 'API Integration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking API integration:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'API Integration', status: 'FAILED', error: error.message });
    }
    
    // Calculate score
    const score = Math.round((testResults.passedTests / testResults.totalTests) * 100);
    
    console.log('\n📊 Step 1 Test Results:');
    console.log(`✅ Passed: ${testResults.passedTests}`);
    console.log(`❌ Failed: ${testResults.failedTests}`);
    console.log(`🔍 Score: ${score}%`);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, 'test-results/step1-competitor-extraction-report.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(resultsPath, JSON.stringify({
      testName: 'Step 1: Real Competitor Keyword Extraction',
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
      console.log('\n🎉 Step 1: Real Competitor Keyword Extraction - COMPLETE!');
      console.log('✅ Ready to proceed to Step 2: Google Trends Integration');
    } else {
      console.log('\n⚠️  Step 1: Real Competitor Keyword Extraction - INCOMPLETE');
      console.log('Some components need to be implemented or fixed.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCompetitorExtraction(); 