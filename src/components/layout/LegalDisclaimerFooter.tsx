import { AlertTriangle } from "lucide-react";

export default function LegalDisclaimerFooter() {
  return (
    <section className="bg-brand-primary text-white py-8 px-4">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="flex items-center justify-center gap-2 font-bold text-base lg:text-lg mb-4">
            <AlertTriangle size={20} className="text-brand-gold" aria-hidden="true" />
            Disclaimer &amp; Legal Info
          </h3>
          <ul className="text-sm space-y-2 text-gray-200 text-left list-disc list-inside marker:text-gray-400">
            <li>
              All mushroom sacraments are for{" "}
              <strong className="text-white">
                research, religious, ceremonial, novelty, or souvenir purposes only.
              </strong>
            </li>
            <li>
              <strong className="text-white">Follow all local, state, and federal laws</strong> — we do
              not encourage illegal use.
            </li>
            <li>
              We <strong className="text-white">do not provide legal advice</strong> or make legal
              determinations.
            </li>
            <li>
              Veteran Healing is{" "}
              <strong className="text-white">not responsible</strong> for misuse or illegal use of our
              sacraments.
            </li>
            <li>
              We reserve the right to{" "}
              <strong className="text-white">cancel orders or ban users</strong> if sacraments are
              intended for illegal purposes.
            </li>
            <li>
              The FDA has{" "}
              <strong className="text-white">not approved mushrooms as medical treatment or cure.</strong>
            </li>
          </ul>
          <p className="mt-4 text-sm font-semibold text-white border-t border-brand-accent pt-4">
            Veteran Healing is a registered 501(c)(3) nonprofit organization and an official religious
            church recognized under IRS code 501(c)(3).
          </p>
        </div>
      </div>
    </section>
  );
}
