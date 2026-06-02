import api from "./api";
import type { PaginatedReviewsResponse } from "../types/review.types";

export const PUBLIC_REVIEWS_PAGE_SIZE = 10;
export const ADMIN_REVIEWS_PAGE_SIZE = 8;

export async function fetchApprovedReviews(
  page: number,
  limit = PUBLIC_REVIEWS_PAGE_SIZE
): Promise<PaginatedReviewsResponse> {
  const res = await api.get<PaginatedReviewsResponse>("/reviews", {
    params: { page, limit },
  });
  return res.data;
}

export async function fetchAllReviews(
  page: number,
  limit = ADMIN_REVIEWS_PAGE_SIZE
): Promise<PaginatedReviewsResponse> {
  const res = await api.get<PaginatedReviewsResponse>("/reviews/all", {
    params: { page, limit },
  });
  return res.data;
}

export async function approveReview(id: string) {
  const res = await api.post(`/reviews/${id}/approve`);
  return res.data;
}

export async function deleteReview(id: string) {
  await api.delete(`/reviews/${id}`);
}
