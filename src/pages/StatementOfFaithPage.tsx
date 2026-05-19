import MainLayout from "../components/layout/MainLayout";
import { ASSETS } from "../lib/assetPaths";

const FAITH_POINTS = [
  {
    num: 1,
    title: "Faith In The Human Spirit:",
    body: "We believe in the inherent resilience and strength of the human spirit. Regardless of the challenges faced, we trust in the capacity of every individual, especially veterans, to overcome adversity and thrive with the right support and resources.",
  },
  {
    num: 2,
    title: "Compassion And Empathy:",
    body: "Central to our faith is the value of compassion and empathy. We understand the struggles and traumas that veterans may endure, and we approach each individual with kindness, understanding, and a willingness to listen without judgment.",
  },
  {
    num: 3,
    title: "Commitment To Service:",
    body: "Our faith inspires us to serve others selflessly. We are dedicated to providing comprehensive support and resources to veterans, recognizing their unique needs and the sacrifices they’ve made for our country.",
  },
  {
    num: 4,
    title: "Pursuit Of Healing:",
    body: "We believe in the possibility of healing and restoration for every individual. Through evidence-based practices, therapeutic interventions, and a supportive community, we strive to facilitate healing journeys that encompass physical, emotional, and spiritual well-being.",
  },
  {
    num: 5,
    title: "Unity And Solidarity:",
    body: "Our faith calls us to foster unity and solidarity within the veteran community and beyond. We recognize the strength that comes from standing together, supporting one another, and advocating for the rights and well-being of all veterans.",
  },
  {
    num: 6,
    title: "Gratitude And Honor:",
    body: "We hold deep gratitude for the service and sacrifices of veterans. It is our privilege to honor their contributions by providing unwavering support, respect, and dignity in all aspects of our work.",
  },
  {
    num: 7,
    title: "Trust In Divine Guidance:",
    body: "Finally, our faith instills in us a trust in divine guidance. We believe that through faith, prayer, and spiritual reflection, we can find wisdom, guidance, and strength to carry out our mission with integrity and compassion.",
  },
];

export default function StatementOfFaithPage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] lg:min-h-[80vh] flex items-center bg-brand-primary overflow-hidden w-full"
        style={{ backgroundImage: `url(${ASSETS.SLIDER_1})` }}
      >
        <div className="absolute inset-0 bg-brand-primary/70" aria-hidden="true" />
        <div className="relative container-site text-center w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Statement of Faith</h1>
        </div>
      </section>

      <section className="bg-green-100 py-16 lg:py-20"
        style={{ backgroundImage: `url(${ASSETS.CONTACT_BG})` }}  >
        <div className="container-site max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-10 text-lg font-bold">
            At Veteran Healing, our mission is rooted in the belief that every individual, particularly
            those who have served in the armed forces, deserves holistic healing and restoration. Our
            faith serves as the cornerstone of our organization, guiding our actions, principles, and
            commitment to serving those who have sacrificed for our nation.
          </p>

          <div className="space-y-8">
            {FAITH_POINTS.map((point) => (
              <div key={point.num} className="border-l-4 border-brand-cta pl-6">
                <h2 className="text-lg font-bold text-brand-dark mb-2">
                  {point.num}. {point.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
