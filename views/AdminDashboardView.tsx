
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SALES_DATA, ORDER_HISTORY } from '../constants';
import { ChartBarIcon, TruckIcon, UsersIcon, PackageIcon } from '../constants';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import { exportToCsv } from '../utils';
import type { Delivery, User, Product, Subscription, InventoryItem, MilkIntakeLog, ConversionLog, GalleryImage } from '../types';
import { DeliveryStatus, AdminTab, ProductCategory } from '../types';

interface AdminDashboardViewProps {
  products: Product[];
  onProductUpdate: (product: Product) => void;
  onProductAdd: (product: Omit<Product, '_id'>) => void;
  onProductDelete: (productId: string) => void;
  onLogoChange: (logo: string) => void;
  onHeroImageChange: (imageUrl: string) => void;
  deliveries: Delivery[];
  staff: User[];
  onStaffAdd: (staff: Omit<User, '_id'>) => void;
  onStaffUpdate: (staff: User) => void;
  onStaffDelete: (staffId: string) => void;
  subscriptions: Subscription[];
  inventory: InventoryItem[];
  onInventoryUpdate: (itemId: string, newQuantity: number) => void;
  milkIntakeLogs: MilkIntakeLog[];
  conversionLogs: ConversionLog[];
  onMilkIntakeAdd: (log: Omit<MilkIntakeLog, '_id' | 'date'>) => void;
  onConversionLogAdd: (log: Omit<ConversionLog, '_id' | 'date'>) => void;
  galleryImages: GalleryImage[];
  onGalleryImageAdd: (file: File) => void;
  onGalleryImageDelete: (id: string) => void;
}

const getStatusColor = (status: DeliveryStatus) => {
  switch (status) {
    case DeliveryStatus.DELIVERED: return 'bg-green-500/20 text-green-500 dark:text-green-400';
    case DeliveryStatus.PENDING: return 'bg-yellow-500/20 text-yellow-500 dark:text-yellow-400';
    case DeliveryStatus.RETURNED: return 'bg-red-500/20 text-red-500 dark:text-red-400';
    case DeliveryStatus.OUT_FOR_DELIVERY: return 'bg-blue-500/20 text-blue-500 dark:text-blue-400';
    default: return 'bg-gray-500/20 text-gray-500 dark:text-gray-400';
  }
};

const AdminDashboardView: React.FC<AdminDashboardViewProps> = (props) => {
  const { 
    products, onProductUpdate, onProductAdd, onProductDelete,
    onLogoChange, onHeroImageChange, deliveries, staff,
    onStaffAdd, onStaffUpdate, onStaffDelete, subscriptions,
    inventory, onInventoryUpdate, milkIntakeLogs, conversionLogs,
    onMilkIntakeAdd, onConversionLogAdd, galleryImages,
    onGalleryImageAdd, onGalleryImageDelete
  } = props;
  
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.OVERVIEW);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modals State
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | Omit<Product, '_id'> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<false | { type: 'product' | 'staff' | 'gallery', id: string }> (false);
  
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [editingStaff, setEditingStaff] = useState<User | null>(null);
  
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState<boolean>(false);
  const [editingInventory, setEditingInventory] = useState<InventoryItem | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  
  const [isMilkIntakeModalOpen, setIsMilkIntakeModalOpen] = useState<boolean>(false);
  const [newIntake, setNewIntake] = useState<{ type: 'Cow' | 'Buffalo', quantityLiters: number }>({ type: 'Cow', quantityLiters: 0 });
  
  const [isConversionModalOpen, setIsConversionModalOpen] = useState<boolean>(false);
  const [newConversion, setNewConversion] = useState<{productName: string, quantityProduced: number, unit: 'kg' | 'Units', milkUsed: { cowLiters?: number, buffaloLiters?: number }}>({ productName: '', quantityProduced: 0, unit: 'Units', milkUsed: {} });

  // Dashboard Metrics
  const totalRevenue = ORDER_HISTORY.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === 'Active').length;
  const deliveriesToday = deliveries.length;
  const completedDeliveries = deliveries.filter(d => d.status === 'Delivered').length;

  // Handlers
  const handleAction = async (action: () => void, closeModal?: () => void) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    action();
    setIsLoading(false);
    if (closeModal) closeModal();
  };

  const handleProductModalSave = () => handleAction(() => {
    if (editingProduct) {
      if ('_id' in editingProduct) onProductUpdate(editingProduct as Product);
      else onProductAdd(editingProduct as Omit<Product, '_id'>);
    }
  }, () => setIsProductModalOpen(false));

  const confirmDelete = () => handleAction(() => {
    if (!isDeleteModalOpen) return;
    switch(isDeleteModalOpen.type) {
        case 'product': onProductDelete(isDeleteModalOpen.id); break;
        case 'staff': onStaffDelete(isDeleteModalOpen.id); break;
        case 'gallery': onGalleryImageDelete(isDeleteModalOpen.id); break;
    }
  }, () => setIsDeleteModalOpen(false));

  const handleStaffModalSave = () => handleAction(() => {
    if (editingStaff) {
      if (editingStaff._id) onStaffUpdate(editingStaff as User);
      else onStaffAdd(editingStaff as Omit<User, '_id'>);
    }
  }, () => setIsStaffModalOpen(false));
  
  const handleInventoryModalSave = () => handleAction(() => {
      if (editingInventory && editingInventory._id) onInventoryUpdate(editingInventory._id, newQuantity);
  }, () => setIsInventoryModalOpen(false));
  
  const handleMilkIntakeSave = () => handleAction(() => {
      onMilkIntakeAdd(newIntake);
  }, () => setIsMilkIntakeModalOpen(false));

  const handleConversionSave = () => handleAction(() => {
      onConversionLogAdd(newConversion);
  }, () => setIsConversionModalOpen(false));

  // Component specific handlers
  const handleEditInventoryClick = (item: InventoryItem) => {
      setEditingInventory(item);
      setNewQuantity(item.quantity);
      setIsInventoryModalOpen(true);
  };
  
  const handleAddProductClick = () => {
    setEditingProduct({ name: '', category: ProductCategory.MILK, price: 0, imageUrl: 'https://picsum.photos/seed/new/400/300', origin: '', nutrition: '', rating: 0 });
    setIsProductModalOpen(true);
  };
  
  const handleAddStaffClick = () => {
    setEditingStaff({ name: '', phone: '', role: 'staff', assignedArea: '', performance: 100 });
    setIsStaffModalOpen(true);
  };

  const handleProductImageChange = (file: File) => {
    if (editingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => setEditingProduct(p => p ? { ...p, imageUrl: reader.result as string } : null);
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case AdminTab.OVERVIEW:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard icon={<ChartBarIcon className="w-6 h-6 text-brand-gold"/>} title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} />
              <DashboardCard icon={<PackageIcon className="w-6 h-6 text-brand-gold"/>} title="Total Products" value={String(products.length)} />
              <DashboardCard icon={<UsersIcon className="w-6 h-6 text-brand-gold"/>} title="Active Subscriptions" value={String(activeSubscriptions)} />
              <DashboardCard icon={<TruckIcon className="w-6 h-6 text-brand-gold"/>} title="Deliveries Today" value={`${completedDeliveries} / ${deliveriesToday}`} />
            </div>
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Revenue Analytics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                  <XAxis dataKey="name" stroke="#6b7280" className="dark:stroke-gray-400" />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} wrapperClassName="dark:!bg-brand-dark-secondary dark:!border-gray-700" />
                  <Legend />
                  <Bar dataKey="homeDelivery" fill="#FBBF24" name="Home Delivery" />
                  <Bar dataKey="counterSales" fill="#60A5FA" name="Counter Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case AdminTab.PRODUCTS:
        return (
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Products</h2>
                  <div className="space-x-2">
                    <button onClick={() => exportToCsv('products.csv', products)} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Export CSV</button>
                    <button onClick={handleAddProductClick} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors">Add New</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700">
                        <tr>
                        <th scope="col" className="p-4">Product</th>
                        <th scope="col" className="p-4">Category</th>
                        <th scope="col" className="p-4">Price</th>
                        <th scope="col" className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-4 flex items-center space-x-3"><img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-md object-cover" /><span>{p.name}</span></td>
                                <td className="p-4">{p.category}</td>
                                <td className="p-4">₹{p.price}</td>
                                <td className="p-4 space-x-3">
                                    <button onClick={() => {setEditingProduct({...p}); setIsProductModalOpen(true);}} className="font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">Edit</button>
                                    <button onClick={() => setIsDeleteModalOpen({ type: 'product', id: p._id! })} className="font-medium text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        );
      case AdminTab.STAFF:
        return (
           <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Staff Performance</h2>
                  <div className="space-x-2">
                    <button onClick={() => exportToCsv('staff.csv', staff)} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Export CSV</button>
                    <button onClick={handleAddStaffClick} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors">Add New</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700"><tr><th className="p-4">Name</th><th className="p-4">Assigned Area</th><th className="p-4">Performance</th><th className="p-4">Actions</th></tr></thead>
                    <tbody>
                        {staff.map(m => (<tr key={m._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"><td className="p-4">{m.name}</td><td className="p-4">{m.assignedArea}</td><td className="p-4">{m.performance}%</td><td className="p-4 space-x-3"><button onClick={() => {setEditingStaff({...m}); setIsStaffModalOpen(true);}} className="font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">Edit</button><button onClick={() => setIsDeleteModalOpen({ type: 'staff', id: m._id! })} className="font-medium text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400">Delete</button></td></tr>))}
                    </tbody>
                    </table>
                </div>
            </div>
        );
      case AdminTab.DELIVERIES:
        return (
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Delivery Tracking</h2>
                  <button onClick={() => exportToCsv('deliveries.csv', deliveries)} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700"><tr><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Status</th><th className="p-4">Proof</th></tr></thead>
                        <tbody>
                            {deliveries.map(d => (<tr key={d._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"><td className="p-4">{d._id}</td><td className="p-4">{d.customerName}</td><td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(d.status)}`}>{d.status}</span></td><td className="p-4">{d.proofImageUrl ? <img src={d.proofImageUrl} alt="Proof" className="w-16 h-10 rounded-md object-cover" /> : <span className="text-xs text-gray-500 dark:text-gray-500">N/A</span>}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
      case AdminTab.INVENTORY:
        return (
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Inventory Management</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-700"><tr><th className="p-4">Item</th><th className="p-4">Type</th><th className="p-4">Quantity</th><th className="p-4">Last Updated</th><th className="p-4">Actions</th></tr></thead>
                        <tbody>
                            {inventory.map(i => (<tr key={i._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"><td className="p-4">{i.name}</td><td className="p-4">{i.type}</td><td className="p-4">{i.quantity} {i.unit}</td><td className="p-4">{i.lastUpdated}</td><td className="p-4"><button onClick={() => handleEditInventoryClick(i)} className="font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">Update Stock</button></td></tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
      case AdminTab.CONVERSION:
        const totalCowIntake = milkIntakeLogs.filter(l => l.type === 'Cow').reduce((sum, l) => sum + l.quantityLiters, 0);
        const totalCowUsed = conversionLogs.reduce((sum, l) => sum + (l.milkUsed.cowLiters || 0), 0);
        const availableCowMilk = totalCowIntake - totalCowUsed;

        const totalBuffaloIntake = milkIntakeLogs.filter(l => l.type === 'Buffalo').reduce((sum, l) => sum + l.quantityLiters, 0);
        const totalBuffaloUsed = conversionLogs.reduce((sum, l) => sum + (l.milkUsed.buffaloLiters || 0), 0);
        const availableBuffaloMilk = totalBuffaloIntake - totalBuffaloUsed;
        
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-brand-dark-secondary p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Cow Milk</h3>
                    <p className="text-3xl font-bold text-brand-gold mt-2">{availableCowMilk} L</p>
                </div>
                <div className="bg-white dark:bg-brand-dark-secondary p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Buffalo Milk</h3>
                    <p className="text-3xl font-bold text-brand-gold mt-2">{availableBuffaloMilk} L</p>
                </div>
            </div>
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Milk Intake Log</h2><button onClick={() => { setNewIntake({ type: 'Cow', quantityLiters: 0 }); setIsMilkIntakeModalOpen(true); }} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg">Add Intake</button></div>
                <div className="overflow-x-auto max-h-60">
                    <table className="w-full text-sm">
                        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700"><tr><th className="p-2">Date</th><th className="p-2">Type</th><th className="p-2">Quantity</th></tr></thead>
                        <tbody>{milkIntakeLogs.map(l => <tr key={l._id} className="border-b dark:border-gray-700">
                            <td className="p-2">{l.date}</td><td className="p-2">{l.type}</td><td className="p-2">{l.quantityLiters}L</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Production Conversion Log</h2><button onClick={() => { setNewConversion({ productName: '', quantityProduced: 0, unit: 'Units', milkUsed: {} }); setIsConversionModalOpen(true); }} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg">Add Conversion</button></div>
                 <div className="overflow-x-auto max-h-60">
                    <table className="w-full text-sm">
                        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700"><tr><th className="p-2">Date</th><th className="p-2">Product</th><th className="p-2">Quantity</th><th className="p-2">Milk Used</th></tr></thead>
                        <tbody>{conversionLogs.map(l => <tr key={l._id} className="border-b dark:border-gray-700">
                            <td className="p-2">{l.date}</td><td className="p-2">{l.productName}</td><td className="p-2">{l.quantityProduced} {l.unit}</td><td className="p-2">{l.milkUsed.cowLiters && `${l.milkUsed.cowLiters}L Cow`} {l.milkUsed.buffaloLiters && `${l.milkUsed.buffaloLiters}L Buffalo`}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        );
      case AdminTab.GALLERY:
        return (
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Gallery</h2>
                  <FileUpload onFileSelect={onGalleryImageAdd} label="Add Image" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {galleryImages.map(image => (
                        <div key={image._id} className="relative group">
                            <img src={image.src} alt={image.alt} className="w-full h-32 object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => setIsDeleteModalOpen({ type: 'gallery', id: image._id! })} className="text-white bg-red-600/80 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      case AdminTab.SITE_SETTINGS:
        return (
            <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md dark:shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Site Settings</h2>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"><label className="font-medium">Site Logo</label><div className="md:col-span-2"><FileUpload onFileSelect={file => handleAction(() => onLogoChange(URL.createObjectURL(file)))} /><p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Recommended: SVG or PNG.</p></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"><label className="font-medium">Home Page Background</label><div className="md:col-span-2"><FileUpload onFileSelect={file => handleAction(() => onHeroImageChange(URL.createObjectURL(file)))} /><p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Recommended: 1920x1080px JPG.</p></div></div>
                </div>
            </div>
        );
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome, Admin. Here's your business at a glance.</p>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6"><nav className="-mb-px flex space-x-8 overflow-x-auto">{Object.values(AdminTab).map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-brand-gold text-brand-gold' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>{tab}</button>))}</nav></div>
      {renderContent()}

      {isProductModalOpen && editingProduct && (
        <Modal title={'_id' in editingProduct ? "Edit Product" : "Add New Product"} onClose={() => setIsProductModalOpen(false)}>
            <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Name</label><input type="text" value={editingProduct.name} onChange={e => setEditingProduct(p => p ? {...p, name: e.target.value} : null)} className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
                <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Price</label><input type="number" value={editingProduct.price} onChange={e => setEditingProduct(p => p ? {...p, price: parseFloat(e.target.value)} : null)} className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
                <div><label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Image</label><div className="flex items-center space-x-4"><img src={editingProduct.imageUrl} alt="Current" className="w-20 h-20 rounded-md object-cover"/><FileUpload onFileSelect={handleProductImageChange} /></div></div>
            </div>
            <div className="mt-6 flex justify-end space-x-3"><button onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button><button onClick={handleProductModalSave} disabled={isLoading} className="px-4 py-2 text-sm text-brand-dark bg-brand-gold rounded-md hover:bg-amber-400 disabled:opacity-50">{isLoading ? 'Saving...' : 'Save'}</button></div>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal title="Confirm Deletion" onClose={() => setIsDeleteModalOpen(false)}>
            <p>Are you sure you want to delete this {isDeleteModalOpen.type}?</p>
            <div className="mt-6 flex justify-end space-x-3"><button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button><button onClick={confirmDelete} disabled={isLoading} className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50">{isLoading ? 'Deleting...' : 'Delete'}</button></div>
        </Modal>
      )}
      {isStaffModalOpen && editingStaff && (
        <Modal title={editingStaff._id ? 'Edit Staff' : 'Add Staff'} onClose={() => setIsStaffModalOpen(false)}>
            <div className="space-y-4">
                <div><label className="block text-sm mb-1">Name</label><input type="text" value={editingStaff.name} onChange={e => setEditingStaff(s => s ? {...s, name: e.target.value} : null)} className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
                <div><label className="block text-sm mb-1">Assigned Area</label><input type="text" value={editingStaff.assignedArea} onChange={e => setEditingStaff(s => s ? {...s, assignedArea: e.target.value} : null)} className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
            </div>
            <div className="mt-6 flex justify-end space-x-3"><button onClick={() => setIsStaffModalOpen(false)} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button><button onClick={handleStaffModalSave} disabled={isLoading} className="px-4 py-2 text-sm text-brand-dark bg-brand-gold rounded-md disabled:opacity-50">{isLoading ? 'Saving...' : 'Save'}</button></div>
        </Modal>
      )}
      {isInventoryModalOpen && editingInventory && (
        <Modal title={`Update Stock for ${editingInventory.name}`} onClose={() => setIsInventoryModalOpen(false)}>
            <div><label className="block text-sm mb-1">New Quantity ({editingInventory.unit})</label><input type="number" value={newQuantity} onChange={e => setNewQuantity(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
            <div className="mt-6 flex justify-end space-x-3"><button onClick={() => setIsInventoryModalOpen(false)} className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button><button onClick={handleInventoryModalSave} disabled={isLoading} className="px-4 py-2 text-sm text-brand-dark bg-brand-gold rounded-md disabled:opacity-50">{isLoading ? 'Updating...' : 'Update'}</button></div>
        </Modal>
      )}
      {isMilkIntakeModalOpen && (
          <Modal title="Add Milk Intake" onClose={() => setIsMilkIntakeModalOpen(false)}>
            <div className="space-y-4">
                <div><label className="block text-sm mb-1">Milk Type</label><select value={newIntake.type} onChange={e => setNewIntake(p => ({ ...p, type: e.target.value as 'Cow' | 'Buffalo' }))} className="w-full p-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600">
                    <option value="Cow">Cow</option><option value="Buffalo">Buffalo</option></select></div>
                <div><label className="block text-sm mb-1">Quantity (Liters)</label><input type="number" value={newIntake.quantityLiters} onChange={e => setNewIntake(p => ({ ...p, quantityLiters: parseFloat(e.target.value) || 0 }))} className="w-full p-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
            </div>
             <div className="mt-6 flex justify-end"><button onClick={handleMilkIntakeSave} disabled={isLoading} className="px-4 py-2 text-sm text-brand-dark bg-brand-gold rounded-md disabled:opacity-50">{isLoading ? 'Saving...' : 'Add Log'}</button></div>
          </Modal>
      )}
      {isConversionModalOpen && (
          <Modal title="Add Conversion Log" onClose={() => setIsConversionModalOpen(false)}>
            <div className="space-y-4">
                <div><label className="block text-sm mb-1">Product</label><select value={newConversion.productName} onChange={e => setNewConversion(p => ({ ...p, productName: e.target.value }))} className="w-full p-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600"><option value="">Select Product</option>{products.filter(p => p.category !== 'Milk').map(p => <option key={p._id} value={p.name}>{p.name}</option>)}</select></div>
                <div><label className="block text-sm mb-1">Quantity Produced</label><input type="number" value={newConversion.quantityProduced} onChange={e => setNewConversion(p => ({ ...p, quantityProduced: parseFloat(e.target.value) || 0 }))} className="w-full p-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
                <div><label className="block text-sm mb-1">Cow Milk Used (L)</label><input type="number" placeholder="Optional" value={newConversion.milkUsed.cowLiters || ''} onChange={e => setNewConversion(p => ({ ...p, milkUsed: { ...p.milkUsed, cowLiters: parseFloat(e.target.value) || undefined } }))} className="w-full p-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
                <div><label className="block text-sm mb-1">Buffalo Milk Used (L)</label><input type="number" placeholder="Optional" value={newConversion.milkUsed.buffaloLiters || ''} onChange={e => setNewConversion(p => ({ ...p, milkUsed: { ...p.milkUsed, buffaloLiters: parseFloat(e.target.value) || undefined } }))} className="w-full p-2 rounded-md bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-gray-600" /></div>
            </div>
             <div className="mt-6 flex justify-end"><button onClick={handleConversionSave} disabled={isLoading} className="px-4 py-2 text-sm text-brand-dark bg-brand-gold rounded-md disabled:opacity-50">{isLoading ? 'Saving...' : 'Add Log'}</button></div>
          </Modal>
      )}
    </div>
  );
};

export default AdminDashboardView;
