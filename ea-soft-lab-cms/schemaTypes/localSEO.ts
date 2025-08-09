import {defineField, defineType} from 'sanity'
import {LocalSEOInput} from '../components/LocalSEOInput'

export default defineType({
  name: 'localSEO',
  title: 'Local SEO Dashboard',
  type: 'document',
  components: {
    input: LocalSEOInput
  },
  fields: [
    // Business Information
    defineField({
      name: 'businessInfo',
      title: 'Business Information',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Business Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'state',
          title: 'State',
          type: 'string',
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
        }),
        defineField({
          name: 'description',
          title: 'Business Description',
          type: 'text',
        }),
        defineField({
          name: 'hours',
          title: 'Business Hours',
          type: 'string',
        }),
        defineField({
          name: 'founded',
          title: 'Founded Year',
          type: 'string',
        }),
        defineField({
          name: 'employees',
          title: 'Number of Employees',
          type: 'string',
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'awards',
          title: 'Awards',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'serviceAreas',
          title: 'Service Areas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'city', title: 'City', type: 'string'},
                {name: 'state', title: 'State', type: 'string'},
                {name: 'radius', title: 'Radius', type: 'string'},
              ],
            },
          ],
        }),
        defineField({
          name: 'socialProfiles',
          title: 'Social Media Profiles',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'platform', title: 'Platform', type: 'string'},
                {name: 'url', title: 'URL', type: 'url'},
              ],
            },
          ],
        }),
      ],
    }),

    // Google My Business Metrics
    defineField({
      name: 'googleMyBusiness',
      title: 'Google My Business Metrics',
      type: 'object',
      fields: [
        defineField({
          name: 'views',
          title: 'Profile Views',
          type: 'number',
        }),
        defineField({
          name: 'clicks',
          title: 'Website Clicks',
          type: 'number',
        }),
        defineField({
          name: 'calls',
          title: 'Phone Calls',
          type: 'number',
        }),
        defineField({
          name: 'directionRequests',
          title: 'Direction Requests',
          type: 'number',
        }),
        defineField({
          name: 'reviews',
          title: 'Total Reviews',
          type: 'number',
        }),
        defineField({
          name: 'averageRating',
          title: 'Average Rating',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(5),
        }),
      ],
    }),

    // Local Rankings
    defineField({
      name: 'localRankings',
      title: 'Local Rankings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'keyword', title: 'Keyword', type: 'string'},
            {name: 'position', title: 'Position', type: 'number'},
            {name: 'searchVolume', title: 'Search Volume', type: 'number'},
            {name: 'change', title: 'Position Change', type: 'number'},
          ],
        },
      ],
    }),

    // Local Competitors
    defineField({
      name: 'localCompetitors',
      title: 'Local Competitors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Competitor Name', type: 'string'},
            {name: 'distance', title: 'Distance (miles)', type: 'number'},
            {name: 'rating', title: 'Rating', type: 'number'},
            {name: 'reviews', title: 'Number of Reviews', type: 'number'},
            {name: 'services', title: 'Services', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    }),

    // Local Content Performance
    defineField({
      name: 'localContent',
      title: 'Local Content Performance',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Content Title', type: 'string'},
            {name: 'type', title: 'Content Type', type: 'string'},
            {name: 'performance', title: 'Performance Score', type: 'number'},
            {name: 'localKeywords', title: 'Local Keywords', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    }),

    // Reviews
    defineField({
      name: 'reviews',
      title: 'Customer Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'author', title: 'Author Name', type: 'string'},
            {name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5)},
            {name: 'review', title: 'Review Text', type: 'text'},
            {name: 'date', title: 'Review Date', type: 'date'},
            {name: 'platform', title: 'Platform', type: 'string'},
          ],
        },
      ],
    }),

    // Local SEO Score
    defineField({
      name: 'localSEOScore',
      title: 'Local SEO Score',
      type: 'object',
      fields: [
        defineField({
          name: 'overallScore',
          title: 'Overall Score',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'gmbScore',
          title: 'Google My Business Score',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'rankingsScore',
          title: 'Local Rankings Score',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'citationsScore',
          title: 'Citations Score',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'reviewsScore',
          title: 'Reviews Score',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),

    // Recommendations
    defineField({
      name: 'recommendations',
      title: 'Local SEO Recommendations',
      type: 'object',
      fields: [
        defineField({
          name: 'immediate',
          title: 'Immediate Actions',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'longTerm',
          title: 'Long-term Actions',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),

    // Last Updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'businessInfo.name',
      subtitle: 'businessInfo.city',
    },
  },
})
