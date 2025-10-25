import React from 'react';
import { View } from '../types';

interface FooterProps {
  setCurrentView: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-gray-200 dark:bg-brand-dark-secondary border-t border-gray-300 dark:border-gray-700 mt-16">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-gray-900 dark:text-white font-bold text-2xl tracking-wider">
              Yadukul <span className="text-brand-gold">Dairy</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">Purity is not a choice; it’s a promise.</p>
          </div>
          <div className="grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li><button onClick={() => setCurrentView(View.HOME)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</button></li>
                <li><button onClick={() => setCurrentView(View.PRODUCTS)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Products</button></li>
                <li><button onClick={() => setCurrentView(View.ABOUT)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About Us</button></li>
                 <li><button onClick={() => setCurrentView(View.GALLERY)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Gallery</button></li>
                <li><button onClick={() => setCurrentView(View.CONTACT)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><button onClick={() => setCurrentView(View.BLOG)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</button></li>
                <li><button onClick={() => setCurrentView(View.REVIEWS)} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Reviews</button></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-base text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Yadukul Dairy Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;