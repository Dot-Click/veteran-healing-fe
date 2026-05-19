import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ShoppingCart, Shield, Leaf, Truck } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { getProductBySlug } from "../data/mockProducts";
import { useCart } from "../hooks/useCart";
import { formatPriceDollars } from "../lib/utils";
import type { ProductVariant } from "../types/product.types";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? "");
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants[0]
  );
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <MainLayout>
      <section className="bg-brand-cream-light py-4">
        <div className="container-site">
          <nav className="text-sm text-gray-500 flex gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-cta">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-brand-cta">Sacraments</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-brand-cream-light pb-16">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Images */}
            <div className="flex-1">
              <div className="aspect-square bg-brand-cream rounded-2xl overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {product.images.map((img, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border-2 border-brand-border/30">
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex-1 max-w-lg">
              <h1 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-2">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <p className="text-2xl font-bold text-brand-primary">
                  {formatPriceDollars(product.price)} $
                </p>
              </div>

              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-5">
                  {product.badges.map((badge) => (
                    <span key={badge} className="flex items-center gap-1 text-xs font-medium text-brand-dark">
                      <span className="w-5 h-5 rounded-full bg-brand-cta/10 flex items-center justify-center">
                        <Leaf size={10} className="text-brand-cta" />
                      </span>
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-600 leading-relaxed mb-6 text-sm">{product.description}</p>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-brand-dark mb-2 block">
                    Select Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.inStock}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          selectedVariant?.id === variant.id
                            ? "border-brand-cta bg-brand-cta text-white"
                            : variant.inStock
                            ? "border-brand-border/40 text-brand-dark hover:border-brand-cta"
                            : "border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {variant.label}
                        {!variant.inStock && " (Out of Stock)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary justify-center py-4 text-base mb-4"
              >
                <ShoppingCart size={18} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-border/20">
                {[
                  { icon: Shield, label: "Secure Checkout" },
                  { icon: Truck, label: "Free Shipping" },
                  { icon: Leaf, label: "Grown In-House" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon size={20} className="text-brand-cta mx-auto mb-1" />
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
