import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clock,
  Goal,
  HandCoins,
  HandHeart,
  Link2,
  Megaphone,
  PackageCheck,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { ASSETS } from "../lib/assetPaths";

const STEPS = [
  {
    icon: UserCheck,
    title: "Get Approved",
    body: "Once approved, you'll gain access to your personalized affiliate dashboard.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Access Tools",
    body: "Download ready-made banners, links, and marketing materials.",
  },
  {
    icon: Megaphone,
    title: "Promote Effectively",
    body: "Use your platform to reach audiences who can benefit from our services.",
  },
  {
    icon: HandCoins,
    title: "Earn Commissions",
    body: "Earn recurring rewards for each successful referral you bring in.",
  },
];

const AMBASSADOR_PACK = [
  "Veteran Healing apparel",
  "Stickers and mission materials",
  "Select Veteran Healing products",
  "Community and outreach resources",
];

const AUDIENCE_ITEMS = [
  "Veterans and supporters aligned with our values",
  "Individuals committed to ethical, respectful outreach",
  "Community leaders who believe in transparency and service",
];

const KEY_PLAYERS = [
  {
    icon: BriefcaseBusiness,
    label: "The Merchant",
    detail: "Veteran Healing",
  },
  {
    icon: HandHeart,
    label: "The Affiliate",
    detail: "You",
  },
  {
    icon: Users,
    label: "The Customer",
    detail: "Your Audience",
  },
];

const BENEFIT_CARDS = [
  {
    icon: Goal,
    title: "Mission-Driven",
    body: "Support veterans with natural healing while building your own revenue stream.",
  },
  {
    icon: Link2,
    title: "Unique Referral Links",
    body: "Each affiliate receives a custom tracking link to monitor performance.",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    body: "Every purchase helps veterans access meaningful healing resources.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Real-Time Analytics",
    body: "Track your clicks, signups, and commissions right from your dashboard.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Marketing Materials",
    body: "Access pre-designed assets like banners, copy, and email templates.",
  },
  {
    icon: Clock,
    title: "Set It and Earn",
    body: "Add your link once and earn commissions every time someone makes a purchase.",
  },
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
              <p className="text-gray-100 text-md leading-relaxed mb-2">
                Welcome to the Veteran Healing Affiliate Program.
              </p>
              <p className="text-gray-100 text-md leading-relaxed mb-4">
                At Veteran Healing, our mission goes beyond products &mdash; it&rsquo;s about
                partnership. As an affiliate, you become part of a movement led by veterans, driven
                by purpose. Share our handcrafted wellness offerings and earn as you help others
                discover the healing power of nature. With each referral, you support veteran-owned
                business and the wellness of countless lives. <br />
                Be sure to also check out our Facebook group for community support!
              </p>
              <a
                href="https://www.facebook.com/VeteranHealing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm hover:bg-white hover:text-brand-cta transition"
              >
                Join Our Private Facebook Group
              </a>
            </div>

            {/* Login form */}
            <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
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
                  <label htmlFor="remember" className="text-xs text-gray-600">
                    Remember Me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="btn-primary w-full justify-center py-3 hover:bg-white hover:text-brand-cta hover:border hover:border-green-700 transition-all"
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
      <section className="bg-gray-100 py-16 lg:py-24">
        <div className="container-site">
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark text-center mb-4">
            Join Veteran Healing Affiliate Program
          </h2>
          <p className="text-gray-700 text-center text-base max-w-2xl mx-auto mb-14">
            Unlock the easiest ways to greatly boost your online affiliate process.
          </p>

          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div
              className="hidden lg:block absolute left-[8%] right-[8%] top-10 h-1 bg-brand-border/35"
              aria-hidden="true"
            />
            {STEPS.map((step) => (
              <article
                key={step.title}
                className="group relative z-10 text-center transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-lg border-4 border-brand-cta bg-white text-brand-cta shadow-sm transition-all duration-300 group-hover:bg-brand-cta group-hover:text-white group-hover:shadow-xl">
                  <step.icon size={34} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-brand-dark text-lg mb-3">{step.title}</h3>
                <p className="mx-auto max-w-[240px] text-gray-700 text-base leading-relaxed">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ambassador Benefits */}
      <section
        className="bg-brand-primary py-16 lg:py-24"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: "contain" }}
      >
        <div className="container-site">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-6">
              Ambassador Benefits
            </h2>
            <div className="space-y-4 text-base lg:text-lg leading-relaxed text-gray-200 mb-10">
              <p>
                Our affiliate program is built for individuals who genuinely believe in this mission
                and want to help expand access to veteran healing nationwide.
              </p>
              <p>
                Affiliates serve as <strong>ambassadors of Veteran Healing</strong>, helping share
                our values, resources, and message with integrity. This program is about
                representation, responsibility, and community &mdash; not promotion for
                promotion&rsquo;s sake.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <article className="group bg-white/90 rounded-xl border border-brand-border/20 p-6 lg:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-cta/10 text-brand-cta transition-colors duration-300 group-hover:bg-brand-cta group-hover:text-white">
                  <PackageCheck size={28} />
                </div>
                <h3 className="font-bold text-brand-dark text-2xl mb-4">Ambassador Pack</h3>
                <p className="text-gray-800 text-base leading-relaxed mb-5">
                  Approved affiliates receive a{" "}
                  <strong>Veteran Healing Ambassador Pack</strong> as a welcome and thank-you, which
                  may include:
                </p>
                <ul className="space-y-3">
                  {AMBASSADOR_PACK.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-base font-medium text-gray-800"
                    >
                      <ShieldCheck
                        size={19}
                        className="mt-0.5 flex-shrink-0 text-brand-cta"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-800 text-base leading-relaxed mt-5">
                  These items are provided to help affiliates represent the mission authentically and
                  visibly, both online and in their local communities.
                </p>
              </article>

              <article className="group bg-white/90 rounded-xl border border-brand-border/20 p-6 lg:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-cta/10 text-brand-cta transition-colors duration-300 group-hover:bg-brand-cta group-hover:text-white">
                  <Users size={28} />
                </div>
                <h3 className="font-bold text-brand-dark text-2xl mb-4">Who This Is For</h3>
                <ul className="space-y-3 mb-5">
                  {AUDIENCE_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base font-medium text-gray-800">
                      <ShieldCheck
                        size={19}
                        className="mt-0.5 flex-shrink-0 text-brand-cta"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-800 text-base leading-relaxed">
                  Affiliates are expected to represent Veteran Healing with honesty, respect, and
                  care for those we serve.
                </p>
              </article>
            </div>

            <div className="text-center">
              <Link to="/contact" className="btn-primary border-2 border-white hover:bg-white hover:text-brand-cta transition">
                Contact Us to Apply
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 lg:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark mb-6">
                How It Works?
              </h2>
              <div className="space-y-5 text-base lg:text-lg text-gray-900 leading-relaxed">
                <p>
                  Affiliate marketing allows you to earn a commission by sharing products you
                  believe in. With the Veteran Healing Affiliate Program, you help veterans access
                  natural healing support and earn in the process.
                </p>

                <div>
                  <p className="font-bold mb-4">The 3 key players:</p>
                  <ul className="space-y-4">
                    {KEY_PLAYERS.map((player) => (
                      <li key={player.label} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-cta/10 text-brand-cta">
                          <player.icon size={20} aria-hidden="true" />
                        </span>
                        <span>
                          <strong>{player.label}</strong>{" "}
                          <em>({player.detail})</em>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p>
                  When someone purchases using your unique referral link, you earn a commission.
                  Simple as that.
                </p>
                <p>And the best part? You don&rsquo;t need to be a marketing expert to succeed.</p>
                <p>
                  Whether you&rsquo;re a veteran yourself, a wellness advocate, or simply someone
                  who believes in natural healing &mdash; your voice matters. By sharing real
                  experiences and trusted resources, you help others discover life-changing tools
                  while earning passive income
                </p>
                <p className="font-bold">
                  There&rsquo;s no pressure, no quotas &mdash; just meaningful impact and real
                  rewards.
                </p>
              </div>
            </div>

            <div className="space-y-10 lg:pt-2">
              <article className="text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-4">
                  The Merchant
                </h3>
                <p className="text-base lg:text-lg leading-relaxed text-gray-900">
                  We are a mission-driven organization committed to helping veterans reclaim
                  balance, strength, and purpose. Through holistic programs and transformative
                  resources, we offer real tools for healing and renewal. As the merchant, we handle
                  everything &mdash; from fulfillment and support to ensuring customer satisfaction
                  &mdash; so you can focus on sharing what matters.
                </p>
              </article>

              <article className="text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-4">
                  The Affiliate
                </h3>
                <p className="text-base lg:text-lg leading-relaxed text-gray-900">
                  You believe in our mission and want to be part of the impact. By joining our
                  affiliate program, you&rsquo;ll earn commissions for sharing our message and
                  products with your audience. We equip you with all the tools you need &mdash;
                  custom links, banners, and performance tracking &mdash; to make promoting feel
                  effortless and rewarding.
                </p>
              </article>

              <article className="text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-4">
                  The Customer
                </h3>
                <p className="text-base lg:text-lg leading-relaxed text-gray-900">
                  Your community trusts your recommendations. When they discover Veteran Healing
                  through your content, they gain access to a safe, empowering path toward wellness.
                  Whether it&rsquo;s for themselves or a loved one, your referrals can make a real
                  difference &mdash; and you get rewarded for the connection.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Benefits */}
      <section
        className="bg-brand-primary py-16 lg:py-24"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: "contain" }}
      >
        <div className="container-site">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-200 text-center mb-12">
            Explore the Benefits You Can Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {BENEFIT_CARDS.map((benefit) => (
              <article
                key={benefit.title}
                className="group bg-gray-100 rounded-xl border border-brand-border/20 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cta/10 text-brand-cta transition-all duration-300 group-hover:bg-brand-cta group-hover:text-white group-hover:scale-110">
                  <benefit.icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-brand-dark text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-800 text-base leading-relaxed">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-100 py-16 lg:py-24 text-center">
        <div className="container-site max-w-5xl">
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark mb-6">
            Join the Mission. Earn with Purpose.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed text-gray-900 mb-8">
            By becoming a Veteran Healing affiliate, you&rsquo;re not just promoting a product
            &mdash; you&rsquo;re supporting veterans on their path to healing. Share what you
            believe in, amplify impact, and earn meaningful commissions along the way.
          </p>
          <Link to="/contact" className="btn-primary border-2 border-white hover:bg-white hover:text-brand-cta hover:border-brand-cta transition">
            Contact Us Now
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
