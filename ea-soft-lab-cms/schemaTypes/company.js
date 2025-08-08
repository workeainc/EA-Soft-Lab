export default {
  name: 'company',
  title: 'Company Information',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Company Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
    },
    {
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
    },
    {
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Value Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'icon',
              title: 'Value Icon',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State/Province',
          type: 'string',
        },
        {
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
        },
      ],
    },
    {
      name: 'stats',
      title: 'Company Statistics',
      type: 'object',
      fields: [
        {
          name: 'projectsCompleted',
          title: 'Projects Completed',
          type: 'number',
        },
        {
          name: 'yearsExperience',
          title: 'Years of Experience',
          type: 'number',
        },
        {
          name: 'clientSatisfaction',
          title: 'Client Satisfaction (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        },
        {
          name: 'happyClients',
          title: 'Happy Clients',
          type: 'number',
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'ogImage',
          title: 'Default Open Graph Image',
          type: 'image',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
} 