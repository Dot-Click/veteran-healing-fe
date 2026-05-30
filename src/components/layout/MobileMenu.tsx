import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, SOCIAL_LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-brand-primary z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-accent">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden">
              <img src="/logo.webp" alt="Veteran Healing" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">
              Veteran Healing
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-white hover:text-brand-gold transition-colors p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    "block px-6 py-4 text-base font-medium transition-colors border-b border-brand-accent/30",
                    location.pathname === link.href
                      ? "text-brand-gold bg-brand-accent/20"
                      : "text-white hover:text-brand-gold hover:bg-brand-accent/10"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-6 pt-6 flex flex-col gap-3">
            <Link
              to="/shop"
              onClick={onClose}
              className="btn-secondary text-center justify-center text-sm border-white text-white hover:bg-white hover:text-brand-primary"
            >
              Shop Now
            </Link>
          </div>
        </nav>

        {/* Social footer */}
        <div className="p-5 border-t border-brand-accent">
          <div className="flex gap-4">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-gold transition-colors text-sm"
            >
              Facebook
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-gold transition-colors text-sm"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
