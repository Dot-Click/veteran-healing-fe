import type { Product } from './product.types';

export type FeaturedSection = 'homepage' | 'social';

export interface FeaturedPlacement {
  id: string;
  productId: string;
  section: FeaturedSection;
  sortOrder: number;
  linkUrl: string | null;
  product: Product;
}

export interface HomepageFeaturedPayload {
  homepage: FeaturedPlacement[];
  social: FeaturedPlacement[];
}
