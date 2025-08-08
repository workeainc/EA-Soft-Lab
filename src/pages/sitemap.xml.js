export async function GET() {
  const baseUrl = 'https://easoftlab.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/about/company',
    '/about/team',
    '/about/careers',
    '/about/culture',
    '/services',
    '/services/web-development',
    '/services/mobile-development',
    '/services/custom-software',
    '/services/saas-development',
    '/services/crm-erp',
    '/services/image-tools',
    '/industries',
    '/industries/ecommerce',
    '/industries/real-estate',
    '/industries/healthcare',
    '/industries/education',
    '/industries/logistics',
    '/industries/media-entertainment',
    '/products',
    '/products/saas-platform',
    '/products/tools',
    '/products/coming-soon',
    '/portfolio',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service'
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/services') || page.startsWith('/industries') ? '0.8' : '0.6'}</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
} 