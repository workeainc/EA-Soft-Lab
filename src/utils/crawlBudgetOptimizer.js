/**
 * Crawl Budget Optimization Utility
 * Analyzes and optimizes Googlebot crawl behavior for maximum efficiency
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Analyze server logs for crawl patterns
 * @param {string} logPath - Path to server log file
 * @returns {Promise<Object>} Crawl analysis results
 */
export async function analyzeCrawlPatterns(logPath) {
  try {
    const logContent = await fs.readFile(logPath, 'utf-8');
    const lines = logContent.split('\n');
    
    const crawlData = {
      totalRequests: 0,
      googlebotRequests: 0,
      otherBots: 0,
      urls: new Map(),
      statusCodes: new Map(),
      responseTimes: [],
      crawlWaste: 0,
      recommendations: []
    };

    // Parse log entries
    for (const line of lines) {
      if (line.includes('Googlebot') || line.includes('googlebot')) {
        crawlData.googlebotRequests++;
        
        // Extract URL and status code
        const urlMatch = line.match(/"(GET|POST)\s+([^\s]+)/);
        const statusMatch = line.match(/\s(\d{3})\s/);
        const timeMatch = line.match(/(\d+\.\d+)\s*$/);
        
        if (urlMatch) {
          const url = urlMatch[2];
          const count = crawlData.urls.get(url) || 0;
          crawlData.urls.set(url, count + 1);
          
          // Check for crawl waste
          if (url.includes('/admin/') || url.includes('/api/') || url.includes('/private/')) {
            crawlData.crawlWaste++;
          }
        }
        
        if (statusMatch) {
          const status = statusMatch[1];
          const count = crawlData.statusCodes.get(status) || 0;
          crawlData.statusCodes.set(status, count + 1);
        }
        
        if (timeMatch) {
          crawlData.responseTimes.push(parseFloat(timeMatch[1]));
        }
      } else if (line.includes('bot') || line.includes('crawler')) {
        crawlData.otherBots++;
      }
      
      crawlData.totalRequests++;
    }

    // Generate recommendations
    generateCrawlRecommendations(crawlData);
    
    return crawlData;
  } catch (error) {
    console.error('Error analyzing crawl patterns:', error);
    return null;
  }
}

/**
 * Generate crawl budget optimization recommendations
 * @param {Object} crawlData - Crawl analysis data
 */
function generateCrawlRecommendations(crawlData) {
  const recommendations = [];
  
  // Check for crawl waste
  if (crawlData.crawlWaste > 0) {
    recommendations.push({
      type: 'waste',
      priority: 'high',
      message: `${crawlData.crawlWaste} requests to non-public URLs detected`,
      action: 'Add noindex meta tags or robots.txt disallow rules'
    });
  }
  
  // Check for slow response times
  const avgResponseTime = crawlData.responseTimes.reduce((a, b) => a + b, 0) / crawlData.responseTimes.length;
  if (avgResponseTime > 2000) {
    recommendations.push({
      type: 'performance',
      priority: 'high',
      message: `Average response time: ${avgResponseTime.toFixed(0)}ms (target: <2000ms)`,
      action: 'Optimize server response times and implement caching'
    });
  }
  
  // Check for 4xx/5xx errors
  const errorCodes = Array.from(crawlData.statusCodes.entries())
    .filter(([code]) => code.startsWith('4') || code.startsWith('5'));
  
  if (errorCodes.length > 0) {
    recommendations.push({
      type: 'errors',
      priority: 'high',
      message: `${errorCodes.length} error responses detected`,
      action: 'Fix broken URLs and server errors'
    });
  }
  
  // Check for over-crawled pages
  const overCrawled = Array.from(crawlData.urls.entries())
    .filter(([url, count]) => count > 10)
    .sort((a, b) => b[1] - a[1]);
  
  if (overCrawled.length > 0) {
    recommendations.push({
      type: 'efficiency',
      priority: 'medium',
      message: `${overCrawled.length} pages being over-crawled`,
      action: 'Review crawl frequency and update sitemap priorities'
    });
  }
  
  crawlData.recommendations = recommendations;
}

/**
 * Generate crawl budget report
 * @param {Object} crawlData - Crawl analysis data
 * @returns {string} Formatted report
 */
export function generateCrawlReport(crawlData) {
  if (!crawlData) return 'No crawl data available';
  
  const report = `
# Crawl Budget Analysis Report
Generated: ${new Date().toISOString()}

## 📊 Crawl Statistics
- Total Requests: ${crawlData.totalRequests}
- Googlebot Requests: ${crawlData.googlebotRequests}
- Other Bot Requests: ${crawlData.otherBots}
- Crawl Waste: ${crawlData.crawlWaste} requests

## 🎯 Response Time Analysis
- Average Response Time: ${(crawlData.responseTimes.reduce((a, b) => a + b, 0) / crawlData.responseTimes.length).toFixed(0)}ms
- Target: <2000ms

## 📈 Status Code Distribution
${Array.from(crawlData.statusCodes.entries())
  .map(([code, count]) => `- ${code}: ${count} requests`)
  .join('\n')}

## 🔍 Most Crawled URLs
${Array.from(crawlData.urls.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([url, count]) => `- ${url}: ${count} requests`)
  .join('\n')}

## ⚠️ Recommendations
${crawlData.recommendations.map(rec => 
  `- **${rec.priority.toUpperCase()}**: ${rec.message}\n  Action: ${rec.action}`
).join('\n\n')}

## 🎯 Optimization Score
${calculateOptimizationScore(crawlData)}%
`;

  return report;
}

/**
 * Calculate crawl budget optimization score
 * @param {Object} crawlData - Crawl analysis data
 * @returns {number} Optimization score (0-100)
 */
function calculateOptimizationScore(crawlData) {
  let score = 100;
  
  // Deduct points for crawl waste
  if (crawlData.crawlWaste > 0) {
    score -= Math.min(20, crawlData.crawlWaste * 2);
  }
  
  // Deduct points for slow response times
  const avgResponseTime = crawlData.responseTimes.reduce((a, b) => a + b, 0) / crawlData.responseTimes.length;
  if (avgResponseTime > 2000) {
    score -= Math.min(15, (avgResponseTime - 2000) / 100);
  }
  
  // Deduct points for errors
  const errorCodes = Array.from(crawlData.statusCodes.entries())
    .filter(([code]) => code.startsWith('4') || code.startsWith('5'));
  score -= errorCodes.length * 5;
  
  return Math.max(0, Math.round(score));
}

/**
 * Generate robots.txt optimizations based on crawl analysis
 * @param {Object} crawlData - Crawl analysis data
 * @returns {string} Optimized robots.txt content
 */
export function generateOptimizedRobotsTxt(crawlData) {
  const wasteUrls = Array.from(crawlData.urls.entries())
    .filter(([url, count]) => 
      url.includes('/admin/') || 
      url.includes('/api/') || 
      url.includes('/private/') ||
      count > 20 // Over-crawled pages
    )
    .map(([url]) => url);
  
  return `# Optimized robots.txt based on crawl analysis
# Generated: ${new Date().toISOString()}

User-agent: *
${wasteUrls.map(url => `Disallow: ${url}`).join('\n')}

# Crawl-delay optimization
Crawl-delay: 1

# Sitemap
Sitemap: https://easoftlab.com/sitemap.xml
Sitemap: https://easoftlab.com/image-sitemap.xml

# Specific bot optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;
}

export default {
  analyzeCrawlPatterns,
  generateCrawlReport,
  generateOptimizedRobotsTxt
};
