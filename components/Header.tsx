import React, { useState } from 'react';
import { View } from '../types';
import CartModal from './CartModal';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
  logo: string;
  cart: CartItem[];
  isCartOpen: boolean;
  onCartToggle: () => void;
  onPlaceOrder: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const NavLink: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button onClick={onClick} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
    {children}
  </button>
);

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ setCurrentView, isAuthenticated, handleLogout, logo, cart, isCartOpen, onCartToggle, onPlaceOrder, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white/80 dark:bg-brand-dark-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-md dark:shadow-lg dark:shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick(View.HOME)} className="flex items-center">
              <img src={logo} alt="Yadukul Dairy Logo" className="h-10 w-auto" />
            </button>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-baseline space-x-4">
              <NavLink onClick={() => handleNavClick(View.HOME)}>Home</NavLink>
              <NavLink onClick={() => handleNavClick(View.PRODUCTS)}>Products</NavLink>
              <NavLink onClick={() => handleNavClick(View.ABOUT)}>About Us</NavLink>
              <NavLink onClick={() => handleNavClick(View.GALLERY)}>Gallery</NavLink>
              <NavLink onClick={() => handleNavClick(View.REVIEWS)}>Reviews</NavLink>
              <NavLink onClick={() => handleNavClick(View.BLOG)}>Blog</NavLink>
              <NavLink onClick={() => handleNavClick(View.CONTACT)}>Contact</NavLink>
            </div>
          </div>

          {/* Right Section: Actions & Mobile Menu */}
          <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-4">
             <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
            </button>
            <button onClick={onCartToggle} className="relative p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.841a1.125 1.125 0 00-.84-1.332H5.168L4.607 3.335A1.125 1.125 0 003.52 2.5H2.25m5.25 9h11.218" />
                </svg>
                {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartItemCount}</span>
                )}
            </button>
            <div className="hidden md:flex items-center space-x-2">
                {isAuthenticated ? (
                <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">Logout</button>
                ) : (
                <>
                    <button onClick={() => handleNavClick(View.STAFF_PANEL)} className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-dark hover:text-gray-900 dark:hover:text-white">Staff Login</button>
                    <button onClick={() => handleNavClick(View.CUSTOMER_PANEL)} className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-dark hover:text-gray-900 dark:hover:text-white">Customer Login</button>
                    <button onClick={() => handleNavClick(View.ADMIN_DASHBOARD)} className="bg-brand-gold text-brand-dark px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-400 transition-colors">Admin</button>
                </>
                )}
            </div>
            <div className="flex md:hidden">
                <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="bg-gray-200 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
                </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleNavClick(View.HOME)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Home</button>
            <button onClick={() => handleNavClick(View.PRODUCTS)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Products</button>
            <button onClick={() => handleNavClick(View.ABOUT)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">About Us</button>
            <button onClick={() => handleNavClick(View.GALLERY)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Gallery</button>
            <button onClick={() => handleNavClick(View.REVIEWS)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Reviews</button>
            <button onClick={() => handleNavClick(View.BLOG)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Blog</button>
            <button onClick={() => handleNavClick(View.CONTACT)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Contact</button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            {isAuthenticated ? (
               <button onClick={handleLogout} className="text-red-500 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Logout</button>
            ) : (
              <>
                <button onClick={() => handleNavClick(View.STAFF_PANEL)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Staff Login</button>
                <button onClick={() => handleNavClick(View.CUSTOMER_PANEL)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Customer Login</button>
                <button onClick={() => handleNavClick(View.ADMIN_DASHBOARD)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Admin Login</button>
              </>
            )}
          </div>
        </div>
      )}
      {isCartOpen && <CartModal cartItems={cart} onClose={onCartToggle} onPlaceOrder={onPlaceOrder} />}
    </header>
  );
};

export default Header;