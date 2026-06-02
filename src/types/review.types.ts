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

export function mapApiReviewToProductReview(review: ApiReview): ProductReview {
  return {
    id: review.id,
    author: review.authorName,
    rating: review.rating,
    body: review.body,
    productName: review.product?.name ?? "Veteran Healing",
    date: new Date(review.createdAt).toISOString().split("T")[0],
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
