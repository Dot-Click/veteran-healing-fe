import { useState } from "react";
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

  const filtered =
    activeCategory === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative h-48 lg:h-64 flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.SHOP_BG})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/70" aria-hidden="true" />
        <div className="relative container-site">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Sacraments</h1>
        </div>
      </section>

      <section className="bg-brand-cream-light py-12 lg:py-16">
        <div className="container-site">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-brand-cta text-white"
                    : "bg-white text-brand-dark border border-brand-border/40 hover:bg-brand-cream"
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
