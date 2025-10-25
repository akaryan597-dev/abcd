
import React, { useState, useEffect } from 'react';
import { BLOG_POSTS, TESTIMONIALS } from '../constants';
import ProductCard from '../components/ProductCard';
import BlogPostCard from '../components/BlogPostCard';
import { View, Product } from '../types';

interface HomeViewProps {
  setCurrentView: (view: View) => void;
  products: Product[];
  heroImageUrl: string;
  onAddToCart: (product: Product) => void;
  onStartSubscription: (product: Product) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setCurrentView, products, heroImageUrl, onAddToCart, onStartSubscription }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white" style={{ backgroundImage: `url('${heroImageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Purity is Not a Choice; <br />
            <span className="text-brand-gold">It’s a Promise.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Experience the freshest, purest, and most nutritious dairy products, delivered from our farm to your family with cutting-edge technology and unwavering trust.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => setCurrentView(View.CUSTOMER_PANEL)} className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-amber-400 transition-transform hover:scale-105">Start Subscription</button>
            <button onClick={() => setCurrentView(View.PRODUCTS)} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-brand-dark transition-colors">Our Products</button>
          </div>
        </div>
      </section>

      {/* Owner's Vision Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Website That Runs My Dairy — <span className="text-brand-gold">Not Just Shows It.</span></h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">"Bahut badhiya sawaal 🔥 — ye actually professional mindset ka sawaal hai."</p>
        <p className="mt-6 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          At Yadukul Dairy, we've moved beyond a simple online presence. This platform is our central nervous system, automating everything from sales and delivery to inventory and customer relations. It’s a testament to our commitment to efficiency, transparency, and innovation in the dairy industry.
        </p>
      </section>

      {/* Product Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Premium Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <ProductCard 
                key={product._id} 
                product={product}
                onAddToCart={onAddToCart}
                onStartSubscription={onStartSubscription}
            />
          ))}
        </div>
        <div className="text-center mt-12">
            <button onClick={() => setCurrentView(View.PRODUCTS)} className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-amber-400 transition-transform hover:scale-105">View All Products</button>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-gray-200 dark:bg-brand-dark-secondary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Families Like Yours</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">#YadukulDairyFamily</p>
          <div className="relative max-w-3xl mx-auto h-48">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={testimonial._id} className={`transition-opacity duration-700 ease-in-out absolute top-0 left-0 w-full ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}>
                <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-brand-gold" />
                <p className="text-xl italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
                <p className="mt-4 font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-brand-gold">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">From Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map(post => (
                <BlogPostCard key={post._id} post={post} />
            ))}
        </div>
      </section>

    </div>
  );
};

export default HomeView;
