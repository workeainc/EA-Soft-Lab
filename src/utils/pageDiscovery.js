import { globby } from 'globby';
import { client } from '../lib/sanity.js';

/**
 * Discover all pages in the project
 * @returns {Promise<Array>} Array of page objects with URL, priority, and changefreq
 */
export async function discoverPages() {
  try {
    // Get all Astro pages
    const astroPages = await globby([
      'src/pages/**/*.astro',
      'src/pages/**/*.js',
      'src/pages/**/*.ts',
      'src/pages/**/*.md',
      'src/pages/**/*.mdx'
    ], {
      cwd: process.cwd(),
      absolute: false
    });

    // Get CMS pages (if using Sanity)
    let cmsPages = [];
    try {
      // Query for blog posts, case studies, etc. from CMS
      const blogPosts = await client.fetch(`
        *[_type == "post" || _type == "blog"] {
          "slug": slug.current,
          "lastmod": _updatedAt,
          "changefreq": "weekly",
          "priority": 0.6
        }
      `);

      const caseStudies = await client.fetch(`
        *[_type == "caseStudy"] {
          "slug": slug.current,
          "lastmod": _updatedAt,
          "changefreq": "monthly",
          "priority": 0.7
        }
      `);

      cmsPages = [...blogPosts, ...caseStudies];
    } catch (error) {
      console.warn('CMS page discovery failed:', error.message);
    }

    // Process Astro pages
    const processedAstroPages = astroPages.map(pagePath => {
      let url = pagePath.replace('src/pages/', '').replace(/\.(astro|js|ts|md|mdx)$/, '');
      
      if (url.endsWith('/index')) {
        url = url.replace('/index', '');
      }
      
      url = url.replace(/\[.*?\]/g, '');
      
      if (url.startsWith('api/') || url.startsWith('studio/') || url.includes('[') || url.includes(']')) {
        return null;
      }

      if (!url.startsWith('/')) {
        url = '/' + url;
      }

      return {
        url,
        lastmod: new Date(),
        changefreq: getChangeFreq(pagePath),
        priority: getPriority(pagePath)
      };
    }).filter(page => page !== null);

    // Process CMS pages
    const processedCmsPages = cmsPages.map(page => ({
      url: `/blog/${page.slug}`,
      lastmod: new Date(page.lastmod),
      changefreq: page.changefreq,
      priority: page.priority
    }));

    return [...processedAstroPages, ...processedCmsPages];
  } catch (error) {
    console.error('Page discovery failed:', error);
    return [];
  }
}

/**
 * Get priority for a page based on its path
 * @param {string} path - File path
 * @returns {number} Priority value
 */
function getPriority(path) {
  if (path === 'src/pages/index.astro') return 1.0;
  if (path.includes('/services/') || path.includes('/contact')) return 0.9;
  if (path.includes('/about/') || path.includes('/portfolio') || path.includes('/industries') || path.includes('/products')) return 0.8;
  if (path.includes('/industries/')) return 0.7;
  if (path.includes('/blog/')) return 0.6;
  if (path.includes('/terms') || path.includes('/privacy')) return 0.5;
  return 0.6;
}

/**
 * Get change frequency for a page based on its path
 * @param {string} path - File path
 * @returns {string} Change frequency
 */
function getChangeFreq(path) {
  if (path === 'src/pages/index.astro') return 'daily';
  if (path.includes('/services/') || path.includes('/blog/') || path.includes('/industries/')) return 'weekly';
  if (path.includes('/terms') || path.includes('/privacy') || path.includes('/about/')) return 'monthly';
  return 'weekly';
}

/**
 * Generate sitemap XML content
 * @param {Array} pages - Array of page objects
 * @param {string} site - Site URL
 * @returns {string} XML sitemap content
 */
export function generateSitemapXML(pages, site) {
  const sortedPages = pages.sort((a, b) => b.priority - a.priority);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sortedPages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod.toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

/**
 * Generate robots.txt content
 * @param {Array} pages - Array of page objects
 * @param {string} site - Site URL
 * @returns {string} robots.txt content
 */
export function generateRobotsTxt(pages, site) {
  const publicUrls = pages.map(page => page.url);
  
  return `# robots.txt for ${site}
# Generated automatically - Last updated: ${new Date().toISOString()}

# Allow all crawlers
User-agent: *

# Sitemap locations
Sitemap: ${site}sitemap.xml
Sitemap: ${site}image-sitemap.xml

# Allow important pages
${publicUrls.map(url => `Allow: ${url}`).join('\n')}

# Disallow admin and private areas
Disallow: /api/
Disallow: /studio/
Disallow: /admin/
Disallow: /private/
Disallow: /node_modules/
Disallow: /.env
Disallow: /.git

# Crawl delay for respectful crawling
Crawl-delay: 1

# Specific rules for different bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Block aggressive scrapers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

User-agent: DotBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

# Block malicious bots
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /.env
Disallow: /.git
Disallow: /node_modules/
`;
}
