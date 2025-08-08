export async function POST({ request }) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return new Response(JSON.stringify({
        error: 'URL is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simulate competitor keyword analysis based on URL
    const keywords = await analyzeCompetitorKeywords(url);
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        url: url,
        keywords: keywords,
        extractedAt: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Competitor Analysis API Error:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

import { competitorExtractor } from '../../lib/competitorExtractor.js';

// Analyze competitor keywords using real extractor
async function analyzeCompetitorKeywords(url) {
  try {
    const keywords = await competitorExtractor.extractKeywordsFromCompetitor(url);
    return keywords.map(k => k.keyword);
  } catch (error) {
    console.error('Error in competitor analysis:', error);
    // Fallback to basic keywords
    return [
      "custom software development",
      "web application development",
      "full-stack development",
      "API development",
      "database design"
    ];
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