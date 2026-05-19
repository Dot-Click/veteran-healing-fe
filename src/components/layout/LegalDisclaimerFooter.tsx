import { AlertTriangle } from "lucide-react";
import { ASSETS } from "../../lib/assetPaths";

export default function LegalDisclaimerFooter() {
  return (
    <section className="bg-brand-primary text-white py-16 px-4 relative overflow-hidden" aria-label="Medical and Legal Disclaimer">
      {/* Subtle background overlay */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url(${ASSETS.DISCLAIMER_BG})`, backgroundSize: 'cover'
        }}
      />

      <div className="container-site text-center max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        {/* Logo at the top */}
        <div className="mb-2 transform transition-transform duration-300 hover:scale-105">
          <img
            src="/logo.webp"
            alt="Veteran Healing Logo"
            className="w-24 h-auto filter brightness-95 hover:brightness-100 transition-all duration-300"
          />
        </div>

        {/* Warning Title */}
        <h3 className="flex items-center justify-center gap-2 font-bold text-lg lg:text-xl text-[#F5A623] tracking-wide">
          <AlertTriangle size={24} className="fill-[#F5A623] text-brand-primary" aria-hidden="true" />
          Disclaimer & Legal Info
        </h3>

        {/* Bullet points list */}
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
            • All mushroom sacraments are for research, religious, ceremonial, novelty, or souvenir purposes only.
          </p>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
            • Follow all local, state, and federal laws — we do not encourage illegal use.
          </p>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
            • We do not provide legal advice or make legal determinations.
          </p>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
            • Veteran Healing is not responsible for misuse or illegal use of our sacraments.

          </p>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
            • We reserve the right to cancel orders or ban users if sacraments are intended for illegal purposes.
          </p>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
            • The FDA has not approved mushrooms as medical treatment or cure.
          </p>
        </div>

        {/* Bottom copyright stamp */}
        <div className="w-full border-t border-brand-border/10 pt-6 mt-4">
          <p className="text-gray-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
            Veteran Healing © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
