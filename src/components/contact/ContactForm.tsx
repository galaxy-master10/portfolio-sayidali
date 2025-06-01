'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const errors: Record<string, string> = {}

        if (!formData.name.trim()) {
            errors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Email is invalid'
        }

        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required'
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required'
        } else if (formData.message.length < 10) {
            errors.message = 'Message is too short'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear error when typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: '',
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setFormState('submitting')

        try {
            const response = await fetch('https://formspree.io/f/myzwvndz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setFormState('success')
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                })
                setTimeout(() => {
                    setFormState('idle')
                }, 3000)
            } else {
                console.error('Form submission failed:', response);
                setFormState('error')
                setTimeout(() => {
                    setFormState('idle')
                }, 3000)
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            setFormState('error')
            setTimeout(() => {
                setFormState('idle')
            }, 3000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h2>

            <div className="space-y-4">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.name
                                ? 'border-red-500'
                                : 'border-gray-600'
                        } bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                        placeholder="Your Name"
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.name && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.email
                                ? 'border-red-500'
                                : 'border-gray-600'
                        } bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                        placeholder="your.email@example.com"
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.email && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                    )}
                </div>

                {/* Subject Field */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-300">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.subject
                                ? 'border-red-500'
                                : 'border-gray-600'
                        } bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                        placeholder="What's this about?"
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.subject && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.subject}</p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            formErrors.message
                                ? 'border-red-500'
                                : 'border-gray-600'
                        } bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-none`}
                        placeholder="Your message here..."
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.message && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={formState === 'submitting' || formState === 'success'}
                className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-all ${
                    formState === 'error'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : formState === 'success'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileTap={{ scale: 0.98 }}
            >
                {formState === 'submitting' ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </>
                ) : formState === 'success' ? (
                    <>
                        <FiCheck className="mr-2" size={20} />
                        Message Sent!
                    </>
                ) : formState === 'error' ? (
                    <>
                        <FiAlertCircle className="mr-2" size={20} />
                        Error Sending
                    </>
                ) : (
                    <>
                        <FiSend className="mr-2" size={20} />
                        Send Message
                    </>
                )}
            </motion.button>

            {/* Status Messages */}
            {formState === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg"
                >
                    <p className="flex items-center">
                        <FiAlertCircle className="mr-2 flex-shrink-0" />
                        There was an error sending your message. Please try again later.
                    </p>
                </motion.div>
            )}

            {formState === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/50 text-emerald-400 rounded-lg"
                >
                    <p className="flex items-center">
                        <FiCheck className="mr-2 flex-shrink-0" />
                        Thank you for your message! I'll contact you soon.
                    </p>
                </motion.div>
            )}
        </form>
    )
}