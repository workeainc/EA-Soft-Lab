import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'oxjbgkqf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

const abTestingData = {
  _type: 'abTesting',
  testOverview: {
    activeTests: 3,
    completedTests: 12,
    totalConversions: 1247,
    avgConfidence: 87.3
  },
  tests: [
    {
      id: 'hero-button-test',
      name: 'Hero Button Test',
      description: 'Testing different CTA button styles and text',
      status: 'active',
      variants: [
        {
          id: 'control',
          name: 'Control (Primary Blue)',
          traffic: 1250,
          conversions: 89,
          conversionRate: 7.12
        },
        {
          id: 'variant-a',
          name: 'Variant A (Green)',
          traffic: 1230,
          conversions: 95,
          conversionRate: 7.72
        },
        {
          id: 'variant-b',
          name: 'Variant B (Orange)',
          traffic: 1240,
          conversions: 78,
          conversionRate: 6.29
        }
      ],
      metrics: {
        totalVisitors: 3720,
        totalConversions: 262,
        confidence: 85.2,
        winner: 'variant-a'
      },
      testType: 'button',
      targetElement: '.hero-cta-button',
      hypothesis: 'Green buttons will increase click-through rates by 15%',
      successMetric: 'conversion_rate',
      startDate: '2024-01-15T00:00:00.000Z'
    },
    {
      id: 'cta-text-test',
      name: 'CTA Text Test',
      description: 'Testing different call-to-action text variations',
      status: 'active',
      variants: [
        {
          id: 'control',
          name: 'Control (Get Started)',
          traffic: 980,
          conversions: 67,
          conversionRate: 6.84
        },
        {
          id: 'variant-a',
          name: 'Variant A (Learn More)',
          traffic: 975,
          conversions: 72,
          conversionRate: 7.38
        },
        {
          id: 'variant-b',
          name: 'Variant B (Contact Us)',
          traffic: 970,
          conversions: 81,
          conversionRate: 8.35
        }
      ],
      metrics: {
        totalVisitors: 2925,
        totalConversions: 220,
        confidence: 92.1,
        winner: 'variant-b'
      },
      testType: 'text',
      targetElement: '.cta-text',
      hypothesis: 'More specific CTA text will improve conversion rates',
      successMetric: 'conversion_rate',
      startDate: '2024-01-20T00:00:00.000Z'
    },
    {
      id: 'pricing-test',
      name: 'Pricing Display Test',
      description: 'Testing different pricing presentation formats',
      status: 'completed',
      variants: [
        {
          id: 'control',
          name: 'Control (Monthly)',
          traffic: 850,
          conversions: 45,
          conversionRate: 5.29
        },
        {
          id: 'variant-a',
          name: 'Variant A (Annual)',
          traffic: 845,
          conversions: 52,
          conversionRate: 6.15
        }
      ],
      metrics: {
        totalVisitors: 1695,
        totalConversions: 97,
        confidence: 89.5,
        winner: 'variant-a'
      },
      testType: 'pricing',
      targetElement: '.pricing-section',
      hypothesis: 'Annual pricing will increase revenue per customer',
      successMetric: 'revenue',
      startDate: '2024-01-10T00:00:00.000Z',
      endDate: '2024-02-10T00:00:00.000Z'
    }
  ],
  resultsSummary: {
    totalTests: 15,
    successfulTests: 9,
    improvementRate: 12.5,
    totalRevenueImpact: 45600,
    bestPerformingTest: 'cta-text-test',
    recommendations: [
      {
        recommendation: 'Implement the winning CTA text variant across all pages',
        priority: 'high',
        impact: 'high'
      },
      {
        recommendation: 'Test hero button colors on other key pages',
        priority: 'medium',
        impact: 'medium'
      },
      {
        recommendation: 'Consider testing pricing strategies for new products',
        priority: 'low',
        impact: 'high'
      }
    ]
  },
  configuration: {
    defaultTrafficSplit: 50,
    minimumSampleSize: 1000,
    confidenceThreshold: 95,
    testDuration: 21,
    autoStop: true,
    emailNotifications: true
  },
  lastUpdated: new Date().toISOString()
}

async function seedABTesting() {
  try {
    console.log('Seeding A/B Testing data...')
    
    // Check if document already exists
    const existingDocs = await client.fetch(
      `*[_type == "abTesting"]`
    )
    
    if (existingDocs.length > 0) {
      // Update existing document
      const docId = existingDocs[0]._id
      await client.createOrReplace({
        ...abTestingData,
        _id: docId
      })
      console.log('✅ A/B Testing data updated successfully!')
    } else {
      // Create new document
      await client.create(abTestingData)
      console.log('✅ A/B Testing data created successfully!')
    }
    
    console.log('🧪 A/B Testing Dashboard is ready in Sanity Studio')
    console.log('🔗 Access it at: http://localhost:3333')
    
  } catch (error) {
    console.error('❌ Error seeding A/B Testing data:', error)
  }
}

seedABTesting()
