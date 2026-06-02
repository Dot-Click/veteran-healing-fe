import { cn } from "../../lib/utils";

interface ContentAreaLoaderProps {
  variant?: "spinner" | "skeleton-cards" | "skeleton-rows";
  className?: string;
  count?: number;
}

export default function ContentAreaLoader({
  variant = "spinner",
  className,
  count = 8,
}: ContentAreaLoaderProps) {
  if (variant === "skeleton-cards") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
          className
        )}
        aria-busy="true"
        aria-label="Loading content"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-2xl border border-brand-border/10 bg-white animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (variant === "skeleton-rows") {
    return (
      <div className={cn("space-y-3", className)} aria-busy="true" aria-label="Loading content">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("flex min-h-[40vh] items-center justify-center py-16", className)}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-cta border-t-transparent" />
    </div>
  );
}
