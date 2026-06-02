import type { ProductReview } from "./product.types";

export interface ApiReview {
  id: string;
  productId: string | null;
  authorName: string;
  rating: number;
  body: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  product?: { id: string; name: string } | null;
}

export interface PaginatedReviewsResponse {
  items: ApiReview[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface HomeReviewCard {
  id: string;
  tag: string;
  body: string;
  author: string;
  rating: number;
}

export interface ProductReviewDisplay extends ProductReview {
  isApproved: boolean;
}

export interface ProductReviewStats {
  /** Mean star rating (1 decimal), from approved reviews only */
  averageRating: number;
  /** Count of approved reviews used in the average */
  approvedCount: number;
  /** All reviews returned for this product (includes pending) */
  totalCount: number;
  /** How many approved reviews per star (1–5) */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

type ReviewForStats = { rating: number; isApproved: boolean };

export function computeProductReviewStats(reviews: ReviewForStats[]): ProductReviewStats {
  const approved = reviews.filter((r) => r.isApproved);
  const distribution: ProductReviewStats["distribution"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (approved.length === 0) {
    return {
      averageRating: 0,
      approvedCount: 0,
      totalCount: reviews.length,
      distribution,
    };
  }

  const sum = approved.reduce((acc, r) => acc + r.rating, 0);

  for (const review of approved) {
    const star = Math.min(5, Math.max(1, Math.round(review.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] += 1;
  }

  const averageRating = Math.round((sum / approved.length) * 10) / 10;

  return {
    averageRating,
    approvedCount: approved.length,
    totalCount: reviews.length,
    distribution,
  };
}

export function mapApiReviewToProductReview(review: ApiReview): ProductReviewDisplay {
  return {
    id: review.id,
    author: review.authorName,
    rating: review.rating,
    body: review.body,
    productName: review.product?.name ?? "Veteran Healing",
    date: new Date(review.createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    isApproved: review.isApproved,
  };
}

export function mapApiReviewToHomeCard(review: ApiReview): HomeReviewCard {
  const tag = review.isVerified
    ? "VERIFIED"
    : review.product?.name
      ? review.product.name.split(" ")[0].toUpperCase()
      : "COMMUNITY";

  return {
    id: review.id,
    tag,
    body: review.body,
    author: `- ${review.authorName}`,
    rating: review.rating,
  };
}
