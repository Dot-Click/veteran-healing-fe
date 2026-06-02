import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash, scrollToTop } from "../../lib/scroll";

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = window.setTimeout(() => scrollToHash(id), 50);
      return () => window.clearTimeout(timer);
    }

    scrollToTop();
  }, [location.pathname, location.hash, location.search]);

  return null;
}
