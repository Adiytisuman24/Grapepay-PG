export type UserRole = 'admin' | 'developer' | 'viewer' | 'finance';

export interface User {
  userId: string;
  merchantId: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Merchant {
  merchantId: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  isActive: boolean;
  apiKeyHash?: string;
  webhookUrl?: string;
  createdAt: string;
}

export interface Customer {
  customerId: string;
  merchantId: string;
  name: string;
  email: string;
  phone?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  userId: string;
  merchantId: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
