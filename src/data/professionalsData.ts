/**
 * /for-professionals page content. Client-approved — see
 * design_handoff_quantum_homepage/buildout-notes/04-for-professionals.md.
 *
 * Audience is discharge planners, social workers, case managers, and elder
 * law attorneys. Tone is efficient and factual — no family-facing warmth.
 *
 * Facts that must not drift:
 *   · NEVER claim reduced hospital readmissions — that is a clinical outcome
 *     claim the handoff explicitly rules out as indefensible without data.
 *     Describe what we do, not what it statistically produces.
 *   · Non-medical provider: no skilled nursing, wound care, injections, or
 *     IV therapy. We coordinate alongside clinical providers.
 *   · Referrals reach the owner directly — never imply an intake queue.
 *   · The referral form must stay a SEPARATE Netlify form ("referral") so
 *     referral volume and response time can be tracked apart from the family
 *     contact form.
 */

export interface Expectation {
  label: string;
  copy: string;
}

export interface Region {
  name: string;
  counties: string;
}

export interface Credential {
  label: string;
  detail: string;
}

export interface Step {
  title: string;
  copy: string;
}

// ==========================================
// 2. WHAT PARTNERS CAN EXPECT — the term sheet
// ==========================================
export const expectations: Expectation[] = [
  {
    label: "Same business day acknowledgment",
    copy: "Every referral gets a response the same business day it comes in. You will know whether we can take the case before your shift ends.",
  },
  {
    label: "Assessment within days",
    copy: "We can assess and staff a home within days of a discharge date, including same-week starts when the situation calls for it.",
  },
  {
    label: "One point of contact",
    copy: "You reach the owner directly, not a regional call center or an intake queue that routes you somewhere else. The person who answers can make decisions.",
  },
  {
    label: "Communication back to you",
    copy: "We tell you what we found, what we put in place, and whether the case is holding. You are not left guessing whether the referral landed.",
  },
  {
    label: "An honest yes or no",
    copy: "If we are not the right fit or cannot staff the case in your timeframe, we will say so immediately rather than letting it sit. A fast no is more useful to you than a slow maybe.",
  },
];

// ==========================================
// 4. SERVICES AVAILABLE TO YOUR CLIENTS
// Icons from src/icons/ — each capability reuses its service's glyph.
// ==========================================
export interface ProService {
  icon: string;
  copy: string;
}

export const proServices: ProService[] = [
  {
    icon: "care-plan",
    copy: "Care planning and family advocacy, including appointment attendance and provider coordination",
  },
  {
    icon: "daily-living",
    copy: "Personal care: bathing, dressing, grooming, toileting, mobility and transfer assistance",
  },
  {
    icon: "meals",
    copy: "Meal preparation, grocery shopping, hydration monitoring, and medication reminders",
  },
  {
    icon: "transportation",
    copy: "Transportation to appointments, with a caregiver who stays through the visit",
  },
  { icon: "live-too-far-away", copy: "Companionship and social engagement" },
  { icon: "respite", copy: "Respite coverage, short term or ongoing" },
  { icon: "memory-changing", copy: "Memory care support for early dementia and Alzheimer's" },
  { icon: "after-hospital-stay", copy: "Post-hospital and post-surgical support at home" },
  { icon: "overnight", copy: "Awake overnight shifts and live-in arrangements" },
];

export const scopeNote =
  "We are a non-medical home care provider. We do not deliver skilled nursing services such as wound care, injections, or IV therapy. Where a client needs both, we coordinate alongside the clinical provider.";

// ==========================================
// 5. COVERAGE AND CAPACITY
// ==========================================
export const regions: Region[] = [
  { name: "North Jersey", counties: "Bergen, Essex, Morris, Passaic, Hudson, Union" },
  { name: "Central Jersey", counties: "Somerset, Middlesex, Monmouth, Mercer, Hunterdon" },
  { name: "South Jersey", counties: "Ocean, Burlington, Camden, Atlantic, Cape May" },
  { name: "Western Jersey", counties: "Warren, Sussex, Salem, Gloucester, Cumberland" },
];

export const coverageTypes =
  "Hourly shifts, daily coverage, awake overnight, live-in, and short-term respite. Schedules are built around the client rather than fixed service tiers.";

// ==========================================
// 6. CREDENTIALS
// ==========================================
export const credentials: Credential[] = [
  {
    label: "Registered",
    detail: "New Jersey Health Care Service Firm HP0426700, in good standing with the State of New Jersey.",
  },
  {
    label: "Insured and bonded",
    detail: "Coverage in place for every home we enter.",
  },
  {
    label: "Screened providers",
    detail: "Every caregiver is vetted, screened, and background checked before placement.",
  },
  {
    label: "Documented care",
    detail: "Written care plans on file for every client, maintained and updated as needs change.",
  },
  {
    label: "Compliance",
    detail: "We adhere to federal and state requirements for senior support services.",
  },
];

// ==========================================
// 7. HOW TO MAKE A REFERRAL — three steps
// ==========================================
export const referralSteps: Step[] = [
  {
    title: "Send it over",
    copy: "Use the form below, or call 732-498-2960 directly. For time-sensitive discharges, call. It is faster.",
  },
  {
    title: "We acknowledge the same business day",
    copy: "You will hear back with a yes or no and a realistic timeline. No waiting to find out whether the case was picked up.",
  },
  {
    title: "We assess, staff, and report back",
    copy: "An in-home assessment, a written care plan, a matched caregiver, and an update to you on what was put in place.",
  },
];

// ==========================================
// 8. REFERRAL FORM — select options
// ==========================================
export const supportOptions = [
  "Personal care",
  "Companionship",
  "Transportation",
  "Respite",
  "Overnight or live-in",
  "Not sure yet",
];

export const urgencyOptions = ["Within 48 hours", "This week", "Within two weeks", "Planning ahead"];
