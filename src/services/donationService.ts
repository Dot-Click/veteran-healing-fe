import api from './api';

export interface BackendDonation {
  id: string;
  userId: string | null;
  orderId: string | null;
  amount: number; // cents
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  matchFulfilled: boolean;
  donorEmail: string | null;
  donorName: string | null;
  message: string | null;
  paymentReference: string | null;
  createdAt: string;
}

export interface DonationStats {
  totalCents: number;
  count: number;
  matchFulfilled: number;
}

export const donationService = {
  getAll: async (): Promise<BackendDonation[]> => {
    const { data } = await api.get('/donations');
    return data;
  },

  getStats: async (): Promise<DonationStats> => {
    const { data } = await api.get('/donations/stats');
    return data;
  },

  create: async (payload: {
    amount: number; // cents
    donorEmail?: string;
    donorName?: string;
    message?: string;
  }): Promise<BackendDonation> => {
    const { data } = await api.post('/donations', payload);
    return data;
  },
};
