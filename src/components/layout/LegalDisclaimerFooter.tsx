import { AlertTriangle } from "lucide-react";
import { ASSETS } from "../../lib/assetPaths";

export default function LegalDisclaimerFooter() {
  return (
    <section className="bg-[linear-gradient(135deg,#113B2C_0%,#173F2F_45%,#0F402F_100%)] text-white py-16 px-4 relative overflow-hidden" aria-label="Medical and Legal Disclaimer">
      {/* Subtle background overlay */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url(${ASSETS.DISCLAIMER_BG})`, backgroundSize: 'cover'
        }}
      />

      <div className="container-site text-center max-w-5xl mx-auto flex flex-col items-center gap-6 relative z-10">
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
        <div className="grid gap-4 max-w-4xl mx-auto text-left md:grid-cols-2">
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-gray-100 text-sm sm:text-base leading-relaxed shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            • All mushroom sacraments are for research, religious, ceremonial, novelty, or souvenir purposes only.
          </p>
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-gray-100 text-sm sm:text-base leading-relaxed shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            • Follow all local, state, and federal laws — we do not encourage illegal use.
          </p>
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-gray-100 text-sm sm:text-base leading-relaxed shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            • We do not provide legal advice or make legal determinations.
          </p>
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-gray-100 text-sm sm:text-base leading-relaxed shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            • Veteran Healing is not responsible for misuse or illegal use of our sacraments.
          </p>
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-gray-100 text-sm sm:text-base leading-relaxed shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            • We reserve the right to cancel orders or ban users if sacraments are intended for illegal purposes.
          </p>
          <p className="rounded-2xl border border-white/10 bg-white/8 p-4 text-gray-100 text-sm sm:text-base leading-relaxed shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            • The FDA has not approved mushrooms as medical treatment or cure.
          </p>
        </div>

      </div>
    </section>
  );
}
