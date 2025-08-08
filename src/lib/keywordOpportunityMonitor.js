// Keyword Opportunity Monitor Configuration
const COMPETITOR_CONFIG = {
  competitors: [
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
  ],
  
  targetIndustries: [
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
    { name: "Insurance / InsurTech", keywords: ["insurance software", "quote engines", "policy dashboards", "insurtech development", "insurance portals"] },
    { name: "HRTech / Recruitment", keywords: ["HR software", "applicant tracking", "recruitment portals", "HR dashboards", "talent management"] },
    { name: "Media / Publishing", keywords: ["media software", "custom CMS", "subscription platforms", "publishing platforms", "content management"] },
    { name: "Government / Public Sector", keywords: ["government software", "e-gov portals", "public sector dashboards", "government portals", "public administration"] }
  ],
  
  technologyKeywords: [
    "Python development", "Angular development", "Node.js development", "SaaS development", "eCommerce development",
    "full-stack development", "web application development", "custom software development", "API development",
    "database design", "cloud computing", "microservices", "React development", "Vue.js development",
    "JavaScript development", "TypeScript development", "REST API development", "GraphQL development",
    "MongoDB development", "PostgreSQL development", "MySQL development", "Redis development",
    "Docker development", "Kubernetes development", "AWS development", "Azure development", "Google Cloud development"
  ],
  
  // Researched Keywords with Search Volume, Intent, and Type Data
  researchedKeywords: [
    // High-Volume Short-tail Keywords (Commercial Intent)
    { keyword: "web development", searchVolume: 170970, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "website development", searchVolume: 287711, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "full stack developer", searchVolume: 205222, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "Angular development", searchVolume: 247399, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "Node.js development", searchVolume: 218478, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "Python web development", searchVolume: 45262, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "ecommerce development", searchVolume: 222417, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "SaaS development", searchVolume: 161482, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "dashboard development", searchVolume: 10863, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "web app development", searchVolume: 195907, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "software development services", searchVolume: 61207, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "custom software development", searchVolume: 289978, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "web development company", searchVolume: 9490, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "web development services", searchVolume: 262350, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "front end developer", searchVolume: 152066, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "back end developer", searchVolume: 260925, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "MEAN stack development", searchVolume: 171515, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "MERN stack development", searchVolume: 82712, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "remote web developer", searchVolume: 125881, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    { keyword: "hire web developer", searchVolume: 185009, type: "Short-tail", intent: "Commercial", recommendedUse: "Homepage, Service Pages, Off-page SEO" },
    
    // Long-tail Transactional Keywords
    { keyword: "hire full stack Python web developer for SaaS platform", searchVolume: 270, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire full stack Python web developer for ecommerce site", searchVolume: 589, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire Angular e-commerce website developer for SaaS platform", searchVolume: 251, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire Angular e-commerce website developer for ecommerce site", searchVolume: 974, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire Node.js API development for SaaS platform", searchVolume: 994, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire Node.js API development for ecommerce site", searchVolume: 945, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire Python SaaS application developer for SaaS platform", searchVolume: 151, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire Python SaaS application developer for ecommerce site", searchVolume: 147, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire dashboard development with Python for SaaS platform", searchVolume: 805, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "hire dashboard development with Python for ecommerce site", searchVolume: 771, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    
    // Best Services Keywords
    { keyword: "best full stack Python web developer services for SaaS platform", searchVolume: 709, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best full stack Python web developer services for ecommerce site", searchVolume: 922, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best Angular e-commerce website developer services for SaaS platform", searchVolume: 481, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best Angular e-commerce website developer services for ecommerce site", searchVolume: 800, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best Node.js API development services for SaaS platform", searchVolume: 714, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best Node.js API development services for ecommerce site", searchVolume: 115, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best Python SaaS application developer services for SaaS platform", searchVolume: 955, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best Python SaaS application developer services for ecommerce site", searchVolume: 772, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best dashboard development with Python services for SaaS platform", searchVolume: 823, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "best dashboard development with Python services for ecommerce site", searchVolume: 854, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    
    // Affordable Services Keywords
    { keyword: "affordable full stack Python web developer developer for SaaS platform", searchVolume: 608, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable full stack Python web developer developer for ecommerce site", searchVolume: 291, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable Angular e-commerce website developer developer for SaaS platform", searchVolume: 568, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable Angular e-commerce website developer developer for ecommerce site", searchVolume: 114, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable Node.js API development developer for SaaS platform", searchVolume: 549, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable Node.js API development developer for ecommerce site", searchVolume: 207, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable Python SaaS application developer developer for SaaS platform", searchVolume: 241, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable Python SaaS application developer developer for ecommerce site", searchVolume: 241, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable dashboard development with Python developer for SaaS platform", searchVolume: 391, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "affordable dashboard development with Python developer for ecommerce site", searchVolume: 317, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    
    // Custom Solutions Keywords
    { keyword: "custom full stack Python web developer solutions for SaaS platform", searchVolume: 876, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom full stack Python web developer solutions for ecommerce site", searchVolume: 338, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom Angular e-commerce website developer solutions for SaaS platform", searchVolume: 478, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom Angular e-commerce website developer solutions for ecommerce site", searchVolume: 456, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom Node.js API development solutions for SaaS platform", searchVolume: 706, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom Node.js API development solutions for ecommerce site", searchVolume: 347, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom Python SaaS application developer solutions for SaaS platform", searchVolume: 158, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom Python SaaS application developer solutions for ecommerce site", searchVolume: 360, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom dashboard development with Python solutions for SaaS platform", searchVolume: 691, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "custom dashboard development with Python solutions for ecommerce site", searchVolume: 979, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    
    // Professional Services Keywords
    { keyword: "professional full stack Python web developer developer for SaaS platform", searchVolume: 708, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional full stack Python web developer developer for ecommerce site", searchVolume: 493, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional Angular e-commerce website developer developer for SaaS platform", searchVolume: 808, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional Angular e-commerce website developer developer for ecommerce site", searchVolume: 163, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional Node.js API development developer for SaaS platform", searchVolume: 513, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional Node.js API development developer for ecommerce site", searchVolume: 623, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional Python SaaS application developer developer for SaaS platform", searchVolume: 200, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional Python SaaS application developer developer for ecommerce site", searchVolume: 606, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional dashboard development with Python developer for SaaS platform", searchVolume: 858, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    { keyword: "professional dashboard development with Python developer for ecommerce site", searchVolume: 921, type: "Long-tail", intent: "Transactional", recommendedUse: "Blogs, Service Pages" },
    
    // Geo-specific Keywords (USA)
    { keyword: "web development USA", searchVolume: 1527, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "full stack developer USA", searchVolume: 717, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "ecommerce site development USA", searchVolume: 552, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "custom software development company USA", searchVolume: 505, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Angular developer USA", searchVolume: 1586, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Node.js development USA", searchVolume: 1410, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Python web services USA", searchVolume: 1310, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "SaaS development USA", searchVolume: 1702, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "dashboard development service USA", searchVolume: 1684, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "remote developer USA", searchVolume: 1647, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    
    // Geo-specific Keywords (UK)
    { keyword: "web development UK", searchVolume: 1904, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "full stack developer UK", searchVolume: 337, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "ecommerce site development UK", searchVolume: 1492, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "custom software development company UK", searchVolume: 750, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Angular developer UK", searchVolume: 472, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Node.js development UK", searchVolume: 765, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Python web services UK", searchVolume: 1242, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "SaaS development UK", searchVolume: 825, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "dashboard development service UK", searchVolume: 1159, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "remote developer UK", searchVolume: 1211, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    
    // Geo-specific Keywords (Australia)
    { keyword: "web development Australia", searchVolume: 1204, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "full stack developer Australia", searchVolume: 589, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "ecommerce site development Australia", searchVolume: 1198, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "custom software development company Australia", searchVolume: 1579, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Angular developer Australia", searchVolume: 1156, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Node.js development Australia", searchVolume: 559, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Python web services Australia", searchVolume: 1810, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "SaaS development Australia", searchVolume: 785, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "dashboard development service Australia", searchVolume: 1862, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "remote developer Australia", searchVolume: 1524, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    
    // Geo-specific Keywords (Europe)
    { keyword: "web development Europe", searchVolume: 1454, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "full stack developer Europe", searchVolume: 1038, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "ecommerce site development Europe", searchVolume: 1348, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "custom software development company Europe", searchVolume: 863, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Angular developer Europe", searchVolume: 1320, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Node.js development Europe", searchVolume: 1170, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "Python web services Europe", searchVolume: 1243, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "SaaS development Europe", searchVolume: 1768, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "dashboard development service Europe", searchVolume: 345, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    { keyword: "remote developer Europe", searchVolume: 1286, type: "Geo-specific", intent: "Commercial", recommendedUse: "Service Pages, Blogs" },
    
    // LSI/Related Keywords (Informational Intent)
    { keyword: "backend frameworks", searchVolume: 9032, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "frontend frameworks", searchVolume: 4681, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "REST API development", searchVolume: 8692, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "single-page apps", searchVolume: 7140, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "responsive web design", searchVolume: 9573, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "progressive web app", searchVolume: 4680, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "CMS integration", searchVolume: 911, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "API integration", searchVolume: 9691, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "cloud deployment", searchVolume: 4659, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "microservices architecture", searchVolume: 5260, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "cross-platform web app", searchVolume: 1746, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "real-time web application", searchVolume: 2725, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "headless CMS development", searchVolume: 5854, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "web application security", searchVolume: 8311, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "continuous integration", searchVolume: 8375, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "continuous deployment", searchVolume: 7017, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "serverless architecture", searchVolume: 4176, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "database optimization", searchVolume: 2627, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "UI/UX web design", searchVolume: 2505, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    { keyword: "interactive dashboards", searchVolume: 6308, type: "LSI/Related", intent: "Informational", recommendedUse: "Blog Posts, FAQs" },
    
    // Blog-focused Keywords (Informational Intent)
    { keyword: "how to build a web app with Angular and Node.js", searchVolume: 731, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "benefits of Python for web development", searchVolume: 1742, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "ecommerce website best practices", searchVolume: 890, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "SaaS application development guide", searchVolume: 712, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "dashboard design tips for data visualization", searchVolume: 265, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "choosing the right tech stack for your project", searchVolume: 1118, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "cost of custom software development", searchVolume: 150, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "why hire a full stack developer", searchVolume: 864, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "Angular vs React for web apps", searchVolume: 713, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "Node.js scaling strategies", searchVolume: 506, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "Python web frameworks comparison", searchVolume: 1941, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "optimizing web app performance", searchVolume: 1659, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "security best practices for web apps", searchVolume: 1239, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "deploying a SaaS platform to AWS", searchVolume: 1175, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "building real-time dashboards with WebSockets", searchVolume: 513, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "integrating CMS with modern web apps", searchVolume: 1788, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "progressive web app features", searchVolume: 534, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "headless CMS vs traditional CMS", searchVolume: 1387, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "microservices vs monolithic architecture", searchVolume: 191, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" },
    { keyword: "API-first development benefits", searchVolume: 1748, type: "Blog-focused", intent: "Informational", recommendedUse: "Blog Posts" }
  ]
};

// Keyword Opportunity Monitor Class
class KeywordOpportunityMonitor {
  constructor() {
    this.opportunities = [];
    this.competitorAnalysis = {};
    this.trendingKeywords = [];
  }

  // Analyze competitor keywords
  async analyzeCompetitorKeywords(competitorUrl) {
    try {
      const response = await fetch('/api/competitor-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: competitorUrl })
      });

      if (response.ok) {
        const result = await response.json();
        return result.data.keywords;
      }
      
      // Fallback: return industry-specific keywords
      return this.getIndustryKeywords(competitorUrl);
      
    } catch (error) {
      console.error('Competitor analysis error:', error);
      return this.getIndustryKeywords(competitorUrl);
    }
  }

  // Get industry-specific keywords based on competitor URL
  getIndustryKeywords(competitorUrl) {
    const url = competitorUrl.toLowerCase();
    
    if (url.includes('fintech') || url.includes('finance')) {
      return COMPETITOR_CONFIG.targetIndustries[0].keywords;
    } else if (url.includes('health') || url.includes('medical')) {
      return COMPETITOR_CONFIG.targetIndustries[1].keywords;
    } else if (url.includes('ecommerce') || url.includes('retail')) {
      return COMPETITOR_CONFIG.targetIndustries[2].keywords;
    } else if (url.includes('education') || url.includes('learning')) {
      return COMPETITOR_CONFIG.targetIndustries[3].keywords;
    } else {
      // Default to general software development keywords
      return [
        "custom software development",
        "web application development",
        "full-stack development",
        "API development",
        "database design"
      ];
    }
  }

  // Get Google Trends data for keywords (real integration)
  async getTrendingKeywords(keywords, timeframe = '12') {
    try {
      console.log(`📈 Getting trending data for ${keywords.length} keywords...`);
      
      // Use real Google Trends integration
      const trendsData = await googleTrends.getTrendingData(keywords, timeframe);
      
      // Add difficulty and opportunity scores
      const enhancedData = trendsData.map(item => ({
        ...item,
        difficulty: this.calculateKeywordDifficulty(item.keyword),
        opportunity: this.calculateOpportunityScore(item.trend, item.searchVolume, item.keyword)
      }));
      
      return enhancedData.sort((a, b) => b.opportunity - a.opportunity);
      
    } catch (error) {
      console.error('❌ Trending keywords error:', error);
      return this.generateMockTrendData(keywords);
    }
  }

  // Fetch Google Trends data (now using real integration)
  async fetchGoogleTrends(keyword, timeframe) {
    try {
      const trendData = await googleTrends.fetchKeywordTrends(keyword, timeframe);
      return {
        trend: trendData.trend,
        searchVolume: trendData.searchVolume,
        timeframe: timeframe,
        relatedQueries: trendData.relatedQueries,
        relatedTopics: trendData.relatedTopics
      };
    } catch (error) {
      console.error(`❌ Error fetching trends for ${keyword}:`, error);
      // Fallback to mock data
      return {
        trend: Math.random() * 100,
        searchVolume: Math.floor(Math.random() * 10000) + 1000,
        timeframe: timeframe
      };
    }
  }

  // Calculate keyword difficulty (1-100)
  calculateKeywordDifficulty(keyword) {
    const wordCount = keyword.split(' ').length;
    const hasTechnicalTerms = /(development|software|platform|system|api|database)/i.test(keyword);
    const hasLongTail = wordCount > 2;
    const hasCompetitiveTerms = /(custom|enterprise|full-stack|cloud|saas)/i.test(keyword);
    
    let difficulty = 30; // Base difficulty
    
    if (hasLongTail) difficulty += 15;
    if (hasTechnicalTerms) difficulty += 25;
    if (hasCompetitiveTerms) difficulty += 20;
    if (keyword.includes('custom')) difficulty += 15;
    if (keyword.includes('full-stack')) difficulty += 20;
    if (keyword.includes('enterprise')) difficulty += 25;
    
    return Math.min(difficulty, 100);
  }

  // Calculate opportunity score (0-100)
  calculateOpportunityScore(trend, searchVolume, keyword) {
    const trendScore = Math.min(trend / 10, 10); // Normalize trend to 0-10
    const volumeScore = Math.min(searchVolume / 1000, 10); // Normalize volume to 0-10
    const difficulty = this.calculateKeywordDifficulty(keyword);
    const difficultyScore = Math.max(0, 10 - (difficulty / 10)); // Lower difficulty = higher score
    
    return (trendScore + volumeScore + difficultyScore) / 3 * 10; // Scale to 0-100
  }

  // Generate mock trend data for testing
  generateMockTrendData(keywords) {
    return keywords.map(keyword => ({
      keyword: keyword,
      trend: Math.random() * 100,
      searchVolume: Math.floor(Math.random() * 10000) + 1000,
      difficulty: this.calculateKeywordDifficulty(keyword),
      opportunity: this.calculateOpportunityScore(Math.random() * 100, Math.floor(Math.random() * 10000) + 1000, keyword)
    })).sort((a, b) => b.opportunity - a.opportunity);
  }

  // Analyze all competitors
  async analyzeAllCompetitors() {
    const analysis = {};
    
    for (const competitor of COMPETITOR_CONFIG.competitors) {
      try {
        const keywords = await this.analyzeCompetitorKeywords(competitor.url);
        analysis[competitor.name] = {
          url: competitor.url,
          keywords: keywords,
          keywordCount: keywords.length,
          analyzedAt: new Date().toISOString()
        };
      } catch (error) {
        console.error(`Error analyzing ${competitor.name}:`, error);
        analysis[competitor.name] = {
          url: competitor.url,
          keywords: [],
          keywordCount: 0,
          error: error.message,
          analyzedAt: new Date().toISOString()
        };
      }
    }
    
    this.competitorAnalysis = analysis;
    return analysis;
  }

  // Find keyword opportunities
  async findKeywordOpportunities() {
    try {
      // Analyze competitors
      await this.analyzeAllCompetitors();
      
      // Get all unique keywords from competitors
      const allKeywords = new Set();
      Object.values(this.competitorAnalysis).forEach(competitor => {
        if (competitor.keywords && Array.isArray(competitor.keywords)) {
          competitor.keywords.forEach(keyword => allKeywords.add(keyword));
        }
      });
      
      // Add industry and technology keywords
      COMPETITOR_CONFIG.targetIndustries.forEach(industry => {
        industry.keywords.forEach(keyword => allKeywords.add(keyword));
      });
      
      COMPETITOR_CONFIG.technologyKeywords.forEach(keyword => {
        allKeywords.add(keyword);
      });
      
      // Get trending data for all keywords
      const trendingData = await this.getTrendingKeywords(Array.from(allKeywords));
      
      // Filter high-opportunity keywords
      const opportunities = trendingData
        .filter(item => item.opportunity > 50) // Only high-opportunity keywords
        .map(item => ({
          ...item,
          category: this.categorizeKeyword(item.keyword),
          recommendedContent: this.getRecommendedContent(item.keyword)
        }));
      
      this.opportunities = opportunities;
      return opportunities;
      
    } catch (error) {
      console.error('Error finding keyword opportunities:', error);
      return [];
    }
  }

  // Categorize keyword by industry
  categorizeKeyword(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    for (const industry of COMPETITOR_CONFIG.targetIndustries) {
      if (industry.keywords.some(k => lowerKeyword.includes(k.toLowerCase()))) {
        return industry.name;
      }
    }
    
    return "General Software Development";
  }

  // Get recommended content types for keyword
  getRecommendedContent(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    if (lowerKeyword.includes('how') || lowerKeyword.includes('guide')) {
      return ['how_to_guide', 'blog_post', 'technical_documentation'];
    } else if (lowerKeyword.includes('best') || lowerKeyword.includes('top')) {
      return ['blog_post', 'article', 'premium_content'];
    } else if (lowerKeyword.includes('vs') || lowerKeyword.includes('comparison')) {
      return ['blog_post', 'article', 'detailed_analysis'];
    } else if (lowerKeyword.includes('cost') || lowerKeyword.includes('price')) {
      return ['blog_post', 'article', 'meta_description'];
    } else {
      return ['blog_post', 'article', 'technical_content'];
    }
  }

  // Generate keyword alerts
  generateKeywordAlerts() {
    const alerts = [];
    
    if (!this.opportunities || this.opportunities.length === 0) {
      return alerts;
    }
    
    // High-trending keywords
    const highTrending = this.opportunities.filter(k => k.trend > 80);
    if (highTrending.length > 0) {
      alerts.push({
        type: 'high_trending',
        message: `${highTrending.length} keywords are trending high`,
        keywords: highTrending.slice(0, 5)
      });
    }
    
    // Low-competition opportunities
    const lowCompetition = this.opportunities.filter(k => k.difficulty < 30);
    if (lowCompetition.length > 0) {
      alerts.push({
        type: 'low_competition',
        message: `${lowCompetition.length} low-competition opportunities found`,
        keywords: lowCompetition.slice(0, 5)
      });
    }
    
    // High-volume keywords
    const highVolume = this.opportunities.filter(k => k.searchVolume > 5000);
    if (highVolume.length > 0) {
      alerts.push({
        type: 'high_volume',
        message: `${highVolume.length} high-volume keywords identified`,
        keywords: highVolume.slice(0, 5)
      });
    }
    
    return alerts;
  }

  // Get competitor gap analysis
  getCompetitorGapAnalysis() {
    const gaps = [];
    
    if (!this.competitorAnalysis || Object.keys(this.competitorAnalysis).length === 0) {
      return gaps;
    }
    
    // Find keywords that competitors are not targeting
    const allCompetitorKeywords = new Set();
    Object.values(this.competitorAnalysis).forEach(competitor => {
      if (competitor.keywords && Array.isArray(competitor.keywords)) {
        competitor.keywords.forEach(keyword => allCompetitorKeywords.add(keyword.toLowerCase()));
      }
    });
    
    // Find opportunities in our target keywords
    COMPETITOR_CONFIG.targetIndustries.forEach(industry => {
      industry.keywords.forEach(keyword => {
        if (!allCompetitorKeywords.has(keyword.toLowerCase())) {
          gaps.push({
            keyword: keyword,
            industry: industry.name,
            opportunity: 'high',
            reason: 'Competitors not targeting this keyword'
          });
        }
      });
    });
    
    return gaps;
  }

  // Get comprehensive keyword report
  async generateKeywordReport() {
    try {
      const opportunities = await this.findKeywordOpportunities();
      const alerts = this.generateKeywordAlerts();
      const gaps = this.getCompetitorGapAnalysis();
      
      return {
        opportunities: opportunities.slice(0, 20), // Top 20 opportunities
        alerts: alerts,
        competitorGaps: gaps,
        competitorAnalysis: this.competitorAnalysis,
        generatedAt: new Date().toISOString(),
        summary: {
          totalOpportunities: opportunities.length,
          highTrending: opportunities.filter(k => k.trend > 80).length,
          lowCompetition: opportunities.filter(k => k.difficulty < 30).length,
          highVolume: opportunities.filter(k => k.searchVolume > 5000).length,
          totalCompetitors: Object.keys(this.competitorAnalysis).length,
          totalGaps: gaps.length
        }
      };
    } catch (error) {
      console.error('Error generating keyword report:', error);
      return {
        opportunities: [],
        alerts: [],
        competitorGaps: [],
        competitorAnalysis: {},
        generatedAt: new Date().toISOString(),
        error: error.message
      };
    }
  }
}

// Export the Keyword Opportunity Monitor
export const keywordMonitor = new KeywordOpportunityMonitor();
export default keywordMonitor; 