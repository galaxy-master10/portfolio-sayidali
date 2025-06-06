import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi'
import PageTransition from '@/components/PageTransition'

// Define types for project data
type ProjectData = {
    title: string
    slug: { current: string }
    mainImage: any
    description: string
    categories?: string[]
    technologies?: string[]
    body?: any[]
    githubLink?: string
    liveLink?: string
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Sayidali Jama`,
        description: project.description,
    }
}

// Fetch the project data from Sanity
async function getProject(slug: string): Promise<ProjectData | null> {
    try {
        const project = await client.fetch(
            groq`*[_type == "project" && slug.current == $slug][0]{
        title,
        slug,
        mainImage,
        description,
        categories,
        technologies,
        body,
        githubLink,
        liveLink
      }`,
            { slug }
        )

        return project
    } catch (error) {
        console.error('Error fetching project:', error)
        return null
    }
}

// Components for the portable text
const ptComponents = {
    block: {
        // Different heading levels
        h1: ({children}: any) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
        h2: ({children}: any) => <h2 className="text-3xl text-yellow-700 font-bold mt-10 mb-5">{children}</h2>,
        h3: ({children}: any) => <h3 className="text-2xl text-yellow-700 font-bold mt-8 mb-4">{children}</h3>,
        h4: ({children}: any) => <h4 className="text-xl text-yellow-700 font-bold mt-6 mb-3">{children}</h4>,
        normal: ({children}: any) => <p className="text-gray-300  dark:text-gray-300 mb-5">{children}</p>,
        blockquote: ({children}: any) => (
            <blockquote className="border-l-4 border-indigo-500 dark:border-emerald-500 pl-4 italic my-6">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
        number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({children}: any) => <li className="text-gray-300 dark:text-gray-300">{children}</li>,
        number: ({children}: any) => <li className="text-gray-300 dark:text-gray-300">{children}</li>,
    },
    marks: {
        strong: ({children}: any) => <strong className="font-bold">{children}</strong>,
        em: ({children}: any) => <em className="italic">{children}</em>,
        code: ({children}: any) => (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm">
                {children}
            </code>
        ),
        link: ({value, children}: any) => (
            <a
                href={value.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 dark:text-emerald-400 hover:underline"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-96 my-8">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Project image'}
                        fill
                        className="object-contain"
                    />
                </div>
            )
        },
        code: ({ value }: any) => {
            return (
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                    <code>{value.code}</code>
                </pre>
            )
        }
    }
}

// Project detail page component
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug)

    if (!project) {
        notFound()
    }

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <Link href="/projects" className="inline-flex items-center space-x-2 text-indigo-500 dark:text-emerald-400 mb-8 hover:underline">
                        <FiArrowLeft />
                        <span>Back to Projects</span>
                    </Link>

                    {/* Project title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                        {project.title}
                    </h1>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.categories?.map((category: string, index: number) => (
                            <span key={index} className="bg-indigo-100 dark:bg-emerald-900 text-indigo-800 dark:text-emerald-300 text-sm px-3 py-1 rounded-full">
                                {category}
                            </span>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="relative w-full h-80 md:h-96 mb-10 overflow-hidden rounded-xl">
                        <Image
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Project links - Fixed <a> tags */}
                    <div className="flex flex-wrap gap-4 mb-10">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <FiGithub />
                                <span>View on GitHub</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-indigo-500 dark:bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-emerald-700 transition-colors"
                            >
                                <FiExternalLink />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>

                    {/* Project description */}
                    <div className="mb-10">
                        <h2 className="text-2xl text-yellow-700 font-bold mb-4">About this project</h2>
                        <p className="text-gray-300 dark:text-gray-300 text-lg">
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies used */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                            <div className="flex flex-wrap gap-2 ">
                                {project.technologies.map((tech: string, index: number) => (
                                    <span key={index} className="bg-sky-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Project body content */}
                    {project.body && (
                        <div className="prose dark:prose-invert max-w-none">
                            <PortableText value={project.body} components={ptComponents} />
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    )
}