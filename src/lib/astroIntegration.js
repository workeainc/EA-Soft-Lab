/**
 * Astro.js + Sanity CMS Integration for AI Content Engine
 */

import { client, safeClient } from './sanity.js';

class AstroSanityIntegration {
  constructor() {
    this.client = client;
    this.safeClient = safeClient;
  }

  // Generate and publish content to Sanity CMS
  async generateAndPublishContent(keyword, contentType = 'blog_post') {
    try {
      console.log(`🤖 Generating ${contentType} for keyword: "${keyword}"`);

      // Step 1: Generate content using AI (simulated)
      const generatedContent = {
        title: `Complete Guide to ${keyword} in 2024`,
        metaDescription: `Discover comprehensive ${keyword} solutions and best practices. Expert insights and industry analysis.`,
        body: `# Complete Guide to ${keyword} in 2024

## Introduction

In today's digital landscape, ${keyword} is crucial for business success. This comprehensive guide explores the latest trends, technologies, and best practices.

## What is ${keyword}?

${keyword} includes the creation, maintenance, and optimization of digital solutions. These services range from basic implementations to complex enterprise applications.

## Key Benefits

1. **Improved Efficiency**: Streamlined processes and automation
2. **Cost Savings**: Reduced operational expenses
3. **Scalability**: Growth-ready solutions
4. **Security**: Enterprise-grade protection

## Conclusion

Choosing the right ${keyword} provider is crucial for your business success. Contact our expert team for a personalized consultation.`,
        keywords: [keyword, 'digital solutions', 'technology', 'business optimization'],
        seoScore: 92,
        readabilityScore: 78,
        wordCount: 400
      };

      // Step 2: Create Sanity document
      const sanityDocument = this.createSanityDocument(generatedContent, contentType);

      // Step 3: Publish to Sanity CMS
      const publishedDocument = await this.publishToSanity(sanityDocument);

      console.log(`✅ Content published successfully: ${publishedDocument._id}`);
      return publishedDocument;

    } catch (error) {
      console.error('❌ Error in generateAndPublishContent:', error);
      throw error;
    }
  }

  // Create Sanity document structure
  createSanityDocument(content, contentType) {
    return {
      _type: 'post',
      title: content.title,
      slug: {
        _type: 'slug',
        current: this.generateSlug(content.title)
      },
      excerpt: content.metaDescription,
      body: this.convertToPortableText(content.body),
      publishedAt: new Date().toISOString(),
      seo: {
        metaTitle: content.title,
        metaDescription: content.metaDescription,
        keywords: content.keywords.join(', ')
      },
      tags: content.keywords,
      categories: ['Technology'],
      author: {
        _type: 'reference',
        _ref: 'team-member-id'
      },
      featuredImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-placeholder-id'
        }
      }
    };
  }

  // Convert content to Portable Text
  convertToPortableText(content) {
    const blocks = content.split('\n\n').map(paragraph => ({
      _type: 'block',
      style: 'normal',
      children: [{
        _type: 'span',
        text: paragraph.replace(/^#+\s*/, '').trim()
      }]
    }));

    return blocks;
  }

  // Generate slug from title
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Publish document to Sanity CMS
  async publishToSanity(document) {
    try {
      const createdDocument = await this.client.create(document);
      const publishedDocument = await this.client.patch(createdDocument._id)
        .set({ published: true })
        .commit();

      console.log(`📝 Document created and published: ${publishedDocument._id}`);
      return publishedDocument;

    } catch (error) {
      console.error('❌ Error publishing to Sanity:', error);
      throw error;
    }
  }

  // Get publishing statistics
  async getPublishingStats() {
    try {
      const posts = await this.safeClient.fetch(`*[_type == "post"] {
        _id,
        title,
        publishedAt,
        "wordCount": length(pt::text(body))
      }`);
      
      return {
        totalPosts: posts?.length || 0,
        averageWordCount: posts ? Math.round(posts.reduce((sum, post) => sum + (post.wordCount || 0), 0) / posts.length) : 0,
        lastPublished: posts ? new Date(Math.max(...posts.map(p => new Date(p.publishedAt)))) : null
      };
    } catch (error) {
      console.error('❌ Error getting publishing stats:', error);
      return null;
    }
  }
}

// Export the integration
export const astroSanityIntegration = new AstroSanityIntegration();
export default astroSanityIntegration; 