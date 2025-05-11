// src/app/not-found.tsx
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md px-4">
                <h1 className="text-6xl font-bold mb-6">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/" className="inline-flex items-center space-x-2 text-primary-500 dark:text-emerald-400">
                    <FiArrowLeft />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    )
}