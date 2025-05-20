export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  role: 'admin' | 'user';
  isEmailVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  addedDate: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  state: string;
  balance: number;
  addedDate: string;
}

export interface Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  productType: string;
  description: string;
  state: string;
  addedDate: string;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'purchase';
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  date: string;
  relatedParty: string;
}

export interface StatsCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export interface AppSettings {
  currency: string;
  theme: 'light' | 'dark' | 'system';
  minStockAlert: number;
  maxStockAlert: number;
  phonePrefix: string;
}

export interface AlertItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
}