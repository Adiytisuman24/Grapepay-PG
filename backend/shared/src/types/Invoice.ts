import { Currency } from './Payment';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitAmount: number;   // in smallest currency unit
  totalAmount: number;
}

export interface Invoice {
  invoiceId: string;
  merchantId: string;
  customerId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: Currency;
  dueDate: string;       // ISO 8601
  paidAt?: string;
  paymentId?: string;    // linked payment if paid
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceRequest {
  customerId: string;
  lineItems: Omit<InvoiceLineItem, 'totalAmount'>[];
  currency: Currency;
  dueDate: string;
  notes?: string;
  taxRate?: number;      // 0–1, e.g. 0.18 for 18%
}
