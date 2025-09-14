export default {
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      title: 'Project Description',
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'clientWebsite',
      title: 'Client Website',
      type: 'url',
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Custom Software', value: 'custom' },
          { title: 'Cloud Migration', value: 'cloud' },
          { title: 'UI/UX Design', value: 'design' },
        ],
      },
    },
    {
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub Repository',
      type: 'url',
    },
    {
      name: 'timeline',
      title: 'Project Timeline',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
        },
        {
          name: 'duration',
          title: 'Duration (weeks)',
          type: 'number',
        },
      ],
    },
    {
      name: 'challenges',
      title: 'Challenges & Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'challenge',
              title: 'Challenge',
              type: 'text',
              rows: 2,
            },
            {
              name: 'solution',
              title: 'Solution',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'results',
      title: 'Results & Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              title: 'Metric',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Testimonial Quote',
          type: 'text',
          rows: 3,
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
        },
        {
          name: 'position',
          title: 'Author Position',
          type: 'string',
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string',
        },
      ],
    },
    {
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Featured projects appear prominently on the portfolio page',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which projects appear (lower numbers first)',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'featuredImage',
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
} 