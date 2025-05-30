// src/app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'

export function Providers({ children }: { children: ReactNode }) {
    // Force dark mode on mount
    useEffect(() => {
        document.documentElement.classList.add('dark')
    }, [])

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}