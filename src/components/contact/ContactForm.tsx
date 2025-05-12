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

        // Simulate API call
        try {
            // Replace with actual form submission logic
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Success
            setFormState('success')
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            })

            // Reset form state after 3 seconds
            setTimeout(() => {
                setFormState('idle')
            }, 3000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setFormState('error')

            // Reset error state after 3 seconds
            setTimeout(() => {
                setFormState('idle')
            }, 3000)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

            <div className="space-y-4">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
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
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500`}
                        placeholder="Your Name"
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
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
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500`}
                        placeholder="your.email@example.com"
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                </div>

                {/* Subject Field */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
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
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500`}
                        placeholder="What's this about?"
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.subject && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
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
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-emerald-500`}
                        placeholder="Your message here..."
                        disabled={formState === 'submitting'}
                    />
                    {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={formState === 'submitting' || formState === 'success'}
                className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-colors ${
                    formState === 'error'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : formState === 'success'
                            ? 'bg-green-500 text-white'
                            : 'bg-indigo-500 hover:bg-indigo-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white'
                }`}
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
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                    <p>There was an error sending your message. Please try again later.</p>
                </div>
            )}
        </form>
    )
}