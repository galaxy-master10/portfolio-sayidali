// src/components/AnimatedHeading.tsx
'use client'

import { motion } from 'framer-motion'

export default function AnimatedHeading() {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.04
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <motion.h1
            className="text-4xl text-yellow-500  md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.span variants={item}>Hi, I&apos;m </motion.span>
            <motion.span className="text-emerald-500" variants={item}>Sayidali</motion.span>
            <motion.div variants={item}>Full-Stack Developer</motion.div>
        </motion.h1>
    )
}