/**
 * Astro.js + Sanity CMS Integration for AI Content Engine
 * Connects AI-generated content to your Astro.js static site
 */

import { client, safeClient } from './sanity.js';
import { aiContentEngine } from './aiContentEngine.js';
import { keywordOpportunityMonitor } from './keywordOpportunityMonitor.js';

class AstroSanityIntegration {
  constructor() {
    this.client = client;
    this.safeClient = safeClient;
    this.aiEngine = aiContentEngine;
    this.keywordMonitor = keywordOpportunityMonitor;
  }

  // Generate and publish content to Sanity CMS
  async generateAndPublishContent(keyword, contentType = 'blog_post') {
    try {
      console.log(`🤖 Generating ${contentType} for keyword: "${keyword}"`);

      // Step 1: Generate content using AI
      const generatedContent = await this.aiEngine.generateContent({
        keyword: keyword,
        contentType: contentType,
        targetAudience: 'Business owners, IT managers, Marketing professionals',
        wordCount: 800,
        seoOptimization: true,
        includeStructuredData: true
      });

      // Step 2: Create Sanity document structure
      const sanityDocument = this.createSanityDocument(generatedContent, contentType);

      // Step 3: Publish to Sanity CMS
      const publishedDocument = await this.publishToSanity(sanityDocument);

      // Step 4: Trigger Astro.js rebuild
      await this.triggerAstroRebuild();

      console.log(`✅ Content published successfully: ${publishedDocument._id}`);
      return publishedDocument;

    } catch (error) {
      console.error('❌ Error in generateAndPublishContent:', error);
      throw error;
    }
  }

  // Create Sanity document structure
  createSanityDocument(content, contentType) {
    const baseDocument = {
      _type: contentType === 'blog_post' ? 'post' : 'service',
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
      categories: this.extractCategories(content.keywords),
      author: {
        _type: 'reference',
        _ref: 'team-member-id' // You'll need to set up team members in Sanity
      },
      featuredImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: this.generateImageReference(content.title)
        }
      }
    };

    // Add content-specific fields
    if (contentType === 'blog_post') {
      baseDocument.readingTime = this.calculateReadingTime(content.body);
      baseDocument.seoScore = content.seoScore;
      baseDocument.readabilityScore = content.readabilityScore;
    }

    return baseDocument;
  }

  // Convert markdown/HTML to Portable Text for Sanity
  convertToPortableText(content) {
    // This is a simplified conversion - you might want to use a proper markdown-to-portable-text converter
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

  // Extract categories from keywords
  extractCategories(keywords) {
    const categoryMap = {
      'web development': 'Web Development',
      'software development': 'Software Development',
      'mobile development': 'Mobile Development',
      'AI': 'Artificial Intelligence',
      'cloud': 'Cloud Computing',
      'security': 'Cybersecurity',
      'digital transformation': 'Digital Transformation'
    };

    const categories = [];
    keywords.forEach(keyword => {
      Object.entries(categoryMap).forEach(([key, category]) => {
        if (keyword.toLowerCase().includes(key) && !categories.includes(category)) {
          categories.push(category);
        }
      });
    });

    return categories.length > 0 ? categories : ['Technology'];
  }

  // Calculate reading time
  calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Generate image reference (placeholder)
  generateImageReference(title) {
    // In a real implementation, you'd generate or upload an image
    // For now, we'll use a placeholder
    return 'image-placeholder-id';
  }

  // Publish document to Sanity CMS
  async publishToSanity(document) {
    try {
      // Create the document in Sanity
      const createdDocument = await this.client.create(document);
      
      // Publish the document (make it visible)
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

  // Trigger Astro.js rebuild (for static site generation)
  async triggerAstroRebuild() {
    try {
      // In a real implementation, you'd trigger your deployment pipeline
      // This could be a webhook to Vercel, Netlify, or your hosting platform
      console.log('🔄 Triggering Astro.js rebuild...');
      
      // Example: Trigger Vercel deployment
      // await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' });
      
      // Example: Trigger Netlify deployment
      // await fetch(process.env.NETLIFY_DEPLOY_HOOK, { method: 'POST' });
      
      console.log('✅ Rebuild triggered successfully');
    } catch (error) {
      console.error('❌ Error triggering rebuild:', error);
    }
  }

  // Batch publish multiple articles
  async batchPublishArticles(keywords, contentType = 'blog_post') {
    const results = [];
    
    for (const keyword of keywords) {
      try {
        const result = await this.generateAndPublishContent(keyword, contentType);
        results.push({
          keyword,
          success: true,
          documentId: result._id,
          title: result.title
        });
        
        // Add delay between publications to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        results.push({
          keyword,
          success: false,
          error: error.message
        });
      }
    }
    
    return results;
  }

  // Get publishing statistics
  async getPublishingStats() {
    try {
      const posts = await this.safeClient.fetch(`*[_type == "post"] {
        _id,
        title,
        publishedAt,
        "wordCount": length(pt::text(body)),
        "seoScore": seo.metaTitle != null ? 100 : 80
      }`);
      
      return {
        totalPosts: posts?.length || 0,
        averageWordCount: posts ? Math.round(posts.reduce((sum, post) => sum + (post.wordCount || 0), 0) / posts.length) : 0,
        averageSeoScore: posts ? Math.round(posts.reduce((sum, post) => sum + (post.seoScore || 0), 0) / posts.length) : 0,
        lastPublished: posts ? new Date(Math.max(...posts.map(p => new Date(p.publishedAt)))) : null
      };
    } catch (error) {
      console.error('❌ Error getting publishing stats:', error);
      return null;
    }
  }

  // Monitor and auto-publish trending content
  async autoPublishTrendingContent() {
    try {
      // Get trending keywords from your keyword monitor
      const trendingKeywords = await this.keywordMonitor.getTrendingKeywords();
      
      // Filter keywords that haven't been published yet
      const unpublishedKeywords = await this.filterUnpublishedKeywords(trendingKeywords);
      
      // Auto-publish top trending keywords
      const topKeywords = unpublishedKeywords.slice(0, 3);
      
      if (topKeywords.length > 0) {
        console.log(`🚀 Auto-publishing ${topKeywords.length} trending articles...`);
        return await this.batchPublishArticles(topKeywords, 'blog_post');
      } else {
        console.log('📊 No new trending keywords to publish');
        return [];
      }
      
    } catch (error) {
      console.error('❌ Error in auto-publish:', error);
      return [];
    }
  }

  // Filter out keywords that have already been published
  async filterUnpublishedKeywords(keywords) {
    try {
      const existingPosts = await this.safeClient.fetch(`*[_type == "post"] {
        title,
        tags
      }`);
      
      return keywords.filter(keyword => {
        return !existingPosts?.some(post => 
          post.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          post.tags?.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
        );
      });
    } catch (error) {
      console.error('❌ Error filtering keywords:', error);
      return keywords;
    }
  }
}

// Export the integration
export const astroSanityIntegration = new AstroSanityIntegration();
export default astroSanityIntegration; 