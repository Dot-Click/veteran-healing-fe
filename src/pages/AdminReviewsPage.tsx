import { useMemo, useState } from "react";
import { Star, Trash2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/layout/AdminLayout";
import InfiniteScrollSentinel from "../components/common/InfiniteScrollSentinel";
import {
  useAdminReviewsInfinite,
  useApproveReview,
  useDeleteReview,
} from "../hooks/useReviews";
import type { ApiReview } from "../types/review.types";
import { matchesSearch } from "../lib/search";

type ReviewFilter = "all" | "pending" | "approved";

export default function AdminReviewsPage() {
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useAdminReviewsInfinite();
  const approveReview = useApproveReview();
  const deleteReview = useDeleteReview();

  const allReviews = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  const filtered = useMemo(() => {
    let list = allReviews;
    if (filter === "pending") list = list.filter((r) => !r.isApproved);
    if (filter === "approved") list = list.filter((r) => r.isApproved);

    if (!searchQuery.trim()) return list;

    return list.filter((r) =>
      matchesSearch(
        searchQuery,
        r.authorName,
        r.body,
        r.product?.name,
        r.rating,
        r.isApproved ? "approved" : "pending"
      )
    );
  }, [allReviews, filter, searchQuery]);

  const pendingCount = allReviews.filter((r) => !r.isApproved).length;

  async function handleApprove(review: ApiReview) {
    try {
      await approveReview.mutateAsync(review.id);
      toast.success(`Review by ${review.authorName} approved`);
    } catch {
      toast.error("Failed to approve review");
    }
  }

  async function handleDelete(review: ApiReview) {
    if (!window.confirm(`Delete review from ${review.authorName}?`)) return;
    try {
      await deleteReview.mutateAsync(review.id);
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  }

  const filterCounts = {
    all: allReviews.length,
    pending: pendingCount,
    approved: allReviews.filter((r) => r.isApproved).length,
  };

  return (
    <AdminLayout
      title="Reviews"
      search={{
        value: searchQuery,
        onChange: setSearchQuery,
        placeholder: "Search by author, review text, or product...",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <p className="text-sm text-gray-500">
          {searchQuery.trim()
            ? `${filtered.length} shown`
            : `${data?.pages[0]?.total ?? 0} total reviews`}
          {pendingCount > 0 && (
            <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
              {pendingCount} pending
            </span>
          )}
        </p>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "approved"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-brand-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({filterCounts[status]})
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Author</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Rating</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Review</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Product</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
              <th className="text-left px-5 py-3 font-medium text-gray-600">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={7} className="px-5 py-4">
                    <div className="h-5 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-red-500">
                  Failed to load reviews.
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400">
                  {searchQuery.trim() ? "No reviews match your search." : "No reviews found."}
                </td>
              </tr>
            ) : (
              filtered.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors align-top">
                  <td className="px-5 py-4 font-medium text-brand-dark whitespace-nowrap">
                    {review.authorName}
                    {review.isVerified && (
                      <span className="block text-xs text-green-600 font-normal">Verified</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-brand-gold text-brand-gold"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-700 max-w-xs">
                    <p className="line-clamp-3">{review.body}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {review.product?.name ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        review.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {review.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {!review.isApproved && (
                        <button
                          type="button"
                          onClick={() => handleApprove(review)}
                          disabled={approveReview.isPending}
                          className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                          title="Approve review"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(review)}
                        disabled={deleteReview.isPending}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete review"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <InfiniteScrollSentinel
        hasMore={!!hasNextPage}
        isLoading={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />

      {!isLoading && !hasNextPage && allReviews.length > 0 && (
        <p className="text-center text-sm text-gray-400 py-4">All reviews loaded.</p>
      )}
    </AdminLayout>
  );
}
