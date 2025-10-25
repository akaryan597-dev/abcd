

import React from 'react';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';

const BlogView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">From the Yadukul Dairy Blog</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Insights on dairy, health, and our commitment to quality.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogView;
