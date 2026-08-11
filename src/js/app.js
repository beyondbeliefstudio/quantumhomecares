import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Off, deliberately. Lag smoothing pushes tween start times forward whenever a
// frame gap exceeds 500ms — under headless Chrome's --virtual-time-budget the
// clock advances in multi-second jumps, so every gap qualifies and the hero
// intro freezes at its first frame in review screenshots. Without smoothing a
// stalled tab skips the intro ahead instead of replaying it, which for a
// one-second entrance is the better failure anyway.
gsap.ticker.lagSmoothing(0);

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
  [
    initStickyHeader,
    initMobileMenu,
    initScrollReveal,
    initScrollSpy,
    initHeroIntro,
    initPhotoDrift,
    initParallax,
    initStripWeave,
    initFaqAccordion,
  ].forEach(feature => {
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
  // MUST stay 1px above the drawer's `max-width` in Nav.astro. That value was
  // 1020px before the site was scaled up 10%; both moved together to 1122px.
  window.matchMedia("(min-width: 1123px)").addEventListener("change", e => {
    if (e.matches) setOpen(false);
  });
}

// ==========================================
// SCROLL SPY
// Any [data-subnav] rail gets its in-page anchors tracked: the link whose
// section currently crosses the reading band is marked .is-active, and the
// rail scrolls sideways to keep that pill in view. Pages without a rail
// bail out on the first line.
// ==========================================
function initScrollSpy() {
  const nav = document.querySelector("[data-subnav]");
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const byRef = new Map();
  links.forEach(link => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) byRef.set(section, link);
  });
  if (!byRef.size) return;

  const setActive = active => {
    links.forEach(link => link.classList.toggle("is-active", link === active));
    // Keep the active pill visible when the rail overflows on small screens
    active?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  // The "reading band": a section is current while it crosses the zone just
  // below the header. Top/bottom margins shrink the viewport to that band.
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(byRef.get(entry.target));
      });
    },
    { rootMargin: "-25% 0px -65% 0px" }
  );
  byRef.forEach((_, section) => observer.observe(section));
}

// ==========================================
// SCROLL REVEAL
// Sections rise once as they enter, their [data-stagger] children trailing
// in DOM order. The hidden state lives in CSS behind .js-reveal, so content
// is never stranded if this fails; the motion itself is GSAP's — adding
// .is-visible unhides via CSS and gsap.from() re-hides in the same tick,
// exactly the hero-intro pattern, so nothing flashes between the two.
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

  const reveal = section => {
    const items = section.querySelectorAll("[data-stagger]");
    section.classList.add("is-visible");

    gsap.from(section, {
      opacity: 0,
      y: 44,
      duration: 1.1,
      ease: "expo.out",
      clearProps: "opacity,transform",
    });

    // The children ride the section's rise AND run their own — the double
    // fade is what reads as a cascade rather than two copies of one move.
    if (items.length) {
      gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "expo.out",
        delay: 0.15,
        stagger: 0.09,
        clearProps: "opacity,transform",
      });
    }
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.04 }
  );

  blocks.forEach(el => observer.observe(el));
}

// ==========================================
// HERO INTRO
// The heroes animate on arrival, not on scroll: the copy stack cascades in
// element by element and the portrait rides in beside it. CSS holds the
// pre-paint hidden state behind .js-reveal (same contract as the reveals);
// .is-in unhides and gsap.from() re-hides in the same synchronous tick, so
// nothing can flash between the two. If GSAP throws, .is-in is already on
// and the hero is simply visible — losing the animation, not the content.
// ==========================================
function initHeroIntro() {
  // Under reduced motion the CSS never hid anything — nothing to do.
  if (prefersReducedMotion()) return;

  // The header settles in first — no CSS hidden state needed: gsap.from
  // only hides it once this line actually runs, so a failure anywhere
  // leaves the nav in its normal, visible state.
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    gsap.from(nav, {
      y: -14,
      opacity: 0,
      duration: 0.7,
      ease: "expo.out",
      clearProps: "opacity,transform",
    });
  }

  const stack = document.querySelector("[data-intro]");
  const media = document.querySelector("[data-intro-media]");
  if (!stack) return;

  stack.classList.add("is-in");
  media?.classList.add("is-in");

  // expo.out is the closest stock curve to --qhc-ease-out (0.16, 1, 0.3, 1),
  // so the intro decelerates the way every CSS transition on the site does.
  gsap.from([...stack.children], {
    opacity: 0,
    y: 26,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.1,
    clearProps: "opacity,transform",
  });

  if (media) {
    gsap.from(media, {
      opacity: 0,
      y: 32,
      duration: 1.05,
      ease: "expo.out",
      delay: 0.18,
      clearProps: "opacity,transform",
    });
  }
}

// ==========================================
// PHOTO DRIFT
// Scrubbed inner parallax: the photo is overscaled inside its clipping
// frame and slides through that headroom as the frame crosses the viewport.
// Mark the frame (it must clip — .plate does) with data-drift="<percent>".
// This replaced the per-component `animation-timeline: view()` blocks:
// same motion, but ScrollTrigger reaches Safari and Firefox too.
// ==========================================
function initPhotoDrift() {
  const frames = document.querySelectorAll("[data-drift]");
  if (!frames.length || prefersReducedMotion()) return;

  frames.forEach(frame => {
    const img = frame.querySelector("img");
    if (!img) return;

    const travel = parseFloat(frame.dataset.drift) || 3;
    // Overscale covers the full travel plus a little spare, so the crop
    // never runs out of pixels at either end of the scrub.
    const scale = 1 + (travel * 2 + 4) / 100;

    gsap.fromTo(
      img,
      { yPercent: -travel, scale },
      {
        yPercent: travel,
        scale,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          // clamp() pins above-the-fold frames to progress 0 at load, so
          // the hero portrait does not start mid-drift.
          start: "clamp(top bottom)",
          end: "clamp(bottom top)",
          scrub: true,
        },
      }
    );
  });
}

// ==========================================
// PARALLAX PLANES
// Free elements that scroll at their own rate. Positive data-parallax
// drifts the element down relative to its section (the corner glows —
// background moving slower than content, which is what sells them as a
// plane behind the page); negative drifts it up (the quote banner's text
// plate rising against its backdrop). data-parallax="<yPercent of travel>".
// Vertical only: html clips overflow-x, and transforms never change layout.
// ==========================================
function initParallax() {
  const els = document.querySelectorAll("[data-parallax]");
  if (!els.length || prefersReducedMotion()) return;

  els.forEach(el => {
    const travel = parseFloat(el.dataset.parallax) || 14;

    gsap.to(el, {
      yPercent: travel,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "clamp(top bottom)",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

// ==========================================
// STRIP WEAVE
// Grids of sibling plates (the full-bleed photo strip, the WhyFamilies
// pair): alternate plates start offset in opposite directions and swap as
// the grid crosses the viewport, so the group breathes vertically instead
// of scrolling past as one rigid slab. The offsets are level exactly when
// the grid is centred on screen.
// ==========================================
function initStripWeave() {
  const strips = document.querySelectorAll("[data-weave]");
  if (!strips.length || prefersReducedMotion()) return;

  strips.forEach(strip => {
    [...strip.children].forEach((plate, i) => {
      const dir = i % 2 ? 1 : -1;

      gsap.fromTo(
        plate,
        { y: dir * 26 },
        {
          y: dir * -26,
          ease: "none",
          scrollTrigger: {
            trigger: strip,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
        }
      );
    });
  });
}

// ==========================================
// FAQ ACCORDION
// Native <details> snaps open with no motion; this eases the answer in
// and out instead, one question open at a time. The elements stay real
// <details>/<summary> — semantics, keyboard, and find-in-page keep
// working — GSAP only animates the reveal. Reduced motion keeps the
// native snap (with the markup's name grouping enforcing one-at-a-time).
// ==========================================
function initFaqAccordion() {
  const items = [...document.querySelectorAll("details[data-accordion]")];
  if (!items.length || prefersReducedMotion()) return;

  const bodyOf = item => item.querySelector("summary")?.nextElementSibling;

  // `open` stays true while collapsing (the content has to remain rendered
  // to animate), so closing state gets its own flag — it is what lets a
  // mid-collapse click reopen instead of re-closing.
  const collapse = item => {
    const body = bodyOf(item);
    if (!body) {
      item.open = false;
      return;
    }
    gsap.killTweensOf(body);
    item.dataset.closing = "";
    gsap.to(body, {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        delete item.dataset.closing;
        item.open = false;
        gsap.set(body, { clearProps: "all" });
      },
    });
  };

  const expand = item => {
    delete item.dataset.closing;
    item.open = true;
    const body = bodyOf(item);
    if (!body) return;
    gsap.killTweensOf(body);
    // A mid-collapse reopen leaves partial inline height behind — clear it
    // first so the tween measures the answer's natural size.
    gsap.set(body, { clearProps: "all" });
    gsap.from(body, {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      clearProps: "all",
    });
  };

  items.forEach(item => {
    // The markup's native name grouping would snap the previous question
    // shut the instant another opens — strip it here so the close below can
    // animate instead. The attribute still serves readers on the no-JS and
    // reduced-motion paths, which never reach this line.
    item.removeAttribute("name");

    const summary = item.querySelector("summary");
    if (!summary) return;

    summary.addEventListener("click", e => {
      e.preventDefault();

      if (item.open && !("closing" in item.dataset)) {
        collapse(item);
        return;
      }

      // One at a time: any open sibling animates shut as this one opens.
      items.forEach(other => {
        if (other !== item && other.open && !("closing" in other.dataset)) collapse(other);
      });
      expand(item);
    });
  });
}
