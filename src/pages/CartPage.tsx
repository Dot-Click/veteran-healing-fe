import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../hooks/useCart";
import { formatPriceDollars } from "../lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "../lib/constants";
import { useState } from "react";
import { ASSETS } from "../lib/assetPaths";

export default function CartPage() {
  const { items, subtotal, total, donationAmount, couponDiscount, updateQuantity, removeItem, setDonation } = useCart();
  const [donationInput, setDonationInput] = useState(donationAmount > 0 ? String(donationAmount) : "10");

  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return (
      <MainLayout>
        <section className="min-h-[60vh] flex items-center justify-center bg-brand-cream-light">
          <div className="text-center px-4">
            <h1 className="text-3xl font-bold text-brand-dark mb-4">Cart</h1>
            <p className="text-gray-600 mb-6">Your cart is empty.</p>
            <Link to="/shop" className="btn-primary">
              Shop Sacraments
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative h-40 lg:h-52 flex items-center bg-brand-primary bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.SHOP_BG})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/70" aria-hidden="true" />
        <div className="relative container-site">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Cart</h1>
        </div>
      </section>

      <section className="bg-brand-cream-light py-12">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-500 border-b border-brand-border/30 pb-2">
                    <th className="text-left py-2 font-medium">Product</th>
                    <th className="text-center py-2 font-medium">Price</th>
                    <th className="text-center py-2 font-medium">Quantity</th>
                    <th className="text-right py-2 font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/20">
                  {items.map((item) => (
                    <tr key={`${item.product.id}-${item.selectedVariant?.id}`} className="py-4">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedVariant?.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <X size={16} />
                          </button>
                          <div className="w-14 h-14 rounded-lg bg-brand-cream overflow-hidden flex-shrink-0">
                            {item.product.images[0] && (
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                            <Link to={`/shop/${item.product.slug}`} className="font-medium text-brand-dark hover:text-brand-cta text-sm">
                              {item.product.name}
                            </Link>
                            {item.selectedVariant && (
                              <p className="text-xs text-gray-500">{item.selectedVariant.label}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-sm font-medium">
                        {formatPriceDollars(item.product.price)} $
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-brand-border/40 flex items-center justify-center hover:bg-brand-cream transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-brand-border/40 flex items-center justify-center hover:bg-brand-cream transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="text-right text-sm font-semibold text-brand-dark">
                        {formatPriceDollars(item.product.price * item.quantity)} $
                      </td>
                    </tr>
                  ))}
                  {donationAmount > 0 && (
                    <tr className="py-4">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setDonation(0)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                            <X size={16} />
                          </button>
                          <div className="w-14 h-14 rounded-lg bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-brand-gold text-xl">$</span>
                          </div>
                          <span className="text-sm font-medium text-brand-dark">Donation</span>
                        </div>
                      </td>
                      <td className="text-center text-sm">{formatPriceDollars(donationAmount)} $</td>
                      <td />
                      <td className="text-right text-sm font-semibold">{formatPriceDollars(donationAmount)} $</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Cart totals */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl border border-brand-border/30 p-6">
                <h2 className="font-bold text-brand-dark text-lg mb-4">Cart Totals</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPriceDollars(subtotal)} $</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-{formatPriceDollars(couponDiscount)} $</span>
                    </div>
                  )}
                  {donationAmount > 0 && (
                    <div className="flex justify-between text-brand-gold">
                      <span>Donation</span>
                      <span>+{formatPriceDollars(donationAmount)} $</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Shipping</span>
                    <span>{shippingFree ? "Free" : "Calculated at checkout"}</span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-dark text-base pt-3 border-t border-brand-border/30">
                    <span>Total</span>
                    <span>{formatPriceDollars(total)} $</span>
                  </div>
                </div>

                {/* Donation section */}
                <div className="bg-brand-cream-light rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-brand-dark text-sm mb-2">Donation</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Join our mission to support veteran suicide awareness and prevention. Together, we
                    can make a difference in the lives of our veterans.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-dark font-semibold">$</span>
                    <input
                      type="number"
                      min="1"
                      value={donationInput}
                      onChange={(e) => setDonationInput(e.target.value)}
                      className="flex-1 border border-brand-border/40 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-brand-cta"
                    />
                  </div>
                  <button
                    onClick={() => setDonation(Number(donationInput) || 0)}
                    className="mt-2 w-full btn-secondary text-sm py-2"
                  >
                    Add Donation
                  </button>
                </div>

                <Link to="/checkout" className="btn-primary w-full justify-center text-base py-4">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
