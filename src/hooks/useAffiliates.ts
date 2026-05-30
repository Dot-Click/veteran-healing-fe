import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { affiliateService } from '../services/affiliateService';

export function useAffiliates() {
  return useQuery({
    queryKey: ['affiliates'],
    queryFn: affiliateService.getAll,
  });
}

export function useUpdateAffiliateStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: 'approved' | 'rejected' | 'suspended';
    }) => affiliateService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['affiliates'] }),
  });
}

export function useDeleteAffiliate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => affiliateService.deleteAffiliate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['affiliates'] }),
  });
}
