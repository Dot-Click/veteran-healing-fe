import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ADMIN_REVIEWS_PAGE_SIZE,
  PUBLIC_REVIEWS_PAGE_SIZE,
  approveReview,
  deleteReview,
  fetchAllReviews,
  fetchApprovedReviews,
} from "../services/reviewService";

export function useTopReviews(limit = PUBLIC_REVIEWS_PAGE_SIZE) {
  return useQuery({
    queryKey: ["reviews", "top", limit],
    queryFn: () => fetchApprovedReviews(1, limit),
  });
}

export function useApprovedReviewsInfinite(limit = PUBLIC_REVIEWS_PAGE_SIZE) {
  return useInfiniteQuery({
    queryKey: ["reviews", "approved", "infinite", limit],
    queryFn: ({ pageParam }) => fetchApprovedReviews(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
  });
}

export function useAdminReviewsInfinite(limit = ADMIN_REVIEWS_PAGE_SIZE) {
  return useInfiniteQuery({
    queryKey: ["reviews", "admin", "infinite", limit],
    queryFn: ({ pageParam }) => fetchAllReviews(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
  });
}

export function useApproveReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: approveReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
