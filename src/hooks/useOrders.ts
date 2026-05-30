import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import type { BackendOrder } from '../services/orderService';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getAll,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BackendOrder['status'] }) =>
      orderService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
}
