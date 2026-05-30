import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ['products', category ?? 'all'],
    queryFn: () => productService.getAll(category),
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productService.getFeatured,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', 'slug', slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof productService.update>[1] }) =>
      productService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
