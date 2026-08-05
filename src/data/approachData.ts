/**
 * /our-approach page content. Client-approved — see
 * design_handoff_quantum_homepage/buildout-notes/03-our-approach.md.
 *
 * Facts that must not drift:
 *   · Marvalyn's story is FIRST PERSON, in her voice, and flagged in the
 *     handoff for her personal review — do not paraphrase or "improve" it.
 *     Career facts as reconciled there: a Verizon career (Associate Director)
 *     running alongside 25+ years managing her own parents' care.
 *   · Testimonials are HELD until real ones are collected, with written
 *     permission. Never fill that section with placeholder or invented quotes.
 *   · Sole owner; "the owner, directly" is a differentiator — never imply a
 *     call center or large staff.
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
// 2. MARVALYN'S STORY — first person, verbatim
// ==========================================
export const story = {
  /** Opening line — set larger than the rest of the letter. */
  opening: "I am Marvalyn Ellis, and I started Quantum Home Cares because I lived it first.",
  paragraphs: [
    "For more than twenty five years, while building a career at Verizon and eventually serving as an Associate Director, I was also managing care for my parents. Appointments. Medications. Insurance appeals. Discharge instructions handed to me in a hallway by someone already walking toward the next room.",
    "I did that at night and on weekends and on lunch breaks, the way most people do. And I learned the healthcare system the only way you really can, which is by fighting your way through it on behalf of someone you love.",
  ],
  /** The turn — a beat on its own line between the two halves of the letter. */
  beat: "Here is what I learned.",
  lessons: [
    "The system is not built for families. It is built for billing cycles and thirty day readmission windows. If you do not have someone who knows how to ask the right question at the right moment, things fall through. Not because anyone is careless, but because nobody's job is to look at the whole picture. Everybody owns a piece.",
    "I also learned what good care actually looks like, and how rare it is. It is not a checklist of tasks. It is somebody who notices that my mother had stopped finishing her meals two weeks before anyone else did.",
    "When I left the corporate world, I looked at what was available to families in New Jersey and I kept finding the same thing. Plenty of agencies willing to send an aide and log the hours. Almost nobody willing to sit in the appointment, read the discharge paperwork, and follow up on the referral that would otherwise sit for three weeks.",
  ],
  /** The letter's last line — rendered as the section's statement. */
  closer: "So I built the company I wish my family had.",
};

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

export const cultureCloser =
  "Every caregiver who enters one of our homes is screened against this standard. If someone is skilled but not compassionate, they are not a fit here.";

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
    detail: "Every caregiver is vetted, screened, and background checked before they work with a client.",
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
