// AI Content Engine Configuration
const AI_MODELS = {
  // Primary Content - Ministral 8B
  PRIMARY: {
    model: "mistralai/ministral-8b",
    apiKey: "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",
    maxTokens: 1000,
    temperature: 0.7,
    useFor: ["blog_posts", "articles", "technical_content", "faq_content", "how_to_guides"]
  },
  
  // Meta Content - Ministral 3B
  META: {
    model: "mistralai/ministral-3b",
    apiKey: "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",
    maxTokens: 150,
    temperature: 0.5,
    useFor: ["meta_descriptions", "page_titles", "social_media", "og_descriptions", "twitter_cards"]
  },
  
  // Complex Content - Mistral Nemo 12B Inferor
  COMPLEX: {
    model: "mistralai/mistral-nemo",
    apiKey: "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",
    maxTokens: 2000,
    temperature: 0.8,
    useFor: ["long_articles", "technical_documentation", "comprehensive_guides", "case_studies", "white_papers"]
  },
  
  // Premium Content - Mistral Nemo 12B Celeste
  PREMIUM: {
    model: "mistralai/mistral-nemo",
    apiKey: "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",
    maxTokens: 3000,
    temperature: 0.9,
    useFor: ["premium_content", "expert_articles", "thought_leadership", "detailed_analysis"]
  }
};

// Content Type to Model Mapping
const CONTENT_MODEL_MAP = {
  // Primary Content (Ministral 8B)
  "blog_post": "PRIMARY",
  "article": "PRIMARY", 
  "technical_content": "PRIMARY",
  "faq_content": "PRIMARY",
  "how_to_guide": "PRIMARY",
  "service_description": "PRIMARY",
  "tutorial": "PRIMARY",
  
  // Meta Content (Ministral 3B)
  "meta_description": "META",
  "page_title": "META",
  "social_media": "META",
  "og_description": "META",
  "twitter_card": "META",
  "short_description": "META",
  
  // Complex Content (Mistral Nemo 12B Inferor)
  "long_article": "COMPLEX",
  "technical_documentation": "COMPLEX",
  "comprehensive_guide": "COMPLEX",
  "case_study": "COMPLEX",
  "white_paper": "COMPLEX",
  "detailed_analysis": "COMPLEX",
  
  // Premium Content (Mistral Nemo 12B Celeste)
  "premium_content": "PREMIUM",
  "expert_article": "PREMIUM",
  "thought_leadership": "PREMIUM",
  "industry_analysis": "PREMIUM",
  "trend_analysis": "PREMIUM"
};

// SEO Prompts for Different Content Types
const SEO_PROMPTS = {
  // Blog Post Generation
  blog_post: `
You are an SEO expert for EA Soft Lab, a software development company.
Create a comprehensive blog post that:
- Optimizes for search engines with target keywords
- Follows E-E-A-T principles (Expertise, Experience, Authoritativeness, Trustworthiness)
- Structures content for featured snippets
- Optimizes for voice search and conversational queries
- Includes proper headings (H1, H2, H3)
- Uses natural language processing for AI search engines
- Optimizes for semantic search and intent matching
- Includes internal linking opportunities
- Optimizes for Core Web Vitals

Topic: {TOPIC}
Keywords: {KEYWORDS}
Target Audience: Software developers, business owners, tech professionals
Tone: Professional, informative, authoritative
Length: 800-1200 words
`,

  // Meta Description Generation
  meta_description: `
You are an SEO expert. Create a compelling meta description that:
- Is 150-160 characters maximum
- Includes primary keyword naturally
- Has a clear call-to-action
- Optimizes for click-through rate
- Describes the page content accurately
- Uses power words to increase engagement

Page Topic: {TOPIC}
Primary Keyword: {KEYWORD}
Target Action: {ACTION}
`,

  // FAQ Content Generation
  faq_content: `
You are an SEO expert creating FAQ content for Answer Engine Optimization (AEO).
Create FAQ content that:
- Targets featured snippet opportunities
- Uses question-answer format
- Includes structured data markup
- Optimizes for voice search queries
- Covers comprehensive topic coverage
- Uses natural language processing

Topic: {TOPIC}
Keywords: {KEYWORDS}
Number of FAQs: 5-8 questions
`,

  // Technical Documentation
  technical_documentation: `
You are a technical writer for EA Soft Lab.
Create comprehensive technical documentation that:
- Explains complex concepts clearly
- Includes code examples where relevant
- Uses proper technical terminology
- Optimizes for developer search queries
- Includes troubleshooting sections
- Follows technical SEO best practices

Topic: {TOPIC}
Technology: {TECHNOLOGY}
Target Audience: Developers, Technical Professionals
`,

  // How-To Guide
  how_to_guide: `
You are creating a How-To guide for SEO optimization.
Create a step-by-step guide that:
- Uses numbered steps for clarity
- Includes structured data for HowTo schema
- Optimizes for voice search ("how to...")
- Includes time estimates and difficulty levels
- Uses clear, actionable instructions
- Includes troubleshooting tips

Topic: {TOPIC}
Difficulty: {DIFFICULTY}
Estimated Time: {TIME}
Tools Required: {TOOLS}
`
};

// AI Content Engine Class
class AIContentEngine {
  constructor() {
    this.baseUrl = "https://openrouter.ai/api/v1";
    this.rateLimitDelay = 1000; // 1 second between requests
    this.lastRequestTime = 0;
  }

  // Select appropriate model based on content type
  selectModel(contentType) {
    const modelKey = CONTENT_MODEL_MAP[contentType] || "PRIMARY";
    return AI_MODELS[modelKey];
  }

  // Generate content with appropriate model
  async generateContent(contentType, topic, keywords = [], options = {}) {
    try {
      const model = this.selectModel(contentType);
      const prompt = this.buildPrompt(contentType, topic, keywords, options);
      
      // Rate limiting
      await this.rateLimit();
      
      const response = await this.callOpenRouterAPI(model, prompt, options);
      
      return {
        success: true,
        content: response.choices[0].message.content,
        model: model.model,
        tokens: response.usage,
        contentType: contentType
      };
      
    } catch (error) {
      console.error('AI Content Generation Error:', error);
      return {
        success: false,
        error: error.message,
        contentType: contentType
      };
    }
  }

  // Build SEO-optimized prompt
  buildPrompt(contentType, topic, keywords, options) {
    const basePrompt = SEO_PROMPTS[contentType] || SEO_PROMPTS.blog_post;
    
    return basePrompt
      .replace('{TOPIC}', topic)
      .replace('{KEYWORDS}', keywords.join(', '))
      .replace('{KEYWORD}', keywords[0] || '')
      .replace('{ACTION}', options.action || 'learn more')
      .replace('{TECHNOLOGY}', options.technology || 'software development')
      .replace('{DIFFICULTY}', options.difficulty || 'intermediate')
      .replace('{TIME}', options.time || '30 minutes')
      .replace('{TOOLS}', options.tools || 'computer, internet');
  }

  // Call OpenRouter API
  async callOpenRouterAPI(model, prompt, options) {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${model.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://easoftlab.com',
        'X-Title': 'EA Soft Lab AI Content Engine'
      },
      body: JSON.stringify({
        model: model.model,
        messages: [
          {
            role: "system",
            content: "You are an expert SEO content writer for EA Soft Lab, a software development company. Create high-quality, SEO-optimized content that ranks well in search engines and provides value to readers."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || model.maxTokens,
        temperature: options.temperature || model.temperature,
        top_p: options.topP || 0.9,
        frequency_penalty: options.frequencyPenalty || 0.1,
        presence_penalty: options.presencePenalty || 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Rate limiting to avoid API limits
  async rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.rateLimitDelay) {
      await new Promise(resolve => 
        setTimeout(resolve, this.rateLimitDelay - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }

  // Generate multiple content types
  async generateMultipleContent(contentTypes, topic, keywords, options = {}) {
    const results = {};
    
    for (const contentType of contentTypes) {
      results[contentType] = await this.generateContent(contentType, topic, keywords, options);
    }
    
    return results;
  }

  // Generate SEO-optimized blog post
  async generateBlogPost(topic, keywords, options = {}) {
    return await this.generateContent('blog_post', topic, keywords, options);
  }

  // Generate meta description
  async generateMetaDescription(topic, keyword, action = 'learn more') {
    return await this.generateContent('meta_description', topic, [keyword], { action });
  }

  // Generate FAQ content
  async generateFAQContent(topic, keywords, options = {}) {
    return await this.generateContent('faq_content', topic, keywords, options);
  }

  // Generate technical documentation
  async generateTechnicalDoc(topic, technology, options = {}) {
    return await this.generateContent('technical_documentation', topic, [], { 
      ...options, 
      technology 
    });
  }

  // Generate how-to guide
  async generateHowToGuide(topic, options = {}) {
    return await this.generateContent('how_to_guide', topic, [], options);
  }
}

// Export the AI Content Engine
export const aiContentEngine = new AIContentEngine();
export default aiContentEngine; 