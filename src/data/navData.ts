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
 * Layout.astro renders the contact band at the bottom of every page, so a
 * bare anchor resolves wherever it is clicked — no cross-page hop, the reader
 * just scrolls down the page they are already on. Pages that hide the band
 * (`hideCTA`: the thank-you pages, /for-professionals, /our-approach) get the
 * homepage band instead — Layout passes `contactHrefFallback` to the nav and
 * footer on those pages.
 */
export const contactHref = "#contact";
export const contactHrefFallback = "/#contact";

/** The careers block lives on /our-approach; only the footer links to it. */
export const careersHref = "/our-approach#careers";
