import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onStartSubscription: (product: Product) => void;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onStartSubscription }) => {
  return (
    <div className="bg-white dark:bg-brand-dark-secondary rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-brand-gold/20 hover:-translate-y-2 flex flex-col">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark font-bold px-3 py-1 m-2 rounded-full text-sm">{product.category}</div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{product.name}</h3>
            <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-600 dark:text-gray-300 ml-1">{product.rating.toFixed(1)}</span>
            </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-base mb-4 flex-grow">{product.nutrition}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-brand-gold">₹{product.price}</span>
          <div className="flex space-x-2">
            <button onClick={() => onAddToCart(product)} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Add to Cart</button>
            <button onClick={() => onStartSubscription(product)} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;