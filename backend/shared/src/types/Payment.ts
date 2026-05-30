export type PaymentStatus =
  | 'initiated'
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded'
  | 'disputed';

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'bnpl';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface Payment {
  paymentId: string;
  merchantId: string;
  customerId: string;
  amount: number;          // in smallest currency unit (paise for INR)
  currency: Currency;
  status: PaymentStatus;
  method: PaymentMethod;
  orderId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  gatewayReference?: string;
  gatewayName?: string;    // 'stripe' | 'razorpay'
  failureReason?: string;
  createdAt: string;       // ISO 8601
  updatedAt: string;
  capturedAt?: string;
  refundedAt?: string;
}

export interface CreatePaymentRequest {
  customerId: string;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  orderId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentEvent {
  eventId: string;
  eventType: string;
  paymentId: string;
  merchantId: string;
  payload: Partial<Payment>;
  timestamp: string;
}

export interface RefundRequest {
  paymentId: string;
  amount?: number;         // partial refund; if omitted → full refund
  reason?: string;
}
