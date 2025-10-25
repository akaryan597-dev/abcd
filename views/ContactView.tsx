import React, { useState, FormEvent, ChangeEvent } from 'react';
import { PhoneIcon, MailIcon, ChatBubbleIcon } from '../constants';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const ContactView: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.message.trim()) newErrors.message = 'Message is required.';
        return newErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({...prev, [name]: undefined}));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            if (success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
            setIsSubmitting(false);
        }, 1500);
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Get In Touch</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">We're here to help. Contact us for any questions, feedback, or support.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Information */}
                <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                    <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                            <PhoneIcon className="w-6 h-6 text-brand-gold flex-shrink-0 mr-4 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                                <p>For general inquiries and orders.</p>
                                <a href="tel:+918439988051" className="text-brand-gold hover:text-amber-400">+91 8439988051</a>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <ChatBubbleIcon className="w-6 h-6 text-brand-gold flex-shrink-0 mr-4 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
                                <p>For complaints and feedback.</p>
                                <a href="https://wa.me/919654314000" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-amber-400">+91 9654314000</a>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <MailIcon className="w-6 h-6 text-brand-gold flex-shrink-0 mr-4 mt-1" />
                             <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                                <p>We'll get back to you promptly.</p>
                                <a href="mailto:yadukuldairyprivatelimited@gmail.com" className="text-brand-gold hover:text-amber-400">yadukuldairyprivatelimited@gmail.com</a>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg shadow-lg">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
                     <form onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">Full Name</label>
                                <input type="text" name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-brand-dark border ${errors.name ? 'border-red-500' : 'border-gray-600'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold`} />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-brand-dark border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold`} />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                             <div>
                                <label htmlFor="subject" className="sr-only">Subject</label>
                                <input type="text" name="subject" id="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className={`w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-brand-dark border ${errors.subject ? 'border-red-500' : 'border-gray-600'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold`} />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>
                             <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea name="message" id="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} className={`w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-brand-dark border ${errors.message ? 'border-red-500' : 'border-gray-600'} text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold`}></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-gold text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                        {submitStatus === 'success' && <p className="text-green-500 dark:text-green-400 mt-4 text-center">Thank you! Your message has been sent successfully.</p>}
                        {submitStatus === 'error' && <p className="text-red-500 mt-4 text-center">Something went wrong. Please try again later.</p>}
                     </form>
                </div>
            </div>
        </div>
    );
};

export default ContactView;