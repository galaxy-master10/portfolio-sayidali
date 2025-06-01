'use client'

import { useState, useMemo } from 'react'
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

    // Build the tab list: "All Skills" + only those STATIC_CATEGORIES that actually appear
    const categories = useMemo(() => {
        const used = new Set(skills.map((s) => s.category).filter(Boolean))
        const filtered = STATIC_CATEGORIES.filter((c) => used.has(c.id))
        return [{ id: 'all', label: 'All Skills', Icon: FiGrid }, ...filtered]
    }, [skills])

    // For non-"all" views, pre-filter
    const displayedSkills = useMemo(() => {
        if (selectedCategory === 'all') return skills
        return skills.filter((s) => s.category === selectedCategory)
    }, [selectedCategory, skills])

    // Animations
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
            boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.25)',
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
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                                selectedCategory === id
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
                    // ——— All Skills: show "islands" per category ———
                    Object.entries(grouped).map(([catId, skillsInCat]) => {
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
                                <h3 className="flex items-center text-2xl font-bold gap-2 text-white">
                                    <catMeta.Icon className="w-6 h-6 text-emerald-400" />
                                    {catMeta.label}
                                </h3>

                                {/* Grid of that category */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                    {skillsInCat.map((skill) => (
                                        <motion.div
                                            key={skill._id}
                                            variants={cardVariants}
                                            whileHover="hover"
                                            className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:border-emerald-500/50 transition-colors"
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
                                                <h4 className="text-lg font-medium mb-3 text-gray-100">
                                                    {skill.name}
                                                </h4>

                                                {/* Progress bar container */}
                                                <div className="w-full">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs text-gray-400">Proficiency</span>
                                                        <span className="text-xs text-emerald-400 font-medium">
                                                            {skill.proficiency}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                                        <motion.div
                                                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                                                            variants={progressVariants}
                                                            initial="hidden"
                                                            whileInView="visible"
                                                            viewport={{ once: true }}
                                                            custom={skill.proficiency}
                                                        />
                                                    </div>
                                                </div>
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
                                className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:border-emerald-500/50 transition-colors"
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
                                    <h4 className="text-lg font-medium mb-3 text-gray-100">
                                        {skill.name}
                                    </h4>

                                    {/* Progress bar container */}
                                    <div className="w-full">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-400">Proficiency</span>
                                            <span className="text-xs text-emerald-400 font-medium">
                                                {skill.proficiency}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                                                variants={progressVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                custom={skill.proficiency}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}