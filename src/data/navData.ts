export interface NavItem {
  title: string;
  href: string;
  /** Hidden from the desktop header bar (too many links crowded it) but still
   *  reachable via the mobile drawer and the footer. */
  headerHidden?: boolean;
  /** Shown in the mobile drawer only — keeps the desktop bar from overflowing. */
  mobileOnly?: boolean;
}

/**
 * Single-page site: every href is an in-page anchor.
 * The drawer shows all seven; the footer shows six (everything but the
 * drawer-only "In the News"); the desktop bar shows four — see below.
 */
export const navData: NavItem[] = [
  { title: "Services", href: "#services" },
  { title: "Our Approach", href: "#approach" },
  { title: "Who We Help", href: "#who", headerHidden: true },
  { title: "How It Works", href: "#how" },
  { title: "For Professionals", href: "#professionals", headerHidden: true },
  { title: "About", href: "#about" },
  { title: "In the News", href: "#news", mobileOnly: true },
];

/** Footer's Explore column — everything except the drawer-only entry. */
export const footerNav = navData.filter(i => !i.mobileOnly);

/** Desktop header bar — the shorter set; the two dropped links still live in
 *  the drawer and footer above. */
export const desktopNav = navData.filter(i => !i.mobileOnly && !i.headerHidden);
