// src/components/AnimatedBackground.tsx
'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 dark:to-gray-900 opacity-80" />

            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={index}
                    className={`absolute rounded-full ${
                        resolvedTheme === 'dark' ? 'bg-primary-800/20' : 'bg-primary-500/10'
                    }`}
                    style={{
                        width: `${Math.random() * 300 + 100}px`,
                        height: `${Math.random() * 300 + 100}px`,
                        left: `${Math.random() * 90}%`,
                        top: `${Math.random() * 90}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 40 - 20],
                        y: [0, Math.random() * 40 - 20],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}