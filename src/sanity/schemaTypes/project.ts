// schemas/project.ts
export default {
    name: 'project',
    title: 'Project',
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
            description: 'Show this project on the homepage',
            initialValue: false,
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
                    { title: 'Web Development', value: 'web' },
                    { title: 'Mobile App', value: 'mobile' },
                    { title: 'UI/UX Design', value: 'design' },
                    { title: 'Backend', value: 'backend' },
                ],
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'body',
            title: 'Body',
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
                    fields: [
                        {
                            type: 'text',
                            name: 'alt',
                            title: 'Alternative text',
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
            name: 'githubLink',
            title: 'GitHub Link',
            type: 'url',
        },
        {
            name: 'liveLink',
            title: 'Live Demo Link',
            type: 'url',
        },
        {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
        },
    ],
}