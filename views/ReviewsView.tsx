
import React from 'react';
import { TESTIMONIALS } from '../constants';

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ReviewsView: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">What Our Customers Say</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">#YadukulDairyFamily</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map(testimonial => (
                    <div key={testimonial._id} className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg flex flex-col items-start shadow-lg">
                        <div className="flex text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" />)}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center mt-auto">
                            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-brand-gold mr-4" />
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                                <p className="text-sm text-brand-gold">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsView;
