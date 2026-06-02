import { type ComponentProps } from "react";
import { Link, useLocation } from "react-router-dom";
import { parseNavTo, scrollToHash, scrollToTop } from "../../lib/scroll";

type SmoothNavLinkProps = ComponentProps<typeof Link>;

export default function SmoothNavLink({
  to,
  onClick,
  children,
  ...props
}: SmoothNavLinkProps) {
  const location = useLocation();
  const target = typeof to === "string" ? parseNavTo(to) : null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !target) return;

    const isSamePath = location.pathname === target.pathname;
    const hasHash = Boolean(target.hash);

    if (isSamePath && hasHash) {
      event.preventDefault();
      scrollToHash(target.hash);
      window.history.pushState(
        null,
        "",
        `${target.pathname}#${target.hash}${location.search}`
      );
      return;
    }

    if (isSamePath && !hasHash) {
      event.preventDefault();
      scrollToTop();
      if (location.hash) {
        window.history.pushState(null, "", target.pathname + location.search);
      }
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
