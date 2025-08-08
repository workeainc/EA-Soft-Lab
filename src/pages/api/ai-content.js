import { aiContentEngine } from '../../lib/aiContentEngine.js';

export async function POST({ request }) {
  try {
    const { contentType, topic, keywords = [], options = {} } = await request.json();
    
    // Validate required fields
    if (!contentType || !topic) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: contentType and topic are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate content type
    const validContentTypes = [
      'blog_post', 'article', 'technical_content', 'faq_content', 'how_to_guide',
      'meta_description', 'page_title', 'social_media', 'og_description', 'twitter_card',
      'long_article', 'technical_documentation', 'comprehensive_guide', 'case_study',
      'premium_content', 'expert_article', 'thought_leadership'
    ];

    if (!validContentTypes.includes(contentType)) {
      return new Response(JSON.stringify({
        error: 'Invalid content type',
        validTypes: validContentTypes
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate content
    const result = await aiContentEngine.generateContent(contentType, topic, keywords, options);
    
    if (!result.success) {
      return new Response(JSON.stringify({
        error: 'Content generation failed',
        details: result.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return successful response
    return new Response(JSON.stringify({
      success: true,
      data: {
        content: result.content,
        model: result.model,
        contentType: result.contentType,
        tokens: result.tokens,
        topic: topic,
        keywords: keywords,
        generatedAt: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('AI Content API Error:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
} 