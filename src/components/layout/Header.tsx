import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { NAV_LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";
import MobileMenu from "./MobileMenu";
import { useCart } from "../../hooks/useCart";
import { ASSETS } from "../../lib/assetPaths";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <>
      <header className="bg-brand-cream-light border-b border-brand-border sticky top-0 z-30 shadow-sm"
      style={{ backgroundImage: `url(${ASSETS.HEADER_BG })`, backgroundSize: 'cover' }}>
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-brand-primary hover:text-brand-cta transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img src="/logo.webp" alt="Veteran Healing Logo" className="w-[70px]" />
              {/* <img src={veter} alt="" /> */}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === link.href
                      ? "text-brand-cta font-semibold underline underline-offset-4"
                      : "text-brand-dark hover:text-brand-cta"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right action icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              <button
                className="p-2 text-brand-dark hover:text-brand-cta transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/cart"
                className="relative p-2 text-brand-dark hover:text-brand-cta transition-colors"
                aria-label={`Shopping cart, ${totalItems} items`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              <Link
                to="/account"
                className="p-2 text-brand-dark hover:text-brand-cta transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
