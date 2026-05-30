import { useQuery } from '@tanstack/react-query';
import { donationService } from '../services/donationService';

export function useDonations() {
  return useQuery({
    queryKey: ['donations'],
    queryFn: donationService.getAll,
  });
}

export function useDonationStats() {
  return useQuery({
    queryKey: ['donations', 'stats'],
    queryFn: donationService.getStats,
  });
}
