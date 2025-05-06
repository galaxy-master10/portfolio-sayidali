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

    return (
        <header className="fixed w-full top-0 z-50 bg-light dark:bg-dark bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="font-heading text-2xl font-bold">
                    Sayidali<span className="text-primary-500">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative ${
                                pathname === link.href
                                    ? 'text-primary-500'
                                    : 'hover:text-primary-500 transition-colors'
                            }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 top-full block h-[2px] w-full bg-primary-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <button
                        aria-label="Toggle Dark Mode"
                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:ring-2 ring-primary-500 transition-all"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {mounted && (
                            <>
                                {theme === 'dark' ? (
                                    <FiSun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <FiMoon className="w-5 h-5 text-blue-500" />
                                )}
                            </>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:ring-2 ring-primary-500 transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <FiX className="w-5 h-5" />
                        ) : (
                            <FiMenu className="w-5 h-5" />
                        )}
                    </button>
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
                    <nav className="flex flex-col px-4 py-4 space-y-4">
                        {NavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${
                                    pathname === link.href
                                        ? 'text-primary-500 font-medium'
                                        : 'hover:text-primary-500 transition-colors'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    )
}