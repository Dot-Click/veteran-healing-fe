

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Shield, Leaf, Users, Star, ChevronRight, ChevronLeft, Handshake, ChevronDown } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "../components/common/SocialIcons";
import MainLayout from "../components/layout/MainLayout";
import ProductCard from "../components/common/ProductCard";
import { useHomepageFeatured } from "../hooks/useFeaturedProducts";
import { ASSETS } from "../lib/assetPaths";
import api from "../services/api";
import ContentAreaLoader from "../components/common/ContentAreaLoader";
import { useTopReviews } from "../hooks/useReviews";
import { mapApiReviewToHomeCard } from "../types/review.types";
import MobileReviewCarousel from "../components/common/MobileReviewCarousel";

const IMPACT_STATS = [
  { value: "22", label: "Veterans lost daily to suicide" },
  { value: "100%", label: "Of profits go to prevention" },
  { value: "2021", label: "Veteran-founded & operated" },
  { value: "0", label: "Third parties — grown in-house" },
];

const MISSION_PILLARS = [
  {
    icon: Shield,
    title: "Veteran-Led",
    body: "Founded and operated by veterans who understand the weight of service, trauma, and life after the uniform. This mission is built on lived experience — not theory.",
  },
  {
    icon: Handshake,
    title: "Faith & Sacrament",
    body: "Our approach is rooted in spiritual grounding, conscience, and sacramental practice. Healing is treated with reverence, intention, and respect for each individual’s path.",
  },
  {
    icon: Users,
    title: "Mission-First Nonprofit",
    body: "We do not operate for profit. 100% of proceeds directly support veteran suicide prevention, outreach, and healing initiatives.",
  },
  {
    icon: Leaf,
    title: "Grown In-House",
    body: "Everything we offer is cultivated and handled by our own team. No outsourcing. No third parties. Full accountability from start to finish.",
  }
];

const FAQ_ITEMS = [
  {
    q: "Do your products contain psilocybin?",
    a: "Yes, all our products contain real psilocybin. We are dedicated to providing natural healing alternatives to support mental health and well-being, especially for veterans.",
  },
  {
    q: "Do you offer local delivery?",
    a: "Yes! For those living in the decriminalized areas of Sommerville, Medford and Cambridge, Massachusetts. Otherwise, we have mail order for those living in the other 49 states. ",
  },
  {
    q: "Can you ship to all 50 States?",
    a: "Yes! As a church organization protected under the Religious Freedoms Restoration Act of 1993, we are able to send the sacrament (mushroom capsules) to all of our donating members. So rest assured that wherever you are, your package is on the way! Discreet Shipping: We understand the importance of privacy. Your orders are shipped in discreet packaging for your confidentiality and peace of mind.",
  },
  {
    q: "Are you a farm to table church?",
    a: "Yes! Unlike most of the shady people invading this space as it gains popularity in the mainstream, we do not pull from third parties/unethical sources. ALL of our Sacraments are grown on our organic farm by fellow VETERANS.",
  },
  {
    q: "Is this Veteran owned and operated?",
    a: "Yes! We are Veteran owned and operated. Not to mention we only employ other veterans as well.",
  },
  {
    q: "Do you match donations to the Veteran Community?",
    a: "Yes! We match every sacrament that we send out by donating them directly 1-1 to veterans who cannot afford the medicine they depend on to live a normal life.",
  },
  {
    q: "Are there any specific instructions or guidelines for using your wellness products?",
    a: "Each of our products comes with detailed usage instructions on the packaging and on the bottom of each page on the desired sacrament. It is essential to follow these instructions carefully for optimal results and safety.",
  },
  {
    q: "Do your products have any certifications or third-party lab testing?",
    a: "Yes, our products undergo third-party lab testing to ensure purity, potency, and safety. We also hold various certifications that demonstrate our commitment to quality and compliance with industry standards.",
  },
  {
    q: "How can customers contact you for assistance or inquiries?",
    a: "We are here to assist you. Please feel free to contact our customer support team via support@veteranhealing.org",
  },
  {
    q: "How long will it take for my order to arrive?",
    a: "All orders are shipped within 3 business days of receiving your order.Most orders are delivered within 6-7 days from order date.",
  },
  {
    q: "How does Veteran Healing Church give back to the veteran community, and are there any initiatives or partnerships in place?",
    a: "At Veteran Healing, we are committed to supporting the veteran community. We actively participate in various initiatives and partnerships aimed at providing assistance and resources to veterans. Our commitment to community involvement is integral to our mission and values. 100% of our profits go to programs involved with Veteran mental health.",
  },
  {
    q: "How do you ensure customer satisfaction?",
    a: "100% Satisfaction: We prioritize your satisfaction above all else. If you're not completely satisfied with your purchase, please contact us, and we'll do everything we can to make it right.",
  },
  {
    q: "What is your customer service availability?",
    a: "6 Day Customer Service: Our dedicated support team is available seven days a week to assist you with any questions, concerns, or assistance you may need. Contact us anytime, and we'll be happy to help. Sunday is our day off. ",
  }
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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [guideEmail, setGuideEmail] = useState("");
  const [guideSubmitted, setGuideSubmitted] = useState(false);
  const [guideLoading, setGuideLoading] = useState(false);
  const { data: topReviewsData, isLoading: reviewsLoading } = useTopReviews(10);
  const { data: homepageFeatured, isLoading: featuredLoading } = useHomepageFeatured();

  const featuredProducts = homepageFeatured?.homepage.map((p) => p.product) ?? [];
  const socialPlacements = homepageFeatured?.social ?? [];
  const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/veteranhealing";

  const testimonials = useMemo(
    () => (topReviewsData?.items ?? []).map(mapApiReviewToHomeCard),
    [topReviewsData]
  );

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideEmail) return;

    setGuideLoading(true);
    try {
      await api.post("/email/send-guide", { email: guideEmail });
      setGuideSubmitted(true);
      toast.success("Check your inbox for the free guide!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send guide. Please try again.");
    } finally {
      setGuideLoading(false);
    }
  };

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
    setCurrentReviewIndex(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevReview = () => {
    if (testimonials.length === 0) return;
    setCurrentReviewIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextReview = () => {
    if (testimonials.length === 0) return;
    setCurrentReviewIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <MainLayout>
      {/* ─── Hero ─── */}
      <section
        className="relative h-[calc(100vh-7rem)] max-h-[calc(100vh-7rem)] flex items-center bg-brand-primary overflow-hidden w-full before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(245,166,35,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_20%)] before:pointer-events-none"
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
        <div className="relative container-site py-6 lg:py-10 z-10 w-full">
          <div key={currentSlideIndex} className="max-w-4xl animate-slide-up rounded-[24px] sm:rounded-[32px] border border-white/10 bg-black/18 p-4 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold uppercase tracking-[0.20em] sm:tracking-[0.25em] text-brand-gold mb-3 sm:mb-5">
              Veteran Healing Mission
            </div>
            {activeSlide.subheading && (
              <h5 className="text-brand-gold text-sm sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 tracking-wide uppercase">
                {activeSlide.subheading}
              </h5>
            )}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-6 max-w-3xl">
              {activeSlide.heading}
            </h1>
            <p className="text-gray-100 text-sm sm:text-lg mb-4 sm:mb-8 max-w-2xl leading-relaxed">
              By Veterans, For Veterans. 100% of profits support veteran suicide awareness and
              prevention through a modern, trustworthy, mission-first experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-[0_12px_24px_rgba(15,64,47,0.35)] hover:-translate-y-0.5"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 0);
                }}
              >
                Shop Now
              </Link>
              <Link
                to="/free-guide"
                className="border border-white/80 bg-white/8 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-brand-primary transition-all duration-200 inline-flex items-center gap-2 text-sm sm:text-base shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 200);
                }}
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
      <section className="bg-brand-primary py-16 lg:py-24 text-white relative overflow-hidden" aria-label="Featured Sacraments"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,59,44,0.92),rgba(17,59,44,0.86))]" />
        <div className="container-site relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold mb-4">Featured collection</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Find Relief From Anxiety, Depression &amp; PTSD with Veteran Grown Organic Mushroom Sacraments!
            </h2>
            <p className="mt-4 text-base text-gray-200 max-w-2xl mx-auto">A clearer, calmer shopping experience with premium cards and a more refined path from mission to product.</p>
          </div>
          {featuredLoading ? (
            <ContentAreaLoader variant="skeleton-cards" count={4} />
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-gray-300 py-8">Featured sacraments coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/shop"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 200);
              }}
              className="inline-flex items-center gap-2 bg-brand-primary text-brand-light border border-white/20 hover:bg-white hover:text-brand-primary hover:border-white transition-all duration-300 font-bold px-8 py-4 rounded-full shadow-[0_16px_30px_rgba(0,0,0,0.18)]"
            >
              View All Sacraments
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Free Guide Banner ─── */}
      <section className="bg-brand-cream-light py-20 lg:py-24 border-y border-brand-border/25 relative overflow-hidden"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,245,220,0.92),rgba(252,252,241,0.88))]" />
        <div className="container-site relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Left Image Column */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative group overflow-hidden rounded-[28px] shadow-[0_24px_50px_rgba(17,59,44,0.18)] border border-brand-border/30 bg-white p-3">
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
              <span className="inline-flex items-center rounded-full border border-brand-cta/10 bg-brand-cta/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-cta mb-4">
                LIMITED QUANTITIES. FREE FOR ACTIVE DUTY, VETERANS &amp; IMMEDIATE FAMILY MEMBERS
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6 leading-tight tracking-tight">
                Free Comprehensive Microdose Guide + Audiobook
              </h2>
              <ul className="space-y-3 text-gray-700 text-base mb-8">
                {[
                  "Full guide on how to integrate microdosing safely and effectively",
                  "Step-by-step instructions on dosage, schedules, and mindfulness",
                  "Audiobook version included for listening on the go",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-brand-border/20 bg-white/90 p-4 shadow-[0_10px_24px_rgba(17,59,44,0.08)]">
                    <span className="mt-0.5 rounded-full bg-brand-cta/10 px-2 py-1 text-brand-cta text-sm font-bold">✓</span>
                    <span className="font-medium text-brand-dark">{item}</span>
                  </li>
                ))}
              </ul>
              {guideSubmitted && (
                <>
                  {/*
                    This effect will set guideSubmitted back to false after 5 seconds,
                    thus hiding the message automatically.
                  */}
                  {(() => {
                    // useEffect isn't available here, so use a side-effecty IIFE.
                    setTimeout(() => {
                      // Only reset if still seeing thanks message
                      if (guideSubmitted) {
                        setGuideSubmitted(false);
                      }
                    }, 5000);
                    return null;
                  })()}
                </>
              )}

              {guideSubmitted ? (
                <div className="max-w-md bg-brand-cta/10 border border-brand-cta/30 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-brand-dark text-lg mb-2">You're on the list!</h3>
                  <p className="text-gray-600 text-sm">
                    Check your inbox at <strong>{guideEmail}</strong> — your free guide is on the way.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGuideSubmit} className="max-w-md space-y-3 animate-slide-up">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={guideEmail}
                    onChange={(e) => setGuideEmail(e.target.value)}
                    className="w-full px-5 py-4 border border-brand-border/60 rounded-2xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cta focus:border-transparent bg-white/95 shadow-[0_10px_24px_rgba(17,59,44,0.08)]"
                    required
                  />
                  <button
                    type="submit"
                    disabled={guideLoading}
                    className="w-full btn-primary bg-brand-cta hover:bg-brand-primary text-white font-semibold py-4 rounded-2xl shadow-[0_12px_24px_rgba(15,64,47,0.25)] transition-all duration-300 transform hover:-translate-y-0.5 justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {guideLoading ? "Sending..." : "GET MY FREE COPY NOW"}
                  </button>
                </form>
              )}
              <p className="text-brand-dark/70 text-xs mt-3 tracking-wide">100% free. No spam. Just genuine support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Reviews Carousel ─── */}
      <section className="bg-brand-primary py-20 lg:py-28 relative overflow-hidden" aria-label="Reviews and Testimonials">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,166,35,0.12),_transparent_24%)]" />
        <div className="container-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <span className="inline-flex items-center rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold mb-4">Community trust</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Trust begins with transparency at Veteran Healing!
            </h1>
            <h5 className="text-gray-200 text-lg font-medium md:text-xl leading-relaxed mb-8">
              The experiences shared below come from a community of 40,000+ veterans nationwide who have accessed microdosing education, resources, and peer support through Veteran Healing.
            </h5>
            <div className="flex justify-center">
              <Link
                to="/reviews"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 200);
                }}
                className="btn-primary bg-brand-primary text-white hover:bg-brand-cta transition-colors duration-300 cursor-pointer hover:bg-white hover:border-brand-dark hover:text-brand-dark border-2 border-brand-primary"
              >
                Read All Reviews
              </Link>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto px-2 sm:px-4 md:px-12">
            {reviewsLoading ? (
              <ContentAreaLoader
                variant="skeleton-cards"
                count={3}
                className="max-w-4xl mx-auto grid-cols-1 md:grid-cols-3"
              />
            ) : testimonials.length === 0 ? (
              <p className="text-center text-gray-300 py-12">Reviews coming soon.</p>
            ) : (
              <>
                {/* Carousel Navigation Arrow Controls - show on tablets and up, mobile uses swipe/scroll */}
                <button
                  onClick={prevReview}
                  className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-brand-border/40 shadow-md flex items-center justify-center hover:bg-brand-cream transition-colors duration-200 z-10 hidden sm:flex"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} className="text-brand-cta" />
                </button>
                <button
                  onClick={nextReview}
                  className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-brand-border/40 shadow-md flex items-center justify-center hover:bg-brand-cream transition-colors duration-200 z-10 hidden sm:flex"
                  aria-label="Next review"
                >
                  <ChevronRight size={20} className="text-brand-cta" />
                </button>

                {/* --- Mobile swipeable carousel with center card + neighbors & auto scroll --- */}
                <MobileReviewCarousel testimonials={testimonials} />

                {/* --- Desktop/Tablet carousel: show centered card among three, using translateX --- */}
                <div className="hidden sm:block overflow-hidden w-full relative">
                  <div
                    className="flex gap-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentReviewIndex * (100 / cardsPerView)}%)`,
                    }}
                  >
                    {testimonials.map((review) => (
                      <div
                        key={review.id}
                        className="w-full flex-shrink-0"
                        style={{
                          width: `calc(${100 / cardsPerView}% - ${((cardsPerView - 1) * 24) / cardsPerView}px)`,
                        }}
                      >
                        <div className="border border-brand-border/20 rounded-[28px] p-6 md:p-8 bg-white/95 shadow-[0_20px_40px_rgba(17,59,44,0.14)] flex flex-col justify-between min-h-[260px] h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(17,59,44,0.18)]">
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
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── About / Mission ─── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden relative" style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(245,245,220,0.88))]" />
        <div className="container-site relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Column - Content */}
            <div className="flex-1 max-w-xl">
              <span className="text-brand-cta text-xs font-bold uppercase tracking-widest block mb-2">
                About Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mt-2 mb-8 leading-snug">
                Discover the Essence of Veteran Healing
              </h2>

              <ul className="space-y-4 mb-8 text-gray-700">
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
                <Link to="/about" 
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 200);
                }}
                className="btn-primary hover:bg-brand-primary text-white py-3 px-6 rounded-lg text-center font-semibold transition-all">
                  Meet Our Team
                </Link>
                <a
                  href="https://www.facebook.com/VeteranHealing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 200);
                  }}
                  className="btn-secondary flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all py-3 px-6 rounded-lg border-2 border-brand-primary text-brand-primary font-semibold"
                >
                  <FacebookIcon size={16} />
                  Join Private Facebook Group
                </a>
              </div>
            </div>

            {/* Right Column - Images with stagger effect */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full relative pb-10">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 -translate-y-6 sm:-translate-y-8">
                <img
                  src={ASSETS.TEAM_1}
                  alt="Veterans serving veterans"
                  className="rounded-2xl aspect-[3/4] object-cover w-full transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
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
      <section className="bg-brand-primary py-20 lg:py-28 border-y border-brand-border/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,166,35,0.10),_transparent_25%)]" />
        <div className="container-site">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-4">
            What Veteran Healing Is
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12 text-sm text-gray-100 font-semibold">
            <span className="flex items-center gap-1.5"><span className="text-brand-light text-lg font-bold">✓</span> Veterans Supporting Veterans</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-light text-lg font-bold">✓</span> Faith & Sacrament</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-light text-lg font-bold">✓</span> Mission-First Nonprofit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {MISSION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-[28px] bg-white/95 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.14)] border border-white/30 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]"
              >
                <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-6 text-brand-cta transition-colors duration-300 group-hover:bg-brand-cta group-hover:text-white">
                  <pillar.icon size={24} />
                </div>
                <h3 className="font-semibold text-brand-dark text-lg mb-3">{pillar.title}</h3>
                <p className="text-brand-dark text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/about" 
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 200);
            }}
            className="btn-primary text-black border border-white py-3 px-6 rounded-lg text-center font-semibold transition-all hover:text-brand-primary hover:border-gray-100 hover:bg-gray-100/90 ">
              Learn About Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section className="bg-brand-cream/90 py-20 lg:py-28" aria-label="Impact and statistics"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'contain' }}>
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
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-cta mb-6">Why We Do This</h2>
            <p className="text-brand-primary mb-12 text-md md:text-xl leading-relaxed">
              Everyday, 22 veterans die by suicide. <br />
              We don’t just talk about it  we act. <br /><br />

              At <b>Veteran Healing</b>, we’re on the front lines of <b>suicide prevention</b> through natural, sacramental healing.
              This fight is personal. <br />These are our brothers and sisters. <br />

              “These microdoses saved my life.” <br />
              — Marine Veteran, AZ <br /><br />

              “Finally felt peace.” <br />
              — Army Vet, TX
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
      <section className="bg-brand-primary text-white py-20 lg:py-28 relative" aria-label="My Story"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
            <div className="space-y-4 text-gray-200 text-lg md:text-base leading-relaxed mb-10">
              <p className="font-semibold text-lg">
                Coming home was supposed to be the easy part. <br />
                But it wasn’t.
              </p>
              <p className="font-semibold text-lg">
                I’m Jack Delli Priscoli, United States Air Force, missile munitions. <br />
                I left the military searching for peace, but I felt lost. <br />
                No structure. No brotherhood. Just the weight of memories I couldn’t shake.
              </p>
              <p className="font-semibold text-lg">
                Then I found mushrooms, not recreational, not a trend, but something real, natural, and ancient. <br />
                Learning to grow them brought clarity, calm, and purpose back into my life.
              </p>
              <p className="font-bold text-lg text-white">
                That’s why in 2021, I started Veteran Healing to help other veterans find their way forward, break the silence, and heal through a natural, faith-based path. <br />
                <br />
                For the ones we lost. <br />
                And the ones still fighting.
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                to="/affiliate"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 200);
                }}
                className="inline-flex items-center gap-2 bg-white text-brand-primary font-bold px-8 py-4 rounded-lg shadow-md hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Become an Affiliate
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* ─── Social Media Section ─── */}
      <section className="relative bg-white py-16 border-t border-brand-border/10" aria-label="Social Media Feed">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-border/30 to-transparent" />
        <div className="container-site">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full border border-brand-border/20 bg-brand-cream-light px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-brand-cta">Instagram</span>
              <InstagramIcon size={22} className="text-brand-cta" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
              Follow Us on Instagram
            </h2>
          </div>

          {featuredLoading ? (
            <ContentAreaLoader
              variant="skeleton-cards"
              count={5}
              className="max-w-5xl mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
            />
          ) : socialPlacements.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Follow us on Instagram for updates.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {socialPlacements.map((placement, idx) => (
                <a
                  key={placement.id}
                  href={placement.linkUrl ?? DEFAULT_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group aspect-square rounded-[22px] overflow-hidden shadow-[0_14px_30px_rgba(17,59,44,0.12)] hover:shadow-[0_20px_40px_rgba(17,59,44,0.18)] transition-all duration-300 block border border-brand-border/10"
                >
                  <img
                    src={placement.product.images[0]}
                    alt={placement.product.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <InstagramIcon
                      size={32}
                      className="text-white transform scale-75 group-hover:scale-100 transition-transform duration-300"
                    />
                  </div>
                  <span className="sr-only">
                    {placement.product.name} — social post {idx + 1}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Free Guide Middle Callout ─── */}
      <section className="bg-brand-primary text-white py-16 text-center relative overflow-hidden" aria-label="Free Microdose Guide Callout">
        {/* Decorative background overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at center, #F5A623 0%, transparent 70%)`
          }}
        />
        <div className="container-site relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[#F5A623] text-xs md:text-sm font-bold uppercase tracking-wider block mb-3">
            LIMITED QUANTITIES. FREE FOR ACTIVE DUTY, VETERANS &amp; IMMEDIATE FAMILY MEMBERS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight">
            Free Comprehensive Microdose Guide + Audiobook
          </h2>
          <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto mb-8">
            Learn how to safely cultivate and integrate natural sacraments for relief and healing.
          </p>
          <div className="flex justify-center">
            <Link
              to="/free-guide"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 200);
              }}
              className="inline-flex items-center gap-2 bg-[#F5A623] text-brand-primary hover:bg-white hover:text-brand-primary transition-all duration-300 font-extrabold px-10 py-4 rounded-lg shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wider text-sm md:text-base"
            >
              GET MY FREE COPY NOW
            </Link>
          </div>
          <p className="text-gray-300 text-xs mt-4">100% free. No spam. Just genuine support.</p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-brand-cream-light py-20 lg:py-28 border-t border-brand-border/10" aria-label="Frequently Asked Questions">
        <div className="container-site max-w-4xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-brand-border/20 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className={`w-full text-left px-6 py-5 flex justify-between items-center gap-4 transition-all duration-300 ${isOpen ? "bg-brand-primary text-white" : "bg-white hover:bg-brand-cream-light/30 text-brand-dark"
                      }`}
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base md:text-lg">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#F5A623]" : "text-brand-cta"
                        }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                  >
                    <div className="px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-brand-border/5">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Payment Methods ─── */}
      <section className="bg-gray-200 py-16 border-t border-brand-border/10">
        <div className="container-site text-center max-w-3xl mx-auto rounded-[32px] border border-brand-border/10 bg-white/80 p-8 shadow-[0_18px_40px_rgba(17,59,44,0.10)]">
          <h2 className="text-4xl font-bold text-brand-dark mb-2">
            Safe and Secure Payment Options
          </h2>
          <p className="text-lg text-gray-500 mb-8 font-medium">
            We offer secure payments via Cash App and Zelle
          </p>

          <div className="flex justify-center items-center gap-12">
            {/* Cash App Card */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-[#00D632] flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="text-white text-3xl font-extrabold select-none">$</span>
              </div>
              <span className="text-brand-dark font-bold text-sm tracking-wide">
                Cash App
              </span>
            </div>

            {/* Zelle Card */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-[#7414CA] flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="w-7 h-7 text-white select-none">
                  <path d="M18 5H6l12 14H6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 3v18" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-brand-dark font-bold text-sm tracking-wide">
                Zelle
              </span>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
