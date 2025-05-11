// src/components/about/TimelineItem.tsx
'use client'

import { motion } from 'framer-motion'

type TimelineItemProps = {
    year: string
    title: string
    company: string
    description: string
}

export default function TimelineItem({ year, title, company, description }: TimelineItemProps) {
    return (
        <motion.div
            className="relative pl-8 border-l border-gray-300 dark:border-gray-700"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary-500 -translate-x-[9px]" />
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{year}</div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <div className="font-medium text-primary-500 mb-2">{company}</div>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </motion.div>
    )
}