import { keywordMonitor } from '../../lib/keywordOpportunityMonitor.js';

export async function POST({ request }) {
  try {
    const { action, keywords = [], timeframe = '12' } = await request.json();
    
    let result;
    
    switch (action) {
      case 'analyze_competitors':
        result = await keywordMonitor.analyzeAllCompetitors();
        break;
        
      case 'find_opportunities':
        result = await keywordMonitor.findKeywordOpportunities();
        break;
        
      case 'generate_report':
        result = await keywordMonitor.generateKeywordReport();
        break;
        
      case 'get_trending':
        result = await keywordMonitor.getTrendingKeywords(keywords, timeframe);
        break;
        
      case 'get_alerts':
        await keywordMonitor.findKeywordOpportunities();
        result = keywordMonitor.generateKeywordAlerts();
        break;
        
      case 'get_gaps':
        result = keywordMonitor.getCompetitorGapAnalysis();
        break;
        
      default:
        return new Response(JSON.stringify({
          error: 'Invalid action',
          validActions: ['analyze_competitors', 'find_opportunities', 'generate_report', 'get_trending', 'get_alerts', 'get_gaps']
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: result,
      action: action
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Keyword Opportunities API Error:', error);
    
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