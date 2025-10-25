
import React from 'react';
import type { CartItem } from '../types';
import Modal from './Modal';

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onPlaceOrder: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cartItems, onClose, onPlaceOrder }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Modal title="Your Shopping Cart" onClose={onClose}>
      {cartItems.length > 0 ? (
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
            {cartItems.map(({ product, quantity }) => (
              <li key={product._id} className="py-4 flex items-center space-x-4">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {quantity}</p>
                </div>
                <p className="font-semibold text-brand-gold">₹{(product.price * quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-brand-gold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={onPlaceOrder}
              className="mt-6 w-full bg-brand-gold text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">Your cart is empty.</p>
      )}
    </Modal>
  );
};

export default CartModal;
