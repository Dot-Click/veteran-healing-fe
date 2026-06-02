const HEADER_OFFSET = 88;

export function parseNavTo(to: string) {
  const hashIndex = to.indexOf("#");
  const hash = hashIndex >= 0 ? to.slice(hashIndex + 1) : "";
  const pathname = (hashIndex >= 0 ? to.slice(0, hashIndex) : to) || "/";
  return { pathname, hash };
}

export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: 0, left: 0, behavior });
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) {
    scrollToTop(behavior);
    return;
  }

  const element = document.getElementById(id);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
}
