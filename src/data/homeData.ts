/**
 * Homepage content. All copy is client-approved — see the design handoff
 * buildout-notes before editing, and do not contradict these facts:
 *   · Service area is all of New Jersey, not a single county.
 *   · Marvalyn Ellis is the sole owner; care providers deliver hands-on service.
 *     Never imply a large staff or a call center.
 *   · The "Paying for care" section (insurance/VA/Medicaid) was intentionally
 *     removed. Testimonials were removed — no approved quotes yet.
 *
 * The homepage was condensed per buildout-notes/01-home.md. Content that moved
 * to interior pages is PARKED at the bottom of this file rather than deleted —
 * it is approved copy those pages still need. Split it into per-page data files
 * as each interior page gets built.
 */

export interface Credential {
  label: string;
  detail: string;
}

export interface Service {
  /** Filename in src/icons/, without the extension. */
  icon: string;
  title: string;
  copy: string;
}

export interface NumberedCard {
  title: string;
  copy: string;
  /** astro-icon name from src/icons/ — only Who We Help cards carry one */
  icon?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  /** Her opening paragraph, set larger. Not a pull quote — see the note below. */
  statement: string;
  /** The paragraphs that follow, in her original order. */
  body: string[];
  name: string;
}

// ==========================================
// 2. TRUST BAR
// ==========================================
export const credentials: Credential[] = [
  {
    label: "Licensed and registered",
    detail: "New Jersey Health Care Service Firm HP0426700",
  },
  {
    label: "Insured and bonded",
    detail: "Every caregiver vetted, screened, and background checked",
  },
  {
    label: "Advocacy included",
    detail: "We attend appointments and follow through",
  },
  {
    label: "Serving all of New Jersey",
    detail: "North, Central, South, and Western Jersey",
  },
];

// ==========================================
// 4. SERVICES SNAPSHOT
// Four cards, one line each. The full six-service detail lives on /services —
// Transportation and Companionship appears there only, and Respite / Overnight
// / Live-In are collapsed into a single card here.
// ==========================================
export const services: Service[] = [
  {
    icon: "care-plan",
    title: "Care Planning and Advocacy",
    copy: "A written plan, and someone in the room at medical appointments.",
  },
  {
    icon: "daily-living",
    title: "Daily Living Support",
    copy: "Hygiene, housekeeping, and laundry, handled with dignity.",
  },
  {
    icon: "meals",
    title: "Meals, Nutrition, and Wellness",
    copy: "Meal preparation, groceries, and medication reminders.",
  },
  {
    icon: "respite",
    title: "Respite, Overnight, and Live-In",
    copy: "Coverage for the hours nobody is watching, and rest for the family.",
  },
];

// ==========================================
// 6. HOW IT WORKS
// ==========================================
export const steps: NumberedCard[] = [
  {
    title: "Tell us what is going on",
    copy: "Send the form, call, or email, and we respond within one business day. We listen, ask a few questions, and tell you what would help, even if that is less care than you expected. The conversation is free.",
  },
  {
    title: "We build a plan for your loved one",
    copy: "A visit to the home, an assessment of the real needs and routines, and a written care plan you approve before anything begins.",
  },
  {
    title: "Care begins, and we stay involved",
    copy: "We match a caregiver, get started, and stay in regular contact. As needs change, the plan changes with them.",
  },
];

// ==========================================
// 9. FAQ
// Rendered as an FAQPage schema node in index.astro — keep questions and
// answers in sync with what is on screen, since search engines read both.
// ==========================================
export const faqs: Faq[] = [
  {
    question: "What is the minimum commitment?",
    answer:
      "There is no long contract. We start with the schedule your loved one needs and adjust month to month.",
  },
  {
    question: "How quickly can care start?",
    answer:
      "In most cases within a few days of the assessment, and faster for hospital discharges.",
  },
  {
    question: "What if my loved one refuses help?",
    answer:
      "Common, and expected. We start small, often with companionship or errands, and let trust build before adding personal care.",
  },
  {
    question: "Will it be the same caregiver?",
    answer: "Yes, with a named backup who already knows the care plan for vacations and sick days.",
  },
];

// ==========================================
// 10. TESTIMONIAL
// The first approved quote — the README's "testimonials removed, no approved
// quotes yet" note no longer holds for the homepage.
//
// Her full quote, every paragraph, in her order. `statement` is simply the
// first paragraph set larger — NOT a pull quote. An earlier pass lifted a
// fragment out of paragraph four to use as an opener, which meant the site
// displayed a sentence she never wrote. Nothing here may be re-cut that way:
// if a shorter version is ever wanted, drop whole paragraphs from the end.
//
// Verbatim except for three corrections, all of which should be confirmed:
//   · "Marvelyn" → "Marvalyn". The handoff notes, the design reference and
//     every page of this site spell it Marvalyn; the reviewer misspelled the
//     founder's name and publishing that on her own site would be worse than
//     silently fixing an obvious typo.
//   · "Quantum Homecares" → "Quantum Home Cares", the registered name.
//   · "88 year old" → "88-year-old".
// The closing ❤️ was dropped — it does not survive the typographic treatment.
//
// No relationship line: she signed the review with her name alone, and
// anything more specific would be a guess about who she is.
//
// An array because more are expected. Testimonial.astro features the first one
// on its own; when a second lands, that component is where the list treatment
// goes, not here.
// ==========================================
export const testimonials: Testimonial[] = [
  {
    statement:
      "We are so grateful for our experience with Quantum Home Cares, especially Marvalyn.",
    body: [
      "When our 88-year-old mom first needed in-home care, it was our first experience with an in-home aide service, and honestly, we didn't know what to expect. Marvalyn made the entire transition feel comfortable, painless, and smooth for both Mom and our family.",
      "She took the time to understand Mom's needs and made sure the aides assigned to her were truly a good fit. That made all the difference.",
      "Most importantly, we felt confident and comfortable trusting Marvalyn and her staff with our treasured mother. That kind of trust means everything when you're inviting someone into your loved one's home and life.",
      "We are truly grateful to Marvalyn and the Quantum Home Cares team for the care, compassion, and personal attention they gave our mom.",
    ],
    name: "Daneca Mergott",
  },
];

// The parked blocks that lived here after the 01-home.md condensation have all
// been claimed by their pages: comparison/whoWeHelp/culture/press by
// approachData.ts, and regions plus the referral content by
// professionalsData.ts (04-for-professionals.md rewrote the referral points —
// note it deliberately DROPPED the old "Reduced readmission risk" card: the
// handoff rules out readmission claims as indefensible without data).
