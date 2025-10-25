
import React, { useState } from 'react';
import { PAYMENT_DETAILS, UpiIcon, WalletIcon, BankIcon, ORDER_HISTORY } from '../constants';
import type { Order, Subscription, User, Delivery, SubscriptionUpdateHandler } from '../types';
import { CustomerPanelTab, View, DeliveryStatus } from '../types';


interface CustomerPanelViewProps {
  handleLogout: () => void;
  setCurrentView: (view: View) => void;
  currentUser: User;
  onUserUpdate: (user: User) => void;
  deliveries: Delivery[];
  userSubscriptions: Subscription[];
  onSubscriptionUpdate: SubscriptionUpdateHandler;
}

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const CustomerPanelView: React.FC<CustomerPanelViewProps> = ({ handleLogout, setCurrentView, currentUser, onUserUpdate, deliveries, userSubscriptions, onSubscriptionUpdate }) => {
  const [activeTab, setActiveTab] = useState<CustomerPanelTab>(CustomerPanelTab.SUBSCRIPTIONS);
  const [outstandingBalance, setOutstandingBalance] = useState<number>(1250.75);
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const [copiedValue, setCopiedValue] = useState<string>('');
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [profile, setProfile] = useState(currentUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const myCurrentDelivery = deliveries.find(d => d.customerId === currentUser._id && d.status !== DeliveryStatus.DELIVERED && d.status !== DeliveryStatus.RETURNED);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
        setCopiedValue(field);
        setTimeout(() => setCopiedValue(''), 2000); // Reset after 2 seconds
    });
  };

  const handleConfirmPayment = () => {
      setOutstandingBalance(0);
      setShowPaymentOptions(false);
      setPaymentConfirmed(true);
      setTimeout(() => setPaymentConfirmed(false), 3000);
  };

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(p => ({ ...p, [e.target.name]: e.target.value }));
  };
  
  const handleProfileSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onUserUpdate(profile);
    setIsLoading(false);
    setIsEditingProfile(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case CustomerPanelTab.SUBSCRIPTIONS:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Your Subscriptions</h3>
            <div className="space-y-4">
              {userSubscriptions.map(sub => (
                <div key={sub._id} className="bg-gray-100 dark:bg-brand-dark-secondary p-4 rounded-lg">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{sub.productName} ({sub.quantity}) - {sub.frequency}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next delivery: {sub.nextDelivery}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${sub.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>{sub.status}</span>
                        <button onClick={() => sub._id && onSubscriptionUpdate(sub._id, 'toggle')} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">
                          {sub.status === 'Active' ? 'Pause' : 'Resume'}
                        </button>
                        <button onClick={() => sub._id && onSubscriptionUpdate(sub._id, 'cancel')} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Cancel</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
             <button onClick={() => setCurrentView(View.PRODUCTS)} className="mt-6 w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors">Add New Subscription</button>
          </div>
        );
      case CustomerPanelTab.ORDER_TRACKING:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Live Order Tracking</h3>
            {myCurrentDelivery ? (
                 <div className="bg-gray-100 dark:bg-brand-dark-secondary p-4 rounded-lg">
                    <p className="font-bold text-gray-900 dark:text-white">Your order ({myCurrentDelivery._id}) is on its way!</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Status: <span className="text-brand-gold">{myCurrentDelivery.status}</span></p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div className="bg-brand-gold h-2.5 rounded-full" style={{ width: `${myCurrentDelivery.status === DeliveryStatus.OUT_FOR_DELIVERY ? '75%' : '25%'}` }}></div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center py-8">You have no active orders being delivered.</p>
            )}
          </div>
        );
      case CustomerPanelTab.PAYMENT_HISTORY:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order History</h3>
            <div className="space-y-4">
              {ORDER_HISTORY.map((order: Order) => (
                <div key={order._id} className="bg-gray-100 dark:bg-brand-dark-secondary rounded-lg overflow-hidden">
                  <button onClick={() => order._id && toggleOrder(order._id)} className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-800">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{order._id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-900 dark:text-white">₹{order.totalAmount.toFixed(2)}</span>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {expandedOrder === order._id && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Order Details:</h4>
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {order.orderItems.map(item => (
                          <li key={item._id} className="py-2 flex justify-between text-sm">
                            <span className="text-gray-700 dark:text-gray-300">{item.name} x {item.quantity}</span>
                            <span className="text-gray-600 dark:text-gray-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-end font-bold text-gray-900 dark:text-white mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        Total: ₹{order.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case CustomerPanelTab.BILLING:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Billing & Payments</h3>
            <div className="bg-gray-100 dark:bg-brand-dark-secondary p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">Outstanding Balance</p>
                        <p className={`text-3xl font-bold ${outstandingBalance > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                            ₹{outstandingBalance.toFixed(2)}
                        </p>
                    </div>
                    {outstandingBalance > 0 && !showPaymentOptions && (
                         <button onClick={() => setShowPaymentOptions(true)} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors">
                            Pay Now
                        </button>
                    )}
                </div>

                {paymentConfirmed && (
                  <p className="text-center text-green-500 dark:text-green-400 mb-4">Thank you! Your payment has been confirmed.</p>
                )}

                {showPaymentOptions && outstandingBalance > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
                       <h4 className="text-md font-semibold text-gray-900 dark:text-white">Choose a payment method</h4>
                       
                       {/* UPI Payment */}
                       <div className="flex items-start space-x-4">
                           <UpiIcon className="w-8 h-8 text-brand-gold mt-1"/>
                           <div>
                               <h5 className="font-semibold text-gray-900 dark:text-white">UPI</h5>
                               <p className="text-sm text-gray-600 dark:text-gray-400">{PAYMENT_DETAILS.upi.name}</p>
                               <div className="flex items-center space-x-2 mt-1">
                                <p className="font-mono text-brand-gold">{PAYMENT_DETAILS.upi.id}</p>
                                <button onClick={() => handleCopy(PAYMENT_DETAILS.upi.id, 'upi')} className="text-xs bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500">
                                    {copiedValue === 'upi' ? 'Copied!' : 'Copy'}
                                </button>
                               </div>
                           </div>
                       </div>

                       {/* Wallets */}
                       <div className="flex items-start space-x-4">
                           <WalletIcon className="w-8 h-8 text-brand-gold mt-1"/>
                           <div>
                               <h5 className="font-semibold text-gray-900 dark:text-white">PhonePe / Paytm</h5>
                               {PAYMENT_DETAILS.wallets.map(wallet => (
                                    <div key={wallet.name} className="flex items-center space-x-2 mt-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{wallet.name}: <span className="font-mono text-brand-gold">{wallet.number}</span></p>
                                        <button onClick={() => handleCopy(wallet.number, wallet.name)} className="text-xs bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500">
                                            {copiedValue === wallet.name ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                               ))}
                           </div>
                       </div>
                       
                       {/* Bank Transfer */}
                       <div className="flex items-start space-x-4">
                           <BankIcon className="w-8 h-8 text-brand-gold mt-1"/>
                           <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white">Bank Transfer</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{PAYMENT_DETAILS.bank.accountHolder}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">A/C: <span className="font-mono text-brand-gold">{PAYMENT_DETAILS.bank.accountNumber}</span></p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">IFSC: <span className="font-mono text-brand-gold">{PAYMENT_DETAILS.bank.ifsc}</span> ({PAYMENT_DETAILS.bank.bankName})</p>
                           </div>
                       </div>
                       
                       <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
                           <p className="text-xs text-gray-500 mb-4">After payment, please confirm below.</p>
                           <button onClick={handleConfirmPayment} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                            I Have Paid
                           </button>
                       </div>
                    </div>
                )}
                
                {outstandingBalance <= 0 && !paymentConfirmed && (
                     <p className="text-green-500 dark:text-green-400">Your account is settled. No outstanding payments.</p>
                )}
            </div>
          </div>
        );
      case CustomerPanelTab.PROFILE:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Your Profile</h3>
            <div className="bg-gray-100 dark:bg-brand-dark-secondary p-6 rounded-lg space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                <input type="text" name="name" value={profile.name} onChange={handleProfileChange} readOnly={!isEditingProfile} className={`w-full p-2 mt-1 rounded-md bg-white dark:bg-brand-dark border ${isEditingProfile ? 'border-brand-gold' : 'border-transparent'}`} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} readOnly={!isEditingProfile} className={`w-full p-2 mt-1 rounded-md bg-white dark:bg-brand-dark border ${isEditingProfile ? 'border-brand-gold' : 'border-transparent'}`} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Address</label>
                <input type="text" name="address" value={profile.address} onChange={handleProfileChange} readOnly={!isEditingProfile} className={`w-full p-2 mt-1 rounded-md bg-white dark:bg-brand-dark border ${isEditingProfile ? 'border-brand-gold' : 'border-transparent'}`} />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                {isEditingProfile ? (
                   <button onClick={handleProfileSave} disabled={isLoading} className="bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-amber-400 disabled:opacity-50">
                    {isLoading ? 'Saving...' : 'Save Changes'}
                   </button>
                ) : (
                   <button onClick={() => setIsEditingProfile(true)} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500">Edit Profile</button>
                )}
              </div>
            </div>
          </div>
        );
      case CustomerPanelTab.REFER_EARN:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Refer & Earn</h3>
            <div className="bg-gray-100 dark:bg-brand-dark-secondary p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold text-brand-gold">Refer a Friend, Get ₹100 Off!</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">Share your unique referral code. When your friend signs up and places their first order, you both get ₹100 off your next bill.</p>
                <p className="text-gray-700 dark:text-gray-300">Your Referral Code:</p>
                <div className="my-2 p-3 bg-white dark:bg-brand-dark border-2 border-dashed border-brand-gold rounded-lg inline-flex items-center space-x-4">
                    <span className="text-xl font-bold tracking-widest text-gray-900 dark:text-white">YADUKUL-ANJALI123</span>
                    <button onClick={() => handleCopy('YADUKUL-ANJALI123', 'referral')} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
                        {copiedValue === 'referral' ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <p className="text-green-500 dark:text-green-400 mt-6 font-semibold">You've successfully referred 3 friends!</p>
            </div>
          </div>
        );
      case CustomerPanelTab.LOYALTY:
        return (
            <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Loyalty Program</h3>
            <div className="bg-gray-100 dark:bg-brand-dark-secondary p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold text-brand-gold">Your Loyalty Points</h4>
                <p className="text-6xl font-extrabold text-gray-900 dark:text-white my-4">{currentUser.loyaltyPoints}</p>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Earn 1 point for every ₹10 spent. Redeem your points for discounts on future orders! (100 points = ₹10 discount)</p>
                <button className="mt-6 bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-amber-400 transition-colors opacity-50 cursor-not-allowed">
                    Redeem Now (Coming Soon)
                </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8 justify-between">
        <div className="flex items-center">
            <img src={currentUser.avatarUrl} alt="Customer Avatar" className="w-20 h-20 rounded-full border-4 border-brand-gold" />
            <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {currentUser.name}!</p>
            </div>
        </div>
        <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors hidden sm:block">Logout</button>
      </div>
      
      <div className="bg-white dark:bg-brand-dark-secondary rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
            {Object.values(CustomerPanelTab).map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-brand-gold text-brand-gold' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                    {tab}
                </button>
            ))}
          </nav>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerPanelView;
