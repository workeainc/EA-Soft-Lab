import {defineField, defineType} from 'sanity'
import {AdvancedAnalyticsInput} from '../components/AdvancedAnalyticsInput'

export default defineType({
  name: 'advancedAnalytics',
  title: 'Advanced Analytics Dashboard',
  type: 'document',
  components: {
    input: AdvancedAnalyticsInput
  },
  fields: [
    // Key Metrics
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics',
      type: 'object',
      fields: [
        defineField({
          name: 'pageViews',
          title: 'Page Views',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'uniqueVisitors',
          title: 'Unique Visitors',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'bounceRate',
          title: 'Bounce Rate (%)',
          type: 'number',
          validation: Rule => Rule.required().min(0).max(100)
        }),
        defineField({
          name: 'avgSessionDuration',
          title: 'Average Session Duration (seconds)',
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
    }),
    // Top Pages Performance
    defineField({
      name: 'topPages',
      title: 'Top Pages Performance',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Page URL',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'views',
              title: 'Views',
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
              name: 'bounceRate',
              title: 'Bounce Rate (%)',
              type: 'number',
              validation: Rule => Rule.required().min(0).max(100)
            })
          ]
        }
      ]
    }),
    // User Behavior
    defineField({
      name: 'userBehavior',
      title: 'User Behavior Analysis',
      type: 'object',
      fields: [
        defineField({
          name: 'deviceBreakdown',
          title: 'Device Breakdown',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'device',
                  title: 'Device Type',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'trafficSources',
          title: 'Traffic Sources',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'source',
                  title: 'Source',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'percentage',
                  title: 'Percentage',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'userJourney',
          title: 'User Journey',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'step',
                  title: 'Step',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'dropoff',
                  title: 'Dropoff Rate (%)',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                })
              ]
            }
          ]
        })
      ]
    }),
    // Conversions
    defineField({
      name: 'conversions',
      title: 'Conversion Data',
      type: 'object',
      fields: [
        defineField({
          name: 'total',
          title: 'Total Conversions',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'byType',
          title: 'Conversions by Type',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Conversion Type',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'count',
                  title: 'Count',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'funnel',
          title: 'Conversion Funnel',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'stage',
                  title: 'Stage',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'visitors',
                  title: 'Visitors',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                }),
                defineField({
                  name: 'conversion',
                  title: 'Conversion Rate (%)',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                })
              ]
            }
          ]
        })
      ]
    }),
    // Heatmap Data
    defineField({
      name: 'heatmap',
      title: 'Heatmap Data',
      type: 'object',
      fields: [
        defineField({
          name: 'clicks',
          title: 'Click Heatmap',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'x',
                  title: 'X Coordinate',
                  type: 'number',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'y',
                  title: 'Y Coordinate',
                  type: 'number',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'count',
                  title: 'Click Count',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'scrollDepth',
          title: 'Scroll Depth',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'depth',
                  title: 'Scroll Depth (%)',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                }),
                defineField({
                  name: 'percentage',
                  title: 'User Percentage',
                  type: 'number',
                  validation: Rule => Rule.required().min(0).max(100)
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'mouseMovement',
          title: 'Mouse Movement',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'x',
                  title: 'X Coordinate',
                  type: 'number',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'y',
                  title: 'Y Coordinate',
                  type: 'number',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'duration',
                  title: 'Duration (seconds)',
                  type: 'number',
                  validation: Rule => Rule.required().min(0)
                })
              ]
            }
          ]
        })
      ]
    }),
    // Real-time Data
    defineField({
      name: 'realTimeData',
      title: 'Real-time Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'activeUsers',
          title: 'Active Users',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'currentPageViews',
          title: 'Current Page Views',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: 'recentEvents',
          title: 'Recent Events',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'event',
                  title: 'Event',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'timestamp',
                  title: 'Timestamp',
                  type: 'datetime',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'user',
                  title: 'User ID',
                  type: 'string'
                })
              ]
            }
          ]
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
      title: 'keyMetrics.pageViews',
      subtitle: 'lastUpdated'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Analytics Dashboard - ${title} page views`,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Not updated'
      }
    }
  }
})
