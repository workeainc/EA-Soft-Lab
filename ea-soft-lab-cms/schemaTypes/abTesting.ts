import {defineField, defineType} from 'sanity'
import {ABTestingInput} from '../components/ABTestingInput'

export default defineType({
  name: 'abTesting',
  title: 'A/B Testing Dashboard',
  type: 'document',
  components: {
    input: ABTestingInput
  },
  fields: [
    // Test Overview
    defineField({
      name: 'testOverview',
      title: 'Test Overview',
      type: 'object',
      fields: [
        defineField({
          name: 'activeTests',
          title: 'Active Tests',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'completedTests',
          title: 'Completed Tests',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'totalConversions',
          title: 'Total Conversions',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'avgConfidence',
          title: 'Average Confidence (%)',
          type: 'number',
          validation: Rule => Rule.required().min(0).max(100)
        })
      ]
    }),
    // A/B Tests
    defineField({
      name: 'tests',
      title: 'A/B Tests',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Test ID',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'name',
              title: 'Test Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text'
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {title: 'Active', value: 'active'},
                  {title: 'Paused', value: 'paused'},
                  {title: 'Completed', value: 'completed'}
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'datetime',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'datetime'
            }),
            defineField({
              name: 'variants',
              title: 'Test Variants',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'id',
                      title: 'Variant ID',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'name',
                      title: 'Variant Name',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'traffic',
                      title: 'Traffic',
                      type: 'number',
                      validation: Rule => Rule.required().min(0)
                    }),
                    defineField({
                      name: 'conversions',
                      title: 'Conversions',
                      type: 'number',
                      validation: Rule => Rule.required().min(0)
                    }),
                    defineField({
                      name: 'conversionRate',
                      title: 'Conversion Rate (%)',
                      type: 'number',
                      validation: Rule => Rule.required().min(0).max(100)
                    })
                  ]
                }
              ]
            }),
            defineField({
              name: 'metrics',
              title: 'Test Metrics',
              type: 'object',
              fields: [
                defineField({
                  name: 'totalVisitors',
                  title: 'Total Visitors',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                }),
                defineField({
                  name: 'totalConversions',
                  title: 'Total Conversions',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                }),
                defineField({
                  name: 'confidence',
                  title: 'Confidence Level (%)',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                }),
                defineField({
                  name: 'winner',
                  title: 'Winner Variant ID',
                  type: 'string'
                })
              ]
            }),
            defineField({
              name: 'testType',
              title: 'Test Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Button Test', value: 'button'},
                  {title: 'Text Test', value: 'text'},
                  {title: 'Layout Test', value: 'layout'},
                  {title: 'Pricing Test', value: 'pricing'},
                  {title: 'Image Test', value: 'image'},
                  {title: 'Color Test', value: 'color'}
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'targetElement',
              title: 'Target Element',
              type: 'string',
              description: 'CSS selector or element identifier'
            }),
            defineField({
              name: 'hypothesis',
              title: 'Test Hypothesis',
              type: 'text',
              description: 'What you expect to improve with this test'
            }),
            defineField({
              name: 'successMetric',
              title: 'Success Metric',
              type: 'string',
              options: {
                list: [
                  {title: 'Conversion Rate', value: 'conversion_rate'},
                  {title: 'Click Rate', value: 'click_rate'},
                  {title: 'Revenue', value: 'revenue'},
                  {title: 'Engagement', value: 'engagement'},
                  {title: 'Bounce Rate', value: 'bounce_rate'}
                ]
              },
              validation: Rule => Rule.required()
            })
          ]
        }
      ]
    }),
    // Test Results Summary
    defineField({
      name: 'resultsSummary',
      title: 'Results Summary',
      type: 'object',
      fields: [
        defineField({
          name: 'totalTests',
          title: 'Total Tests',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'successfulTests',
          title: 'Successful Tests',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'improvementRate',
          title: 'Average Improvement Rate (%)',
          type: 'number',
          validation: Rule => Rule.required().min(-100).max(100)
        }),
        defineField({
          name: 'totalRevenueImpact',
          title: 'Total Revenue Impact',
          type: 'number',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'bestPerformingTest',
          title: 'Best Performing Test',
          type: 'string'
        }),
        defineField({
          name: 'recommendations',
          title: 'Recommendations',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'recommendation',
                  title: 'Recommendation',
                  type: 'text',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'priority',
                  title: 'Priority',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'High', value: 'high'},
                      {title: 'Medium', value: 'medium'},
                      {title: 'Low', value: 'low'}
                    ]
                  },
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'impact',
                  title: 'Expected Impact',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'High Impact', value: 'high'},
                      {title: 'Medium Impact', value: 'medium'},
                      {title: 'Low Impact', value: 'low'}
                    ]
                  },
                  validation: Rule => Rule.required()
                })
              ]
            }
          ]
        })
      ]
    }),
    // Test Configuration
    defineField({
      name: 'configuration',
      title: 'Test Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultTrafficSplit',
          title: 'Default Traffic Split (%)',
          type: 'number',
          validation: Rule => Rule.required().min(0).max(100)
        }),
        defineField({
          name: 'minimumSampleSize',
          title: 'Minimum Sample Size',
          type: 'number',
          validation: Rule => Rule.required().min(100)
        }),
        defineField({
          name: 'confidenceThreshold',
          title: 'Confidence Threshold (%)',
          type: 'number',
          validation: Rule => Rule.required().min(80).max(99)
        }),
        defineField({
          name: 'testDuration',
          title: 'Default Test Duration (days)',
          type: 'number',
          validation: Rule => Rule.required().min(7).max(90)
        }),
        defineField({
          name: 'autoStop',
          title: 'Auto-stop Tests',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'emailNotifications',
          title: 'Email Notifications',
          type: 'boolean',
          initialValue: true
        })
      ]
    }),
    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true
    })
  ],
  preview: {
    select: {
      title: 'testOverview.activeTests',
      subtitle: 'lastUpdated'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `A/B Testing Dashboard - ${title} active tests`,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Not updated'
      }
    }
  }
})
