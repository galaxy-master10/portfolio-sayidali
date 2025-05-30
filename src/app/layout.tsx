// src/app/layout.tsx
import { Inter, Space_Grotesk, Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import React from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

// Font definitions - need to be defined before using them
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space-grotesk',
})

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
})

export const metadata = {
    title: 'Sayidali Jama | Web Developer',
    description: 'Full-stack web developer specializing in JavaScript frameworks and responsive design',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html
            className={`dark ${inter.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}
              suppressHydrationWarning>

        <body className="font-sans bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
        <Providers>
            <AnimatedBackground/>
            <div className="min-h-screen flex flex-col">
                <Header/>
                <main className="flex-grow pt-20">
                    {children}
                </main>
                <Footer/>
            </div>
        </Providers>
        <Analytics/>
        </body>
        </html>
    )
}