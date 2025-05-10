// src/components/SkillsVisual.tsx
'use client'

import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

type Skill = {
    _id: string
    name: string
    proficiency: number
    icon?: any
}

export default function SkillsVisual({ skills }: { skills: Skill[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
                <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                    <div className="flex flex-col items-center text-center">
                        {skill.icon && (
                            <div className="w-16 h-16 mb-4 relative">
                                <Image
                                    src={urlFor(skill.icon).url()}
                                    alt={skill.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                        <h3 className="text-lg font-medium mb-3">{skill.name}</h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <motion.div
                                className="bg-primary-500 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                            />
                        </div>
                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {skill.proficiency}%
            </span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}