// Sanity schemas for Gampaş CMS

// ProductFamily Schema
export const productFamily = {
  name: 'productFamily',
  title: 'Product Family',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sectors',
      title: 'Sectors',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Food & Beverage', value: 'food-beverage' },
              { title: 'Healthcare', value: 'healthcare' },
              { title: 'Cosmetics', value: 'cosmetics' },
              { title: 'Industrial', value: 'industrial' },
              { title: 'Retail', value: 'retail' },
              { title: 'E-commerce', value: 'ecommerce' },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
      media: 'coverImage',
    },
  },
};

// ProductVariant Schema
export const productVariant = {
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'productFamily',
      title: 'Product Family',
      type: 'reference',
      to: [{ type: 'productFamily' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {
          name: 'length',
          title: 'Length (mm)',
          type: 'number',
        },
        {
          name: 'width',
          title: 'Width (mm)',
          type: 'number',
        },
        {
          name: 'height',
          title: 'Height (mm)',
          type: 'number',
        },
      ],
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'object',
      fields: [
        {
          name: 'value',
          title: 'Value',
          type: 'number',
        },
        {
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: [
              { title: 'ml', value: 'ml' },
              { title: 'L', value: 'L' },
              { title: 'g', value: 'g' },
              { title: 'kg', value: 'kg' },
            ],
          },
        },
      ],
    },
    {
      name: 'material',
      title: 'Material',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
      ],
    },
    {
      name: 'lidType',
      title: 'Lid Type',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
      ],
    },
    {
      name: 'pdfFile',
      title: 'Technical Specification PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
      media: 'images.0',
    },
  },
};

// SectorSolution Schema
export const sectorSolution = {
  name: 'sectorSolution',
  title: 'Sector Solution',
  type: 'document',
  fields: [
    {
      name: 'sectorName',
      title: 'Sector Name',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    },
    {
      name: 'relatedFamilies',
      title: 'Related Product Families',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'productFamily' }],
        },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'sectorName.tr',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'sectorName.tr',
    },
  },
};

// Certificate Schema
export const certificate = {
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    },
    {
      name: 'pdfFile',
      title: 'Certificate PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
    },
  },
};

// CaseStudy Schema
export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Food & Beverage', value: 'food-beverage' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Cosmetics', value: 'cosmetics' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Retail', value: 'retail' },
          { title: 'E-commerce', value: 'ecommerce' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'problem',
      title: 'Problem',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    },
    {
      name: 'result',
      title: 'Result',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
      media: 'gallery.0',
    },
  },
};

// Page Schema
export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'array',
          of: [
            {
              type: 'block',
            },
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            {
              type: 'block',
            },
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'object',
          fields: [
            {
              name: 'tr',
              title: 'Turkish',
              type: 'string',
            },
            {
              name: 'en',
              title: 'English',
              type: 'string',
            },
          ],
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'object',
          fields: [
            {
              name: 'tr',
              title: 'Turkish',
              type: 'text',
            },
            {
              name: 'en',
              title: 'English',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
    },
  },
};

// Media Schema
export const media = {
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'fileType',
      title: 'File Type',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Document', value: 'document' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'fileType',
    },
  },
};

// Export all schemas
export const schemas = [
  productFamily,
  productVariant,
  sectorSolution,
  certificate,
  caseStudy,
  page,
  media,
];