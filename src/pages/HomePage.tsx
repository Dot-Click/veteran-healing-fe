import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Leaf, Users, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { FacebookIcon } from "../components/common/SocialIcons";
import MainLayout from "../components/layout/MainLayout";
import ProductCard from "../components/common/ProductCard";
import { FEATURED_PRODUCTS } from "../data/mockProducts";
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
    title: "VETERANS",
    body: "Founded by those who served, for those who served. We understand the invisible wounds because we carry them too.",
  },
  {
    icon: Leaf,
    title: "IN-HOUSE",
    body: "Everything we offer is grown and handled in-house — never outsourced — so you receive the highest quality sacrament with full accountability.",
  },
  {
    icon: Users,
    title: "NONPROFIT",
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

const TESTIMONIALS = [
  {
    id: 1,
    tag: "HOPE",
    body: "I was at my lowest point when I found this community. The sacraments and the support have given me a new lease on life. I am forever grateful.",
    author: "- Marcus V.",
    rating: 5,
  },
  {
    id: 2,
    tag: "FAITH",
    body: "The transparency and integrity of this veteran-operated group is unmatched. They grow everything in-house and really care about us.",
    author: "- Sarah T.",
    rating: 5,
  },
  {
    id: 3,
    tag: "TRUST",
    body: "Finally, something that works without the side effects of VA pharmaceuticals. The microdose guide was extremely helpful.",
    author: "- David K.",
    rating: 5,
  },
  {
    id: 4,
    tag: "HEALING",
    body: "Finding natural alternatives grown by brothers who understand the struggle has made all the difference. Highly recommend.",
    author: "- Jason L.",
    rating: 5,
  },
  {
    id: 5,
    tag: "COMMUNITY",
    body: "The private group support and direct accountability make this feel like a platoon again. I don't feel alone anymore.",
    author: "- Robert B.",
    rating: 5,
  },
  {
    id: 6,
    tag: "PEACE",
    body: "My anxiety and hypervigilance have decreased significantly. I can sleep through the night and be present for my family.",
    author: "- Daniel M.",
    rating: 5,
  },
  {
    id: 7,
    tag: "STRENGTH",
    body: "Veteran Healing is doing real work on the ground. Supporting their mission while receiving top-tier organic sacraments is a win-win.",
    author: "- Austin B.",
    rating: 5,
  },
  {
    id: 8,
    tag: "SUPPORT",
    body: "Everything is grown with extreme care. The level of respect they show for the medicine and the veteran community is inspiring.",
    author: "- Kevin M.",
    rating: 5,
  },
  {
    id: 9,
    tag: "WELLNESS",
    body: "A step-by-step approach to natural wellness that puts the veteran first. Grateful for their service and their dedication.",
    author: "- Rebecca L.",
    rating: 5,
  },
  {
    id: 10,
    tag: "PURPOSE",
    body: "This organization saved my life. Knowing 100% of profits go to suicide prevention makes every donation count.",
    author: "- Ethan B.",
    rating: 5,
  },
];

export default function HomePage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

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
      <section className="bg-brand-primary py-16 lg:py-24 text-white relative" aria-label="Featured Sacraments"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover' }}>
        <div className="container-site relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Find Relief From Anxiety, Depression &amp; PTSD with Veteran Grown Organic Mushroom Sacraments!
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark border-2 border-brand-gold hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 font-bold px-8 py-4 rounded-lg shadow-md"
            >
              View All Sacraments
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Free Guide Banner ─── */}
      <section className="bg-brand-cream-light py-16 lg:py-24 border-y border-brand-border/20"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover' }}>
        <div className="container-site">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Left Image Column */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-brand-border/30 bg-white p-3">
                <img
                  src={ASSETS.GUIDE_BG}
                  alt="Free Veteran Wellness Guide Book Cover"
                  className="w-full h-auto rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Form Column */}
            <div className="flex-1 w-full">
              <span className="text-brand-cta text-xs font-bold uppercase tracking-wider block mb-3">
                LIMITED QUANTITIES. FREE FOR ACTIVE DUTY, VETERANS &amp; IMMEDIATE FAMILY MEMBERS
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                Free Comprehensive Microdose Guide + Audiobook
              </h2>
              <ul className="space-y-4 text-gray-700 text-base mb-8">
                {[
                  "Full guide on how to integrate microdosing safely and effectively",
                  "Step-by-step instructions on dosage, schedules, and mindfulness",
                  "Audiobook version included for listening on the go",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-cta font-bold text-lg mt-0.5">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => e.preventDefault()} className="max-w-md space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 border border-brand-border/50 rounded-lg text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cta focus:border-transparent bg-white shadow-inner"
                  required
                />
                <button
                  type="submit"
                  className="w-full btn-primary bg-brand-cta hover:bg-brand-primary text-white font-semibold py-4 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 justify-center"
                >
                  GET MY FREE COPY NOW
                </button>
              </form>
              <p className="text-gray-400 text-xs mt-3">100% free. No spam. Just genuine support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Reviews Carousel ─── */}
      <section className="bg-green-800 py-20 lg:py-28 relative overflow-hidden" aria-label="Reviews and Testimonials">
        <div className="container-site">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Trust begins with transparency at Veteran Healing!
            </h1>
            <h5 className="text-gray-200 text-lg font-medium md:text-xl leading-relaxed mb-8">
              The experiences shared below come from a community of 40,000+ veterans nationwide who have accessed microdosing education, resources, and peer support through Veteran Healing.
            </h5>
            <div className="flex justify-center">
              <Link
                to="/reviews"
                className="btn-primary bg-brand-primary text-white hover:bg-brand-cta transition-colors duration-300 cursor-pointer hover:bg-white hover:border-brand-dark hover:text-brand-dark border-2 border-brand-primary"
              >
                Read All Reviews
              </Link>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 md:px-12">
            {/* Carousel Navigation Arrow Controls */}
            <button
              onClick={prevReview}
              className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-brand-border/40 shadow-md flex items-center justify-center hover:bg-brand-cream transition-colors duration-200 z-10"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} className="text-brand-cta" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-brand-border/40 shadow-md flex items-center justify-center hover:bg-brand-cream transition-colors duration-200 z-10"
              aria-label="Next review"
            >
              <ChevronRight size={20} className="text-brand-cta" />
            </button>

            {/* Testimonials Slide Frame */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${currentReviewIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {TESTIMONIALS.map((review) => (
                  <div
                    key={review.id}
                    className="w-full flex-shrink-0"
                    style={{
                      width: `calc(${100 / cardsPerView}% - ${((cardsPerView - 1) * 24) / cardsPerView}px)`,
                    }}
                  >
                    <div className="border border-brand-border/20 rounded-2xl p-6 md:p-8 bg-brand-cream shadow-sm flex flex-col justify-between min-h-[260px] h-full transition-all duration-300 hover:shadow-md">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
                          ))}
                        </div>
                        <span className="text-brand-gold font-bold text-xs tracking-widest uppercase block mb-3">
                          {review.tag}
                        </span>
                        <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                          "{review.body}"
                        </p>
                      </div>
                      <p className="font-semibold text-brand-dark text-sm border-t border-brand-border/10 pt-4">
                        {review.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About / Mission ─── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden" style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover' }}>
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Column - Content */}
            <div className="flex-1 max-w-xl">
              <span className="text-brand-cta text-xs font-bold uppercase tracking-widest block mb-2">
                About Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mt-2 mb-8 leading-snug">
                Discover the Essence of Veteran Healing
              </h2>

              <ul className="space-y-6 mb-8 text-gray-700">
                <li className="flex items-start gap-4">
                  <span className="text-brand-cta text-xl font-bold mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xl text-brand-dark text-base">Who We Help:</h4>
                    <p className="text-md text-gray-900 mt-1  font-semibold">Any U.S. veteran struggling with PTSD, depression, or purpose. You are not alone.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-brand-cta text-xl font-bold mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xl text-brand-dark text-base">How It Works:</h4>
                    <p className="text-md text-gray-900 mt-1  font-semibold">We provide sacramental microdoses to veterans in need. No catch. Just healing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-brand-cta text-xl font-bold mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xl text-brand-dark text-base">Why Mushrooms?</h4>
                    <p className="text-md text-gray-900 mt-1  font-semibold">Sacred fungi have been used for centuries to restore the soul. Science is finally catching up.</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about" className="btn-primary hover:bg-brand-primary text-white py-3 px-6 rounded-lg text-center font-semibold transition-all">
                  Meet Our Team
                </Link>
                <a
                  href="https://www.facebook.com/VeteranHealing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all py-3 px-6 rounded-lg border-2 border-brand-primary text-brand-primary font-semibold"
                >
                  <FacebookIcon size={16} />
                  Join Private Facebook Group
                </a>
              </div>
            </div>

            {/* Right Column - Images with beautiful hover effect */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full relative">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src={ASSETS.TEAM_1}
                  alt="Veterans serving veterans"
                  className="rounded-2xl aspect-[3/4] object-cover w-full transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 mt-8">
                <img
                  src={ASSETS.MUSHROOM_PRODUCT}
                  alt="Veteran Healing products"
                  className="rounded-2xl aspect-[3/4] object-cover w-full transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-1"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What Veteran Healing Is ─── */}
      <section className="bg-brand-cream-light py-20 lg:py-28 border-y border-brand-border/20">
        <div className="container-site">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark text-center mb-4">
            What Veteran Healing Is
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12 text-sm text-gray-700 font-semibold">
            <span className="flex items-center gap-1.5"><span className="text-brand-cta font-bold">✓</span> Veterans Supporting Veterans</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-cta font-bold">✓</span> Grown In-House</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-cta font-bold">✓</span> Mission-First Nonprofit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {MISSION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-brand-border/20 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-6 text-brand-cta transition-colors duration-300 group-hover:bg-brand-cta group-hover:text-white">
                  <pillar.icon size={24} />
                </div>
                <h3 className="font-semibold text-brand-dark text-lg mb-3">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section className="bg-brand-cream-light py-20 lg:py-28" aria-label="Impact and statistics">
        <div className="container-site">
          {/* Top Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {[ASSETS.GALLERY[0], ASSETS.GALLERY[1], ASSETS.GALLERY[2]].map((src, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500">
                <img
                  src={src}
                  alt={`Veterans in service ${idx + 1}`}
                  className="w-full aspect-[4/3] object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Bottom Content and Stats */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6 leading-snug">
              Supporting Veteran Suicide Awareness and Prevention with Veteran Healing
            </h2>
            <p className="text-gray-600 mb-12 text-sm md:text-base leading-relaxed">
              Every day, countless veterans return home carrying invisible wounds — PTSD, depression,
              and the heavy weight of survivor's guilt. Traditional treatments often aren't enough, and
              many never find the alternatives they desperately need. That's why we exist: to offer
              natural, holistic healing and a community that understands.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-t border-brand-border/20 pt-12">
              {IMPACT_STATS.map((stat) => (
                <div key={stat.label} className="p-4 bg-white rounded-xl shadow-sm border border-brand-border/10 transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-3xl lg:text-4xl font-bold text-brand-cta mb-2">{stat.value}</p>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── My Story Section ─── */}
      <section className="bg-brand-primary text-white py-20 lg:py-28 relative" aria-label="My Story">
        <div className="container-site">
          {/* Top Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {[ASSETS.STORY_JACK, ASSETS.STORY_KEANU, ASSETS.STORY_ELIJAH].map((src, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src={src}
                  alt={`Founder Story Image ${idx + 1}`}
                  className="w-full aspect-[3/4] object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Story Content */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">My Story</h2>
            <div className="space-y-4 text-gray-200 text-sm md:text-base leading-relaxed mb-10">
              <p>
                Founded by a veteran who found healing through these natural sacraments.
              </p>
              <p>
                After struggling with PTSD, anxiety, and depression, the journey to recovery led to the creation of Veteran Healing.
              </p>
              <p>
                Now, we help other veterans find their path to wellness and support suicide prevention.
              </p>
              <p className="font-semibold text-white">
                Join us in our mission to save lives. 100% of our profits go toward supporting veteran wellness.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                to="/affiliate"
                className="inline-flex items-center gap-2 bg-white text-brand-primary font-bold px-8 py-4 rounded-lg shadow-md hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Become an Affiliate
              </Link>
            </div>
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
