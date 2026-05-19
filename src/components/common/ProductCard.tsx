import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product.types";
import { formatPriceDollars } from "../../lib/utils";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-border/30 hover:shadow-md transition-shadow group">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-brand-cream-light">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-cream">
              <span className="text-brand-border text-sm">No image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {product.badges.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-2">
            {product.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="text-xs bg-brand-cream text-brand-primary font-medium px-2 py-0.5 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-brand-dark hover:text-brand-cta transition-colors leading-snug mb-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.shortDescription}</p>

        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-brand-primary text-lg">
            {formatPriceDollars(product.price)} $
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 bg-brand-cta text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-brand-primary transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
