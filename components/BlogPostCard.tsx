
import React from 'react';
import type { BlogPost } from '../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    return (
        <div className="bg-white dark:bg-brand-dark-secondary rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-brand-gold/20 hover:-translate-y-2 shadow-lg">
            <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
            <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-brand-gold transition-colors">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{post.excerpt}</p>
                <a href="#" className="text-brand-gold font-semibold hover:text-amber-300">Read More &rarr;</a>
            </div>
        </div>
    );
};

export default BlogPostCard;