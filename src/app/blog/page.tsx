// src/app/blog/page.tsx
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import Image from 'next/image'
import BlogPostsDisplay from "@/components/blog/BlogPostsDisplay";

// Define types for blog data
type Post = {
    _id: string
    title: string
    slug: { current: string }
    categories?: string[]
    mainImage: any
    excerpt?: string
    publishedAt: string
    readingTime?: string
    author: {
        name: string
        image?: any
    }
}

// Fetch blog posts from Sanity
async function getPosts() {
    try {
        const posts = await client.fetch(
            groq`*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        "categories": categories,
        mainImage,
        excerpt,
        publishedAt,
        readingTime,
        "author": author->{name, image}
      }`
        )

        const categories = await client.fetch(
            groq`array::unique(*[_type == "post" && defined(categories)].categories[])`
        )

        return { posts, categories }
    } catch (error) {
        console.error('Error fetching posts:', error)
        return { posts: [], categories: [] }
    }
}

// Generate metadata for the page
export const metadata = {
    title: 'Blog | Sayidali Jama',
    description: 'Read my latest articles on web development, design, and technology',
}

// Format date for display
function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

// Blog page component
export default async function BlogPage() {
    const { posts, categories } = await getPosts()

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                        Blog
                    </h1>
                    <p className="text-gray-400 dark:text-gray-400 text-lg mb-12 max-w-3xl">
                        Thoughts, insights, and tutorials on web development, design, and technology.
                    </p>

                    {/* Blog posts display component */}
                    <BlogPostsDisplay posts={posts} categories={categories} />
                </div>
            </div>
        </PageTransition>
    )
}