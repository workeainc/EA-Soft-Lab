export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(150),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'icon',
              title: 'Feature Icon',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'string',
        },
        {
          name: 'pricingModel',
          title: 'Pricing Model',
          type: 'string',
          options: {
            list: [
              { title: 'Fixed Price', value: 'fixed' },
              { title: 'Hourly Rate', value: 'hourly' },
              { title: 'Project Based', value: 'project' },
              { title: 'Subscription', value: 'subscription' },
            ],
          },
        },
        {
          name: 'pricingDetails',
          title: 'Pricing Details',
          type: 'text',
          rows: 3,
        },
      ],
    },
    {
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'seoFields',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
} 