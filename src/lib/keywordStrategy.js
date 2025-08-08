// Comprehensive Keyword Strategy for EA Soft Lab
// 100+ keywords based on 15 target industries and full-stack development

export const KEYWORD_STRATEGY = {
  // Primary Target Keywords (High Priority)
  primaryKeywords: [
    "custom software development",
    "web application development", 
    "full-stack development",
    "Python development",
    "Angular development",
    "Node.js development",
    "SaaS development",
    "eCommerce development",
    "API development",
    "database design"
  ],

  // Industry-Specific Keywords (15 Industries)
  industryKeywords: {
    fintech: [
      "fintech development", "blockchain development", "cryptocurrency platforms",
      "payment integration", "financial software", "custom dashboards",
      "secure platforms", "SaaS portals", "banking software"
    ],
    healthcare: [
      "HIPAA-compliant web apps", "telemedicine portals", "healthcare software",
      "medical data visualization", "patient management systems", "healthcare dashboards"
    ],
    ecommerce: [
      "custom storefronts", "multi-vendor platforms", "Shopify alternatives",
      "ecommerce development", "online store development", "retail software"
    ],
    edtech: [
      "online learning platforms", "LMS systems", "edtech development",
      "educational software", "virtual classroom platforms", "student management systems"
    ],
    logistics: [
      "tracking dashboards", "ERP integrations", "logistics software",
      "supply chain management", "warehouse management systems", "route optimization"
    ],
    travel: [
      "booking platforms", "customer dashboards", "travel software",
      "hotel management systems", "reservation platforms", "travel agency software"
    ],
    realestate: [
      "listings portals", "CRM integrations", "real estate software",
      "property management systems", "virtual tour systems", "real estate analytics"
    ],
    saas: [
      "MVP development", "dashboard UIs", "SaaS development",
      "startup software", "product development", "SaaS platform development"
    ],
    legaltech: [
      "secure case management", "document portals", "legal software",
      "case tracking systems", "legal document management", "client portal development"
    ],
    marketing: [
      "custom CMS", "campaign analytics", "marketing software",
      "client portals", "advertising platforms", "marketing automation"
    ],
    manufacturing: [
      "IoT dashboards", "data analytics", "manufacturing software",
      "automation tools", "industrial software", "production management"
    ],
    insurance: [
      "quote engines", "policy dashboards", "insurance software",
      "user portals", "claims management", "underwriting systems"
    ],
    hrtech: [
      "applicant tracking", "HR software", "recruitment portals",
      "internal tools", "talent management", "HR dashboards"
    ],
    media: [
      "custom CMS", "subscription platforms", "media software",
      "headless architecture", "content management", "publishing platforms"
    ],
    government: [
      "e-gov portals", "government software", "secure admin tools",
      "public sector dashboards", "citizen portals", "government analytics"
    ]
  },

  // Technology Stack Keywords
  technologyKeywords: [
    "Python development", "Angular development", "Node.js development",
    "React development", "Vue.js development", "JavaScript development",
    "TypeScript development", "SaaS development", "eCommerce development",
    "full-stack development", "web application development", "custom software development",
    "API development", "database design", "cloud computing", "microservices"
  ],

  // Long-tail Keywords for SEO
  longTailKeywords: [
    "custom software development company", "web application development services",
    "full-stack development agency", "Python development company",
    "Angular development services", "Node.js development agency",
    "SaaS development company", "eCommerce development services",
    "API development company", "database design services"
  ],

  // SEO-Optimized Keywords
  seoKeywords: [
    "software development company", "web development agency", "custom software solutions",
    "full-stack development services", "Python development company",
    "Angular development agency", "Node.js development services",
    "SaaS development company", "eCommerce development agency", "API development services"
  ],

  // Voice Search Keywords
  voiceSearchKeywords: [
    "how to develop custom software", "what is full-stack development",
    "how to build a web application", "what is Python development",
    "how to create an API", "what is SaaS development",
    "how to build an eCommerce website", "what is Angular development"
  ]
};

// Keyword Difficulty Calculator
export const calculateKeywordDifficulty = (keyword) => {
  const baseDifficulty = 50;
  let difficulty = baseDifficulty;
  
  // Adjust based on keyword length
  if (keyword.length > 20) difficulty += 10;
  if (keyword.length < 10) difficulty -= 5;
  
  // Adjust based on keyword type
  if (keyword.includes('development')) difficulty += 5;
  if (keyword.includes('software')) difficulty += 3;
  if (keyword.includes('custom')) difficulty += 8;
  if (keyword.includes('company')) difficulty -= 5;
  if (keyword.includes('services')) difficulty -= 3;
  
  // Ensure difficulty is between 0-100
  return Math.max(0, Math.min(100, difficulty));
};

// Keyword Opportunity Calculator
export const calculateKeywordOpportunity = (keyword, searchVolume, trend) => {
  const difficulty = calculateKeywordDifficulty(keyword);
  const volumeScore = Math.min(100, searchVolume / 100);
  const trendScore = Math.min(100, trend);
  
  // Opportunity = (Volume + Trend - Difficulty) / 3 * 100
  const opportunity = ((volumeScore + trendScore + (100 - difficulty)) / 3);
  
  return Math.max(0, Math.min(100, opportunity));
};

// Get all keywords
export const getAllKeywords = () => {
  const allKeywords = [
    ...KEYWORD_STRATEGY.primaryKeywords,
    ...KEYWORD_STRATEGY.technologyKeywords,
    ...KEYWORD_STRATEGY.longTailKeywords,
    ...KEYWORD_STRATEGY.seoKeywords,
    ...KEYWORD_STRATEGY.voiceSearchKeywords
  ];
  
  // Add industry keywords
  Object.values(KEYWORD_STRATEGY.industryKeywords).forEach(industryKeywords => {
    allKeywords.push(...industryKeywords);
  });
  
  return [...new Set(allKeywords)]; // Remove duplicates
};

// Get keywords by category
export const getKeywordsByCategory = (category) => {
  switch (category) {
    case 'primary':
      return KEYWORD_STRATEGY.primaryKeywords;
    case 'technology':
      return KEYWORD_STRATEGY.technologyKeywords;
    case 'longtail':
      return KEYWORD_STRATEGY.longTailKeywords;
    case 'seo':
      return KEYWORD_STRATEGY.seoKeywords;
    case 'voicesearch':
      return KEYWORD_STRATEGY.voiceSearchKeywords;
    default:
      return KEYWORD_STRATEGY.industryKeywords[category] || [];
  }
};

// Get total keyword count
export const getTotalKeywordCount = () => {
  return getAllKeywords().length;
};

console.log(`📊 Keyword Strategy Loaded: ${getAllKeywords().length} keywords configured`); 