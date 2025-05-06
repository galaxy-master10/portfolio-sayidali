// src/components/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-start dark:justify-end p-1 relative"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
        >
            <motion.div
                className="w-4 h-4 rounded-full bg-white dark:bg-primary-500"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
            />
            <span className="sr-only">Toggle theme</span>
        </motion.button>
    )
}