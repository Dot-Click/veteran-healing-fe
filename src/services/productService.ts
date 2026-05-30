import api from './api';
import type { Product, ProductCategory, ProductVariant, ProductReview } from '../types/product.types';
import { ASSETS } from '../lib/assetPaths';

const SLUG_IMAGE_MAP: Record<string, string> = {
  'microdose-capsules': ASSETS.PRODUCTS.CAPSULES,
  'mushroom-chocolate': ASSETS.PRODUCTS.CHOCOLATE,
  'organic-mushroom-fruit': ASSETS.PRODUCTS.MUSHROOM_FRUIT,
  'two-week-trust-pack': ASSETS.PRODUCTS.TRUST_PACK,
  'mushroom-tea': ASSETS.PRODUCTS.TEA,
  'veteran-healing-sweatshirt': ASSETS.PRODUCTS.SWEATSHIRT,
  'mission-hoodie': ASSETS.PRODUCTS.HOODIE,
};

function mapCategory(c: string): ProductCategory {
  if (c === 'fresh') return 'fresh-dried';
  return c as ProductCategory;
}

export function mapProduct(raw: any): Product {
  const images: string[] =
    Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : [SLUG_IMAGE_MAP[raw.slug] ?? ASSETS.PRODUCTS.CAPSULES];

  const variants: ProductVariant[] = (raw.variants ?? []).map((v: any) => ({
    id: v.id,
    label: v.label,
    value: v.label.toLowerCase().replace(/\s+/g, '-'),
    inStock: v.inStock,
  }));

  const reviews: ProductReview[] = (raw.reviews ?? []).map((r: any) => ({
    id: r.id,
    author: r.authorName,
    rating: r.rating,
    body: r.body,
    productName: raw.name,
    date: new Date(r.createdAt).toISOString().split('T')[0],
  }));

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    price: raw.price / 100,
    category: mapCategory(raw.category),
    description: raw.description,
    shortDescription: raw.shortDescription ?? '',
    images,
    variants,
    inStock: raw.inStock,
    featured: raw.featured,
    tags: [],
    badges: raw.badges ?? [],
    reviews,
  };
}

export const productService = {
  getAll: async (category?: string): Promise<Product[]> => {
    const params: Record<string, string> = {};
    if (category && category !== 'all') {
      params.category = category === 'fresh-dried' ? 'fresh' : category;
    }
    const { data } = await api.get('/products', { params });
    return data.map(mapProduct);
  },

  getFeatured: async (): Promise<Product[]> => {
    const { data } = await api.get('/products/featured');
    return data.map(mapProduct);
  },

  getBySlug: async (slug: string): Promise<Product> => {
    const { data } = await api.get(`/products/${slug}`);
    return mapProduct(data);
  },

  create: async (payload: {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    price: number; // dollars
    category: string;
    images?: string[];
    badges?: string[];
    inStock?: boolean;
    featured?: boolean;
  }): Promise<Product> => {
    const { data } = await api.post('/products', {
      ...payload,
      price: Math.round(payload.price * 100),
      category: payload.category === 'fresh-dried' ? 'fresh' : payload.category,
    });
    return mapProduct(data);
  },

  update: async (
    id: string,
    payload: Partial<{
      name: string;
      description: string;
      shortDescription: string;
      price: number; // dollars
      category: string;
      images: string[];
      badges: string[];
      inStock: boolean;
      featured: boolean;
    }>,
  ): Promise<Product> => {
    const body: any = { ...payload };
    if (payload.price !== undefined) body.price = Math.round(payload.price * 100);
    if (payload.category === 'fresh-dried') body.category = 'fresh';
    const { data } = await api.put(`/products/${id}`, body);
    return mapProduct(data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
