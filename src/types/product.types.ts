export type ProductCategory =
  | "capsules"
  | "edibles"
  | "fresh-dried"
  | "bundles"
  | "beverages"
  | "apparel";

export interface ProductVariant {
  id: string;
  label: string;
  value: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  body: string;
  productName: string;
  date: string;
  avatar?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // in dollars
  category: ProductCategory;
  description: string;
  shortDescription: string;
  images: string[];
  variants: ProductVariant[];
  inStock: boolean;
  featured: boolean;
  tags: string[];
  badges: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}
