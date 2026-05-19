import { TOP_BAR_ITEMS } from "../../lib/constants";

export default function TopBar() {
  return (
    <div className="bg-brand-dark text-white text-xs py-2 overflow-hidden">
      <div className="container-site">
        {/* Mobile: scrolling marquee */}
        <div className="flex sm:hidden overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-8">
            {[...TOP_BAR_ITEMS, ...TOP_BAR_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                <span className="text-brand-gold">|</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop: static list */}
        <div className="hidden sm:flex items-center justify-center gap-4 lg:gap-6 flex-wrap">
          {TOP_BAR_ITEMS.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-brand-gold text-xs">|</span>}
              {item}
            </span>
          ))}
          {/* USA flag indicator */}
          <span className="ml-2 flex items-center gap-1">
            <span>🇺🇸</span>
            <span className="text-xs">IN USA</span>
          </span>
        </div>
      </div>
    </div>
  );
}
