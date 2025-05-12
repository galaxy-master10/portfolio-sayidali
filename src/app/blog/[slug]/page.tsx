// src/app/blog/[slug]/page.tsx
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi'
import PageTransition from '@/components/PageTransition'

type PostData = {
    title: string
    slug: { current: string }
    mainImage: any
    excerpt: string
    categories?: string[]
    body?: any[]
    publishedAt: string
    readingTime?: string
    author: {
        name: string
        image?: any
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Sayidali Jama`,
        description: post.excerpt,
    }
}

async function getPost(slug: string): Promise<PostData | null> {
    try {
        const post = await client.fetch(
            groq`*[_type == "post" && slug.current == $slug][0]{
        title,
        slug,
        mainImage,
        excerpt,
        categories,
        body,
        publishedAt,
        readingTime,
        "author": author->{name, image}
      }`,
            { slug }
        )

        return post
    } catch (error) {
        console.error('Error fetching post:', error)
        return null
    }
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const ptComponents = {
    block: {
        h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-5">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
        h4: ({ children }: any) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
        normal: ({ children }: any) => <p className="text-gray-700 dark:text-gray-300 mb-5">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-indigo-500 dark:border-emerald-500 pl-4 italic my-6">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
        number: ({ children }: any) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        code: ({ children }: any) => (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm">
                {children}
            </code>
        ),
        link: ({ value, children }: any) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 dark:text-emerald-400 hover:underline"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }: any) => (
            <div className="relative w-full h-96 my-8">
                <Image
                    src={urlFor(value).url()}
                    alt={value.alt || 'Blog image'}
                    fill
                    className="object-contain"
                />
            </div>
        ),
        code: ({ value }: any) => (
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                <code>{value.code}</code>
            </pre>
        ),
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <Link href="/blog" className="inline-flex items-center space-x-2 text-indigo-500 dark:text-emerald-400 mb-8 hover:underline">
                        <FiArrowLeft />
                        <span>Back to Blog</span>
                    </Link>

                    {/* Post title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
                        {post.title}
                    </h1>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories?.map((category: string, index: number) => (
                            <span key={index} className="bg-indigo-100 dark:bg-emerald-900 text-indigo-800 dark:text-emerald-300 text-sm px-3 py-1 rounded-full">
                                {category}
                            </span>
                        ))}
                    </div>

                    {/* Post metadata */}
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
                        <div className="flex items-center gap-2">
                            <FiCalendar />
                            <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        {post.readingTime && (
                            <div className="flex items-center gap-2">
                                <FiClock />
                                <span>{post.readingTime}</span>
                            </div>
                        )}
                    </div>

                    {/* Main image */}
                    <div className="relative w-full h-80 md:h-96 mb-10 overflow-hidden rounded-xl">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Post body content */}
                    {post.body && (
                        <div className="prose dark:prose-invert max-w-none">
                            <PortableText value={post.body} components={ptComponents} />
                        </div>
                    )}

                    {/* Author info */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                            {post.author.image && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Written by</p>
                                <p className="font-medium">{post.author.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
