// ==========================================
// INITIALIZATION
// The reveal styles hide content until this runs, so never wait on an
// event that may already have fired — bundlers and dev servers do not
// agree on whether a module evaluates before DOMContentLoaded.
// ==========================================
// A function declaration, not a const arrow — init() runs during module
// evaluation, so anything it reaches must be hoisted. As a `const` this sat in
// the temporal dead zone and threw, which silently killed every feature below it.
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function init() {
  // Isolated so one broken feature cannot take the rest of the page with it.
  // The reveal styles hide every section until initScrollReveal runs, so a
  // throw earlier in this list used to leave the whole page at opacity 0.
  [initStickyHeader, initMobileMenu, initScrollReveal].forEach(feature => {
    try {
      feature();
    } catch (error) {
      console.error(`[app] ${feature.name} failed:`, error);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ==========================================
// STICKY HEADER
// A 40px sentinel at the top of the page. Once it scrolls out of
// view the header flips to its compact glass state and the logo
// cross-fades from wordmark to heart mark — all of it CSS, keyed
// on the data-scrolled attribute.
// ==========================================
function initStickyHeader() {
  const header = document.querySelector("[data-nav]");
  const sentinel = document.querySelector(".scroll-sentinel");
  if (!header || !sentinel) return;

  new IntersectionObserver(
    ([entry]) => header.toggleAttribute("data-scrolled", !entry.isIntersecting),
    { threshold: 0 }
  ).observe(sentinel);
}

// ==========================================
// MOBILE MENU
// Visibility is handled by CSS media queries; this only owns
// the open/closed state and its ARIA.
// ==========================================
function initMobileMenu() {
  const header = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!header || !toggle) return;

  const setOpen = open => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));

  // Anchor links jump within the page, so close the drawer behind them
  document.querySelectorAll("[data-nav-close]").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Resizing past the breakpoint hides the drawer — reset state so
  // the toggle's ARIA never disagrees with what is on screen.
  window.matchMedia("(min-width: 1021px)").addEventListener("change", e => {
    if (e.matches) setOpen(false);
  });
}

// ==========================================
// SCROLL REVEAL
// Sections fade and rise once. The hidden state lives in CSS behind
// the .js-reveal class, so content is never stranded if this fails.
// ==========================================
function initScrollReveal() {
  const blocks = document.querySelectorAll("[data-reveal]");
  if (!blocks.length) return;

  // Tells the fallback in BaseHead that the reveals are handled. Set before
  // anything can throw, so a later failure still counts as "armed".
  document.documentElement.dataset.revealReady = "";

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    blocks.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.04 }
  );

  blocks.forEach(el => observer.observe(el));
}
