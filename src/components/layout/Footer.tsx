import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon } from "../common/SocialIcons";
import { SOCIAL_LINKS, CONTACT_INFO } from "../../lib/constants";
import LegalDisclaimerFooter from "./LegalDisclaimerFooter";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about#mission" },
    { label: "Meet The Team", href: "/about#team" },
    { label: "Statement of Faith", href: "/statement-of-faith" },
    { label: "Reviews", href: "/reviews" },
  ],
  shop: [
    { label: "Sacraments", href: "/shop" },
    { label: "Microdose Capsules", href: "/shop/microdose-capsules" },
    { label: "Mushroom Chocolate", href: "/shop/mushroom-chocolate" },
    { label: "Apparel", href: "/shop?category=apparel" },
    { label: "Bundles", href: "/shop?category=bundles" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Donation", href: "/donation" },
    { label: "Affiliate Program", href: "/affiliate" },
    { label: "Free Microdose Guide", href: "/free-guide" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-auto">
      <LegalDisclaimerFooter />

      <div className="bg-brand-dark text-white py-12">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                <img src="/logo.webp" alt="" className="w-24 h-auto" />
                {/* <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40">
                  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
                    <ellipse cx="16" cy="11" rx="10" ry="7" fill="#F5A623" opacity="0.85"/>
                    <path d="M6 11 Q16 22 26 11" stroke="#F5A623" strokeWidth="1.5" fill="none"/>
                    <path d="M16 11 L16 28" stroke="#F5F5DC" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M11 22 Q16 20 21 22" stroke="#F5F5DC" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </span> */}
                {/* <span className="flex flex-col leading-tight">
                  <span className="text-brand-gold font-bold text-sm tracking-wide uppercase">Veteran Healing</span>
                  <span className="text-gray-500 text-xs tracking-widest uppercase">By Vets · For Vets</span>
                </span> */}
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A veteran-founded 501(c)(3) nonprofit dedicated to natural, holistic healing for those
                who have served. 100% of profits support veteran suicide prevention.
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-accent/30 hover:bg-brand-accent transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-brand-accent/30 hover:bg-brand-accent transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>

            {/* Company links */}
            <div>
              <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wide">
                Company
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop links */}
            <div>
              <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wide">
                Sacraments
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="font-semibold text-brand-gold mb-4 text-sm uppercase tracking-wide">
                Support &amp; Mission
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-brand-accent/30">
                <p className="text-gray-400 text-xs">Call or Text:</p>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="text-white font-semibold hover:text-brand-gold transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-brand-accent/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              Copyright &copy; {new Date().getFullYear()} Veteran Healing &mdash; All Rights Reserved.*
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
