import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { featuredProductService } from '../services/featuredProductService';
export function useHomepageFeatured() {
  return useQuery({
    queryKey: ['featured-products', 'homepage'],
    queryFn: featuredProductService.getHomepage,
  });
}

export function useAdminFeaturedProducts() {
  return useQuery({
    queryKey: ['featured-products', 'admin'],
    queryFn: featuredProductService.getAdmin,
  });
}

export function useCreateFeaturedProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: featuredProductService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['featured-products'] });
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateFeaturedProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof featuredProductService.update>[1];
    }) => featuredProductService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['featured-products'] });
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useReorderFeaturedProducts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: featuredProductService.reorder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['featured-products'] });
    },
  });
}

export function useDeleteFeaturedProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: featuredProductService.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['featured-products'] });
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

