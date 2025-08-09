import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://easoftlab.com',
  integrations: [
    tailwind(),
    // Custom sitemap configuration - using custom sitemap.xml.js
    sanity({
      projectId: 'oxjbgkqf',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false, // Set to true for production
      studioUrl: '/studio',
    })
  ],
  // Advanced Security Headers
  headers: {
    '/*': [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://api.sanity.io; frame-src 'self' https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
      },
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'X-Permitted-Cross-Domain-Policies',
        value: 'none'
      },
      {
        key: 'Cross-Origin-Embedder-Policy',
        value: 'require-corp'
      },
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin'
      },
      {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin'
      }
    ],
    '/api/*': [
      {
        key: 'Cache-Control',
        value: 'no-cache, no-store, must-revalidate'
      },
      {
        key: 'Pragma',
        value: 'no-cache'
      },
      {
        key: 'Expires',
        value: '0'
      }
    ],
    '/sitemap.xml': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600'
      }
    ],
    '/robots.txt': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=86400'
      }
    ]
  },
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
            'sanity': ['@sanity/client', '@sanity/image-url'],
          }
        }
      }
    },
    ssr: {
      noExternal: ['@sanity/client']
    }
  },
  // Enhanced image optimization with WebP support
  image: {
    serviceEntryPoint: '@astrojs/image/sharp',
    domains: ['cdn.sanity.io'],
    formats: ['webp', 'avif', 'jpeg'],
    quality: 80,
    // Sharp configuration for WebP optimization
    sharp: {
      webp: {
        quality: 80,
        effort: 6
      },
      avif: {
        quality: 80,
        effort: 6
      }
    }
  },
  // Compression
  compressHTML: true,
  // Prefetch optimization
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  }
}); 