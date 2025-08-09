/**
 * Dynamic Breadcrumb Generation Utility
 * Automatically generates breadcrumb navigation based on URL structure
 */

// Breadcrumb configuration for different page types
const breadcrumbConfig = {
  // Main pages
  '/': [{ name: "Home", url: "https://easoftlab.com", position: 1 }],
  '/about': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "About", url: "https://easoftlab.com/about", position: 2 }
  ],
  '/services': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 }
  ],
  '/products': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Products", url: "https://easoftlab.com/products", position: 2 }
  ],
  '/industries': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 }
  ],
  '/portfolio': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Portfolio", url: "https://easoftlab.com/portfolio", position: 2 }
  ],
  '/blog': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Blog", url: "https://easoftlab.com/blog", position: 2 }
  ],
  '/contact': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Contact", url: "https://easoftlab.com/contact", position: 2 }
  ],
  '/privacy': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Privacy Policy", url: "https://easoftlab.com/privacy", position: 2 }
  ],
  '/terms': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Terms of Service", url: "https://easoftlab.com/terms", position: 2 }
  ],
  '/offline': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Offline", url: "https://easoftlab.com/offline", position: 2 }
  ],
  '/knowledge-hub': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Knowledge Hub", url: "https://easoftlab.com/knowledge-hub", position: 2 }
  ],

  // Service pages
  '/services/web-development': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "Web Development", url: "https://easoftlab.com/services/web-development", position: 3 }
  ],
  '/services/mobile-development': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "Mobile Development", url: "https://easoftlab.com/services/mobile-development", position: 3 }
  ],
  '/services/custom-software': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "Custom Software", url: "https://easoftlab.com/services/custom-software", position: 3 }
  ],
  '/services/ui-ux-design': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "UI/UX Design", url: "https://easoftlab.com/services/ui-ux-design", position: 3 }
  ],
  '/services/saas-development': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "SaaS Development", url: "https://easoftlab.com/services/saas-development", position: 3 }
  ],
  '/services/crm-erp': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "CRM/ERP Development", url: "https://easoftlab.com/services/crm-erp", position: 3 }
  ],
  '/services/image-tools': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Services", url: "https://easoftlab.com/services", position: 2 },
    { name: "Image Tools", url: "https://easoftlab.com/services/image-tools", position: 3 }
  ],

  // Industry pages
  '/industries/ecommerce': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
    { name: "E-commerce", url: "https://easoftlab.com/industries/ecommerce", position: 3 }
  ],
  '/industries/real-estate': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
    { name: "Real Estate", url: "https://easoftlab.com/industries/real-estate", position: 3 }
  ],
  '/industries/healthcare': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
    { name: "Healthcare", url: "https://easoftlab.com/industries/healthcare", position: 3 }
  ],
  '/industries/education': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
    { name: "Education", url: "https://easoftlab.com/industries/education", position: 3 }
  ],
  '/industries/logistics': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
    { name: "Logistics", url: "https://easoftlab.com/industries/logistics", position: 3 }
  ],
  '/industries/media-entertainment': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
    { name: "Media & Entertainment", url: "https://easoftlab.com/industries/media-entertainment", position: 3 }
  ],

  // About pages
  '/about/company': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "About", url: "https://easoftlab.com/about", position: 2 },
    { name: "Company", url: "https://easoftlab.com/about/company", position: 3 }
  ],
  '/about/team': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "About", url: "https://easoftlab.com/about", position: 2 },
    { name: "Team", url: "https://easoftlab.com/about/team", position: 3 }
  ],
  '/about/careers': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "About", url: "https://easoftlab.com/about", position: 2 },
    { name: "Careers", url: "https://easoftlab.com/about/careers", position: 3 }
  ],
  '/about/culture': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "About", url: "https://easoftlab.com/about", position: 2 },
    { name: "Culture", url: "https://easoftlab.com/about/culture", position: 3 }
  ],

  // Product pages
  '/products/saas-platform': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Products", url: "https://easoftlab.com/products", position: 2 },
    { name: "SaaS Platform", url: "https://easoftlab.com/products/saas-platform", position: 3 }
  ],
  '/products/tools': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Products", url: "https://easoftlab.com/products", position: 2 },
    { name: "Development Tools", url: "https://easoftlab.com/products/tools", position: 3 }
  ],
  '/products/coming-soon': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Products", url: "https://easoftlab.com/products", position: 2 },
    { name: "Coming Soon", url: "https://easoftlab.com/products/coming-soon", position: 3 }
  ],

  // Blog pages
  '/blog/seo': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Blog", url: "https://easoftlab.com/blog", position: 2 },
    { name: "SEO & Digital Marketing", url: "https://easoftlab.com/blog/seo", position: 3 }
  ],
  '/blog/how-to-optimize-website-seo': [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: "Blog", url: "https://easoftlab.com/blog", position: 2 },
    { name: "SEO Guide", url: "https://easoftlab.com/blog/how-to-optimize-website-seo", position: 3 }
  ]
};

/**
 * Generate breadcrumb items based on URL path
 * @param {string} path - The current URL path
 * @returns {Array} Array of breadcrumb items
 */
export function generateBreadcrumbs(path) {
  // Remove trailing slash and normalize path
  const normalizedPath = path.replace(/\/$/, '') || '/';
  
  // Check if we have a direct match
  if (breadcrumbConfig[normalizedPath]) {
    return breadcrumbConfig[normalizedPath];
  }

  // For dynamic routes, try to match the pattern
  const pathSegments = normalizedPath.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return breadcrumbConfig['/'];
  }

  // Try to match service pages
  if (pathSegments[0] === 'services' && pathSegments[1]) {
    const serviceName = pathSegments[1].replace(/-/g, ' ');
    return [
      { name: "Home", url: "https://easoftlab.com", position: 1 },
      { name: "Services", url: "https://easoftlab.com/services", position: 2 },
      { name: serviceName.charAt(0).toUpperCase() + serviceName.slice(1), url: `https://easoftlab.com${normalizedPath}`, position: 3 }
    ];
  }

  // Try to match industry pages
  if (pathSegments[0] === 'industries' && pathSegments[1]) {
    const industryName = pathSegments[1].replace(/-/g, ' ');
    return [
      { name: "Home", url: "https://easoftlab.com", position: 1 },
      { name: "Industries", url: "https://easoftlab.com/industries", position: 2 },
      { name: industryName.charAt(0).toUpperCase() + industryName.slice(1), url: `https://easoftlab.com${normalizedPath}`, position: 3 }
    ];
  }

  // Try to match about pages
  if (pathSegments[0] === 'about' && pathSegments[1]) {
    const aboutName = pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1);
    return [
      { name: "Home", url: "https://easoftlab.com", position: 1 },
      { name: "About", url: "https://easoftlab.com/about", position: 2 },
      { name: aboutName, url: `https://easoftlab.com${normalizedPath}`, position: 3 }
    ];
  }

  // Try to match product pages
  if (pathSegments[0] === 'products' && pathSegments[1]) {
    const productName = pathSegments[1].replace(/-/g, ' ');
    return [
      { name: "Home", url: "https://easoftlab.com", position: 1 },
      { name: "Products", url: "https://easoftlab.com/products", position: 2 },
      { name: productName.charAt(0).toUpperCase() + productName.slice(1), url: `https://easoftlab.com${normalizedPath}`, position: 3 }
    ];
  }

  // Try to match blog pages
  if (pathSegments[0] === 'blog' && pathSegments[1]) {
    const blogName = pathSegments[1].replace(/-/g, ' ');
    return [
      { name: "Home", url: "https://easoftlab.com", position: 1 },
      { name: "Blog", url: "https://easoftlab.com/blog", position: 2 },
      { name: blogName.charAt(0).toUpperCase() + blogName.slice(1), url: `https://easoftlab.com${normalizedPath}`, position: 3 }
    ];
  }

  // Fallback to basic breadcrumb
  return [
    { name: "Home", url: "https://easoftlab.com", position: 1 },
    { name: pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1), url: `https://easoftlab.com/${pathSegments[0]}`, position: 2 }
  ];
}

/**
 * Track breadcrumb analytics
 * @param {string} path - The current URL path
 * @param {Array} breadcrumbs - The breadcrumb items
 */
export function trackBreadcrumbAnalytics(path, breadcrumbs) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track breadcrumb interaction
    window.gtag('event', 'breadcrumb_view', {
      'event_category': 'navigation',
      'event_label': path,
      'breadcrumb_depth': breadcrumbs.length,
      'breadcrumb_path': breadcrumbs.map(item => item.name).join(' > ')
    });
  }
}

/**
 * Track breadcrumb click
 * @param {string} breadcrumbName - The name of the clicked breadcrumb
 * @param {string} breadcrumbUrl - The URL of the clicked breadcrumb
 * @param {number} position - The position of the breadcrumb
 */
export function trackBreadcrumbClick(breadcrumbName, breadcrumbUrl, position) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'breadcrumb_click', {
      'event_category': 'navigation',
      'event_label': breadcrumbName,
      'breadcrumb_url': breadcrumbUrl,
      'breadcrumb_position': position
    });
  }
}
