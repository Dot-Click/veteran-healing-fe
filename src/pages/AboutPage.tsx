import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { MOCK_VETERAN_STORIES } from "../data/mockReviews";
import { FacebookIcon } from "../components/common/SocialIcons";
import { ASSETS } from "../lib/assetPaths";

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-center bg-brand-primary bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.ABOUT_BG})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/75" aria-hidden="true" />
        <div className="relative container-site py-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Veterans Helping Veterans Heal
          </h1>
          <p className="text-gray-200 text-lg max-w-xl">
            We are a team of U.S. military veterans dedicated to providing natural, holistic healing
            alternatives for those who have served. 100% of profits from our work go toward veteran
            suicide prevention programs.
          </p>
          <Link to="/about#team" className="btn-primary mt-6 inline-flex">
            Meet Our Team
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-brand-cream-light py-16 lg:py-24">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mt-2 mb-6 leading-tight">
                Saving Lives,<br />Serving Each Other
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>At Veteran Healing, our mission is simple; to save lives.</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We believe in the power of community, holistic healing, and giving back to the brothers
                and sisters we served alongside.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Everything we offer is <strong>grown and handled in-house</strong>, from start to
                finish, never outsourced and never touched by third parties. This allows us to maintain
                full accountability, integrity, and respect for the sacrament.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Holistic healing through nature",
                  "Veterans supporting veterans",
                  "No third parties — grown in-house",
                  "100% of profits donated to suicide prevention",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-cta flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.facebook.com/VeteranHealing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <FacebookIcon size={16} />
                Join Our Private Facebook Group
              </a>
            </div>
            <div className="flex-1">
              <img
                src={ASSETS.MISSION_IMAGE}
                alt="Veteran Healing mission"
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-brand-cream py-16 lg:py-20">
        <div className="container-site">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark text-center mb-3">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center text-sm mb-12 max-w-xl mx-auto">
            Veterans serving veterans. Each team member has lived the mission — and now dedicates
            their life to healing it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {MOCK_VETERAN_STORIES.map((story) => (
              <article key={story.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-border/20 text-center p-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-brand-cream">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-brand-dark text-lg">{story.name}</h3>
                <p className="text-brand-cta text-sm font-medium mb-3">{story.branch}</p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">{story.story}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="bg-brand-primary text-white py-16">
        <div className="container-site text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            22 veterans a day lose their lives to suicide — we're here to change that.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
            Every day, countless veterans return home carrying invisible wounds. Traditional treatments
            often aren't enough. That's why we exist: to offer natural, holistic healing and a community
            that understands.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
