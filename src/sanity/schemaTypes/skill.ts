// src/app/lib/schemas/skill.ts
export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Icon representing this skill',
        },
        {
            name: 'proficiency',
            title: 'Proficiency',
            type: 'number',
            description: 'Your proficiency level (0-100)',
            validation: (Rule: any) => Rule.required().min(0).max(100),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Frontend', value: 'frontend' },
                    { title: 'Backend', value: 'backend' },
                    { title: 'Database', value: 'database' },
                    { title: 'DevOps', value: 'devops' },
                    { title: 'Design', value: 'design' },
                    { title: 'Tools', value: 'tools' },
                ],
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Brief description of your experience with this skill',
        },
        {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Order to display skills (lower numbers displayed first)',
            initialValue: 100,
        },
    ],
    orderings: [
        {
            title: 'Proficiency, High to Low',
            name: 'proficiencyDesc',
            by: [{ field: 'proficiency', direction: 'desc' }],
        },
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'proficiency',
            media: 'icon',
        },
        prepare(selection: any) {
            const { subtitle } = selection
            return {
                ...selection,
                subtitle: subtitle ? `Proficiency: ${subtitle}%` : '',
            }
        },
    },
}