import { useEffect, useRef } from "react";

interface InfiniteScrollSentinelProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  className?: string;
}

export default function InfiniteScrollSentinel({
  onLoadMore,
  hasMore,
  isLoading,
  className,
}: InfiniteScrollSentinelProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div ref={sentinelRef} className={className ?? "py-8 flex justify-center"}>
      {isLoading && (
        <div className="w-8 h-8 border-4 border-brand-cta border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
}
