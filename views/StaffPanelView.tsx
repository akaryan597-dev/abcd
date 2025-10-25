
import React from 'react';
import type { Delivery, User } from '../types';
import { DeliveryStatus } from '../types';
import FileUpload from '../components/FileUpload';

interface StaffPanelViewProps {
  handleLogout: () => void;
  deliveries: Delivery[];
  onDeliveryUpdate: (id: string, updates: Partial<Omit<Delivery, '_id'>>) => void;
  currentUser: User;
}

const getStatusClasses = (status: DeliveryStatus) => {
  switch (status) {
    case DeliveryStatus.PENDING:
      return 'border-yellow-500 text-yellow-500 dark:text-yellow-400';
    case DeliveryStatus.DELIVERED:
      return 'border-green-500 text-green-500 dark:text-green-400';
    case DeliveryStatus.RETURNED:
      return 'border-red-500 text-red-500 dark:text-red-400';
    case DeliveryStatus.OUT_FOR_DELIVERY:
      return 'border-blue-500 text-blue-500 dark:text-blue-400';
    default:
      return 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400';
  }
};


const StaffPanelView: React.FC<StaffPanelViewProps> = ({ handleLogout, deliveries, onDeliveryUpdate, currentUser }) => {
    
  const myDeliveries = deliveries.filter(d => d.staffId === currentUser._id);

  const handleStatusUpdate = (id: string, status: DeliveryStatus) => {
    onDeliveryUpdate(id, { status });
  };

  const handleProofUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onDeliveryUpdate(id, { proofImageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };
  
  const handleOpenRoute = (address: string) => {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-100 dark:bg-brand-dark min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome, {currentUser.name}! Here are your tasks for today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <img src={`https://i.pravatar.cc/50?u=${currentUser._id}`} alt="Staff Avatar" className="w-12 h-12 rounded-full border-2 border-brand-gold" />
            <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors hidden sm:block">Logout</button>
          </div>
        </div>

        <div className="bg-white dark:bg-brand-dark-secondary rounded-lg p-4 mb-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Daily Summary</h2>
            <div className="flex justify-around text-center">
                <div>
                    <p className="text-2xl font-bold text-green-500 dark:text-green-400">{myDeliveries.filter(d => d.status === DeliveryStatus.DELIVERED).length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">{myDeliveries.filter(d => d.status === DeliveryStatus.PENDING || d.status === DeliveryStatus.OUT_FOR_DELIVERY).length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold text-red-500 dark:text-red-400">{myDeliveries.filter(d => d.status === DeliveryStatus.RETURNED).length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Returned</p>
                </div>
            </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Updates</h2>
          {myDeliveries.length > 0 ? myDeliveries.map((delivery) => (
            <div key={delivery._id} className={`bg-white dark:bg-brand-dark-secondary rounded-lg p-4 border-l-4 shadow-md ${getStatusClasses(delivery.status)}`}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{delivery.customerName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.address}</p>
                  <p className="text-xs mt-1 font-mono text-gray-500 dark:text-gray-500">{delivery._id}</p>
                </div>
                <div className="flex-shrink-0">
                  {delivery.proofImageUrl ? (
                    <img src={delivery.proofImageUrl} alt="Delivery Proof" className="w-20 h-16 rounded-md object-cover"/>
                  ) : (
                    <div className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(delivery.status).replace('border-', 'bg-').replace('text-','text-').replace('400', '900/50').replace('500', '900/50')}`}>
                      {delivery.status}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {delivery.status === DeliveryStatus.PENDING && delivery._id && (
                    <button onClick={() => handleStatusUpdate(delivery._id!, DeliveryStatus.OUT_FOR_DELIVERY)} className="sm:col-span-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">Start Delivery</button>
                )}
                {delivery.status === DeliveryStatus.OUT_FOR_DELIVERY && delivery._id && (
                    <>
                    <button onClick={() => handleStatusUpdate(delivery._id!, DeliveryStatus.DELIVERED)} className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">Delivered</button>
                    <button onClick={() => handleStatusUpdate(delivery._id!, DeliveryStatus.RETURNED)} className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">Returned</button>
                    <button onClick={() => handleOpenRoute(delivery.address)} className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">Route</button>
                    </>
                )}
                {delivery.status === DeliveryStatus.DELIVERED && !delivery.proofImageUrl && delivery._id && (
                  <div className="col-span-2 sm:col-span-3">
                    <FileUpload 
                      onFileSelect={(file) => handleProofUpload(delivery._id!, file)} 
                      label="Upload Proof"
                      className="w-full text-center justify-center flex"
                    />
                  </div>
                )}
              </div>
            </div>
          )) : <p className="text-center text-gray-500 py-8">No deliveries assigned for today.</p>}
        </div>
      </div>
    </div>
  );
};

export default StaffPanelView;
