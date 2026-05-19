import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

// PENDING: Client confirmation needed - "1-to-1 donation" model exact definition
const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

export default function DonationPage() {
  const { setDonation } = useCart();
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState("");
  const [added, setAdded] = useState(false);

  const finalAmount = custom ? Number(custom) : amount;

  const handleAdd = () => {
    if (finalAmount > 0) {
      setDonation(finalAmount);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-brand-primary py-16">
        <div className="container-site text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Donation</h1>
          <p className="text-gray-300 text-sm max-w-lg mx-auto">
            Join our mission to support veteran suicide awareness and prevention.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream-light py-16">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-10 max-w-4xl mx-auto">
            {/* Donation form */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-brand-border/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold text-3xl">$</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-brand-dark">Donation</h2>
                    <p className="text-sm text-gray-500">0 $</p>
                  </div>
                </div>

                <h3 className="font-bold text-brand-dark text-lg mb-4">
                  Supporting Our Heroes: Join the Fight Against Veteran Suicide
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  At Veteran Healing, we're committed to combating veteran suicide. As a non-profit
                  organization, we donate <strong>all profits</strong> to suicide prevention
                  initiatives. Join us in honoring our veterans by supporting our cause. Together, we
                  can make a difference.
                </p>

                {/* Preset amounts */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setAmount(a); setCustom(""); }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                        finalAmount === a && !custom
                          ? "bg-brand-cta text-white border-brand-cta"
                          : "border-brand-border/40 text-brand-dark hover:border-brand-cta"
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-brand-dark font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Custom amount"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    className="flex-1 border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta"
                  />
                </div>

                <button
                  onClick={handleAdd}
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  {added ? "Added to Cart!" : "Add Donation"}
                </button>

                {added && (
                  <p className="text-center text-brand-cta text-sm mt-3 font-medium">
                    Donation added! <Link to="/cart" className="underline">View Cart</Link>
                  </p>
                )}
              </div>
            </div>

            {/* Impact */}
            <div className="flex-1 max-w-md">
              <h3 className="text-xl font-bold text-brand-dark mb-4">Your Impact</h3>
              <div className="space-y-4">
                {[
                  { amount: "$10", impact: "Helps fund community outreach resources for one veteran" },
                  { amount: "$25", impact: "Supports educational materials about natural healing alternatives" },
                  { amount: "$50", impact: "Contributes to veteran wellness program operational costs" },
                  { amount: "$100", impact: "Funds in-house growing operations that keep products accessible" },
                  { amount: "$250", impact: "Directly supports suicide prevention initiatives and programs" },
                ].map((item) => (
                  <div key={item.amount} className="flex gap-4 bg-white rounded-xl p-4 border border-brand-border/20">
                    <span className="text-2xl font-bold text-brand-gold flex-shrink-0">{item.amount}</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.impact}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-500 italic">
                {/* PENDING: Client confirmation needed - 1-to-1 donation model details */}
                Note: Veteran Healing is a registered 501(c)(3) nonprofit. Please consult your tax
                advisor regarding deductibility of donations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
