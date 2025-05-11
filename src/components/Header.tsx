// src/components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

const NavLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
]

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Helper function to check if the path is active (handles both exact matches and subpaths)
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/'
        }
        return pathname === path || pathname?.startsWith(`${path}/`)
    }

    return (
        <header className="fixed w-full top-0 z-50 bg-light dark:bg-dark bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="font-heading text-2xl font-bold">
                    Sayidali<span className="text-primary-500 dark:text-emerald-400">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative px-4 py-2 rounded-lg transition-all duration-300"
                        >
                            <span className={`relative z-10 ${
                                isActive(link.href)
                                    ? 'text-white font-medium'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-emerald-400'
                            }`}>
                                {link.label}
                            </span>

                            {isActive(link.href) && (
                                <motion.span
                                    layoutId="navBackground"
                                    className={`absolute inset-0 rounded-lg -z-0 ${
                                        theme === 'dark'
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20'
                                            : 'bg-gradient-to-r from-indigo-600 to-primary-700 shadow-lg shadow-primary-500/20'
                                    }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle Dark Mode"
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                            theme === 'dark'
                                ? 'bg-gray-800 text-emerald-400 hover:ring-2 ring-emerald-500'
                                : 'bg-gray-200 text-indigo-600 hover:ring-2 ring-indigo-500'
                        }`}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {mounted && (
                            <>
                                {theme === 'dark' ? (
                                    <FiSun className="w-5 h-5" />
                                ) : (
                                    <FiMoon className="w-5 h-5" />
                                )}
                            </>
                        )}
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                            theme === 'dark'
                                ? 'bg-gray-800 text-white hover:ring-2 ring-emerald-500'
                                : 'bg-gray-200 text-gray-800 hover:ring-2 ring-indigo-500'
                        }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <FiX className="w-5 h-5" />
                        ) : (
                            <FiMenu className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-light dark:bg-dark border-b border-gray-200 dark:border-gray-800"
                >
                    <nav className="flex flex-col px-4 py-4 space-y-2">
                        {NavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <motion.div
                                    className={`px-4 py-3 rounded-lg ${
                                        isActive(link.href)
                                            ? theme === 'dark'
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                                                : 'bg-gradient-to-r from-indigo-600 to-primary-700 text-white shadow-lg shadow-indigo-500/20'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {link.label}
                                </motion.div>
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    )
}