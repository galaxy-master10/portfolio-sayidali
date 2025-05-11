// src/components/ProjectCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export default function ProjectCard({ project }: { project: any }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col"
        >
            <div className="relative h-48 md:h-56">
                <Image
                    src={urlFor(project.mainImage).url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-gray-800/80 p-2 rounded-full hover:bg-primary-500 dark:hover:bg-emerald-500 transition-colors"
                        >
                            <FiGithub size={18} />
                            <span className="sr-only">GitHub</span>
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-gray-800/80 p-2 rounded-full hover:bg-primary-500 dark:hover:bg-emerald-500 transition-colors"
                        >
                            <FiExternalLink size={18} />
                            <span className="sr-only">Live Demo</span>
                        </a>
                    )}
                </div>

                {project.featured && (
                    <div className="absolute top-2 right-2 bg-primary-500 dark:bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                    </div>
                )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                    {project.categories?.map((category: string, index: number) => (
                        <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
              {category}
            </span>
                    ))}
                </div>

                <Link href={`/projects/${project.slug.current}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-emerald-400 transition-colors">
                        {project.title}
                    </h3>
                </Link>


                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                        <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                        >
              {tech}
            </span>
                    ))}
                    {project.technologies?.length > 3 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
              +{project.technologies.length - 3} more
            </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}