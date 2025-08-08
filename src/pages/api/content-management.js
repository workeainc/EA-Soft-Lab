/**
 * Content Management System API
 * Handles content approval workflow, performance tracking, and optimization
 */

import ContentManagementSystem from '../../lib/contentManagementSystem.js';

// Initialize CMS instance
const cms = new ContentManagementSystem();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'dashboard':
        const dashboardData = await cms.getDashboardData();
        return new Response(JSON.stringify(dashboardData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'queue':
        const queue = cms.contentQueue;
        return new Response(JSON.stringify(queue), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'performance':
        const contentId = searchParams.get('contentId');
        if (!contentId) {
          return new Response(JSON.stringify({ error: 'Content ID required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        const performance = await cms.getContentPerformance(contentId);
        return new Response(JSON.stringify(performance), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'top-performers':
        const limit = parseInt(searchParams.get('limit')) || 10;
        const topPerformers = await cms.getTopPerformingContent(limit);
        return new Response(JSON.stringify(topPerformers), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'suggestions':
        const suggestionContentId = searchParams.get('contentId');
        if (!suggestionContentId) {
          return new Response(JSON.stringify({ error: 'Content ID required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        const suggestions = await cms.generateOptimizationSuggestions(suggestionContentId);
        return new Response(JSON.stringify(suggestions), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'submit':
        const submissionId = await cms.submitForApproval(data.content);
        return new Response(JSON.stringify({ 
          success: true, 
          submissionId,
          message: 'Content submitted for approval'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'approve':
        const approvedContent = await cms.approveContent(
          data.submissionId, 
          data.reviewer, 
          data.notes
        );
        return new Response(JSON.stringify({ 
          success: true, 
          content: approvedContent,
          message: 'Content approved successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'reject':
        const rejectedContent = await cms.rejectContent(
          data.submissionId, 
          data.reviewer, 
          data.reason
        );
        return new Response(JSON.stringify({ 
          success: true, 
          content: rejectedContent,
          message: 'Content rejected'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'request-revision':
        const revisionContent = await cms.requestRevision(
          data.submissionId, 
          data.reviewer, 
          data.feedback
        );
        return new Response(JSON.stringify({ 
          success: true, 
          content: revisionContent,
          message: 'Revision requested'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'track-performance':
        const performance = await cms.trackContentPerformance(
          data.contentId, 
          data.metrics
        );
        return new Response(JSON.stringify({ 
          success: true, 
          performance,
          message: 'Performance tracked successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'update-performance':
        const updatedPerformance = await cms.updatePerformanceMetrics(
          data.contentId, 
          data.metrics
        );
        return new Response(JSON.stringify({ 
          success: true, 
          performance: updatedPerformance,
          message: 'Performance updated successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'create-ab-test':
        const abTest = await cms.createABTest(data.contentId, data.variants);
        return new Response(JSON.stringify({ 
          success: true, 
          test: abTest,
          message: 'A/B test created successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'track-ab-result':
        const abResult = await cms.trackABTestResult(
          data.testId, 
          data.variantId, 
          data.metrics
        );
        return new Response(JSON.stringify({ 
          success: true, 
          result: abResult,
          message: 'A/B test result tracked'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'conclude-ab-test':
        const concludedTest = await cms.concludeABTest(
          data.testId, 
          data.winningVariant
        );
        return new Response(JSON.stringify({ 
          success: true, 
          test: concludedTest,
          message: 'A/B test concluded'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'schedule':
        const schedule = await cms.scheduleContent(
          data.contentId, 
          data.publishDate, 
          data.channels
        );
        return new Response(JSON.stringify({ 
          success: true, 
          schedule,
          message: 'Content scheduled successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 