'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import {
    FiCode,
    FiDatabase,
    FiServer,
    FiTool,
    FiLayers,
    FiGrid,
} from 'react-icons/fi'

type Skill = {
    _id: string
    name: string
    proficiency: number
    category?: string
    icon?: any
}

//–– 1) Define your category order, labels & icons here ––
const STATIC_CATEGORIES: {
    id: string
    label: string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[] = [
    { id: 'frontend', label: 'Frontend', Icon: FiCode },
    { id: 'backend', label: 'Backend', Icon: FiServer },
    { id: 'database', label: 'Database', Icon: FiDatabase },
    { id: 'devops', label: 'DevOps', Icon: FiTool },
    { id: 'design', label: 'Design', Icon: FiLayers },
]

export default function SkillsVisual({ skills }: { skills: Skill[] }) {
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Build the tab list: “All Skills” + only those STATIC_CATEGORIES that actually appear
    const categories = useMemo(() => {
        const used = new Set(skills.map(s => s.category).filter(Boolean))
        const filtered = STATIC_CATEGORIES.filter(c => used.has(c.id))
        return [
            { id: 'all', label: 'All Skills', Icon: FiGrid },
            ...filtered,
        ]
    }, [skills])

    // For non-“all” views, pre-filter
    const displayedSkills = useMemo(() => {
        if (selectedCategory === 'all') return skills
        return skills.filter((s) => s.category === selectedCategory)
    }, [selectedCategory, skills])

    // Animations (unchanged)
    const tabVariants = {
        inactive: { opacity: 0.6 },
        active: { opacity: 1, scale: 1.05 },
        hover: { opacity: 0.9, y: -2 },
    }
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
        hover: {
            y: -10,
            scale: 1.05,
            boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
    }
    const progressVariants = {
        hidden: { width: 0 },
        visible: (p: number) => ({
            width: `${p}%`,
            transition: { duration: 1, delay: 0.3, ease: 'easeOut' },
        }),
    }

    // Helper to group skills by category
    const grouped = useMemo(() => {
        return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
            const cat = skill.category || 'uncategorized'
            if (!acc[cat]) acc[cat] = []
            acc[cat].push(skill)
            return acc
        }, {})
    }, [skills])

    return (
        <div className="space-y-10">

            {/* ——— Category Tabs ——— */}
            <div className="flex justify-center mb-8 overflow-x-auto pb-4">
                <div className="flex space-x-2 md:space-x-4">
                    {categories.map(({ id, label, Icon }) => (
                        <motion.button
                            key={id}
                            onClick={() => setSelectedCategory(id)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                                selectedCategory === id
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                            variants={tabVariants}
                            animate={selectedCategory === id ? 'active' : 'inactive'}
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* ——— Skills Display ——— */}
            <AnimatePresence mode="wait">
                {selectedCategory === 'all' ? (
                    // ——— All Skills: show “islands” per category ———
                    Object.entries(grouped).map(([catId, skillsInCat]) => {
                        // find our label/icon or fallback
                        const catMeta =
                            categories.find((c) => c.id === catId) ||
                            ({ label: catId, Icon: FiGrid } as any)
                        return (
                            <motion.div
                                key={catId}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -10 }}
                                variants={containerVariants}
                                className="space-y-4"
                            >
                                {/* Category heading */}
                                <h3 className="flex items-center text-2xl font-bold gap-2">
                                    <catMeta.Icon className="w-6 h-6 text-primary-500" />
                                    {catMeta.label}
                                </h3>

                                {/* Grid of that category */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                    {skillsInCat.map((skill) => (
                                        <motion.div
                                            key={skill._id}
                                            variants={cardVariants}
                                            whileHover="hover"
                                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                {skill.icon && (
                                                    <motion.div
                                                        className="w-16 h-16 mb-4 relative"
                                                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            repeatType: 'mirror',
                                                            duration: 5,
                                                            ease: 'easeInOut',
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
                                                <h4 className="text-lg font-medium mb-2">
                                                    {skill.name}
                                                </h4>
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
                                                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {skill.proficiency}%
                        </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })
                ) : (
                    // ——— Single category filter: one simple grid ———
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
                                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
                            >
                                {/* …same skill‐card inner markup as above… */}
                                <div className="flex flex-col items-center text-center">
                                    {skill.icon && (
                                        <motion.div
                                            className="w-16 h-16 mb-4 relative"
                                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                repeatType: 'mirror',
                                                duration: 5,
                                                ease: 'easeInOut',
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
                                    <h4 className="text-lg font-medium mb-2">{skill.name}</h4>
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
                                    <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {skill.proficiency}%
                  </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
