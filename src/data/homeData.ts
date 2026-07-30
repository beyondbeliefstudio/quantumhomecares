/**
 * Homepage content. All copy is client-approved — see the design handoff README
 * before editing, and do not contradict these facts:
 *   · Service area is all of New Jersey, not a single county.
 *   · Marvalyn Ellis is the sole owner; care providers deliver hands-on service.
 *     Never imply a large staff or a call center.
 *   · The "Paying for care" section (insurance/VA/Medicaid) was intentionally
 *     removed. Testimonials were removed — no approved quotes yet.
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

export interface ComparisonRow {
  topic: string;
  them: string;
  us: string;
}

export interface NumberedCard {
  title: string;
  copy: string;
  /** astro-icon name from src/icons/ — only Who We Help cards carry one */
  icon?: string;
}

export interface Standard {
  word: string;
  copy: string;
}

export interface Region {
  name: string;
  counties: string;
}

export interface Faq {
  question: string;
  answer: string;
}

// ==========================================
// 2. CREDENTIAL BAND
// ==========================================
export const credentials: Credential[] = [
  {
    label: "Licensed and registered",
    detail: "New Jersey Health Care Service Firm HP0426700",
  },
  {
    label: "Insured and bonded",
    detail: "Every caregiver screened and background checked",
  },
  {
    label: "Advocacy included",
    detail: "We attend appointments and follow through",
  },
  {
    label: "Serving all of New Jersey",
    detail: "North, Central, and South Jersey",
  },
];

// ==========================================
// 4. SERVICES
// ==========================================
export const services: Service[] = [
  {
    icon: "care-plan",
    title: "Care Planning and Advocacy",
    copy: "A custom care plan, and someone in the room at medical appointments who knows the right questions to ask. We coordinate with doctors, follow up on decisions, and make sure nothing falls through.",
  },
  {
    icon: "daily-living",
    title: "Daily Living Support",
    copy: "Personal hygiene assistance, light housekeeping, and laundry. The everyday tasks that get harder over time, handled with dignity and privacy.",
  },
  {
    icon: "meals",
    title: "Meals, Nutrition, and Wellness",
    copy: "In-home meal preparation, grocery shopping, and medication reminders. Good nutrition and consistent routines are the foundation of staying independent.",
  },
  {
    icon: "transportation",
    title: "Transportation and Companionship",
    copy: "Errands, appointments, and time spent together. Isolation is one of the biggest risks to senior health, and one of the easiest to solve.",
  },
  {
    icon: "respite",
    title: "Respite and Specialized Care",
    copy: "Coverage so family caregivers can rest, plus closer supervision for seniors who need it. Caring for someone else should not cost you your own health.",
  },
  {
    icon: "overnight",
    title: "Overnight and Live-In Care",
    copy: "For families worried about the hours nobody is watching. Awake overnight shifts and live-in arrangements, scheduled around how your parent actually sleeps.",
  },
];

// ==========================================
// 6. APPROACH — comparison table
// ==========================================
export const comparison: ComparisonRow[] = [
  {
    topic: "Who shows up",
    them: "Whoever is available that day",
    us: "A caregiver matched to your parent, kept consistent",
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
];

// ==========================================
// 8. WHO WE HELP
// ==========================================
export const whoWeHelp: NumberedCard[] = [
  {
    title: "After a hospital stay",
    copy: "Discharge paperwork, new medications, and follow-up appointments arriving all at once. We take over the coordination and get the home ready before your parent walks back in.",
    icon: "after-hospital-stay",
  },
  {
    title: "When memory starts changing",
    copy: "Early dementia and Alzheimer's support built on routine and familiarity, with caregivers trained to redirect rather than correct.",
    icon: "memory-changing",
  },
  {
    title: "When the family caregiver is worn down",
    copy: "Respite coverage by the shift, the week, or ongoing, so the adult child holding everything together can sleep, travel, and be a family member again.",
    icon: "caregiver-worn-down",
  },
  {
    title: "When you live too far away",
    copy: "Eyes in the home and a person on the ground in New Jersey, with regular updates so distance stops feeling like negligence.",
    icon: "live-too-far-away",
  },
];

// ==========================================
// 9. HOW IT WORKS
// ==========================================
export const steps: NumberedCard[] = [
  {
    title: "Tell us what is going on",
    copy: "Send the form and we respond within one business day. We listen, ask a few questions, and tell you what would help, even if that is less care than you expected. The conversation is free.",
  },
  {
    title: "We build a plan for your parent",
    copy: "A visit to the home, an assessment of the real needs and routines, and a written care plan you approve before anything begins.",
  },
  {
    title: "Care begins, and we stay involved",
    copy: "We match a caregiver, get started, and stay in regular contact. As needs change, the plan changes with them.",
  },
];

// ==========================================
// 10. FOR CARE PROFESSIONALS
// ==========================================
export const referralPoints: NumberedCard[] = [
  {
    title: "Fast discharge turnaround",
    copy: "We can assess and staff a home within days of a discharge date, including same-week starts when the situation calls for it.",
  },
  {
    title: "One point of contact",
    copy: "You reach the owner directly, not a regional call center. Referrals are acknowledged the same business day.",
  },
  {
    title: "Reduced readmission risk",
    copy: "Medication reminders, follow-up appointments, and nutrition handled in the home, so your discharge plan actually gets carried out.",
  },
  {
    title: "Licensed and documented",
    copy: "NJ Health Care Service Firm HP0426700. Insured, bonded, background-checked providers, with written care plans on file.",
  },
];

// ==========================================
// 11. COVERAGE
// ==========================================
export const regions: Region[] = [
  { name: "North Jersey", counties: "Bergen, Essex, Morris, Passaic, Hudson, Union" },
  { name: "Central Jersey", counties: "Somerset, Middlesex, Monmouth, Mercer, Hunterdon" },
  { name: "South Jersey", counties: "Ocean, Burlington, Camden, Atlantic, Cape May" },
];

// ==========================================
// 12. STANDARDS — the six C's
// ==========================================
export const standards: Standard[] = [
  { word: "Care", copy: "Personalized attention for every client" },
  { word: "Competency", copy: "High standards of skill and medical literacy" },
  { word: "Commitment", copy: "Focused on long-term wellness, not billable hours" },
  { word: "Communication", copy: "Transparent updates between families and providers" },
  { word: "Compassion", copy: "Every senior treated with the empathy they deserve" },
  { word: "Courage", copy: "Advocating firmly in complex medical settings" },
];

// ==========================================
// 14. IN THE NEWS
// ==========================================
export const press = {
  source: "HomeCare Magazine",
  kind: "Industry press",
  headline: "Quantum Home Cares Opens New Jersey Location",
  dek: "HomeCare Magazine covers our launch and the model behind it: personalized, advocacy-led care for New Jersey seniors, built around one family at a time rather than a national playbook.",
  url: "https://www.homecaremag.com/news/quantum-home-cares-opens-new-jersey-location",
};

// ==========================================
// 15. FAQ
// ==========================================
export const faqs: Faq[] = [
  {
    question: "What is the minimum commitment?",
    answer:
      "There is no long contract. We start with the schedule your parent needs and adjust month to month.",
  },
  {
    question: "How quickly can care start?",
    answer:
      "In most cases within a few days of the assessment, and faster for hospital discharges.",
  },
  {
    question: "What if my parent refuses help?",
    answer:
      "Common, and expected. We start small, often with companionship or errands, and let trust build before adding personal care.",
  },
  {
    question: "Will it be the same caregiver?",
    answer: "Yes, with a named backup who already knows the care plan for vacations and sick days.",
  },
];
