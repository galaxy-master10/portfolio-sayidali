// src/components/projects/ProjectsDisplay.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import { FiFilter, FiX } from 'react-icons/fi'

type Project = {
    _id: string
    title: string
    slug: { current: string }
    categories?: string[]
    mainImage: any
    description?: string
    technologies?: string[]
    githubLink?: string
    liveLink?: string
    featured: boolean
}

export default function ProjectsDisplay({
                                            projects,
                                            categories
                                        }: {
    projects: Project[],
    categories: string[]
}) {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const [showFilters, setShowFilters] = useState(false)

    // Filter projects when category changes
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProjects(projects)
        } else {
            setFilteredProjects(
                projects.filter(project =>
                    project.categories?.includes(selectedCategory)
                )
            )
        }
    }, [selectedCategory, projects])

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
                            ? 'bg-blue-500 dark:bg-emerald-500 text-white'
                            : 'bg-blue-300 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    All Projects
                </button>

                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                            selectedCategory === category
                                ? 'bg-gray-700 dark:bg-emerald-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <motion.div
                                key={project._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                No projects found in this category. Try selecting a different category.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Empty state */}
            {projects.length === 0 && (
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <h3 className="text-xl font-medium mb-2">Projects Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        I'm currently working on adding my projects to this portfolio.
                        Check back soon to see my latest work!
                    </p>
                </div>
            )}
        </div>
    )
}