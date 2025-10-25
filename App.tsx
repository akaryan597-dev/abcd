import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AdminDashboardView from './views/AdminDashboardView';
import StaffPanelView from './views/StaffPanelView';
import CustomerPanelView from './views/CustomerPanelView';
import ProductsView from './views/ProductsView';
import AboutView from './views/AboutView';
import BlogView from './views/BlogView';
import AuthView from './views/AuthView';
import ContactView from './views/ContactView';
import GalleryView from './views/GalleryView';
import ReviewsView from './views/ReviewsView';
import Chatbot from './components/Chatbot';
import Toast from './components/Toast';
import { View, Product, Delivery, User, CartItem, Toast as ToastType, Subscription, DeliveryStatus, InventoryItem, SubscriptionUpdateHandler, MilkIntakeLog, ConversionLog, GalleryImage, Order } from './types';
import { INITIAL_HERO_IMAGE_URL } from './constants';
import ReactDOMServer from 'react-dom/server';

type UserRole = 'admin' | 'staff' | 'customer';
type Theme = 'light' | 'dark';

const API_URL = '/api'; // Using proxy

// Helper for API calls
const apiFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).token : null;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

const YadukulLogoComponent = ({ theme }: { theme: Theme }) => (
    <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="35" fontFamily="Inter, sans-serif" fontSize="30" fontWeight="bold" fill={theme === 'dark' ? 'white' : '#111827'}>
        Yadukul
        <tspan fill="#FBBF24"> Dairy</tspan>
      </text>
    </svg>
);

const svgToDataURI = (svgComponent: React.ReactElement): string => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svgComponent);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [authTargetView, setAuthTargetView] = useState<View | null>(null);

  // Dynamic content state
  const [isDefaultLogo, setIsDefaultLogo] = useState<boolean>(true);
  const [logo, setLogo] = useState<string>('');
  const [heroImageUrl, setHeroImageUrl] = useState<string>(INITIAL_HERO_IMAGE_URL);
  const [products, setProducts] = useState<Product[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [milkIntakeLogs, setMilkIntakeLogs] = useState<MilkIntakeLog[]>([]);
  const [conversionLogs, setConversionLogs] = useState<ConversionLog[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // UI State
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState(true);

  // THEME and AUTHENTICATION Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (isDefaultLogo) {
        setLogo(svgToDataURI(<YadukulLogoComponent theme={theme} />));
    }
    
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [theme, isDefaultLogo]);

  const fetchData = useCallback(async () => {
      try {
          setLoading(true);
          const [productsData, galleryData] = await Promise.all([
              apiFetch('/products'),
              apiFetch('/gallery')
          ]);
          setProducts(productsData);
          setGalleryImages(galleryData);

          if (userInfo?.token) {
              // Fetch protected data if user is logged in
              if (userInfo.role === 'admin') {
                  const [staffData, deliveriesData, inventoryData, milkLogsData, conversionLogsData] = await Promise.all([
                      apiFetch('/users/staff'),
                      apiFetch('/deliveries'),
                      apiFetch('/inventory'),
                      apiFetch('/conversion/intake'),
                      apiFetch('/conversion/logs')
                  ]);
                  setStaff(staffData);
                  setDeliveries(deliveriesData);
                  setInventory(inventoryData);
                  setMilkIntakeLogs(milkLogsData);
                  setConversionLogs(conversionLogsData);
              }
          }
      } catch (error: any) {
          addToast(error.message, 'error');
      } finally {
          setLoading(false);
      }
  }, [userInfo?.token, userInfo?.role]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSetCurrentView = (view: View) => {
    const protectedViews = [View.ADMIN_DASHBOARD, View.STAFF_PANEL, View.CUSTOMER_PANEL];
    if (protectedViews.includes(view) && !userInfo) {
      setAuthTargetView(view);
      setCurrentView(View.AUTH);
    } else {
      setCurrentView(view);
    }
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (data: any) => {
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    addToast(`Login successful. Welcome, ${data.name}!`, 'success');
    setCurrentView(authTargetView || (data.role === 'admin' ? View.ADMIN_DASHBOARD : (data.role === 'staff' ? View.STAFF_PANEL : View.CUSTOMER_PANEL)));
    setAuthTargetView(null);
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    setCurrentView(View.HOME);
    addToast('You have been logged out.');
  };

  const handleProductAdd = async (newProductData: Omit<Product, '_id'>) => {
    // In a real app, image would be uploaded first to get a URL
    const newProduct = await apiFetch('/products', {
      method: 'POST',
      body: JSON.stringify(newProductData),
    });
    setProducts(prev => [...prev, newProduct]);
    addToast('Product added successfully!', 'success');
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    const updated = await apiFetch(`/products/${updatedProduct._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
    });
    setProducts(prevProducts => prevProducts.map(p => p._id === updated._id ? updated : p));
    addToast('Product updated successfully!', 'success');
  };

  const handleProductDelete = async (productId: string) => {
    await apiFetch(`/products/${productId}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p._id !== productId));
    addToast('Product deleted.', 'success');
  };
  
  // Placeholder handlers for features not fully implemented in this scope
  const handleLogoChange = (logoUrl: string) => { console.log("Logo change:", logoUrl); setIsDefaultLogo(false); setLogo(logoUrl); addToast('Logo updated successfully!', 'success'); };
  const handleHeroImageChange = (imageUrl: string) => { console.log("Hero change:", imageUrl); setHeroImageUrl(imageUrl); addToast('Background image updated!', 'success'); };
  const handleDeliveryUpdate = (deliveryId: string, updates: Partial<Omit<Delivery, '_id'>>) => { console.log("Delivery update:", deliveryId, updates); };
  const handleStaffAdd = async (newStaffData: Omit<User, '_id'>) => { console.log("Staff add:", newStaffData); addToast('Staff member added!', 'success'); };
  const handleStaffUpdate = async (updatedStaff: User) => { console.log("Staff update:", updatedStaff); addToast('Staff member updated!', 'success'); };
  const handleStaffDelete = async (staffId: string) => { console.log("Staff delete:", staffId); addToast('Staff member deleted.', 'success'); };
  const handleCustomerUpdate = (updatedCustomer: User) => { console.log("Customer update:", updatedCustomer); addToast('Profile updated!', 'success'); };
  const handleSubscriptionUpdate: SubscriptionUpdateHandler = (id, action) => { console.log("Subscription update:", id, action); addToast('Subscription updated!'); };
  const handleInventoryUpdate = (itemId: string, newQuantity: number) => { console.log("Inventory update:", itemId, newQuantity); addToast('Inventory updated!', 'success'); };
  const handleMilkIntakeAdd = (log: Omit<MilkIntakeLog, '_id' | 'date'>) => { console.log("Milk intake add:", log); addToast('Milk intake logged!', 'success'); };
  const handleConversionLogAdd = (log: Omit<ConversionLog, '_id' | 'date'>) => { console.log("Conversion add:", log); addToast('Conversion logged!', 'success'); };
  const handleGalleryImageAdd = async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      try {
          const data = await apiFetch('/upload', { method: 'POST', body: formData, headers: {'Content-Type': undefined as any} });
          const newImage = await apiFetch('/gallery', { method: 'POST', body: JSON.stringify({ src: data.url, alt: file.name, aspect: 'aspect-square' }) });
          setGalleryImages(prev => [newImage, ...prev]);
          addToast('Image added to gallery!', 'success');
      } catch (error: any) {
          addToast(error.message, 'error');
      }
  };
  const handleGalleryImageDelete = async (id: string) => {
      await apiFetch(`/gallery/${id}`, { method: 'DELETE' });
      setGalleryImages(prev => prev.filter(img => img._id !== id));
      addToast('Image removed from gallery.', 'success');
  };
  const handleAddToCart = (productToAdd: Product) => { setCart(prev => [...prev, { product: productToAdd, quantity: 1 }]); addToast(`${productToAdd.name} added to cart!`); };
  const handleStartSubscription = (product: Product) => { addToast(`Subscription for ${product.name} started!`); };
  const handlePlaceOrder = () => { addToast('Order placed successfully!', 'success'); setCart([]); setIsCartOpen(false); };


  const renderView = () => {
    if (currentView === View.AUTH) {
        let targetUserRole: UserRole = 'customer';
        if (authTargetView === View.ADMIN_DASHBOARD) targetUserRole = 'admin';
        if (authTargetView === View.STAFF_PANEL) targetUserRole = 'staff';
        return <AuthView onLoginSuccess={handleLoginSuccess} userType={targetUserRole} addToast={addToast} />;
    }

    const userRole = userInfo?.role;
    const currentUserForPanel = userRole === 'staff' ? staff.find(s => s._id === userInfo._id) : (userRole === 'customer' ? null : null)

    switch (currentView) {
      case View.HOME:
        return <HomeView setCurrentView={handleSetCurrentView} products={products} heroImageUrl={heroImageUrl} onAddToCart={handleAddToCart} onStartSubscription={handleStartSubscription} />;
      case View.ADMIN_DASHBOARD:
        return userInfo && userRole === 'admin' ? 
            <AdminDashboardView 
                products={products} onProductUpdate={handleProductUpdate} onProductAdd={handleProductAdd} onProductDelete={handleProductDelete}
                onLogoChange={handleLogoChange} onHeroImageChange={handleHeroImageChange} deliveries={deliveries} staff={staff}
                onStaffAdd={handleStaffAdd} onStaffUpdate={handleStaffUpdate} onStaffDelete={handleStaffDelete}
                subscriptions={userSubscriptions} inventory={inventory} onInventoryUpdate={handleInventoryUpdate}
                milkIntakeLogs={milkIntakeLogs} conversionLogs={conversionLogs} onMilkIntakeAdd={handleMilkIntakeAdd}
                onConversionLogAdd={handleConversionLogAdd} galleryImages={galleryImages} onGalleryImageAdd={handleGalleryImageAdd}
                onGalleryImageDelete={handleGalleryImageDelete}
            /> : <AuthView onLoginSuccess={handleLoginSuccess} userType="admin" addToast={addToast} />;
      case View.STAFF_PANEL:
        return userInfo && userRole === 'staff' && currentUserForPanel ? <StaffPanelView handleLogout={handleLogout} deliveries={deliveries} onDeliveryUpdate={handleDeliveryUpdate} currentUser={currentUserForPanel} /> : <AuthView onLoginSuccess={handleLoginSuccess} userType="staff" addToast={addToast} />;
      case View.CUSTOMER_PANEL:
        return userInfo && userRole === 'customer' ? <CustomerPanelView handleLogout={handleLogout} setCurrentView={handleSetCurrentView} currentUser={userInfo} onUserUpdate={handleCustomerUpdate} deliveries={deliveries} userSubscriptions={userSubscriptions} onSubscriptionUpdate={handleSubscriptionUpdate}/> : <AuthView onLoginSuccess={handleLoginSuccess} userType="customer" addToast={addToast} />;
      case View.PRODUCTS:
        return <ProductsView products={products} onAddToCart={handleAddToCart} onStartSubscription={handleStartSubscription} />;
      case View.ABOUT:
        return <AboutView />;
      case View.GALLERY:
        return <GalleryView galleryImages={galleryImages} />;
      case View.REVIEWS:
        return <ReviewsView />;
      case View.BLOG:
        return <BlogView />;
      case View.CONTACT:
        return <ContactView />;
      default:
        return <HomeView setCurrentView={handleSetCurrentView} products={products} heroImageUrl={heroImageUrl} onAddToCart={handleAddToCart} onStartSubscription={handleStartSubscription}/>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        currentView={currentView}
        setCurrentView={handleSetCurrentView} 
        isAuthenticated={!!userInfo}
        handleLogout={handleLogout}
        logo={logo}
        cart={cart}
        isCartOpen={isCartOpen}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onPlaceOrder={handlePlaceOrder}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="flex-grow">
        {loading ? <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-gold"></div></div> : renderView()}
      </main>
      <Footer setCurrentView={handleSetCurrentView}/>
      <div className="fixed top-20 right-4 z-[100] space-y-2">
        {toasts.map(toast => <Toast key={toast.id} message={toast.message} type={toast.type} />)}
      </div>
      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default App;
