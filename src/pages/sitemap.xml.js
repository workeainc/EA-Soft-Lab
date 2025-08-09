import { discoverPages, generateSitemapXML } from '../utils/pageDiscovery.js';

export async function GET({ site }) {
  try {
    // Discover all pages automatically
    const pages = await discoverPages();
    
    // Generate sitemap XML
    const sitemap = generateSitemapXML(pages, site);

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    
    // Fallback to basic sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
} 