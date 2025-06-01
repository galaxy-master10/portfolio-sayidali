// src/components/blog/BlogPostsDisplay.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { FiFilter, FiX } from 'react-icons/fi'

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

// Format date for display
function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function BlogPostsDisplay({
                                             posts,
                                             categories
                                         }: {
    posts: Post[],
    categories: string[]
}) {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filteredPosts, setFilteredPosts] = useState(posts)
    const [showFilters, setShowFilters] = useState(false)

    // Filter posts when category changes
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredPosts(posts)
        } else {
            setFilteredPosts(
                posts.filter(post =>
                    post.categories?.includes(selectedCategory)
                )
            )
        }
    }, [selectedCategory, posts])

    return (
        <div className="space-y-10">
            {/* Mobile filter toggle */}
            <div className="md:hidden flex justify-end mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg"
                >
                    {showFilters ? <FiX /> : <FiFilter />}
                    <span>Filters</span>
                </button>
            </div>

            {/* Filter categories */}
            <motion.div
                className={`flex flex-wrap gap-3 mb-8 justify-center ${showFilters ? 'block' : 'hidden md:flex'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === 'all'
                            ? 'bg-primary-500 dark:bg-emerald-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    All Posts
                </button>

                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                            selectedCategory === category
                                ? 'bg-primary-500 dark:bg-emerald-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <motion.div
                                key={post._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link
                                    href={`/blog/${post.slug.current}`}
                                    className="group block"
                                >
                                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full">
                                        {/* Post image */}
                                        <div className="relative w-full h-48 overflow-hidden">
                                            {post.mainImage && (
                                                <Image
                                                    src={urlFor(post.mainImage).url()}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            )}
                                        </div>

                                        <div className="p-6 bg-gray-900">
                                            {/* Categories */}
                                            {post.categories && post.categories.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {post.categories.map((category: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs bg-indigo-100 dark:bg-emerald-900 text-indigo-800 dark:text-emerald-300 px-2 py-1 rounded-full"
                                                        >
                              {category}
                            </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Post title */}
                                            <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-500 text-indigo-400 dark:group-hover:text-emerald-400 transition-colors">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            {post.excerpt && (
                                                <p className="text-gray-200 dark:text-gray-400 mb-4 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            {/* Metadata */}
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                <span>{formatDate(post.publishedAt)}</span>
                                                {post.readingTime && <span>{post.readingTime}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                No posts found in this category. Try selecting a different category.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Empty state */}
            {posts.length === 0 && (
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <h3 className="text-xl font-medium mb-2">Blog Posts Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        I'm currently working on adding articles to my blog.
                        Check back soon to read my latest thoughts and tutorials!
                    </p>
                </div>
            )}
        </div>
    )
}