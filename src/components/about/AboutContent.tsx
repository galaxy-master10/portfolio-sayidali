// src/components/about/AboutContent.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {FiCode, FiCoffee, FiHeadphones, FiBookOpen, FiMapPin, FiMail, FiCamera} from 'react-icons/fi'
import { HiOutlineSparkles, HiOutlineClipboardList, HiOutlineUsers, HiOutlineClock, HiOutlineLightBulb } from 'react-icons/hi';
import { SiJavascript, SiReact, SiNodedotjs, SiNextdotjs } from 'react-icons/si'
import TimelineItem from './TimelineItem'
import CodeBlock from './CodeBlock'

export default function AboutContent() {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Parallax */}
            <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-4">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="bg-primary-500/10 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 0.5, 0],
                                    scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                    duration: Math.random() * 5 + 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <motion.h1
                        className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        About Me
                    </motion.h1>

                    <motion.div
                        className="w-20 h-1 bg-primary-500 mx-auto mt-4 mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    <motion.p
                        className="text-xl md:text-2xl max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Full-stack developer passionate about crafting exceptional digital experiences
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-light dark:bg-dark">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column - Personal Info */}
                        <div>
                            <motion.div
                                className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden mb-10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Image
                                    src="/profile-image.jpg"
                                    alt="Sayidali Jama"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <div className="p-6 w-full">
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <h3 className="text-white text-2xl font-bold">Sayidali Jama</h3>
                                                <p className="text-gray-300">Full-Stack Developer</p>
                                            </div>
                                            <div className="flex space-x-3">
                                                <motion.a
                                                    href="mailto:ibrahimsayidali10@gmail.com"
                                                    className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FiMail />
                                                </motion.a>
                                                <motion.a
                                                    href="https://github.com/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                                                </motion.a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.2}}
                            >
                                <h2 className="text-3xl font-heading font-bold mb-6">
                                    Hello, I&apos;m <span className="text-primary-500">Sayidali</span>
                                </h2>

                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="mb-4">
                                        I&apos;m a full-stack developer based in Belgium with a passion for building
                                        exceptional digital experiences that combine stunning design with robust
                                        functionality.
                                    </p>

                                    <p className="mb-4">
                                        With expertise in both frontend and backend technologies, I specialize in
                                        creating responsive web applications that solve real-world problems. My approach
                                        combines technical excellence with an eye for design and user experience.
                                    </p>

                                    <p className="mb-8">
                                        When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                                        contributing to public projects not exactly open source, or sharing my developer
                                        knowledge with the somali community.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                                            <FiMapPin/>
                                        </div>
                                        <span>Kortrijk, Belgium</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                                            <FiCode/>
                                        </div>
                                        <span>2.5+ Years Experience</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                                            <FiCoffee/>
                                        </div>
                                        <span>Coffee Enthusiast</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                                            <FiBookOpen/>
                                        </div>
                                        <span>Lifelong Learner</span>
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <span className="mr-2">Tech Stack</span>
                                        <div className="h-[1px] flex-grow bg-gray-300 dark:bg-gray-700"></div>
                                    </h3>

                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            {icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400'},
                                            {icon: SiReact, name: 'React', color: 'text-blue-400'},
                                            {icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500'},
                                            {icon: SiNextdotjs, name: 'Next.js', color: 'text-gray-100'}
                                        ].map((tech, index) => (
                                            <motion.div
                                                key={tech.name}
                                                className="bg-gray-800 text-white rounded-lg px-4 py-2 flex items-center space-x-2"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.3, delay: 0.4 + (index * 0.1)}}
                                                whileHover={{y: -5}}
                                            >
                                                <tech.icon className={`w-5 h-5 ${tech.color}`}/>
                                                <span>{tech.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <span className="mr-2">Soft Skills</span>
                                        <div className="h-[1px] flex-grow bg-gray-300 dark:bg-gray-700"></div>
                                    </h3>

                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            {icon: HiOutlineSparkles, name: 'Flexible', color: 'text-purple-400'},
                                            {icon: HiOutlineClipboardList, name: 'Organized', color: 'text-yellow-300'},
                                            {icon: HiOutlineUsers, name: 'Team Player', color: 'text-green-400'},
                                            {icon: HiOutlineClock, name: 'Time Management', color: 'text-blue-300'},
                                            {
                                                icon: HiOutlineLightBulb,
                                                name: 'Problem Solver',
                                                color: 'text-orange-300'
                                            },
                                        ].map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                className="bg-gray-800 text-white rounded-lg px-4 py-2 flex items-center space-x-2"
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.3, delay: 0.4 + index * 0.1}}
                                                whileHover={{y: -5}}
                                            >
                                                <skill.icon className={`w-5 h-5 ${skill.color}`}/>
                                                <span>{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Journey & Code */}
                        <div>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.3}}
                            >
                                <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
                                    <span className="mr-3">My Journey</span>
                                    <div className="h-[1px] flex-grow bg-gray-300 dark:bg-gray-700"></div>
                                </h2>

                                <div className="space-y-6 mb-12">
                                    <TimelineItem
                                        year="2025 - Present"
                                        title="Intern Full-Stack Developer"
                                        company="Ipcom NV"
                                        description="Inhouse application development and maintenance. Collaborated with cross-functional teams to deliver high-quality software solutions."
                                    />

                                    <TimelineItem
                                        year="2021 - 2023"
                                        title="Full-Stack Developer"
                                        company="Tech with Said"
                                        description="Solo app developer and freelancer. Developing apps for clients both family and friends. Focused on building scalable and efficient web applications."
                                    />

                                    <TimelineItem
                                        year="2021 - 2022"
                                        title="Summer student job IT Helpdesk Assistant"
                                        company="Callens Digital Hub"
                                        description="Provided technical support to users, resolved hardware/software issues, and assisted with system maintenance and troubleshooting in a professional IT environment."
                                    />


                                </div>

                                <h2 className="text-3xl font-heading font-bold mb-6 flex items-center">
                                    <span className="mr-3">My Code</span>
                                    <div className="h-[1px] flex-grow bg-gray-300 dark:bg-gray-700"></div>
                                </h2>

                                <div className="mb-10">
                                    <CodeBlock
                                        code={`// How I approach problems
function solveProblems(problem) {
  // First, understand the problem deeply
  const requirements = analyzeRequirements(problem);
  
  // Research and explore solutions
  const possibleSolutions = research(requirements);
  
  // Choose the most efficient approach
  const bestSolution = evaluate(possibleSolutions);
  
  // Implement with clean, maintainable code
  const implementation = writeCleanCode(bestSolution);
  
  // Test thoroughly
  const testedSolution = test(implementation);
  
  // Refine based on feedback
  return refine(testedSolution);
}`}
                                        language="javascript"
                                    />
                                </div>

                                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
                                    <h3 className="text-xl font-bold mb-4">Let&apos;s Connect</h3>
                                    <p className="mb-4">
                                        I&apos;m always interested in new opportunities, collaborations, or just chatting about tech. Feel free to reach out!
                                    </p>
                                    <motion.a
                                        href="mailto:hello@sayidali.com"
                                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <FiMail />
                                        <span>Get in Touch</span>
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interest Section with Parallax */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 z-0"
                >
                    <svg
                        className="absolute w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.path
                                key={i}
                                d={`M0 ${25 + i * 3} C ${20 + i * 2} ${10 + i * 5}, ${70 - i * 2} ${80 - i * 3}, 100 ${40 + i * 2}`}
                                stroke="currentColor"
                                strokeWidth="0.5"
                                strokeOpacity="0.3"
                                className="text-primary-500"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: i * 0.1 }}
                            />
                        ))}
                    </svg>
                </motion.div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                            Beyond <span className="text-primary-500">Coding</span>
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            When  I&apos;m not immersed in lines of code, here are some things I enjoy
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FiHeadphones className="w-8 h-8" />,
                                title: "Music & Podcasts",
                                description: "I enjoy listening to tech podcasts and a wide range of music while coding."
                            },
                            {
                                icon: <FiBookOpen className="w-8 h-8" />,
                                title: "Reading",
                                description: "I'm constantly reading technical books and articles to stay updated with the latest trends."
                            },
                            {
                                icon: <FiCamera className="w-8 h-8" />,
                                title: "Photography",
                              description: "I'm a photography enthusiast who enjoys capturing moments and exploring creative compositions."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}