/**
 * /ddd-support page content.
 *
 * Marvalyn was approved as a New Jersey Division of Developmental Disabilities
 * provider in September 2026. This page exists because the approval was not
 * visible anywhere — not on the site, and not on the flyer she was sending to
 * Support Coordinators.
 *
 * Audience is families first, Support Coordinators second. The final section
 * is written for coordinators specifically and is the one part of the page
 * that reads like a provider one-pager rather than the rest of the site.
 *
 * ACCURACY GUARD — READ BEFORE THIS PAGE GOES LIVE
 *
 * DDD is a regulated Medicaid program. A service listed here that Marvalyn is
 * not actually approved to deliver will bring referrals she has to turn down,
 * from the exact audience this page is meant to win over.
 *
 * The service list below was taken from a competitor's site (Assurance Care &
 * Support Services) at the client's direction, as a starting point. FOUR of
 * these have not been confirmed against Marvalyn's own approval, and all four
 * normally require licensed or specially credentialed staff that a non-medical
 * Health Care Service Firm does not employ:
 *
 *   · Behavioral Supports    — normally requires a BCBA or equivalent clinician
 *   · Supported Employment   — normally requires trained job coaches
 *   · Occupational Therapy   — requires a licensed OT
 *   · Physical Therapy       — requires a licensed PT
 *
 * The last two also cut against the site's standing position that Quantum is a
 * non-medical provider — see the accuracy notes in professionalsData.ts, which
 * rule out skilled nursing and clinical claims elsewhere on the site.
 *
 * Each of the four carries `needsConfirmation: true`. Confirm with Marvalyn,
 * then either drop the flag or delete the entry. Nothing renders differently
 * either way; the flag is a marker for the next person in this file.
 *
 * Other facts that must not drift:
 *   · Never state a DDD provider ID or contract number — the client chose to
 *     say "approved provider" without publishing numbers.
 *   · DDD-funded services begin at age 21. Do not imply services for children.
 *   · Medicaid / NJ FamilyCare eligibility is required. Do not soften this.
 *   · Do not link to nj.gov program pages without checking them first; the
 *     Division reorganizes those URLs and several old ones now 404.
 */

export interface DddService {
  /** In-page anchor and subnav target. */
  id: string;
  /** Filename in src/icons/, without the extension. */
  icon: string;
  title: string;
  /** One or two words for the subnav rail. */
  shortTitle: string;
  /** One line a family can understand without knowing the program. */
  lead: string;
  body: string;
  /** Concrete examples — what this looks like on an ordinary week. */
  includes: string[];
  /** See the accuracy guard above. Does not affect rendering. */
  needsConfirmation?: boolean;
}

// ==========================================
// WHO QUALIFIES — the three gates, in plain language
// ==========================================
export interface Requirement {
  label: string;
  copy: string;
}

export const requirements: Requirement[] = [
  {
    label: "Age 21 or older",
    copy: "DDD-funded services begin at 21. Eligibility can be established earlier, but the funding itself does not start until then.",
  },
  {
    label: "NJ FamilyCare eligible",
    copy: "Every DDD-funded service runs through Medicaid, so NJ FamilyCare enrollment is required before support can begin.",
  },
  {
    label: "Found eligible by the Division",
    copy: "DDD makes the determination that someone qualifies for services. That decision comes from the Division, not from an agency like ours.",
  },
];

// ==========================================
// THE SERVICES
// ==========================================
export const dddServices: DddService[] = [
  {
    id: "individual-support",
    icon: "daily-living",
    title: "Individual Support",
    shortTitle: "Individual",
    lead: "One caregiver, working with one person, on the ordinary parts of a day.",
    body: "This is the center of what we do. A caregiver comes to the home and helps with whatever the day actually requires — getting up and dressed, meals, medication reminders, keeping the house in order, and being someone to talk to. The point is not to take tasks away from a person. It is to make the day workable so that the things they can do themselves stay theirs.",
    includes: [
      "Personal care and help getting ready for the day",
      "Meals, groceries, and keeping the kitchen running",
      "Medication reminders",
      "Light housekeeping and laundry",
      "Building routines that hold up week to week",
    ],
  },
  {
    id: "community-based",
    icon: "live-too-far-away",
    title: "Community Based Support",
    shortTitle: "Community",
    lead: "The same support, except it happens outside the house.",
    body: "A lot of what makes a week good does not happen at home. Community Based Support is a caregiver going along to whatever the person is doing out in the world — an appointment, a shift, a class, the gym, the store — and giving exactly as much help as the situation needs. Sometimes that is a lot. Often it is just knowing somebody is there.",
    includes: [
      "Getting to and from appointments and activities",
      "Support while out in the community",
      "Practicing the parts of an outing that are hard",
      "Managing money and errands in real settings",
    ],
  },
  {
    id: "community-inclusion",
    icon: "transportation",
    title: "Community Inclusion Services",
    shortTitle: "Inclusion",
    lead: "Finding the things worth showing up for, and then actually showing up.",
    body: "Inclusion is the part families ask about most and describe least easily. What it means in practice is helping someone find a place in ordinary community life — a class, a volunteer shift, a library group, a congregation, a team — and then supporting them to keep going back long enough that it becomes theirs. The goal is a week with something in it, and people in it who are not paid to be there.",
    includes: [
      "Finding activities and groups that match real interests",
      "Volunteer placements and community memberships",
      "Support during the first weeks, tapering as confidence grows",
      "Building relationships that outlast the support hours",
    ],
  },
  {
    id: "respite",
    icon: "respite",
    title: "Respite",
    shortTitle: "Respite",
    lead: "Planned relief for the family member who is doing this every day.",
    body: "Most people with a developmental disability in New Jersey are supported primarily by their own family, often by one person, often for decades. Respite is funded time when somebody else takes the shift. It is not a comment on how the family is coping. It is maintenance, and the families who use it regularly tend to be the ones still standing ten years on.",
    includes: [
      "Scheduled hours so the family can plan around them",
      "The same caregiver each time wherever possible",
      "Longer blocks for a trip, a procedure, or a funeral",
      "Short-notice cover when something comes up",
    ],
  },
  {
    id: "behavioral",
    icon: "memory-changing",
    title: "Behavioral Supports",
    shortTitle: "Behavioral",
    lead: "Working out what a behavior is asking for, and building a plan around it.",
    body: "Behavior that looks difficult is usually communication that has not found another route. Behavioral Supports means assessing what is actually driving it, writing a plan the whole team can follow, and training the people around the person — family included — so the response is the same whoever is in the room. Consistency is most of the work.",
    includes: [
      "Assessment of what is triggering and maintaining a behavior",
      "A written plan everyone supporting the person can follow",
      "Training for family and caregivers",
      "Review and adjustment as things change",
    ],
    needsConfirmation: true,
  },
  {
    id: "supported-employment",
    icon: "signature-doc",
    title: "Supported Employment",
    shortTitle: "Employment",
    lead: "Real work, for real pay, with support that fades as the job settles.",
    body: "Supported Employment is help finding a job that fits and then keeping it — working out what someone is good at, approaching employers, learning the role alongside them in the first weeks, and staying available afterwards. Support is heaviest at the start and lightens as the person and the employer find their footing. The aim is a job that lasts, not a placement that closes a file.",
    includes: [
      "Working out strengths, interests, and the right kind of role",
      "Approaching employers and preparing for interviews",
      "On-the-job coaching through the early weeks",
      "Ongoing check-ins once the job is established",
    ],
    needsConfirmation: true,
  },
  {
    id: "occupational-therapy",
    icon: "after-hospital-stay",
    title: "Occupational Therapy",
    shortTitle: "OT",
    lead: "Making the tasks of daily life physically possible to do.",
    body: "Occupational therapy looks at the specific things a person wants to do and works out what is getting in the way — grip, sequencing, balance, sensory load, the layout of a room — then changes the task, the tools, or the environment until it works. Small adjustments here often return an activity someone had quietly given up on.",
    includes: [
      "Assessment of daily living skills",
      "Adaptive equipment and technique",
      "Fine motor and sensory strategies",
      "Recommendations for changes to the home",
    ],
    needsConfirmation: true,
  },
  {
    id: "physical-therapy",
    icon: "care-plan",
    title: "Physical Therapy",
    shortTitle: "PT",
    lead: "Keeping movement, strength, and independence for as long as possible.",
    body: "Physical therapy works on mobility — strength, balance, walking, transfers, pain, and the equipment that supports all of it. For many adults with a developmental disability the goal is not recovery from an injury but holding ground: staying steady on stairs, continuing to transfer independently, keeping a wheelchair set up correctly as the body changes.",
    includes: [
      "Mobility, strength, and balance work",
      "Safe transfers and fall prevention",
      "Mobility equipment fit and adjustment",
      "Home exercise routines the family can support",
    ],
    needsConfirmation: true,
  },
];

// ==========================================
// HOW SUPPORT STARTS — the two realistic entry points
// ==========================================
export interface StartPath {
  title: string;
  copy: string;
  steps: string[];
}

export const startPaths: StartPath[] = [
  {
    title: "If you already have a Support Coordinator",
    copy: "This is the short route. Your Support Coordinator manages the plan and the budget, and adding a provider is something they do routinely. You do not need to negotiate anything with us first.",
    steps: [
      "Tell your Support Coordinator you would like Quantum Home Cares to provide a service.",
      "They add us to the Individualized Service Plan and set the hours against your budget.",
      "We visit, meet the person the support is for, and agree what the week should look like.",
      "Support starts, and your coordinator stays in the loop.",
    ],
  },
  {
    title: "If you are new to DDD",
    copy: "Then the provider question comes later than you might expect. Eligibility and Medicaid come first, and those are decided by the Division rather than by an agency. We are glad to talk you through the sequence even though we are not the ones who determine it.",
    steps: [
      "Apply to DDD for an eligibility determination.",
      "Get NJ FamilyCare (Medicaid) enrollment in place, which every DDD service depends on.",
      "Once eligible, you are assigned a Support Coordinator and a budget.",
      "At that point you choose your providers — and you can ask for us by name.",
    ],
  },
];

// ==========================================
// FOR SUPPORT COORDINATORS — the provider-facing close
// ==========================================
export interface CoordinatorFact {
  label: string;
  copy: string;
}

export const coordinatorFacts: CoordinatorFact[] = [
  {
    label: "Approved DDD provider",
    copy: "Quantum Home Cares is an approved provider with the New Jersey Division of Developmental Disabilities, alongside our NJ Health Care Service Firm license.",
  },
  {
    label: "Statewide",
    copy: "We staff homes across all of New Jersey — North, Central, South, and Western Jersey — the same footprint as our senior care work.",
  },
  {
    label: "Same business day response",
    copy: "Referrals are acknowledged the same business day. You will know whether we can take the case before your shift ends.",
  },
  {
    label: "You reach the owner",
    copy: "Marvalyn takes referrals directly. There is no intake queue, and the person who answers can tell you yes or no.",
  },
];
