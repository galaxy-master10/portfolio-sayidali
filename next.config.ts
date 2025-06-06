// next.config.js or next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // disable ESLint during `next build`
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: 'bxzly96g',
        NEXT_PUBLIC_SANITY_DATASET: 'production',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
        ],
    },


}

export default nextConfig