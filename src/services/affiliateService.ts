import api from './api';

export interface BackendAffiliate {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  commissionRate: string;
  referralCode: string;
  totalEarned: number; // cents
  totalPaid: number; // cents
  payoutMethod: string | null;
  payoutDetails: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const affiliateService = {
  getAll: async (): Promise<BackendAffiliate[]> => {
    const { data } = await api.get('/affiliates');
    return data;
  },

  updateStatus: async (
    id: string,
    status: 'approved' | 'rejected' | 'suspended',
  ): Promise<BackendAffiliate> => {
    const { data } = await api.patch(`/affiliates/${id}/status`, { status });
    return data;
  },

  apply: async (payload: {
    email: string;
    name: string;
    website?: string;
  }): Promise<any> => {
    const { data } = await api.post('/affiliates/apply', payload);
    return data;
  },

  deleteAffiliate: async (id: string): Promise<void> => {
    await api.delete(`/affiliates/${id}`);
  },
};
