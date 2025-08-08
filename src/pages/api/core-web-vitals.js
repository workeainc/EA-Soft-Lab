export async function POST({ request }) {
  try {
    const metrics = await request.json();
    
    // Validate metrics
    const requiredFields = ['lcp', 'fid', 'cls', 'fcp', 'tti', 'timestamp', 'url'];
    const missingFields = requiredFields.filter(field => !metrics[field]);
    
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        missing: missingFields
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Process and store metrics
    const processedMetrics = {
      ...metrics,
      timestamp: new Date(metrics.timestamp).toISOString(),
      userAgent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer') || '',
      viewport: request.headers.get('viewport') || '',
      connection: request.headers.get('connection') || '',
      // Add performance thresholds
      thresholds: {
        lcp: { good: 2500, needsImprovement: 4000 },
        fid: { good: 100, needsImprovement: 300 },
        cls: { good: 0.1, needsImprovement: 0.25 },
        fcp: { good: 1800, needsImprovement: 3000 },
        tti: { good: 3800, needsImprovement: 7300 }
      }
    };

    // Calculate performance scores
    const scores = {
      lcp: calculateScore(metrics.lcp, processedMetrics.thresholds.lcp),
      fid: calculateScore(metrics.fid, processedMetrics.thresholds.fid),
      cls: calculateScore(metrics.cls, processedMetrics.thresholds.cls),
      fcp: calculateScore(metrics.fcp, processedMetrics.thresholds.fcp),
      tti: calculateScore(metrics.tti, processedMetrics.thresholds.tti)
    };

    // Determine overall performance status
    const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
    const performanceStatus = overallScore >= 0.9 ? 'good' : overallScore >= 0.7 ? 'needs-improvement' : 'poor';

    // Log metrics (in production, this would go to a database or analytics service)
    console.log('Core Web Vitals Metrics:', {
      url: metrics.url,
      metrics: {
        lcp: `${metrics.lcp}ms (${scores.lcp.toFixed(2)})`,
        fid: `${metrics.fid}ms (${scores.fid.toFixed(2)})`,
        cls: `${metrics.cls.toFixed(3)} (${scores.cls.toFixed(2)})`,
        fcp: `${metrics.fcp}ms (${scores.fcp.toFixed(2)})`,
        tti: `${metrics.tti}ms (${scores.tti.toFixed(2)})`
      },
      overallScore: overallScore.toFixed(2),
      status: performanceStatus
    });

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Core Web Vitals metrics recorded successfully',
      data: {
        metrics: processedMetrics,
        scores,
        overallScore,
        performanceStatus
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing Core Web Vitals:', error);
    
    return new Response(JSON.stringify({
      error: 'Failed to process Core Web Vitals metrics',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper function to calculate performance scores
function calculateScore(value, thresholds) {
  if (value <= thresholds.good) {
    return 1.0;
  } else if (value <= thresholds.needsImprovement) {
    // Linear interpolation between good and needs-improvement thresholds
    const range = thresholds.needsImprovement - thresholds.good;
    const overGood = value - thresholds.good;
    return 1.0 - (overGood / range) * 0.3; // 0.7 to 1.0
  } else {
    // Below 0.7 for poor performance
    const range = thresholds.needsImprovement - thresholds.good;
    const overNeedsImprovement = value - thresholds.needsImprovement;
    return Math.max(0, 0.7 - (overNeedsImprovement / range) * 0.7);
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