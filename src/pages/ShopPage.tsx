import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProductCard from "../components/common/ProductCard";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import type { ProductCategory } from "../types/product.types";
import { ASSETS } from "../lib/assetPaths";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Capsules", value: "capsules" },
  { label: "Edibles", value: "edibles" },
  { label: "Beverages", value: "beverages" },
  { label: "Bundles", value: "bundles" },
  { label: "Fresh / Dried", value: "fresh-dried" },
  { label: "Apparel", value: "apparel" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const HERO_IMAGES = [ASSETS.SLIDER_1, ASSETS.SLIDER_2, ASSETS.SLIDER_3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO_IMAGES.length]);

  const filtered =
    activeCategory === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <MainLayout>
      {/* Custom styles to hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Hero with background image slider */}
      <section
        className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center bg-brand-primary overflow-hidden w-full"
        aria-label="Shop Hero Section"
      >
        {/* Background Slides */}
        {HERO_IMAGES.map((img, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                  }`}
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-brand-primary/70" aria-hidden="true" />
            </div>
          );
        })}

        <div className="relative text-center container-site z-10 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Sacraments
          </h1>
        </div>
      </section>

      <section className="bg-brand-cream-light py-12 lg:py-16">
        <div className="container-site">
          {/* Category filters (Horizontally scrollable on mobile) */}
          <div
            className="flex flex-nowrap md:flex-wrap gap-2 mb-8 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            role="tablist"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform active:scale-95 ${activeCategory === cat.value
                  ? "bg-[#113B2C] text-white shadow-md border border-[#113B2C]"
                  : "bg-white text-brand-dark border border-brand-border/40 hover:bg-[#FDFBF7] hover:border-brand-primary"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center py-16">No products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
