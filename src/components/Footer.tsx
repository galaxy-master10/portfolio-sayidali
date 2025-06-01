// src/components/Footer.tsx
import Link from 'next/link'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="font-heading text-2xl font-bold text-white">
                            Sayidali<span className="text-emerald-400">.</span>
                        </Link>
                        <p className="mt-2 text-gray-400 max-w-md">
                            Full-stack web developer specializing in modern JavaScript frameworks and app development.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            <FiGithub size={20} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            <FiTwitter size={20} />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a
                            href="https://linkedin.com/in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            <FiLinkedin size={20} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a
                            href="mailto:ibrahimsayidali10@gmail.com"
                            className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            <FiMail size={20} />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Sayidali Jama. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}