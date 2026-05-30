import api from './api';

export interface BackendOrder {
  id: string;
  orderNumber: string;
  userId: string | null;
  guestEmail: string | null;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  subtotal: number; // cents
  shippingCost: number; // cents
  discountAmount: number; // cents
  donationAmount: number; // cents
  total: number; // cents
  couponCode: string | null;
  shippingAddress: any;
  paymentMethod: string | null;
  paymentReference: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items?: any[];
}

export const orderService = {
  getAll: async (): Promise<BackendOrder[]> => {
    const { data } = await api.get('/orders');
    return data;
  },

  getById: async (id: string): Promise<BackendOrder> => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  updateStatus: async (
    id: string,
    status: BackendOrder['status'],
  ): Promise<BackendOrder> => {
    const { data } = await api.patch(`/orders/${id}/status`, { status });
    return data;
  },
};
