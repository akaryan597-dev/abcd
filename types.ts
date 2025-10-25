
export enum View {
  HOME = 'HOME',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  STAFF_PANEL = 'STAFF_PANEL',
  CUSTOMER_PANEL = 'CUSTOMER_PANEL',
  PRODUCTS = 'PRODUCTS',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  CONTACT = 'CONTACT',
  AUTH = 'AUTH',
  GALLERY = 'GALLERY',
  REVIEWS = 'REVIEWS',
}

export enum ProductCategory {
  MILK = 'Milk',
  GHEE = 'Ghee',
  PANEER = 'Paneer',
  BUTTER = 'Butter',
  CURD = 'Curd',
}

export interface Product {
  _id?: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  origin: string;
  nutrition: string;
  rating: number;
}

export interface SalesData {
  name: string;
  homeDelivery: number;
  counterSales: number;
}

export enum DeliveryStatus {
  PENDING = 'Pending',
  DELIVERED = 'Delivered',
  RETURNED = 'Returned',
  OUT_FOR_DELIVERY = 'Out for Delivery',
}

export interface Delivery {
  _id?: string;
  customerName: string;
  address: string;
  status: DeliveryStatus;
  proofImageUrl?: string;
  staffId: string;
  customerId: string;
}

// Unified User interface for Staff and Customers
export interface User {
    _id?: string;
    name: string;
    phone: string;
    role: 'customer' | 'staff' | 'admin';
    // Customer specific
    address?: string;
    avatarUrl?: string;
    loyaltyPoints?: number;
    // Staff specific
    assignedArea?: string;
    performance?: number;
}

export interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export interface OrderItem {
    _id?: string;
    name: string;
    quantity: number;
    price: number;
    product: string; // Reference to Product _id
}

export interface Order {
    _id?: string;
    user: string; // Reference to User _id
    orderItems: OrderItem[];
    date: string;
    totalAmount: number;
    status: 'Paid' | 'Pending';
}

export enum AdminTab {
  OVERVIEW = 'Overview',
  PRODUCTS = 'Products',
  STAFF = 'Staff',
  DELIVERIES = 'Deliveries',
  INVENTORY = 'Inventory',
  CONVERSION = 'Conversion',
  GALLERY = 'Gallery',
  SITE_SETTINGS = 'Site Settings',
}

export interface InventoryItem {
    _id?: string;
    name: string;
    type: 'Raw Material' | 'Finished Product';
    quantity: number;
    unit: 'Liters' | 'kg' | 'Units';
    lastUpdated: string;
}

export interface Subscription {
  _id?: string;
  productName: string;
  quantity: string;
  frequency: string;
  nextDelivery: string;
  status: 'Active' | 'Paused';
}

export type SubscriptionUpdateAction = 'toggle' | 'cancel';
export type SubscriptionUpdateHandler = (subscriptionId: string, action: SubscriptionUpdateAction) => void;

export enum CustomerPanelTab {
  SUBSCRIPTIONS = 'Subscriptions',
  ORDER_TRACKING = 'Order Tracking',
  PAYMENT_HISTORY = 'Payment History',
  BILLING = 'Billing',
  PROFILE = 'Profile',
  REFER_EARN = 'Refer & Earn',
  LOYALTY = 'Loyalty Program',
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error';
}

export interface MilkIntakeLog {
    _id?: string;
    type: 'Cow' | 'Buffalo';
    quantityLiters: number;
    date: string;
}

export interface ConversionLog {
    _id?: string;
    productName: string;
    quantityProduced: number;
    unit: 'kg' | 'Units';
    milkUsed: {
        cowLiters?: number;
        buffaloLiters?: number;
    };
    date: string;
}

export interface GalleryImage {
    _id?: string;
    src: string;
    alt: string;
    aspect: string;
}
