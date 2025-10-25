
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductCategory, Product } from '../types';

interface ProductsViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onStartSubscription: (product: Product) => void;
}

const allCategories = [ProductCategory.MILK, ProductCategory.GHEE, ProductCategory.PANEER, ProductCategory.BUTTER, ProductCategory.CURD];

const ProductsView: React.FC<ProductsViewProps> = ({ products, onAddToCart, onStartSubscription }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Premium Collection</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Freshness and quality in every pack.</p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedCategory === 'All' ? 'bg-brand-gold text-brand-dark' : 'bg-white dark:bg-brand-dark-secondary text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          All
        </button>
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedCategory === category ? 'bg-brand-gold text-brand-dark' : 'bg-white dark:bg-brand-dark-secondary text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product._id} 
            product={product}
            onAddToCart={onAddToCart}
            onStartSubscription={onStartSubscription}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
