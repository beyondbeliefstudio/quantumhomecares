export interface NavItem {
  title: string;
  href: string;
}

/**
 * Multi-page site. Every entry is a real route — the homepage's own sections
 * are reached by scrolling, not by a nav link, so nothing here is an anchor.
 *
 * The header bar, the mobile drawer, and the footer all render this same list.
 * The earlier `headerHidden` / `mobileOnly` flags are gone: they existed to keep
 * seven anchor links from overflowing the desktop bar, and four page links fit.
 */
export const navData: NavItem[] = [
  { title: "Services", href: "/services" },
  { title: "Our Approach", href: "/our-approach" },
  { title: "For Professionals", href: "/for-professionals" },
  { title: "Resources", href: "/resources" },
];

/**
 * The contact block lives on the homepage, so every CTA has to be rooted —
 * a bare "#contact" would look for the section on whatever page it was clicked.
 */
export const contactHref = "/#contact";
