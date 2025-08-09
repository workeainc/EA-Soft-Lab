import { globby } from 'globby';
import fs from 'fs/promises';
import path from 'path';

export async function GET({ site }) {
  try {
    // Discover all images in the project
    const imageFiles = await globby([
      'public/**/*.{jpg,jpeg,png,webp,avif,gif,svg}',
      'src/assets/**/*.{jpg,jpeg,png,webp,avif,gif,svg}'
    ], {
      cwd: process.cwd(),
      absolute: false
    });

    // Process images for sitemap
    const imageEntries = imageFiles.map(imagePath => {
      // Convert file path to URL
      let url = imagePath.replace('public/', '').replace('src/assets/', '');
      
      // Skip certain directories
      if (url.includes('node_modules/') || url.includes('.git/') || url.includes('admin/')) {
        return null;
      }

      // Get file info for better SEO
      const filename = path.basename(url);
      const extension = path.extname(url).toLowerCase();
      
      // Generate descriptive alt text from filename
      const altText = filename
        .replace(/[-_]/g, ' ')
        .replace(/\.[^/.]+$/, '')
        .replace(/\b\w/g, l => l.toUpperCase());

      return {
        url: `${site}${url}`,
        title: altText,
        caption: `EA Soft Lab - ${altText}`,
        geo_location: 'San Francisco, CA, USA',
        license: 'https://creativecommons.org/licenses/by/4.0/'
      };
    }).filter(entry => entry !== null);

    // Generate image sitemap XML
    const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.map(image => `  <url>
    <loc>${image.url}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      <image:geo_location>${image.geo_location}</image:geo_location>
      <image:license>${image.license}</image:license>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

    return new Response(imageSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Image sitemap generation failed:', error);
    
    // Fallback empty sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
