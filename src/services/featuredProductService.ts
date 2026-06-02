import api from './api';
import { mapProduct } from './productService';
import type {
  FeaturedPlacement,
  FeaturedSection,
  HomepageFeaturedPayload,
} from '../types/featuredProduct.types';

function mapPlacement(raw: Record<string, unknown>): FeaturedPlacement {
  return {
    id: String(raw.id),
    productId: String(raw.productId),
    section: raw.section as FeaturedSection,
    sortOrder: Number(raw.sortOrder ?? 0),
    linkUrl: (raw.linkUrl as string | null) ?? null,
    product: mapProduct(raw.product),
  };
}

export const featuredProductService = {
  getHomepage: async (): Promise<HomepageFeaturedPayload> => {
    const { data } = await api.get('/featured-products');
    return {
      homepage: (data.homepage ?? []).map(mapPlacement),
      social: (data.social ?? []).map(mapPlacement),
    };
  },

  getAdmin: async (): Promise<FeaturedPlacement[]> => {
    const { data } = await api.get('/featured-products/admin');
    return data.map(mapPlacement);
  },

  create: async (payload: {
    productId: string;
    section: FeaturedSection;
    sortOrder?: number;
    linkUrl?: string;
  }): Promise<FeaturedPlacement> => {
    const { data } = await api.post('/featured-products', payload);
    return mapPlacement(data);
  },

  update: async (
    id: string,
    payload: Partial<{
      section: FeaturedSection;
      sortOrder: number;
      linkUrl: string | null;
    }>,
  ): Promise<FeaturedPlacement> => {
    const { data } = await api.put(`/featured-products/${id}`, payload);
    return mapPlacement(data);
  },

  reorder: async (items: { id: string; sortOrder: number }[]): Promise<FeaturedPlacement[]> => {
    const { data } = await api.put('/featured-products/reorder', { items });
    return data.map(mapPlacement);
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/featured-products/${id}`);
  },
};
