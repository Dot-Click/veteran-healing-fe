import React, { useRef, useEffect, useState } from "react";

// Inline Star SVG icon to avoid import issues
const Star: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 20 20"
    className={className}
    aria-hidden="true"
  >
    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
  </svg>
);

type Testimonial = {
  id: string | number;
  rating: number;
  tag: string;
  body: string;
  author: string;
};

interface MobileReviewCarouselProps {
  testimonials: Testimonial[];
}

const CARD_WIDTH = 260; // px
const CARD_GAP = 18; // px

const MobileReviewCarousel: React.FC<MobileReviewCarouselProps> = ({ testimonials }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isDragging = useRef(false);

  // Auto scroll timer
  useEffect(() => {
    if (testimonials.length <= 1) return;

    let paused = false;
    const interval = setInterval(() => {
      if (!paused && !isDragging.current) {
        setActive((idx) => (idx + 1) % testimonials.length);
      }
    }, 4000);

    const div = scrollRef.current;
    const handleUserStart = () => { paused = true; isDragging.current = true; };
    const handleUserEnd = () => { paused = false; isDragging.current = false; };

    if (div) {
      div.addEventListener("touchstart", handleUserStart);
      div.addEventListener("touchend", handleUserEnd);
      div.addEventListener("mouseenter", handleUserStart);
      div.addEventListener("mouseleave", handleUserEnd);
    }
    return () => {
      clearInterval(interval);
      if (div) {
        div.removeEventListener("touchstart", handleUserStart);
        div.removeEventListener("touchend", handleUserEnd);
        div.removeEventListener("mouseenter", handleUserStart);
        div.removeEventListener("mouseleave", handleUserEnd);
      }
    };
  }, [testimonials.length]);

  // Snap to active card smoothly when state changes (unless dragging)
  useEffect(() => {
    if (scrollRef.current && !isDragging.current) {
      scrollRef.current.scrollTo({
        left:
          active * (CARD_WIDTH + CARD_GAP)
          -
          ((scrollRef.current.offsetWidth - CARD_WIDTH) / 2),
        behavior: "smooth"
      });
    }
  }, [active, testimonials.length]);

  // Make native scroll/drag movement feel smooth and update "active" index
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    let touchTimeout: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (isDragging.current && node) {
        const { scrollLeft, offsetWidth } = node;
        let idx = Math.round(
          (scrollLeft + offsetWidth / 2 - CARD_WIDTH / 2) / (CARD_WIDTH + CARD_GAP)
        );
        idx = Math.max(0, Math.min(testimonials.length - 1, idx));
        setActive(idx);
      }
    };

    const handleTouchStart = () => {
      isDragging.current = true;
      if (touchTimeout) clearTimeout(touchTimeout as number);
    };
    const handleTouchEnd = () => {
      if (!node) return;
      isDragging.current = false;
      const { scrollLeft, offsetWidth } = node;
      let idx = Math.round(
        (scrollLeft + offsetWidth / 2 - CARD_WIDTH / 2) / (CARD_WIDTH + CARD_GAP)
      );
      idx = Math.max(0, Math.min(testimonials.length - 1, idx));
      setActive(idx);
      // Snap smoothly after drag ends
      touchTimeout = setTimeout(() => {
        node.scrollTo({
          left:
            idx * (CARD_WIDTH + CARD_GAP)
            -
            ((node.offsetWidth - CARD_WIDTH) / 2),
          behavior: "smooth"
        });
      }, 80);
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener("scroll", onScroll);
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchend", handleTouchEnd);
      if (touchTimeout) clearTimeout(touchTimeout as number);
    };
  }, [testimonials.length]);

  // Hide on tablet/desktop (show only for screen < sm)
  return (
    <div className="block sm:hidden w-full overflow-visible relative mb-8">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar px-2"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: `${CARD_GAP}px`,
          scrollBehavior: "smooth"
        }}
        tabIndex={0}
        aria-label="Swipe reviews left or right"
      >
        {testimonials.map((review, idx) => (
          <div
            key={review.id}
            className={`flex-shrink-0 rounded-2xl border border-brand-border/20 bg-brand-cream shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md
              ${active === idx ? "scale-100 border-brand-cta/80 shadow-md" : "scale-95 border-brand-border/20 opacity-80"}
            `}
            style={{
              width: `${CARD_WIDTH}px`,
              minWidth: `${CARD_WIDTH}px`,
              maxWidth: `${CARD_WIDTH}px`,
              marginTop: active === idx ? 0 : 10,
              marginBottom: 24,
              scrollSnapAlign: "center",
              zIndex: active === idx ? 2 : 1,
              boxShadow: active === idx ? "0 6px 32px rgba(17, 59, 44, 0.07)" : "",
              transition: "transform 0.45s cubic-bezier(0.33,1,0.68,1), box-shadow 0.3s"
            }}
            aria-current={active === idx ? "true" : undefined}
          >
            <div className="p-4 flex-grow flex flex-col">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-brand-gold font-bold text-xs tracking-widest uppercase block mb-2">
                {review.tag}
              </span>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                "{review.body}"
              </p>
            </div>
            <p className="font-semibold text-brand-dark text-xs border-t border-brand-border/10 pt-3 px-4 pb-3">
              {review.author}
            </p>
          </div>
        ))}
      </div>
      {/* show indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to review ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className={`w-2 h-2 rounded-full transition bg-brand-cta/50 ${i === active ? "scale-125 bg-brand-cta" : "bg-brand-border"}`}
            style={{ border: 0, outline: "none" }}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default MobileReviewCarousel;