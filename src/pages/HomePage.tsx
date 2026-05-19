import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Leaf, Users, Star, ChevronRight } from "lucide-react";
import { FacebookIcon } from "../components/common/SocialIcons";
import MainLayout from "../components/layout/MainLayout";
import ProductCard from "../components/common/ProductCard";
import { FEATURED_PRODUCTS } from "../data/mockProducts";
import { MOCK_REVIEWS } from "../data/mockReviews";
import { ASSETS } from "../lib/assetPaths";

const IMPACT_STATS = [
  { value: "22", label: "Veterans lost daily to suicide" },
  { value: "100%", label: "Of profits go to prevention" },
  { value: "2021", label: "Veteran-founded & operated" },
  { value: "0", label: "Third parties — grown in-house" },
];

const MISSION_PILLARS = [
  {
    icon: Shield,
    title: "Veterans Supporting Veterans",
    body: "Founded by those who served, for those who served. We understand the invisible wounds because we carry them too.",
  },
  {
    icon: Leaf,
    title: "Grown In-House",
    body: "Everything we offer is grown and handled in-house — never outsourced — so you receive the highest quality sacrament with full accountability.",
  },
  {
    icon: Users,
    title: "Mission-First Nonprofit",
    body: "100% of our profits go directly to veteran suicide prevention. Every purchase funds programs and initiatives fighting to bring that number down.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Are your sacraments legal?",
    a: "All sacraments are for research, religious, ceremonial, novelty, or souvenir purposes only. Follow all local, state, and federal laws. We do not encourage illegal use.",
  },
  {
    q: "How are your products grown?",
    a: "Everything is grown in-house in our veteran-operated facility. No third parties. No shortcuts. Full accountability from start to finish.",
  },
  {
    q: "What is the Free Microdose Guide?",
    a: "A free educational resource we offer to the veteran community covering evidence-based microdosing practices, rooted in faith and community support.",
  },
  {
    q: "How do you support veteran suicide prevention?",
    a: "100% of profits go directly to veteran suicide prevention programs and initiatives. Through awareness, community, and holistic healing — we're fighting to lower that 22-a-day number.",
  },
];

const HERO_SLIDES = [
  {
    image: ASSETS.SLIDER_1,
    heading: "Experience Natural Wellness",
    subheading: "Evaluate your well-being",
  },
  {
    image: ASSETS.SLIDER_2,
    heading: "Explore Our Premium Selection",
    subheading: "",
  },
  {
    image: ASSETS.SLIDER_3,
    heading: "Free Shipping on All Orders at Veteran Healing",
    subheading: "Enjoy the convenience of free shipping on every donation",
  },
];

export default function HomePage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <MainLayout>
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center bg-brand-primary overflow-hidden w-full"
        aria-label="Hero section"
      >
        {/* Background Slides */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                  }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-brand-primary/70" aria-hidden="true" />
            </div>
          );
        })}

        {/* Content Container */}
        <div className="relative container-site py-24 lg:py-32 z-10 w-full">
          <div key={currentSlideIndex} className="max-w-3xl animate-slide-up">
            {activeSlide.subheading && (
              <h5 className="text-brand-gold text-lg lg:text-xl font-semibold mb-3 tracking-wide uppercase">
                {activeSlide.subheading}
              </h5>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {activeSlide.heading}
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-xl">
              By Veterans, For Veterans. 100% of profits support veteran suicide awareness and
              prevention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary text-base px-8 py-4">
                Shop Now
              </Link>
              <Link
                to="/free-guide"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-md hover:bg-white hover:text-brand-primary transition-colors duration-200 inline-flex items-center gap-2 text-base"
              >
                Free Microdose Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlideIndex
                  ? "bg-brand-gold scale-125"
                  : "bg-white/50 hover:bg-white"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="bg-brand-cream-light py-16 lg:py-20"
        style={{ backgroundImage: `url(${ASSETS.ABOUT_BG})`, backgroundSize: 'cover' }}>
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-2">
              Our Sacraments
            </h2>
            <p className="text-gray-600 text-sm">
              Grown in-house. No third parties. 100% veteran-operated.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop" className="btn-primary">
              View All Sacraments
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Free Guide Banner ─── */}
      <section className="bg-brand-cream-light py-12 lg:py-16"
        style={{ backgroundImage: `url(${ASSETS.HEADER_BG})`, backgroundSize: 'cover' }}>
        <div className="container-site">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <span className="text-brand-cta text-sm font-semibold uppercase tracking-wide">
                Free Resource
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mt-2 mb-4">
                Free Microdose Guide for Veterans
              </h2>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {[
                  "A step-by-step microdosing guide tailored for veterans",
                  "Evidence-based tips for mindful use and safety",
                  "Occasional updates on programs, events, and resources",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-cta font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mb-6">100% free. No spam. Just genuine support.</p>
              <Link to="/free-guide" className="btn-primary">
                Get the Free Guide
              </Link>
            </div>
            <div className="flex-shrink-0">
              <img
                src={ASSETS.GUIDE_BG}
                alt="Free Veteran Wellness Guide"
                className="w-64 lg:w-80 h-auto rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof Strip ─── */}
      <section className="bg-brand-cream py-10">
        <div className="container-site">
          <p className="text-center text-gray-600 text-sm mb-6">
            The experiences shared below come from a community of{" "}
            <strong>38,000+ veterans</strong> nationwide who have accessed transformative microdosing
            education, resources, and support through Veteran Healing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-brand-border/20"
              >
                <div className="flex gap-0.5 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  {review.body}
                </p>
                <div>
                  <p className="font-semibold text-brand-dark text-sm">{review.author}</p>
                  <p className="text-xs text-gray-500">{review.productName}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/reviews"
              className="text-brand-cta font-semibold text-sm hover:underline inline-flex items-center gap-1"
            >
              Read All Reviews <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── About / Mission ─── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 max-w-xl">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                About Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mt-2 mb-6 leading-snug">
                Discover the Essence of Veteran Healing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Who We Are.</strong> We are a team of U.S. military veterans dedicated to
                providing natural, holistic healing alternatives for those who have served.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Why It Matters.</strong> At Veteran Healing, our mission is simple: to save
                lives. We believe in the power of community, holistic healing, and giving back to the
                brothers and sisters we served alongside.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>Why Mushrooms?</strong> Everything we offer is{" "}
                <strong>grown and handled in-house</strong>, from start to finish, never outsourced and
                never touched by third parties. This allows us to maintain full accountability,
                integrity, and respect for the sacrament.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/about" className="btn-primary">
                  Meet Our Team
                </Link>
                <a
                  href="https://www.facebook.com/VeteranHealing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <FacebookIcon size={16} />
                  Join Private Facebook Group
                </a>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <img
                src={ASSETS.TEAM_1}
                alt="Veterans serving veterans"
                className="rounded-xl aspect-[3/4] object-cover w-full"
                loading="lazy"
              />
              <img
                src={ASSETS.MUSHROOM_PRODUCT}
                alt="Veteran Healing products"
                className="rounded-xl aspect-[3/4] object-cover w-full mt-6"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── What Veteran Healing Is ─── */}
      <section className="bg-brand-cream-light py-16">
        <div className="container-site">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark text-center mb-4">
            What Veteran Healing Is
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12 text-sm">
            Founded by veterans to advance natural healing, Veteran Healing serves the community of
            those who have sacrificed for our nation. For us, it isn't merely a sacrament.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MISSION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-brand-border/20 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-4">
                  <pillar.icon size={22} className="text-brand-cta" />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section className="bg-brand-primary text-white py-16 lg:py-20">
        <div className="container-site text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            22 veterans a day lose their lives to suicide — we're here to change that.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
            Every day, countless veterans return home carrying invisible wounds — PTSD, depression,
            and the heavy weight of survivor's guilt. Traditional treatments often aren't enough, and
            many never find the alternatives they desperately need. That's why we exist: to offer
            natural, holistic healing and a community that understands.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl lg:text-5xl font-bold text-brand-gold mb-2">{stat.value}</p>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ─── Mission Image Strip ─── */}
      <section className="bg-brand-cream py-4">
        <div className="container-site">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
            {ASSETS.GALLERY.slice(0, 5).map((src, idx) => (
              <div
                key={idx}
                className="aspect-square bg-brand-border/20 rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Veteran Healing community image ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Join Mission CTA ─── */}
      <section className="bg-brand-cream-light py-16 lg:py-20">
        <div className="container-site text-center max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-4">
            Join our mission. Stand with veterans. Help save lives.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            <strong>At Veteran Healing, we're on a mission to save veterans' lives.</strong>
          </p>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">
            Every day, an average of 22 veterans die by suicide. We don't just talk about the problem
            — we act. <strong>100% of our profits go directly to veteran suicide prevention.</strong>{" "}
            Every dollar supports programs and initiatives designed to help bring that number down.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            Through awareness, resources, and a strong community, we fight to ensure every veteran
            gets the support and care they deserve. Join us — together, we can honor their sacrifice,
            end the stigma, and bring hope to those still in the fight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about" className="btn-primary">
              Get Involved
            </Link>
            <Link to="/donation" className="btn-secondary">
              Donate
            </Link>
            <Link to="/reviews" className="btn-secondary">
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-brand-cream py-16">
        <div className="container-site max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="bg-white rounded-xl border border-brand-border/30 p-5 group"
              >
                <summary className="font-semibold text-brand-dark cursor-pointer list-none flex justify-between items-center gap-4">
                  {item.q}
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 text-brand-cta group-open:rotate-90 transition-transform"
                  />
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Payment Methods ─── */}
      <section className="bg-brand-cream-light py-10">
        <div className="container-site text-center">
          <p className="text-gray-600 text-sm mb-4 font-medium">Safe and Secure Payment Options</p>
          <p className="text-xs text-gray-500 mb-4">These platforms are used on our checkout page</p>
          <div className="flex justify-center items-center gap-6">
            {/* PENDING: Replace with real payment processor logos when client confirms processor */}
            <div className="flex items-center gap-1.5 bg-[#00d632] text-white font-bold text-sm px-4 py-2 rounded-lg h-10">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
              Cash App
            </div>
            <div className="flex items-center gap-1.5 bg-[#6d1ed4] text-white font-bold text-sm px-4 py-2 rounded-lg h-10">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-4a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              Zelle
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
