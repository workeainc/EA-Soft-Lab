import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create client with better error handling
export const client = createClient({
  projectId: import.meta.env?.PUBLIC_SANITY_PROJECT_ID || 'oxjbgkqf',
  dataset: import.meta.env?.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
  token: import.meta.env?.SANITY_API_TOKEN, // Only needed for write operations
})

// Add error handling wrapper for client operations
export const safeClient = {
  async fetch(query, params) {
    try {
      return await client.fetch(query, params)
    } catch (error) {
      console.warn('Sanity CMS Error:', error.message)
      // Return null for demo/development environment
      return null
    }
  }
}

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  if (!source) return null
  try {
    return builder.image(source)
  } catch (error) {
    console.warn('Image URL Error:', error.message)
    return null
  }
}

// Helper function to get image URL with specific dimensions
export const getImageUrl = (image, width = 800, height = 600) => {
  if (!image) return null
  try {
    return urlFor(image)
      .width(width)
      .height(height)
      .fit('crop')
      .url()
  } catch (error) {
    console.warn('Image URL Error:', error.message)
    return null
  }
}

// Helper function to get responsive image URLs
export const getResponsiveImageUrls = (image, sizes = [400, 800, 1200]) => {
  if (!image) return null
  try {
    return sizes.map(size => ({
      width: size,
      url: urlFor(image).width(size).url()
    }))
  } catch (error) {
    console.warn('Responsive Image URLs Error:', error.message)
    return null
  }
} 