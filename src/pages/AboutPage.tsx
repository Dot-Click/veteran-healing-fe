import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { MOCK_VETERAN_STORIES } from "../data/mockReviews";
import { FacebookIcon } from "../components/common/SocialIcons";
import { ASSETS } from "../lib/assetPaths";
import { CheckIcon } from "lucide-react";

export default function AboutPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const HERO_IMAGES = [ASSETS.SLIDER_2, ASSETS.HERO_BG];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [HERO_IMAGES.length]);

  // Order team cards as Keanu, Jack, Elijah
  const orderedStories = [
    MOCK_VETERAN_STORIES.find((s) => s.id === "s2")!,
    MOCK_VETERAN_STORIES.find((s) => s.id === "s1")!,
    MOCK_VETERAN_STORIES.find((s) => s.id === "s3")!,
  ].filter(Boolean);

  return (
    <MainLayout>
      {/* ─── Hero Section ─── */}
      <section
        className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center bg-brand-primary overflow-hidden w-full"
        aria-label="About Hero Section"
      >
        {/* Background Slides */}
        {HERO_IMAGES.map((img, idx) => {
          const isActive = idx === heroIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                  }`}
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-brand-primary/75" aria-hidden="true" />
            </div>
          );
        })}

        <div className="relative container-site py-28 lg:py-36 z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-transform duration-700">
            Veterans Helping Veterans Heal
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
            We are a team of U.S. military veterans dedicated to providing natural, holistic healing
            alternatives for those who have served. 100% of profits from our work go toward veteran
            suicide prevention programs.
          </p>
          <button
            onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary hover:bg-white hover:text-brand-primary text-white border border-white py-3 px-8 rounded-lg text-center font-semibold transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Meet Our Team
          </button>
        </div>
      </section>

      {/* ─── Our Mission Section ─── */}
      <section className="bg-white py-20 lg:py-28 border-b border-brand-border/10">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column - Content */}
            <div className="flex-1">
              <span className="text-brand-cta font-bold text-3xl text-brand-primary uppercase tracking-widest block mb-2">
                Our Mission
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                Saving Lives, Serving Each Other
              </h2>
              <div className="w-20 h-1 bg-brand-cta mb-6" />

              <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                <p className="text-lg font-semibold">
                  At Veteran Healing, our mission is simple, but critical.
                </p>
                <p>
                  We believe in the power of community, holistic healing, and giving back to the brothers
                  and sisters who served.
                </p>
                <p>
                  Everything we offer is grown and handled in-house, from start to finish, never outsourced
                  and never handled by third parties. This ensures we maintain full accountability, integrity,
                  and support for the veterans.
                </p>
              </div>

              {/* Bullet Checklist */}
              <ul className="space-y-3 mb-8">
                {[
                  "Holistic healing through sacraments",
                  "Veterans supporting veterans",
                  "Mission-first nonprofit structure",
                  "100% of profits dedicated to suicide prevention",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-800 text-sm font-semibold">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cream-light border border-brand-cta/20 flex items-center justify-center">
                      <CheckIcon size={12} className="text-brand-cta fill-brand-cta" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://www.facebook.com/VeteranHealing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 hover:bg-white hover:text-brand-primary transition-all duration-300 font-bold px-6 py-3.5 rounded-lg shadow-sm border border-brand-primary hover:border-brand-cta"
              >
                <FacebookIcon size={18} />
                Join Our Private Facebook Group →
              </a>
            </div>

            {/* Right Column - Images with hover rotate side animation */}
            <div className="w-full lg:flex-1 lg:max-w-none mt-10 lg:mt-0">
              {/* Mobile View: Grid of 2 images side-by-side (natural document flow, no absolute overlay overflow) */}
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white transform transition-transform duration-500 hover:rotate-2 hover:scale-105">
                  <img
                    src={ASSETS.HEADER_BG}
                    alt="US Flag overlay with pine trees"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white transform transition-transform duration-500 hover:-rotate-2 hover:scale-105">
                  <img
                    src={ASSETS.REVIEWER_5}
                    alt="Veteran Healing product mockup with flowers"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Desktop View: Overlapping absolute images */}
              <div className="hidden lg:block relative h-[450px] w-full">
                {/* Back Image (US Flag & Trees) */}
                <div className="absolute top-0 left-0 w-2/3 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition-transform duration-500 hover:rotate-3 hover:scale-105 z-0">
                  <img
                    src={ASSETS.HERO_BG}
                    alt="US Flag overlay with pine trees"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Front Image (Bottle and yellow flowers) */}
                <div className="absolute bottom-0 right-0 w-2/3 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white transform transition-transform duration-500 hover:rotate-6 hover:scale-105 z-10">
                  <img
                    src={ASSETS.REVIEWER_5}
                    alt="Veteran Healing product mockup with flowers"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Meet Our Team Section ─── */}
      <section id="team" className="bg-brand-cream py-20 lg:py-28">
        <div className="container-site">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center text-base mb-16 max-w-xl mx-auto font-medium">
            Veterans serving veterans. Each team member has lived the mission — and now dedicates
            their life to healing it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {orderedStories.map((story) => (
              <article
                key={story.id}
                className="bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-sm border border-brand-primary/15 p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-brand-primary"
              >
                {/* Larger rectangular (open) image */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-brand-cream border-2 border-brand-primary/10 shadow-sm transform transition-transform duration-500 hover:scale-105">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-brand-dark text-xl mb-1">{story.name}</h3>
                <p className="text-brand-cta text-sm font-semibold tracking-wider uppercase mb-4">
                  {story.branch}
                </p>
                <div className="w-12 h-0.5 bg-brand-border/40 mb-4" />
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {story.story}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Narrative Statistics Banner ─── */}
      <section className="bg-brand-primary text-white py-20 relative overflow-hidden" aria-label="Veterans Crisis Banner"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>

        {/* Subtle background overlay */}
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 0%, transparent 80%)`
          }}
        />
        <div className="container-site text-center max-w-4xl mx-auto px-4 relative z-10 flex items-center flex-col justify-center h-full p-19">

          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            22 veterans a day lose their lives to <br /> suicide we’re here to change that.
          </h2>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Every day, countless veterans return home carrying invisible wounds — PTSD, depression,
            and the heavy weight of survivor’s guilt. Traditional treatments often aren’t enough, and
            many never find the alternatives they desperately need. That’s why we exist: to offer
            natural, holistic healing and a community that understands.
          </p>
        </div>
      </section>

      {/* ─── Join our Mission / Save Lives Section ─── */}
      <section className="bg-green-100 py-20 lg:py-28"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container-site">
          {/* Horizontal Grid of 4 images above the heading */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {[
              ASSETS.PRODUCTS.CAPSULES,
              ASSETS.PRODUCTS.TRUST_PACK,
              ASSETS.PRODUCTS.MUSHROOM_FRUIT,
              ASSETS.MUSHROOM_PRODUCT
            ].map((src, idx) => (
              <div
                key={idx}
                className="aspect-square bg-brand-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={src}
                  alt={`Veteran Healing organic sacrament gallery image ${idx + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Heading and text */}
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-6 leading-tight">
              Join our mission. Stand with veterans. <br />
              <span className="text-brand-cta">Help save lives.</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base font-medium mb-12">
              <p>
                <strong>At Veteran Healing, we're on a mission to save veterans' lives.</strong>
              </p>
              <p>
                Every day, an average of 22 veterans die by suicide. We don't just talk about the problem
                — we act. <strong>100% of our profits go directly to veteran suicide prevention.</strong>{" "}
                Every dollar supports programs and initiatives designed to help bring that number down.
              </p>
              <p>
                Through awareness, resources, and a strong community, we fight to ensure every veteran
                gets the support and care they deserve. Join us — together, we can honor their sacrifice,
                end the stigma, and bring hope to those still in the fight.
              </p>
            </div>

            {/* Three Functional Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="btn-primary w-full sm:w-auto font-bold px-8 py-3.5 rounded-lg transition-transform duration-300 transform hover:-translate-y-0.5 text-center text-white"
              >
                Get Involved
              </Link>
              <Link
                to="/donation"
                className="btn-secondary w-full sm:w-auto font-bold px-8 py-3.5 rounded-lg border-2 border-[#113B2C] text-[#113B2C] hover:bg-[#113B2C] hover:text-white transition-all duration-300 text-center"
              >
                Donate
              </Link>
              <Link
                to="/reviews"
                className="btn-secondary w-full sm:w-auto font-bold px-8 py-3.5 rounded-lg border-2 border-[#113B2C] text-[#113B2C] hover:bg-[#113B2C] hover:text-white transition-all duration-300 text-center"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
