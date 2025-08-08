import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://easoftlab.com',
  integrations: [
    tailwind(),
    sitemap(),
    sanity({
      projectId: 'oxjbgkqf',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false, // Set to true for production
      studioUrl: '/studio',
    })
  ],
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