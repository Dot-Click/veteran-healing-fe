import type { CartItem } from "./product.types";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  donationAmount: number;
  couponDiscount: number;
  total: number;
  shippingAddress: ShippingAddress;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
