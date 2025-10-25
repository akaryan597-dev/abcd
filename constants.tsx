
import React from 'react';
import { Order } from './types';

// NOTE: Most mock data arrays have been removed as data is now fetched from the backend.
// Static data and UI components remain.

export const SALES_DATA = [
  { name: 'Jan', homeDelivery: 4000, counterSales: 2400 },
  { name: 'Feb', homeDelivery: 3000, counterSales: 1398 },
  { name: 'Mar', homeDelivery: 2000, counterSales: 9800 },
  { name: 'Apr', homeDelivery: 2780, counterSales: 3908 },
  { name: 'May', homeDelivery: 1890, counterSales: 4800 },
  { name: 'Jun', homeDelivery: 2390, counterSales: 3800 },
  { name: 'Jul', homeDelivery: 3490, counterSales: 4300 },
];

export const ORDER_HISTORY: Order[] = [
    {
        _id: 'ORD-12345',
        user: 'user1',
        orderItems: [
            { _id: 'item1', name: 'Cow Milk', quantity: 10, price: 58, product: 'prod1' },
            { _id: 'item2', name: 'Malai Paneer', quantity: 1, price: 120, product: 'prod2' },
        ],
        date: '2023-10-26',
        totalAmount: 700.00,
        status: 'Paid',
    },
    {
        _id: 'ORD-12346',
        user: 'user1',
        orderItems: [
            { _id: 'item3', name: 'A2 Ghee', quantity: 2, price: 800, product: 'prod3' },
        ],
        date: '2023-10-20',
        totalAmount: 1600.00,
        status: 'Paid',
    },
];

export const BLOG_POSTS = [
  { _id: '1', title: 'Benefits of Fresh Cow Milk', excerpt: 'Discover why fresh, unprocessed cow milk is a powerhouse of nutrients for all ages...', imageUrl: 'https://picsum.photos/seed/blog1/600/400' },
  { _id: '2', title: 'Cow vs Buffalo Milk: Which is Right for You?', excerpt: 'A detailed comparison of nutritional value, taste, and uses for both types of milk.', imageUrl: 'https://picsum.photos/seed/blog2/600/400' },
  { _id: '3', title: 'Why Pasteurization Matters for Your Family\'s Safety', excerpt: 'Learn about the critical process that makes milk safe to drink without sacrificing its goodness.', imageUrl: 'https://picsum.photos/seed/blog3/600/400' },
  { _id: '4', title: 'The Journey of Our Milk: Farm-to-Table Transparency', excerpt: 'Follow a drop of milk from our happy cows to your cup, and learn about the tech that ensures its purity.', imageUrl: 'https://picsum.photos/seed/blog4/600/400' },
  { _id: '5', title: 'Delicious Recipes You Can Make with Yadukul Paneer', excerpt: 'From classic paneer tikka to innovative desserts, explore the versatility of our fresh Malai Paneer.', imageUrl: 'https://picsum.photos/seed/blog5/600/400' },
  { _id: '6', title: 'The Science of Making Perfect Curd at Home', excerpt: 'Unlock the secrets to creamy, delicious curd every time with these simple tips from our dairy experts.', imageUrl: 'https://picsum.photos/seed/blog6/600/400' },
];

export const TESTIMONIALS = [
  { _id: '1', name: 'Anjali Sharma', role: 'Mother of Two', quote: 'The milk from Yadukul is always fresh. My kids love it, and I trust the quality completely. The subscription management is so easy!', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100' },
  { _id: '2', name: 'Vikram Singh', role: 'Fitness Enthusiast', quote: 'Their paneer is the best I\'ve had. It\'s soft, delicious, and perfect for my high-protein diet. Timely deliveries, every single time.', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100' },
  { _id: '3', name: 'Priya Gupta', role: 'Home Chef', quote: 'The A2 Ghee has an amazing aroma and taste. It has elevated my cooking. I highly recommend Yadukul Dairy to everyone.', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100' },
  { _id: '4', name: 'Rohan Mehra', role: 'Working Professional', quote: 'The customer panel is fantastic. I can pause my subscription when I travel and track my orders live. It\'s so convenient.', avatarUrl: 'https://picsum.photos/seed/avatar4/100/100' },
  { _id: '5', name: 'Sunita Devi', role: 'Grandmother', quote: 'The curd is thick and tasty, just like homemade. It reminds me of my village. Pure and authentic.', avatarUrl: 'https://picsum.photos/seed/avatar5/100/100' },
];


export const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h-2.625a1.125 1.125 0 01-1.125-1.125V6.75c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v1.875m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875" />
    </svg>
);

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 3.375c-3.45 0-6.375 2.825-6.375 6.375s2.825 6.375 6.375 6.375 6.375-2.825 6.375-6.375-2.825-6.375-6.375-6.375zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    </svg>
);

export const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

export const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const ChatBubbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.388A.75.75 0 018.25 19.5a23.31 23.31 0 01-4.28-4.28.75.75 0 01.388-1.009A9.76 9.76 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

export const UpiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8" {...props}>
        <path d="M4 4h3l1.5 4.5L10 4h3l-3 6v4h-2.5v-4L4 4zm12 0h3.5v10H16V4z" />
    </svg>
);

export const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25-2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
    </svg>
);

export const BankIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 21v-2.25a2.25 2.25 0 012.25-2.25h8.5a2.25 2.25 0 012.25 2.25V21" />
  </svg>
);

export const PAYMENT_DETAILS = {
  upi: {
    id: 'yadukuldairy@okhdfcbank',
    name: 'Yadukul Dairy Private Limited',
  },
  wallets: [
    { name: 'PhonePe', number: '+91 8439988051' },
    { name: 'Paytm', number: '+91 9654314000' },
  ],
  bank: {
    accountNumber: '123456789012',
    ifsc: 'HDFC0001234',
    bankName: 'HDFC Bank',
    accountHolder: 'Yadukul Dairy Private Limited',
  },
};

export const INITIAL_HERO_IMAGE_URL = 'https://picsum.photos/seed/dairyfarm/1920/1080';
