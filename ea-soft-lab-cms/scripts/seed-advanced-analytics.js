import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'oxjbgkqf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

const advancedAnalyticsData = {
  _type: 'advancedAnalytics',
  keyMetrics: {
    pageViews: 15420,
    uniqueVisitors: 8920,
    bounceRate: 32.5,
    avgSessionDuration: 245,
    conversionRate: 4.8
  },
  topPages: [
    {
      url: '/',
      views: 5420,
      conversions: 156,
      bounceRate: 28.5
    },
    {
      url: '/services',
      views: 3240,
      conversions: 89,
      bounceRate: 35.2
    },
    {
      url: '/contact',
      views: 2890,
      conversions: 234,
      bounceRate: 22.1
    },
    {
      url: '/about',
      views: 1870,
      conversions: 45,
      bounceRate: 41.3
    },
    {
      url: '/blog',
      views: 2000,
      conversions: 67,
      bounceRate: 38.7
    }
  ],
  userBehavior: {
    deviceBreakdown: [
      {device: 'Desktop', percentage: 45},
      {device: 'Mobile', percentage: 42},
      {device: 'Tablet', percentage: 13}
    ],
    trafficSources: [
      {source: 'Organic Search', percentage: 52},
      {source: 'Direct', percentage: 28},
      {source: 'Social Media', percentage: 12},
      {source: 'Referral', percentage: 8}
    ],
    userJourney: [
      {step: 'Homepage', dropoff: 0},
      {step: 'Services', dropoff: 15},
      {step: 'Contact', dropoff: 25},
      {step: 'Conversion', dropoff: 35}
    ]
  },
  conversions: {
    total: 591,
    byType: [
      {type: 'Contact Form', count: 234, value: 46800},
      {type: 'Phone Call', count: 156, value: 31200},
      {type: 'Email Signup', count: 89, value: 8900},
      {type: 'Download', count: 67, value: 6700},
      {type: 'Appointment', count: 45, value: 9000}
    ],
    funnel: [
      {stage: 'Visitors', visitors: 8920, conversion: 100},
      {stage: 'Engaged', visitors: 6030, conversion: 67.6},
      {stage: 'Interested', visitors: 3240, conversion: 36.3},
      {stage: 'Converted', visitors: 591, conversion: 6.6}
    ]
  },
  heatmap: {
    clicks: [
      {x: 150, y: 200, count: 45},
      {x: 300, y: 250, count: 32},
      {x: 450, y: 180, count: 28},
      {x: 200, y: 350, count: 23},
      {x: 400, y: 400, count: 19}
    ],
    scrollDepth: [
      {depth: 25, percentage: 85},
      {depth: 50, percentage: 65},
      {depth: 75, percentage: 45},
      {depth: 100, percentage: 25}
    ],
    mouseMovement: [
      {x: 200, y: 150, duration: 2.5},
      {x: 350, y: 200, duration: 1.8},
      {x: 500, y: 250, duration: 3.2}
    ]
  },
  realTimeData: {
    activeUsers: 23,
    currentPageViews: 156,
    recentEvents: [
      {
        event: 'Page View',
        timestamp: new Date().toISOString(),
        user: 'user-123'
      },
      {
        event: 'Click',
        timestamp: new Date(Date.now() - 30000).toISOString(),
        user: 'user-456'
      },
      {
        event: 'Conversion',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        user: 'user-789'
      }
    ]
  },
  lastUpdated: new Date().toISOString()
}

async function seedAdvancedAnalytics() {
  try {
    console.log('Seeding Advanced Analytics data...')
    
    // Check if document already exists
    const existingDocs = await client.fetch(
      `*[_type == "advancedAnalytics"]`
    )
    
    if (existingDocs.length > 0) {
      // Update existing document
      const docId = existingDocs[0]._id
      await client.createOrReplace({
        ...advancedAnalyticsData,
        _id: docId
      })
      console.log('✅ Advanced Analytics data updated successfully!')
    } else {
      // Create new document
      await client.create(advancedAnalyticsData)
      console.log('✅ Advanced Analytics data created successfully!')
    }
    
    console.log('📊 Analytics Dashboard is ready in Sanity Studio')
    console.log('🔗 Access it at: http://localhost:3333')
    
  } catch (error) {
    console.error('❌ Error seeding Advanced Analytics data:', error)
  }
}

seedAdvancedAnalytics()
