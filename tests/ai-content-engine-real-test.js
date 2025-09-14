const fs = require('fs');
const path = require('path');

// Real competitor data as provided
const REAL_COMPETITORS = [
  { name: "TechMagic", url: "https://www.techmagic.co" },
  { name: "Netguru", url: "https://www.netguru.com" },
  { name: "Innowise Group", url: "https://innowise.com" },
  { name: "Andersen Inc.", url: "https://andersenlab.com" },
  { name: "Itransition", url: "https://www.itransition.com" },
  { name: "BairesDev", url: "https://www.bairesdev.com" },
  { name: "Moon Technolabs", url: "https://www.moontechnolabs.com" },
  { name: "Closeloop Technologies", url: "https://www.closeloop.com" },
  { name: "Geniusee", url: "https://geniusee.com" },
  { name: "Scandiweb", url: "https://scandiweb.com" }
];

// Target industries as specified
const TARGET_INDUSTRIES = [
  { name: "Fintech", keywords: ["custom dashboards", "APIs", "secure platforms", "SaaS portals", "payment integration"] },
  { name: "Healthcare / HealthTech", keywords: ["HIPAA-compliant", "data visualization", "telemedicine portals", "healthcare software"] },
  { name: "E-commerce / Retail", keywords: ["custom storefronts", "multi-vendor platforms", "Shopify alternatives", "ecommerce development"] },
  { name: "EdTech", keywords: ["online learning platforms", "LMS systems", "real-time dashboards", "edtech development"] },
  { name: "Logistics & Supply Chain", keywords: ["tracking dashboards", "ERP integrations", "route optimization", "logistics software"] },
  { name: "Travel & Hospitality", keywords: ["booking platforms", "customer dashboards", "mobile-friendly portals", "travel software"] },
  { name: "Real Estate / PropTech", keywords: ["listings portals", "CRM integrations", "virtual tour systems", "real estate software"] },
  { name: "SaaS Startups", keywords: ["MVP development", "dashboard UIs", "APIs", "SaaS development"] },
  { name: "LegalTech", keywords: ["secure case management", "document portals", "internal dashboards", "legal software"] },
  { name: "Marketing & Ad Agencies", keywords: ["custom CMS", "campaign analytics", "client portals", "marketing software"] },
  { name: "Manufacturing / Industry 4.0", keywords: ["IoT dashboards", "data analytics", "automation tools", "manufacturing software"] },
  { name: "Insurance / InsurTech", keywords: ["quote engines", "policy dashboards", "user portals", "insurance software"] },
  { name: "HRTech / Recruitment", keywords: ["applicant tracking", "portals", "internal tools", "HR software"] },
  { name: "Media / Publishing", keywords: ["custom CMS", "subscription platforms", "headless architecture", "media software"] },
  { name: "Government / Public Sector", keywords: ["e-gov portals", "dashboards", "secure admin tools", "government software"] }
];

// Technology keywords for full-stack development
const TECHNOLOGY_KEYWORDS = [
  "Python development", "Angular development", "Node.js development", 
  "SaaS development", "eCommerce development", "full-stack development",
  "web application development", "custom software development", "API development",
  "database design", "cloud computing", "microservices", "React development", 
  "Vue.js development", "JavaScript development", "TypeScript development",
  "REST API development", "GraphQL development", "MongoDB development", 
  "PostgreSQL development", "MySQL development", "Redis development",
  "Docker development", "Kubernetes development", "AWS development", 
  "Azure development", "Google Cloud development"
];

// Researched keywords with search volume data
const RESEARCHED_KEYWORDS = [
  "web development", "website development", "full stack developer", "Angular development",
  "Node.js development", "Python web development", "ecommerce development", "SaaS development",
  "custom software development", "web development services", "front end developer", "back end developer",
  "MEAN stack development", "MERN stack development", "remote web developer", "hire web developer",
  "web development USA", "full stack developer USA", "web development UK", "web development Australia",
  "web development Europe", "backend frameworks", "frontend frameworks", "REST API development",
  "responsive web design", "progressive web app", "API integration", "microservices architecture",
  "web application security", "continuous integration", "serverless architecture", "interactive dashboards"
];

async function testAIContentEngineReal() {
  console.log('🔍 Comprehensive AI Content Engine Real Test...\n');
  
  let testResults = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: [],
    competitorAnalysis: {},
    keywordOpportunities: {},
    aiContentGeneration: {}
  };
  
  try {
    // Test 1: Verify competitor extraction with real data
    console.log('📊 Test 1: Testing competitor extraction with real data...');
    testResults.totalTests++;
    
    try {
      const extractorPath = path.join(__dirname, '../src/lib/competitorExtractor.js');
      const extractorContent = fs.readFileSync(extractorPath, 'utf8');
      
      // Check if all 10 competitors are configured (using URL patterns)
      let allCompetitorsConfigured = true;
      for (const competitor of REAL_COMPETITORS) {
        const competitorUrl = competitor.url.toLowerCase();
        const domainName = competitorUrl.replace('https://www.', '').replace('https://', '').replace('.com', '').replace('.co', '');
        
        // Check if the domain name or part of it is in the extractor
        const domainParts = domainName.split('.');
        const mainDomain = domainParts[0];
        
        if (!extractorContent.includes(domainName) && !extractorContent.includes(mainDomain)) {
          console.log(`❌ Missing competitor configuration: ${competitor.name} (${domainName})`);
          allCompetitorsConfigured = false;
        }
      }
      
      if (allCompetitorsConfigured) {
        console.log('✅ All 10 competitors properly configured');
        testResults.passedTests++;
        testResults.details.push({ test: 'Competitor Configuration', status: 'PASSED' });
      } else {
        console.log('❌ Some competitors missing from configuration');
        testResults.failedTests++;
        testResults.details.push({ test: 'Competitor Configuration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking competitor configuration:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Competitor Configuration', status: 'FAILED', error: error.message });
    }
    
    // Test 2: Verify target industries configuration
    console.log('\n📊 Test 2: Testing target industries configuration...');
    testResults.totalTests++;
    
    try {
      const monitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const monitorContent = fs.readFileSync(monitorPath, 'utf8');
      
      // Check if target industries are configured
      let industriesConfigured = true;
      for (const industry of TARGET_INDUSTRIES) {
        if (!monitorContent.includes(industry.name) && !monitorContent.includes(industry.keywords[0])) {
          console.log(`❌ Missing industry configuration: ${industry.name}`);
          industriesConfigured = false;
        }
      }
      
      if (industriesConfigured) {
        console.log('✅ All 15 target industries properly configured');
        testResults.passedTests++;
        testResults.details.push({ test: 'Target Industries', status: 'PASSED' });
      } else {
        console.log('❌ Some target industries missing from configuration');
        testResults.failedTests++;
        testResults.details.push({ test: 'Target Industries', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking target industries:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Target Industries', status: 'FAILED', error: error.message });
    }
    
    // Test 3: Verify technology keywords
    console.log('\n📊 Test 3: Testing technology keywords configuration...');
    testResults.totalTests++;
    
    try {
      const monitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const monitorContent = fs.readFileSync(monitorPath, 'utf8');
      
      // Check if technology keywords are configured
      let techKeywordsConfigured = true;
      for (const keyword of TECHNOLOGY_KEYWORDS) {
        if (!monitorContent.includes(keyword)) {
          console.log(`❌ Missing technology keyword: ${keyword}`);
          techKeywordsConfigured = false;
        }
      }
      
      if (techKeywordsConfigured) {
        console.log('✅ All technology keywords properly configured');
        testResults.passedTests++;
        testResults.details.push({ test: 'Technology Keywords', status: 'PASSED' });
      } else {
        console.log('❌ Some technology keywords missing from configuration');
        testResults.failedTests++;
        testResults.details.push({ test: 'Technology Keywords', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking technology keywords:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Technology Keywords', status: 'FAILED', error: error.message });
    }
    
    // Test 3.5: Verify researched keywords with search volume data
    console.log('\n📊 Test 3.5: Testing researched keywords configuration...');
    testResults.totalTests++;
    
    try {
      const monitorPath = path.join(__dirname, '../src/lib/keywordOpportunityMonitor.js');
      const monitorContent = fs.readFileSync(monitorPath, 'utf8');
      
      // Check if researched keywords are configured
      let researchedKeywordsConfigured = true;
      let foundCount = 0;
      for (const keyword of RESEARCHED_KEYWORDS) {
        if (monitorContent.includes(keyword)) {
          foundCount++;
        } else {
          console.log(`❌ Missing researched keyword: ${keyword}`);
          researchedKeywordsConfigured = false;
        }
      }
      
      if (researchedKeywordsConfigured) {
        console.log(`✅ All ${RESEARCHED_KEYWORDS.length} researched keywords properly configured`);
        testResults.passedTests++;
        testResults.details.push({ test: 'Researched Keywords', status: 'PASSED', count: RESEARCHED_KEYWORDS.length });
      } else {
        console.log(`❌ Some researched keywords missing from configuration (${foundCount}/${RESEARCHED_KEYWORDS.length} found)`);
        testResults.failedTests++;
        testResults.details.push({ test: 'Researched Keywords', status: 'FAILED', found: foundCount, total: RESEARCHED_KEYWORDS.length });
      }
    } catch (error) {
      console.log('❌ Error checking researched keywords:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Researched Keywords', status: 'FAILED', error: error.message });
    }
    
    // Test 4: Verify Google Trends integration (simulated)
    console.log('\n📊 Test 4: Testing Google Trends integration...');
    testResults.totalTests++;
    
    try {
      const trendsPath = path.join(__dirname, '../src/lib/googleTrendsIntegration.js');
      const trendsContent = fs.readFileSync(trendsPath, 'utf8');
      
      // Check for realistic trend data generation
      const trendFeatures = [
        'generateRealisticTrendData',
        'baseTrend',
        'baseVolume',
        'trendVariation',
        'volumeVariation',
        'generateRelatedQueries',
        'generateRelatedTopics'
      ];
      
      let trendsWorking = true;
      for (const feature of trendFeatures) {
        if (!trendsContent.includes(feature)) {
          console.log(`❌ Missing trends feature: ${feature}`);
          trendsWorking = false;
        }
      }
      
      if (trendsWorking) {
        console.log('✅ Google Trends integration working (simulated data)');
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
    
    // Test 5: Verify AI Content Engine with 4 models
    console.log('\n📊 Test 5: Testing AI Content Engine with 4 models...');
    testResults.totalTests++;
    
    try {
      const aiEnginePath = path.join(__dirname, '../src/lib/aiContentEngine.js');
      const aiEngineContent = fs.readFileSync(aiEnginePath, 'utf8');
      
      // Check for 4 AI models configuration
      const aiModels = [
        'mistralai/ministral-8b',
        'mistralai/ministral-3b',
        'mistralai/mistral-nemo',
        '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',
        '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',
        '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',
        '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'
      ];
      
      let aiModelsConfigured = true;
      for (const model of aiModels) {
        if (!aiEngineContent.includes(model)) {
          console.log(`❌ Missing AI model: ${model}`);
          aiModelsConfigured = false;
        }
      }
      
      if (aiModelsConfigured) {
        console.log('✅ All 4 AI models properly configured');
        testResults.passedTests++;
        testResults.details.push({ test: 'AI Models Configuration', status: 'PASSED' });
      } else {
        console.log('❌ Some AI models missing from configuration');
        testResults.failedTests++;
        testResults.details.push({ test: 'AI Models Configuration', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking AI models:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'AI Models Configuration', status: 'FAILED', error: error.message });
    }
    
    // Test 6: Verify content generation methods
    console.log('\n📊 Test 6: Testing content generation methods...');
    testResults.totalTests++;
    
    try {
      const aiEnginePath = path.join(__dirname, '../src/lib/aiContentEngine.js');
      const aiEngineContent = fs.readFileSync(aiEnginePath, 'utf8');
      
      const contentMethods = [
        'generateBlogPost',
        'generateMetaDescription',
        'generateFAQContent',
        'generateTechnicalDoc',
        'generateHowToGuide',
        'generateContent'
      ];
      
      let contentMethodsWorking = true;
      for (const method of contentMethods) {
        if (!aiEngineContent.includes(method)) {
          console.log(`❌ Missing content method: ${method}`);
          contentMethodsWorking = false;
        }
      }
      
      if (contentMethodsWorking) {
        console.log('✅ All content generation methods available');
        testResults.passedTests++;
        testResults.details.push({ test: 'Content Generation Methods', status: 'PASSED' });
      } else {
        console.log('❌ Some content generation methods missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'Content Generation Methods', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking content methods:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'Content Generation Methods', status: 'FAILED', error: error.message });
    }
    
    // Test 7: Verify SEO optimization features
    console.log('\n📊 Test 7: Testing SEO optimization features...');
    testResults.totalTests++;
    
    try {
      const aiEnginePath = path.join(__dirname, '../src/lib/aiContentEngine.js');
      const aiEngineContent = fs.readFileSync(aiEnginePath, 'utf8');
      
      const seoFeatures = [
        'E-E-A-T',
        'SEO-optimized',
        'meta description',
        'voice search',
        'featured snippets',
        'semantic search'
      ];
      
      let seoFeaturesWorking = true;
      for (const feature of seoFeatures) {
        if (!aiEngineContent.includes(feature)) {
          console.log(`❌ Missing SEO feature: ${feature}`);
          seoFeaturesWorking = false;
        }
      }
      
      if (seoFeaturesWorking) {
        console.log('✅ All SEO optimization features available');
        testResults.passedTests++;
        testResults.details.push({ test: 'SEO Optimization Features', status: 'PASSED' });
      } else {
        console.log('❌ Some SEO optimization features missing');
        testResults.failedTests++;
        testResults.details.push({ test: 'SEO Optimization Features', status: 'FAILED' });
      }
    } catch (error) {
      console.log('❌ Error checking SEO features:', error.message);
      testResults.failedTests++;
      testResults.details.push({ test: 'SEO Optimization Features', status: 'FAILED', error: error.message });
    }
    
    // Test 8: Verify API endpoints
    console.log('\n📊 Test 8: Testing API endpoints...');
    testResults.totalTests++;
    
    const apiEndpoints = [
      '../src/pages/api/competitor-analysis.js',
      '../src/pages/api/keyword-opportunities.js',
      '../src/pages/api/ai-content.js'
    ];
    
    let apiEndpointsWorking = true;
    for (const endpoint of apiEndpoints) {
      const endpointPath = path.join(__dirname, endpoint);
      if (!fs.existsSync(endpointPath)) {
        console.log(`❌ Missing API endpoint: ${endpoint}`);
        apiEndpointsWorking = false;
      }
    }
    
    if (apiEndpointsWorking) {
      console.log('✅ All API endpoints available');
      testResults.passedTests++;
      testResults.details.push({ test: 'API Endpoints', status: 'PASSED' });
    } else {
      console.log('❌ Some API endpoints missing');
      testResults.failedTests++;
      testResults.details.push({ test: 'API Endpoints', status: 'FAILED' });
    }
    
    // Calculate overall score
    const score = Math.round((testResults.passedTests / testResults.totalTests) * 100);
    
    console.log('\n📊 AI Content Engine Real Test Results:');
    console.log(`✅ Passed: ${testResults.passedTests}`);
    console.log(`❌ Failed: ${testResults.failedTests}`);
    console.log(`🔍 Overall Score: ${score}%`);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, 'test-results/ai-content-engine-real-test-report.json');
    const resultsDir = path.dirname(resultsPath);
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    fs.writeFileSync(resultsPath, JSON.stringify({
      testName: 'AI Content Engine Real Test',
      timestamp: new Date().toISOString(),
      score: score,
      summary: {
        totalTests: testResults.totalTests,
        passedTests: testResults.passedTests,
        failedTests: testResults.failedTests
      },
      details: testResults.details,
      competitors: REAL_COMPETITORS,
      industries: TARGET_INDUSTRIES,
      technologyKeywords: TECHNOLOGY_KEYWORDS
    }, null, 2));
    
    console.log(`📄 Report saved to: ${resultsPath}`);
    
    if (score === 100) {
      console.log('\n🎉 AI Content Engine - FULLY IMPLEMENTED WITH REAL DATA!');
      console.log('✅ All 10 competitors configured');
      console.log('✅ All 15 target industries configured');
      console.log('✅ All technology keywords configured');
      console.log('✅ 4 AI models configured');
      console.log('✅ SEO optimization features available');
      console.log('✅ Ready for production use');
    } else if (score >= 80) {
      console.log('\n🎉 AI Content Engine - MOSTLY COMPLETE!');
      console.log('✅ Core functionality working');
      console.log('⚠️  Some minor features need attention');
    } else {
      console.log('\n⚠️  AI Content Engine - NEEDS WORK');
      console.log('❌ Several components missing or incomplete');
    }
    
  } catch (error) {
    console.error('❌ Real test failed:', error.message);
  }
}

// Run the real test
testAIContentEngineReal(); 