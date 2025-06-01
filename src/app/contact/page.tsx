import PageTransition from '@/components/PageTransition'
import ContactForm from '@/components/contact/ContactForm'
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi'


export const metadata = {
    title: 'Contact | Sayidali Jama',
    description: 'Get in touch with Sayidali Jama for collaboration, job opportunities, or just to say hello.',
}

export default function Contact() {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                        Contact <span className="text-indigo-500 dark:text-emerald-400">Me</span>
                    </h1>
                    <p className="text-gray dark:text-gray-400 text-lg mb-12 max-w-3xl">
                        Have a project in mind? Looking to collaborate or hire me? Feel free to reach out using the contact form or through my social profiles.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* Contact Info Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
                                <p className="text-gray dark:text-gray-400 mb-6">
                                    I&apos;m currently available for freelance projects, part-time positions, or just to discuss potential collaborations.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-indigo-100 dark:bg-gray-800 p-3 rounded-full text-indigo-500 dark:text-emerald-400">
                                        <FiMail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Email</h3>
                                        <a
                                            href="mailto:ibrahimsaydali10@gmail.com"
                                            className="text-green-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-emerald-400 transition-colors"
                                        >
                                            contact@sayidali.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="bg-indigo-100 dark:bg-gray-800 p-3 rounded-full text-indigo-500 dark:text-emerald-400">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Location</h3>
                                        <p className="text-orange-200 dark:text-gray-400">
                                            Kortrijk, Belgium
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-xl">Connect with me</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://github.com/galaxy-master10"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-100 dark:bg-gray-800 p-3 rounded-full text-indigo-500 dark:text-emerald-400 hover:bg-indigo-200 dark:hover:bg-gray-700 transition-colors"
                                        aria-label="GitHub Profile"
                                    >
                                        <FiGithub size={20} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/sayidali-ibrahim-3113b9253/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-100 dark:bg-gray-800 p-3 rounded-full text-indigo-500 dark:text-emerald-400 hover:bg-indigo-200 dark:hover:bg-gray-700 transition-colors"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <FiLinkedin size={20} />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-100 dark:bg-gray-800 p-3 rounded-full text-indigo-500 dark:text-emerald-400 hover:bg-indigo-200 dark:hover:bg-gray-700 transition-colors"
                                        aria-label="Twitter Profile"
                                    >
                                        <FiTwitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="lg:col-span-3 bg-black-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}