// src/app/lib/schemas/post.ts
export default {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show this post on the homepage',
            initialValue: false,
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Web Development', value: 'web-dev' },
                    { title: 'UI/UX Design', value: 'design' },
                    { title: 'JavaScript', value: 'javascript' },
                    { title: 'TypeScript', value: 'typescript' },
                    { title: 'React', value: 'react' },
                    { title: 'Next.js', value: 'nextjs' },
                    { title: 'CSS', value: 'css' },
                    { title: 'Tech Career', value: 'career' },
                    { title: 'Low/no - code', value: 'low-code' },
                    { title: 'Database', value: 'database' },
                    { title: 'Infrastructure', value: 'infrastructure' },
                    { title: 'Platform Engineering', value: 'platform-engineering' },
                    { title: 'Reliability', value: 'reliability' },
                    { title: 'DevOps', value: 'devops' },
                    { title: 'Cloud', value: 'cloud' },
                    { title: 'Security', value: 'security' },
                    { title: 'AI/ML', value: 'ai-ml' },
                    { title: 'Open Source', value: 'open-source' },
                ],
            },
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'A short description of the blog post',
            validation: (Rule: any) => Rule.max(200),
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                title: 'URL',
                                type: 'object',
                                fields: [
                                    {
                                        name: 'href',
                                        title: 'URL',
                                        type: 'url',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            type: 'text',
                            name: 'alt',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility',
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                },
                {
                    type: 'code',
                    options: {
                        withFilename: true,
                    },
                },
            ],
        },
        {
            name: 'readingTime',
            title: 'Reading Time',
            type: 'string',
            description: 'Estimated reading time (e.g., "5 min read")',
        },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: any) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
}