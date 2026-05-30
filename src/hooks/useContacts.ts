import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await api.get<ContactSubmission[]>('/contact');
      return response.data;
    },
  });
}
