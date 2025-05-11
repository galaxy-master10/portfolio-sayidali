// src/components/SkillsVisual.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { FiCode, FiDatabase, FiServer, FiTool, FiGrid, FiLayers } from 'react-icons/fi'

type Skill = {
    _id: string
    name: string
    proficiency: number
    category?: string
    icon?: any
}

// Map category IDs to icons - just used for display
const categoryIcons: Record<string, any> = {
    'frontend': FiCode,
    'backend': FiServer,
    'database': FiDatabase,
    'devops': FiTool,
    'design': FiLayers,
    'all': FiGrid,
    // Add more as needed or use a default for unknown categories
}

export default function SkillsVisual({ skills }: { skills: Skill[] }) {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [categories, setCategories] = useState<{id: string, name: string, icon: any}[]>([])
    const [displayedSkills, setDisplayedSkills] = useState<Skill[]>([])

    // Extract unique categories from skills and set up category tabs
    useEffect(() => {
        if (!skills || skills.length === 0) return

        // Get unique categories from skills
        const uniqueCategories = new Set<string>()

        // Add each skill's category to the set
        skills.forEach(skill => {
            if (skill.category) {
                uniqueCategories.add(skill.category)
            }
        })

        // Convert set to array and format for component
        const categoryList = Array.from(uniqueCategories).map(cat => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1), // Capitalize first letter
            icon: categoryIcons[cat] || FiGrid // Use mapped icon or default
        }))

        // Always add "All" category
        const allCategories = [
            { id: 'all', name: 'All Skills', icon: FiGrid },
            ...categoryList
        ]

        setCategories(allCategories)
    }, [skills])

    // Update displayed skills when category changes
    useEffect(() => {
        if (!skills || skills.length === 0) return

        if (selectedCategory === 'all') {
            setDisplayedSkills(skills)
        } else {
            setDisplayedSkills(skills.filter(skill => skill.category === selectedCategory))
        }
    }, [selectedCategory, skills])

    // Category tab animation
    const tabVariants = {
        inactive: { opacity: 0.6, y: 0 },
        active: { opacity: 1, y: 0, scale: 1.05 },
        hover: { opacity: 0.9, y: -2 }
    }

    // Skill card animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        },
        hover: {
            y: -10,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
    }

    // Progress bar animation
    const progressVariants = {
        hidden: { width: 0 },
        visible: (proficiency: number) => ({
            width: `${proficiency}%`,
            transition: { duration: 1, delay: 0.3, ease: "easeOut" }
        })
    }

    return (
        <div className="space-y-10">
            {/* Category Tabs - Only show if we have categories */}
            {categories.length > 1 && (
                <div className="flex justify-center mb-8 overflow-x-auto pb-4">
                    <div className="flex space-x-2 md:space-x-4">
                        {categories.map((category) => {
                            const CategoryIcon = category.icon
                            return (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                                        selectedCategory === category.id
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                                    variants={tabVariants}
                                    animate={selectedCategory === category.id ? 'active' : 'inactive'}
                                    whileHover="hover"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <CategoryIcon className="w-4 h-4" />
                                    <span>{category.name}</span>
                                </motion.button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {displayedSkills.map((skill) => (
                        <motion.div
                            key={skill._id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all"
                        >
                            <div className="flex flex-col items-center text-center">
                                {skill.icon && (
                                    <motion.div
                                        className="w-16 h-16 mb-4 relative"
                                        animate={{
                                            rotate: [0, 5, 0, -5, 0]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "mirror",
                                            duration: 5,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Image
                                            src={urlFor(skill.icon).url()}
                                            alt={skill.name}
                                            fill
                                            className="object-contain"
                                            sizes="64px"
                                        />
                                    </motion.div>
                                )}
                                <h3 className="text-lg font-medium mb-3">{skill.name}</h3>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                    <motion.div
                                        className="bg-primary-500 h-2.5 rounded-full"
                                        variants={progressVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        custom={skill.proficiency}
                                    />
                                </div>
                                <motion.span
                                    className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {skill.proficiency}%
                                </motion.span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}