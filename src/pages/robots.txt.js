import { discoverPages, generateRobotsTxt } from '../utils/pageDiscovery.js';

export async function GET({ site }) {
  try {
    // Discover all pages automatically
    const pages = await discoverPages();
    
    // Generate robots.txt content
    const robotsTxt = generateRobotsTxt(pages, site);

    return new Response(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Robots.txt generation failed:', error);
    
    // Fallback to basic robots.txt
    const fallbackRobotsTxt = `# robots.txt for ${site}
# Generated automatically - Last updated: ${new Date().toISOString()}

# Allow all crawlers
User-agent: *

# Sitemap location
Sitemap: ${site}sitemap.xml

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
`;

    return new Response(fallbackRobotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
