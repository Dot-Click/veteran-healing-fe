import { useState, useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ShoppingCart, Shield, Leaf, Truck, Star, Send } from "lucide-react";
import toast from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import ProductCard from "../components/common/ProductCard";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { formatPriceDollars } from "../lib/utils";
import type { ProductVariant } from "../types/product.types";
import { ASSETS } from "../lib/assetPaths";
import api from "../services/api";
import type { ApiReview } from "../types/review.types";
import {
  computeProductReviewStats,
  mapApiReviewToProductReview,
  type ProductReviewDisplay,
} from "../types/review.types";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProduct(slug ?? "");
  const { data: allProducts = [] } = useProducts();
  const { addItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [added, setAdded] = useState(false);

  // Gallery image state
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Apparel custom selections
  const [selectedColor, setSelectedColor] = useState("Forest Green");
  const [selectedSize, setSelectedSize] = useState("M");

  // Quantity selection
  const [quantity, setQuantity] = useState(1);

  // Reviews state (from API + locally added)
  const [reviews, setReviews] = useState<ProductReviewDisplay[]>([]);

  // New review form state
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newBody, setNewBody] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"related" | "reviews">("related");

  // Sync state when product loads
  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.id) return;
      try {
        const response = await api.get<ApiReview[]>(`/reviews/product/${product.id}`);
        const mapped = (response.data ?? []).map(mapApiReviewToProductReview);
        setReviews(mapped);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };
    fetchReviews();
  }, [product?.id]);

  const reviewStats = useMemo(() => computeProductReviewStats(reviews), [reviews]);

  const displayAverage =
    reviewStats.approvedCount > 0 ? reviewStats.averageRating.toFixed(1) : "—";

  const filledStars =
    reviewStats.approvedCount > 0 ? Math.round(reviewStats.averageRating) : 0;

  if (isError || (!isLoading && !product)) return <Navigate to="/shop" replace />;

  // Gallery images list (forces exactly 3 images using fallback product placeholders)
  const allImages = product
    ? [product.images[0], ASSETS.MUSHROOM_PRODUCT, ASSETS.ABOUT_BG].filter(Boolean)
    : [];

  const handleAddToCart = () => {
    if (!product) return;
    // Add multiple items if quantity > 1
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newAuthor || !newBody) return;

    try {
      const response = await api.post<ApiReview>("/reviews", {
        productId: product.id,
        authorName: newAuthor,
        rating: newRating,
        body: newBody,
      });

      setReviews([mapApiReviewToProductReview(response.data), ...reviews]);

      setNewAuthor("");
      setNewRating(5);
      setNewBody("");
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);

      toast.success('Review submitted! It will appear after admin approval.');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Review submission error:', error);
    }
  };

  // Get max 4 related products from same category, excluding the current product
  const relatedProducts = product
    ? allProducts
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4)
    : [];

  // Apparel color swatches
  const apparelColors = [
    { name: "Forest Green", hex: "#113B2C" },
    { name: "Sand Cream", hex: "#EAE3D2" },
    { name: "Charcoal Grey", hex: "#3A3D40" },
  ];

  // Apparel size list
  const apparelSizes = ["S", "M", "L", "XL", "2XL"];

  return (
    <MainLayout>
      {/* Breadcrumb Bar */}
      <section className="bg-brand-cream-light py-4 border-b border-brand-border/10">
        <div className="container-site">
          <nav className="text-sm text-gray-500 flex gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-cta transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-brand-cta transition-colors">Sacraments</Link>
            <span>/</span>
            {isLoading || !product ? (
              <span className="inline-block h-4 w-32 animate-pulse rounded bg-gray-200" />
            ) : (
              <span className="text-brand-dark font-medium">{product.name}</span>
            )}
          </nav>
        </div>
      </section>

      {isLoading || !product ? (
        <section className="bg-brand-cream-light py-12">
          <div className="container-site max-w-6xl mx-auto">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              <div className="mx-auto w-full max-w-xl flex-1">
                <div className="aspect-[4/3] animate-pulse rounded-2xl border border-brand-border/20 bg-white" />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-white" />
                  ))}
                </div>
              </div>
              <div className="w-full max-w-xl flex-1 space-y-4">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                </div>
                <div className="h-14 animate-pulse rounded-xl bg-gray-100" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
      {/* Main Details Section */}
      <section className="bg-brand-cream-light py-12">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-6xl mx-auto">

            {/* LEFT COLUMN: Gallery & Main Image (shorter aspect ratio aspect-[4/3]) */}
            <div className="flex-1 w-full max-w-xl mx-auto">
              <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-md border border-brand-border/20 relative group">
                <img
                  src={allImages[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 bg-white transition-all ${activeImageIdx === i
                      ? "border-brand-primary ring-2 ring-brand-primary/20 scale-95 shadow-sm"
                      : "border-brand-border/30 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt={`${product.name} thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Product Information */}
            <div className="flex-1 max-w-xl w-full">
              <span className="text-brand-cta text-xs font-bold uppercase tracking-wider block mb-1">
                {product.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-3 font-serif">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-brand-border/10">
                <p className="text-3xl font-extrabold text-[#113B2C]">
                  {formatPriceDollars(product.price * quantity)} $
                </p>
                <div className="flex items-center gap-1.5 bg-brand-cream border border-brand-primary/10 px-2.5 py-1 rounded-full text-sm">
                  <Star size={14} className={filledStars > 0 ? "fill-brand-gold text-brand-gold" : "text-gray-300"} />
                  <span className="font-bold text-brand-dark">{displayAverage}</span>
                  <span className="text-gray-400">
                    ({reviewStats.approvedCount > 0
                      ? `${reviewStats.approvedCount} review${reviewStats.approvedCount === 1 ? "" : "s"}`
                      : "No ratings yet"})
                  </span>
                </div>
              </div>

              {/* Badges */}
              {product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {product.badges.map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary bg-brand-primary/5 border border-brand-primary/10 px-3 py-1.5 rounded-full">
                      <Leaf size={12} className="text-brand-cta" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base font-medium">
                {product.description}
              </p>

              {/* Options selection based on Category */}
              {product.category === "apparel" ? (
                <div className="space-y-5 mb-8 bg-white p-5 rounded-2xl border border-brand-border/20 shadow-sm">
                  {/* Color option */}
                  <div>
                    <label className="text-sm font-bold text-brand-dark mb-3 block uppercase tracking-wider">
                      Select Color: <span className="text-brand-cta">{selectedColor}</span>
                    </label>
                    <div className="flex gap-3">
                      {apparelColors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-9 h-9 rounded-full border-2 transition-all relative ${selectedColor === color.name
                            ? "border-brand-cta scale-110 shadow-md ring-2 ring-brand-cta/20"
                            : "border-transparent hover:scale-105"
                            }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                              ✓
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size option */}
                  <div>
                    <label className="text-sm font-bold text-brand-dark mb-3 block uppercase tracking-wider">
                      Select Size: <span className="text-brand-cta">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {apparelSizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-12 h-12 rounded-xl text-sm font-bold transition-all border ${selectedSize === sz
                            ? "bg-[#113B2C] text-white border-[#113B2C] shadow"
                            : "bg-white text-brand-dark border-brand-border/40 hover:border-brand-primary"
                            }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Variants or fallback sizes */
                product.variants.length > 0 && (
                  <div className="mb-6 bg-white p-5 rounded-2xl border border-brand-border/20 shadow-sm">
                    <label className="text-sm font-bold text-brand-dark mb-3 block uppercase tracking-wider">
                      Select Option
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          disabled={!variant.inStock}
                          className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${selectedVariant?.id === variant.id
                            ? "bg-[#113B2C] text-white border-[#113B2C] shadow-sm"
                            : variant.inStock
                              ? "bg-white text-brand-dark border-brand-border/40 hover:border-brand-primary"
                              : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                            }`}
                        >
                          {variant.label}
                          {!variant.inStock && " (Out of Stock)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Quantity Selector and Add to Cart Row */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border-2 border-brand-border/30 bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-brand-cream text-brand-dark font-bold text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-brand-dark font-extrabold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 hover:bg-brand-cream text-brand-dark font-bold text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary justify-center py-4 text-base font-bold rounded-xl shadow-md transform hover:-translate-y-0.5"
                >
                  <ShoppingCart size={18} />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>

              {/* Secure Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-brand-border/25">
                {[
                  { icon: Shield, label: "Secure Checkout" },
                  { icon: Truck, label: "Free Shipping" },
                  { icon: Leaf, label: "100% Grown In-House" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center p-2 rounded-xl bg-white/50 border border-brand-border/10">
                    <Icon size={20} className="text-brand-cta mx-auto mb-1" />
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Selectors */}
      <section className="bg-brand-cream border-t border-brand-border/10 py-8">
        <div className="container-site flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("related")}
            className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all transform active:scale-95 border ${
              activeTab === "related"
                ? "bg-[#113B2C] text-white border-[#113B2C] shadow-md"
                : "bg-white text-brand-dark border-brand-border/40 hover:border-brand-primary"
            }`}
          >
            Related Sacraments
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all transform active:scale-95 border ${
              activeTab === "reviews"
                ? "bg-[#113B2C] text-white border-[#113B2C] shadow-md"
                : "bg-white text-brand-dark border-brand-border/40 hover:border-brand-primary"
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>
      </section>

      {/* Conditionally Rendered Sections */}
      {activeTab === "reviews" && (
        <section className="bg-white py-16 border-t border-brand-border/10">
          <div className="container-site max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-brand-dark mb-10 font-serif text-center">
              Customer Reviews
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              {/* Reviews Summary Stats */}
              <div className="lg:col-span-1 bg-brand-cream-light border border-brand-border/20 p-6 rounded-2xl">
                <h4 className="text-lg font-bold text-brand-dark mb-2 text-center">Overall Rating</h4>
                <p className="text-5xl font-extrabold text-brand-primary mb-3 text-center">
                  {displayAverage}
                </p>
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < filledStars ? "fill-brand-gold text-brand-gold" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 font-medium text-center mb-4">
                  {reviewStats.approvedCount > 0
                    ? `Based on ${reviewStats.approvedCount} approved review${reviewStats.approvedCount === 1 ? "" : "s"}`
                    : "No approved reviews yet"}
                  {reviewStats.totalCount > reviewStats.approvedCount && (
                    <span className="block text-xs text-gray-400 mt-1">
                      {reviewStats.totalCount - reviewStats.approvedCount} pending moderation
                    </span>
                  )}
                </p>
                {reviewStats.approvedCount > 0 && (
                  <div className="space-y-1.5 w-full">
                    {([5, 4, 3, 2, 1] as const).map((star) => {
                      const count = reviewStats.distribution[star];
                      const percent = (count / reviewStats.approvedCount) * 100;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-8 font-semibold">{star}★</span>
                          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-gold transition-all"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="w-6 text-right tabular-nums">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Reviews list */}
              <div className="lg:col-span-2 space-y-6 max-h-[450px] overflow-y-auto pr-2 no-scrollbar" style={{ scrollbarWidth: "none" }}>
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map((rev) => (
                    <article key={rev.id} className="bg-brand-cream-light/40 border border-brand-border/15 p-5 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-[#113B2C] text-sm">
                            {rev.author ? rev.author[0].toUpperCase() : "A"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-brand-dark text-sm">{rev.author}</h5>
                              {!rev.isApproved && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                                  Pending
                                </span>
                              )}
                            </div>
                            <span className="text-gray-400 text-xs">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < rev.rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed font-medium pl-1">{rev.body}</p>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Write a review form */}
            <div className="bg-brand-cream/35 border border-brand-primary/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-brand-dark mb-4 font-serif">Share Your Experience</h3>
              <p className="text-sm text-gray-500 mb-6">Your feedback helps our veteran support community grow.</p>

              {reviewSubmitted && (
                <div className="mb-6 bg-brand-cta/15 text-brand-dark border border-brand-cta/25 rounded-xl p-4 text-center font-bold">
                  Thank you! Your review has been added.
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Sgt. Miller"
                      className="w-full bg-white border border-brand-border/30 rounded-xl px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-2">Rating</label>
                    <div className="flex gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="transition-transform hover:scale-110"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            size={24}
                            className={star <= newRating ? "fill-brand-gold text-brand-gold" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block mb-2">Review Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder="How did this sacrament help your mindfulness or recovery?"
                    className="w-full bg-white border border-brand-border/30 rounded-xl p-4 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3.5 text-sm font-bold gap-2"
                >
                  <Send size={15} />
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {activeTab === "related" && (
        <section className="bg-brand-cream py-16 border-t border-brand-border/10">
          <div className="container-site">
            <h2 className="text-3xl font-bold text-brand-dark text-center mb-10 font-serif">
              Related Sacraments
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
        </>
      )}
    </MainLayout>
  );
}
