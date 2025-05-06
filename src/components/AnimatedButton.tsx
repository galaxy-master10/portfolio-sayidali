// src/components/AnimatedButton.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
    href: string
    variant?: 'primary' | 'secondary'
    children: ReactNode
}

export default function AnimatedButton({
                                           href,
                                           variant = 'primary',
                                           children
                                       }: AnimatedButtonProps) {
    const buttonStyles = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white",
        secondary: "bg-transparent border border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500"
    }

    return (
        <Link href={href}>
            <motion.div
                className={`px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors ${buttonStyles[variant]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </Link>
    )
}