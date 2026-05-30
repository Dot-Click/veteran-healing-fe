import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../hooks/useCart";
import { formatPriceDollars } from "../lib/utils";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida",
  "Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
  "Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska",
  "Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

// PENDING: Client confirmation needed - payment processor (Stripe, PayPal, etc.)
const PAYMENT_METHODS = [
  { id: "zelle", label: "Zelle", badgeColor: "bg-[#6d1ed4] text-white" },
  { id: "cashapp", label: "Cash App", badgeColor: "bg-[#00d632] text-white" },
];

export default function CheckoutPage() {
  const { items, subtotal, total, donationAmount } = useCart();

  if (items.length === 0) {
    return (
      <MainLayout>
        <section className="min-h-[60vh] flex items-center justify-center bg-brand-cream-light">
          <div className="text-center px-4">
            <h1 className="text-3xl font-bold text-brand-dark mb-4">Checkout</h1>
            <p className="text-gray-600 mb-6">Your cart is empty.</p>
            <Link to="/shop" className="btn-primary">Shop Sacraments</Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-brand-primary py-10">
        <div className="container-site">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Checkout</h1>
        </div>
      </section>

      <section className="bg-brand-cream-light py-12">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Billing form */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-brand-border/30 p-6">
                <h2 className="font-bold text-brand-dark text-lg mb-6">Billing Details</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="First Name" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="Last Name" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Company Name (optional)</label>
                    <input type="text" placeholder="Company Name" className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Country / Region <span className="text-red-500">*</span></label>
                    <select required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta bg-white">
                      <option value="US">United States (US)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Street address <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="House number and street name" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta mb-2" />
                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Town / City <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">State <span className="text-red-500">*</span></label>
                      <select required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta bg-white">
                        {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">ZIP Code <span className="text-red-500">*</span></label>
                      <input type="text" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="Phone" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Email Address" autoComplete="email" required className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">Order notes (optional)</label>
                    <textarea rows={3} placeholder="Notes about your order, e.g. special notes for delivery" className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta resize-none" />
                  </div>
                </form>
              </div>
            </div>

            {/* Order summary + payment */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-xl border border-brand-border/30 p-6 sticky top-24">
                <h2 className="font-bold text-brand-dark text-lg mb-4">Your Order</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm font-semibold text-gray-500 border-b pb-2">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedVariant?.id}`} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.product.name} × {item.quantity}</span>
                      <span className="font-medium">{formatPriceDollars(item.product.price * item.quantity)} $</span>
                    </div>
                  ))}
                  {donationAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Donation × 1</span>
                      <span className="font-medium">{formatPriceDollars(donationAmount)} $</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium">{formatPriceDollars(subtotal)} $</span>
                  </div>
                  <div className="flex justify-between font-bold text-brand-dark pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPriceDollars(total)} $</span>
                  </div>
                </div>

                {/* Coupon at checkout */}
                <details className="mb-4 text-sm">
                  <summary className="cursor-pointer text-brand-cta hover:underline">
                    Have a coupon? Click here to enter your coupon code
                  </summary>
                  <div className="flex gap-2 mt-3">
                    <input type="text" placeholder="Coupon code" className="flex-1 border border-brand-border/40 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-brand-cta" />
                    <button className="btn-primary text-xs py-1.5 px-3">Apply</button>
                  </div>
                </details>

                {/* Payment methods — PENDING: Real payment processor */}
                <div className="space-y-3 mb-4">
                  {PAYMENT_METHODS.map((method, i) => (
                    <label key={method.id} className="flex items-start gap-3 p-3 rounded-lg border border-brand-border/30 cursor-pointer hover:border-brand-cta transition-colors">
                      <input type="radio" name="payment" value={method.id} defaultChecked={i === 0} className="mt-1 accent-brand-cta" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-brand-dark">{method.label}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${method.badgeColor}`}>{method.label}</span>
                        </div>
                        {method.id === "zelle" && (
                          <div className="mt-2 text-xs text-gray-600 space-y-1">
                            <p>Send <strong>{formatPriceDollars(total)} $</strong> via Zelle or from your bank.</p>
                            <p className="text-brand-dark font-medium">Zelle details:</p>
                            {/* PENDING: Client confirmation needed - Zelle details */}
                            <p>Zelle Name: <strong>Veteran Healing</strong></p>
                            <p>Zelle Email: <strong>jackdell20@gmail.com</strong></p>
                            <p>Zelle Phone: <strong>7745050789</strong></p>
                            <p className="text-brand-cta">Please use your Order Number as payment reference.</p>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our privacy policy.
                </p>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
