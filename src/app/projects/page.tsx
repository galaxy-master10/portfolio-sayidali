import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import PageTransition from '@/components/PageTransition'
import ProjectsDisplay from '@/components/projects/ProjectsDisplay'

// Fetch projects from Sanity
async function getProjects() {
    try {
        const projects = await client.fetch(
            groq`*[_type == "project"] | order(featured desc) {
        _id,
        title,
        slug,
        "categories": categories,
        mainImage,
        description,
        technologies,
        githubLink,
        liveLink,
        featured
      }`
        )

        const categories = await client.fetch(
            groq`array::unique(*[_type == "project" && defined(categories)].categories[])`
        )

        return { projects, categories }
    } catch (error) {
        console.error('Error fetching projects:', error)
        return { projects: [], categories: [] }
    }
}

// Generate metadata for the page
export const metadata = {
    title: 'Projects | Sayidali Jama',
    description: 'Browse through my portfolio of projects and case studies',
}

// Projects page component
export default async function ProjectsPage() {
    const { projects, categories } = await getProjects()

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                        My Projects
                    </h1>
                    <p className="text-gray-400 dark:text-gray-400 text-lg mb-12 max-w-3xl">
                        Browse through my latest projects. Each project represents a journey of problem-solving,
                        creativity, and technical implementation.
                    </p>

                    {/* Projects display component */}
                    <ProjectsDisplay projects={projects} categories={categories} />
                </div>
            </div>
        </PageTransition>
    )
}