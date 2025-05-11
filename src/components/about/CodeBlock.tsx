// src/components/about/CodeBlock.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiClipboard, FiCheck } from 'react-icons/fi'

type CodeBlockProps = {
    code: string
    language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            className="rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white">
                <div className="text-sm font-mono">{language}</div>
                <button
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    {copied ? <FiCheck className="w-5 h-5 text-green-400" /> : <FiClipboard className="w-5 h-5" />}
                </button>
            </div>
            <div className="bg-gray-900 p-4 overflow-x-auto">
        <pre className="text-gray-300 font-mono text-sm">
          <code>{code}</code>
        </pre>
            </div>
        </motion.div>
    )
}