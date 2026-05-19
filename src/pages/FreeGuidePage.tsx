import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { ASSETS } from "../lib/assetPaths";

// PENDING: Client confirmation needed - guide format (PDF email, video course, etc.)
export default function FreeGuidePage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PENDING: Connect to email service (Brevo/SendGrid) in Phase 2
    setSubmitted(true);
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.GUIDE_BG})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/75" aria-hidden="true" />
        <div className="relative container-site py-20 text-center">
          <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Join our 501(c)(3) nonprofit community and discover safe, natural strategies to support
            veteran mental health.
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Get Your Free Veteran Microdose Guide
          </h1>
        </div>
      </section>

      <section className="bg-brand-cream-light py-16 lg:py-20">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-5xl mx-auto">
            {/* Form */}
            <div className="flex-1 max-w-lg w-full">
              <p className="text-brand-dark font-semibold mb-3">
                At Veteran Healing, we empower veterans with science-backed microdosing practices —
                rooted in faith, community, and holistic care. Sign up below to receive:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "A step-by-step microdose guide tailored for veterans",
                  "Evidence-based tips for mindful use and safety",
                  "Occasional updates on programs, events, and resources",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-brand-cta font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mb-8">100% free. No spam. Just genuine support.</p>

              {submitted ? (
                <div className="bg-brand-cta/10 border border-brand-cta/30 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-brand-dark text-lg mb-2">You're on the list!</h3>
                  <p className="text-gray-600 text-sm">
                    Check your inbox at <strong>{email}</strong> — your free guide is on the way.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-brand-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cta"
                  />
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Send Me the Guide
                  </button>
                </form>
              )}
            </div>

            {/* Guide cover image */}
            <div className="flex-shrink-0">
              <img
                src={ASSETS.FREE_GUIDE_COVER}
                alt="Free Veteran Wellness Guide"
                className="w-64 lg:w-80 h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
