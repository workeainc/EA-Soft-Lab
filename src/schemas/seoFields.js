export default {
  name: 'seoFields',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: Rule => Rule.max(60).warning('Longer titles may be truncated by search engines')
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: Rule => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Target keywords for this page',
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override default canonical URL (optional)'
    },
    {
      name: 'robotsDirective',
      title: 'Robots Directive',
      type: 'string',
      options: {
        list: [
          {title: 'Index, Follow', value: 'index,follow'},
          {title: 'No Index, Follow', value: 'noindex,follow'},
          {title: 'Index, No Follow', value: 'index,nofollow'},
          {title: 'No Index, No Follow', value: 'noindex,nofollow'},
          {title: 'No Archive', value: 'index,follow,noarchive'},
          {title: 'No Snippet', value: 'index,follow,nosnippet'}
        ]
      },
      description: 'Search engine crawling instructions'
    },
    {
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title for social media sharing (different from meta title)'
    },
    {
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 3,
      description: 'Description for social media sharing'
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true
      }
    },
    {
      name: 'ogType',
      title: 'Open Graph Type',
      type: 'string',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Article', value: 'article'},
          {title: 'Product', value: 'product'},
          {title: 'Organization', value: 'organization'},
          {title: 'Profile', value: 'profile'}
        ]
      },
      description: 'Type of content for social media'
    },
    {
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary Large Image', value: 'summary_large_image'},
          {title: 'Player', value: 'player'},
          {title: 'App', value: 'app'}
        ]
      },
      description: 'Twitter card display type'
    },
    {
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      description: 'Title for Twitter sharing (different from OG title)'
    },
    {
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      rows: 2,
      description: 'Description for Twitter sharing'
    },
    {
      name: 'twitterImage',
      title: 'Twitter Image',
      type: 'image',
      description: 'Image for Twitter sharing (1200x600px recommended)',
      options: {
        hotspot: true
      }
    },
    {
      name: 'structuredData',
      title: 'Structured Data',
      type: 'object',
      fields: [
        {
          name: 'schemaType',
          title: 'Schema Type',
          type: 'string',
          options: {
            list: [
              {title: 'Article', value: 'Article'},
              {title: 'WebPage', value: 'WebPage'},
              {title: 'Organization', value: 'Organization'},
              {title: 'Product', value: 'Product'},
              {title: 'Service', value: 'Service'},
              {title: 'FAQPage', value: 'FAQPage'},
              {title: 'HowTo', value: 'HowTo'},
              {title: 'Event', value: 'Event'},
              {title: 'Person', value: 'Person'},
              {title: 'LocalBusiness', value: 'LocalBusiness'}
            ]
          }
        },
        {
          name: 'customSchema',
          title: 'Custom JSON-LD Schema',
          type: 'text',
          rows: 10,
          description: 'Custom structured data in JSON-LD format (optional)'
        }
      ]
    },
    {
      name: 'hreflang',
      title: 'Hreflang Tags',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'language',
              title: 'Language Code',
              type: 'string',
              description: 'e.g., en-US, es-ES, fr-CA'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'URL for this language version'
            }
          ]
        }
      ],
      description: 'International SEO language alternatives'
    },
    {
      name: 'priority',
      title: 'SEO Priority',
      type: 'number',
      description: 'Priority for search engines (0.0 to 1.0)',
      validation: Rule => Rule.min(0).max(1)
    },
    {
      name: 'changeFrequency',
      title: 'Change Frequency',
      type: 'string',
      options: {
        list: [
          {title: 'Always', value: 'always'},
          {title: 'Hourly', value: 'hourly'},
          {title: 'Daily', value: 'daily'},
          {title: 'Weekly', value: 'weekly'},
          {title: 'Monthly', value: 'monthly'},
          {title: 'Yearly', value: 'yearly'},
          {title: 'Never', value: 'never'}
        ]
      },
      description: 'How often this page changes'
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      description: 'When this page was last updated'
    }
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription'
    }
  }
} 