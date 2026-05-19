import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { CheckCircle, BarChart2, Link2, DollarSign } from "lucide-react";
import { ASSETS } from "../lib/assetPaths";

// PENDING: Client confirmation needed - commission rate, payout method, approval process
const STEPS = [
  {
    icon: CheckCircle,
    title: "Get Approved",
    body: "Once approved, you'll gain access to your personalized affiliate dashboard.",
  },
  {
    icon: Link2,
    title: "Access Tools",
    body: "Download ready-made banners, links, and marketing materials.",
  },
  {
    icon: BarChart2,
    title: "Promote Effectively",
    body: "Use your platform to reach audiences who can benefit from our services.",
  },
  {
    icon: DollarSign,
    title: "Earn Commissions",
    body: "Earn recurring rewards for each successful referral you bring in.",
  },
];

const BENEFITS = [
  "Veteran Healing apparel",
  "Stickers and mission materials",
  "Select Veteran Healing products",
  "Community and outreach resources",
];

export default function AffiliatePage() {
  const [, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.AFFILIATE_BG})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/75" aria-hidden="true" />
        <div className="relative container-site py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Text */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                Become an Affiliate
              </h1>
              <h2 className="text-xl text-brand-gold font-semibold mb-4">
                Partner with Us. Make a Difference.
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed mb-2">
                Welcome to the Veteran Healing Affiliate Program.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                At Veteran Healing, our mission goes beyond products — it's about partnership. As an
                affiliate, you become part of a movement led by veterans, driven by purpose. Share our
                handcrafted wellness offerings and earn as you help others discover the healing power
                of nature.
              </p>
              <a
                href="https://www.facebook.com/VeteranHealing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Join Our Private Facebook Group
              </a>
            </div>

            {/* Login form */}
            <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-brand-border/40 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-cta"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="accent-brand-cta" />
                  <label htmlFor="remember" className="text-xs text-gray-600">Remember Me</label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="btn-primary w-full justify-center py-3"
                >
                  Log In
                </button>
                <a href="#" className="block text-center text-xs text-brand-cta hover:underline">
                  Lost your password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="bg-brand-cream-light py-16 lg:py-20">
        <div className="container-site">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark text-center mb-4">
            Join Veteran Healing Affiliate Program
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-2xl mx-auto mb-12">
            Unlock the easiest ways to greatly boost your online affiliate process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.title} className="bg-white rounded-xl p-6 text-center shadow-sm border border-brand-border/20">
                <div className="w-12 h-12 rounded-full bg-brand-cta/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon size={22} className="text-brand-cta" />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambassador Benefits */}
      <section className="bg-white py-16">
        <div className="container-site max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark text-center mb-4">Ambassador Benefits</h2>
          <p className="text-gray-600 text-sm text-center mb-8 leading-relaxed">
            Our affiliate program is built for individuals who genuinely believe in this mission and
            want to help expand access to veteran healing nationwide. This program is about
            representation, responsibility, and community — not promotion for promotion's sake.
          </p>
          <div className="bg-brand-cream-light rounded-xl p-6 mb-6">
            <h3 className="font-bold text-brand-dark mb-3">Ambassador Pack</h3>
            <p className="text-sm text-gray-600 mb-3">
              Approved affiliates receive a <strong>Veteran Healing Ambassador Pack</strong> as a
              welcome and thank-you, which may include:
            </p>
            <ul className="space-y-2">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-brand-cta flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-brand-cream-light rounded-xl p-5">
              <h3 className="font-semibold text-brand-dark mb-2">Who This Is For</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Veterans and supporters aligned with our values</li>
                <li>• Individuals committed to ethical, respectful outreach</li>
                <li>• Those who believe in transparency and quality of service</li>
              </ul>
            </div>
            <div className="bg-brand-cream-light rounded-xl p-5">
              <h3 className="font-semibold text-brand-dark mb-2">Commission Rate</h3>
              {/* PENDING: Client confirmation needed - exact commission rate and payout method */}
              <p className="text-sm text-gray-600">
                Earn a competitive commission on every referred sale. Contact us for current rate details.
              </p>
            </div>
          </div>

          <div className="text-center">
            <a href="mailto:support@veteranhealing.org" className="btn-primary">
              Contact Us to Apply
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
