/**
 * /our-approach page content. Client-approved — see
 * design_handoff_quantum_homepage/buildout-notes/03-our-approach.md.
 *
 * Facts that must not drift:
 *   · Testimonials are HELD until real ones are collected, with written
 *     permission. Never fill that section with placeholder or invented quotes.
 *   · Sole owner; "the owner, directly" is a differentiator — never imply a
 *     call center or large staff.
 *
 * Note: 03's first-person letter ("I learned this system the hard way…") was
 * cut in the 2026-08-05 design review — the client wants the ORIGINAL
 * homepage About block (About.astro) as the Marvalyn section instead, placed
 * late in the page so the business case leads. The letter copy lives in git
 * history and 03-our-approach.md if it is ever revived.
 */

export interface ComparisonRow {
  topic: string;
  them: string;
  us: string;
}

export interface Moment {
  /** astro-icon name from src/icons/ */
  icon: string;
  title: string;
  copy: string;
}

export interface Credential {
  label: string;
  detail: string;
}

export interface Standard {
  word: string;
  copy: string;
}

// ==========================================
// 4. THE DIFFERENCE, LINE BY LINE
// Five rows — the fifth ("Who you reach") is new on this page and does not
// appear in the four-row homepage version this table originally shipped with.
// ==========================================
export const comparison: ComparisonRow[] = [
  {
    topic: "Who shows up",
    them: "Whoever is available that day",
    us: "A caregiver matched to your loved one, kept consistent",
  },
  {
    topic: "The care plan",
    them: "Hours logged, then on to the next client",
    us: "A written plan we build, maintain, and update as needs change",
  },
  {
    topic: "The paperwork",
    them: "Insurance calls and coordination left to you",
    us: "We handle the calls, the forms, and the follow-through",
  },
  {
    topic: "Communication",
    them: "You hear from them once something goes wrong",
    us: "We check in before it does, and keep you posted either way",
  },
  {
    topic: "Who you reach",
    them: "A regional call center",
    us: "The owner, directly",
  },
];

// ==========================================
// 5. WHO WE HELP — the four moments
// ==========================================
export const moments: Moment[] = [
  {
    icon: "after-hospital-stay",
    title: "After a hospital stay",
    copy: "Discharge paperwork, new medications, and follow-up appointments arriving all at once, usually with about a day of notice. We manage the coordination and get the home ready before they walk back in.",
  },
  {
    icon: "memory-changing",
    title: "When memory starts changing",
    copy: "Early dementia and Alzheimer's support built on routine and familiarity, with caregivers who know how to redirect rather than correct. Consistency matters more here than anywhere else, which is why we keep the same caregiver in place.",
  },
  {
    icon: "caregiver-worn-down",
    title: "When the family caregiver is worn down",
    copy: "Respite coverage by the shift, the week, or ongoing, so whoever is holding everything together can sleep, travel, see their own doctor, and be a family member again.",
  },
  {
    icon: "live-too-far-away",
    title: "When you live too far away",
    copy: "Eyes in the home and a person you can trust, with real updates rather than silence. Distance is its own kind of worry and it does not get easier by ignoring it.",
  },
];

// ==========================================
// 6. HOW CARE PLANS GET BUILT — five beats, verbatim
// ==========================================
export const carePlanIntro =
  "Everything we do runs off the care plan, so it is worth explaining how one gets made.";

export const carePlanSteps: string[] = [
  "It starts with a visit to the home. Not a phone intake, an actual visit. We talk with your loved one about their routine, what they still do easily, what has gotten harder, and what they are not willing to give up. That last part matters more than families expect. A plan that ignores what someone cares about does not get followed.",
  "We look at the home itself. Stairs, bathroom setup, lighting, where the trip hazards are.",
  "We talk with you separately, because families usually see things the person will not say out loud.",
  "Then we write the plan. Specific tasks, specific hours, specific goals, and who is responsible for what. You approve it before anything begins.",
  "After that it is a living document. We review it on a schedule and we update it whenever something changes, which in senior care is often. A good plan six months ago can be the wrong plan today.",
];

// ==========================================
// 7. THE SIX Cs
// ==========================================
export const culture: Standard[] = [
  { word: "Care", copy: "Personalized attention for every client." },
  { word: "Competency", copy: "High standards of skill and medical literacy." },
  { word: "Commitment", copy: "Focused on long-term wellness, not billable hours." },
  { word: "Communication", copy: "Transparent dialogue between families and providers." },
  { word: "Compassion", copy: "Every senior treated with the empathy they deserve." },
  { word: "Courage", copy: "Advocating firmly in complex medical settings." },
];

// ==========================================
// 8. CREDENTIALS AND COMPLIANCE
// ==========================================
export const credentials: Credential[] = [
  {
    label: "Registered in New Jersey",
    detail: "Health Care Service Firm HP0426700, in good standing with the State of New Jersey.",
  },
  {
    label: "Insured and bonded",
    detail: "Coverage in place for every home we enter.",
  },
  {
    label: "Screened caregivers",
    detail:
      "Every caregiver is vetted, screened, and background checked before they work with a client.",
  },
  {
    label: "Written care plans",
    detail: "Every client has a documented plan on file, maintained and updated as needs change.",
  },
  {
    label: "Compliance",
    detail: "We follow federal and state requirements for senior support services.",
  },
];

// ==========================================
// 9. IN THE NEWS
// ==========================================
export const press = {
  source: "HomeCare Magazine",
  headline: "Quantum Home Cares Opens New Jersey Location",
  dek: "HomeCare Magazine covered our launch and the model behind it: personalized, advocacy-led care for New Jersey seniors, built around one family at a time rather than a national playbook.",
  url: "https://www.homecaremag.com/news/quantum-home-cares-opens-new-jersey-location",
};

// ==========================================
// 10. CAREERS — added 2026-08-29. No handoff note covers this section, so
// the copy below is drafted, not client-approved. Two things the client
// should confirm before launch: the roles list (which positions are actually
// open) and the CHHA line — New Jersey requires a CHHA certification for
// hands-on personal care through a Health Care Service Firm, and companion
// roles do not, but only the client knows which roles they staff. No pay,
// benefits, or hours are promised anywhere in this copy; keep it that way.
// ==========================================
/**
 * Condensed from two paragraphs to one (2026-09-01). The careers block was two
 * full sections plus the form and read as a small careers site bolted onto an
 * about page; it is one section now. Nothing factual was cut — only the
 * restatement.
 */
export const careersIntro =
  "Most agencies treat caregivers as hours on a schedule. We are building something smaller and more deliberate, and we are looking for people who want to work that way: matched to a client and kept in place, working from a written care plan, reaching the owner directly when something changes.";

export const careerExpectations: Credential[] = [
  {
    label: "Consistent placements",
    detail: "You are matched to a client and you stay with them.",
  },
  {
    label: "A plan you can work from",
    detail: "A written care plan with specific tasks, hours, and goals.",
  },
  {
    label: "An owner who picks up",
    detail: "You reach Marvalyn directly, not a call center.",
  },
  {
    label: "Respect for the work",
    detail: "Caregiving is skilled work and we staff it that way.",
  },
];

/**
 * The one hiring requirement that changes whether someone can apply, so it
 * survived the condensation as its own line. NJ requires a CHHA certification
 * for hands-on personal care through a Health Care Service Firm — the client
 * still needs to confirm which roles they actually staff.
 */
export const careerRequirement =
  "Hands-on personal care requires a current New Jersey Certified Home Health Aide (CHHA) certification. Companion roles do not.";

/**
 * PARKED. This was the "Who we are looking for" checklist, its own full section
 * until 2026-09-01. The careers block is one section now and the list was the
 * least load-bearing part of it — everything here is either restated in the
 * form's own fields or is a quality no applicant self-reports honestly. The
 * CHHA line it carried lives on in `careerRequirement` above.
 *
 * Kept rather than deleted because it is drafted copy the client has not
 * reviewed yet; if they want a fuller careers page later, it starts here.
 */
export const careerTraits: string[] = [
  "Experience caring for seniors, whether professional or in your own family.",
  "Reliability. Showing up on time, every time, is most of the job.",
  "Patience with memory changes, and the instinct to redirect rather than correct.",
  "Clear, honest communication with families and with us.",
  "A current New Jersey Certified Home Health Aide (CHHA) certification for hands-on personal care. Companion roles do not require one.",
];

/** Select options on the application form — keep in sync with the roles the client is hiring for. */
export const careerRoles: string[] = [
  "Certified Home Health Aide (CHHA)",
  "Companion caregiver",
  "Live-in caregiver",
  "Overnight caregiver",
  "Not sure yet",
];

/**
 * PARKED alongside [careerTraits] above. These were two required selects on the
 * application form until 2026-09-01, next to a free-text work area and an
 * apply/enquire intent switch. Screening someone before they have spoken to
 * anyone costs applicants at the point they are least invested, and Marvalyn
 * gets the same answers on the first call. The form asks for name, contact,
 * role, an optional résumé and an open box now.
 *
 * Kept because the options themselves are sound and a real careers page would
 * want them back.
 */
export const careerExperienceOptions: string[] = [
  "New Jersey CHHA",
  "Certified Nursing Assistant (CNA)",
  "Experienced caregiver, not certified",
  "New to caregiving",
];

export const careerAvailabilityOptions: string[] = [
  "Weekdays",
  "Evenings",
  "Overnights",
  "Weekends",
  "Live-in",
  "Flexible",
];
