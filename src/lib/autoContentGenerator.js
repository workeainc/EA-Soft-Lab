/**
 * Auto Content Generator with Image Fetching
 * Complete system that generates content and fetches relevant images
 */

import ImageApiManager from './imageApiManager.js';
import ContentAnalyzer from './contentAnalyzer.js';
import SmartImageSelector from './smartImageSelector.js';
import ContentAssemblyEngine from './contentAssemblyEngine.js';

class AutoContentGenerator {
  constructor() {
    this.imageApiManager = new ImageApiManager();
    this.contentAnalyzer = new ContentAnalyzer();
    this.smartImageSelector = new SmartImageSelector();
    this.contentAssemblyEngine = new ContentAssemblyEngine();
    
    // API Keys Configuration
    this.apiKeys = {
      pexels: 'Q0fcpV8nQxWIJExJCwiJRBdPIQQ844aKxad5HDEqvul19S8av8MsmN8e',
      pixabay: '51613918-2bac82fcc1f618268f7e950cd',
      freepik: 'FPSX85df95761068d3f5e7cf9381c26e988f'
    };
  }

  /**
   * Generate content with images - Complete workflow
   */
  async generateContentWithImages(contentData) {
    console.log('🚀 Starting Auto Content Generation with Images...');
    
    try {
      // Step 1: Analyze content and extract keywords
      const keywords = this.contentAnalyzer.extractKeywords(contentData);
      console.log('✅ Keywords extracted:', keywords);
      
      // Step 2: Search for relevant images
      const images = await this.imageApiManager.searchImages(keywords, {
        count: 5,
        orientation: 'landscape',
        size: 'medium'
      });
      console.log('✅ Images found:', images.length);
      
      // Step 3: Select best images
      const selectedImages = this.smartImageSelector.selectBestImages(images, contentData);
      console.log('✅ Best images selected:', selectedImages.length);
      
      // Step 4: Assemble content with images
      const finalContent = this.contentAssemblyEngine.assembleContent(contentData, selectedImages);
      console.log('✅ Content assembled with images');
      
      return {
        success: true,
        content: finalContent,
        images: selectedImages,
        keywords: keywords,
        stats: {
          imagesFound: images.length,
          imagesSelected: selectedImages.length,
          keywordsExtracted: keywords.length
        }
      };
      
    } catch (error) {
      console.error('❌ Error in content generation:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate blog post with images
   */
  async generateBlogPost(topic, options = {}) {
    const blogData = {
      title: `Complete Guide to ${topic}`,
      content: `# Complete Guide to ${topic}

## Introduction
This comprehensive guide covers everything you need to know about ${topic}.

## Key Benefits
- Benefit 1: Understanding ${topic}
- Benefit 2: Implementing ${topic}
- Benefit 3: Optimizing ${topic}

## Conclusion
Mastering ${topic} will significantly improve your results.`,
      tags: [topic, 'guide', 'tutorial'],
      type: 'blog_post'
    };

    return await this.generateContentWithImages(blogData);
  }

  /**
   * Test API connections
   */
  async testApiConnections() {
    console.log('🔍 Testing API Connections...');
    
    const testKeywords = ['technology', 'business', 'development'];
    const results = {};
    
    for (const keyword of testKeywords) {
      try {
        const images = await this.imageApiManager.searchImages(keyword, { count: 1 });
        results[keyword] = {
          success: true,
          imagesFound: images.length,
          source: images[0]?.source || 'Unknown'
        };
      } catch (error) {
        results[keyword] = {
          success: false,
          error: error.message
        };
      }
    }
    
    return results;
  }

  /**
   * Get system statistics
   */
  getSystemStats() {
    return {
      apiManager: this.imageApiManager.getApiStats(),
      contentAnalyzer: 'Ready',
      smartSelector: 'Ready',
      assemblyEngine: 'Ready',
      apiKeys: {
        pexels: '✅ Configured',
        pixabay: '✅ Configured',
        freepik: '✅ Configured'
      }
    };
  }
}

export default AutoContentGenerator; 