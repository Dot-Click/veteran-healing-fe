import MainLayout from "../components/layout/MainLayout";
import { MOCK_REVIEWS } from "../data/mockReviews";
import { Star } from "lucide-react";
import { ASSETS } from "../lib/assetPaths";

export default function ReviewsPage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center bg-brand-primary overflow-hidden w-full"
        style={{ backgroundImage: `url(${ASSETS.REVIEWS_BG})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/60" aria-hidden="true" />
        <div className="relative container-site text-center w-full">
          <h1 className="text-5xl lg:text-6xl font-bold text-white">Reviews</h1>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})` }}
      >
        <div className="container-site">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary text-center mb-3">
            What Our Community Is Saying
          </h2>
          <p className="text-brand-primary text-center max-w-2xl mx-auto mb-4 text-lg leading-relaxed">
            At Veteran Healing, we don't just make wellness products — we build trust, support, and
            transformation.
          </p>
          <p className="text-brand-primary text-center text-lg mb-12">
            Here's what real veterans and supporters have to say about their experience with our
            handcrafted remedies:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="bg-brand-cream-light rounded-xl border border-brand-border/20 p-6 relative"
              >
                <div className="flex gap-0.5 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{review.body}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-primary font-bold text-sm">{review.author[0]}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-brand-dark">{review.author}</p>
                      <p className="text-xs text-brand-accent">{review.productName}</p>
                    </div>
                  </div>
                  <span className="text-brand-border/40 text-5xl font-serif leading-none">"</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
