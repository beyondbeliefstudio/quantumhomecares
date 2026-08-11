/**
 * /resources page content. Client-approved — see
 * design_handoff_quantum_homepage/buildout-notes/05-resources.md.
 *
 * The commentary is the product: it is written as Marvalyn's phone guidance,
 * flagged for her personal review, and it is the indexable content no
 * competitor has. Do not flatten it into link descriptions.
 *
 * Link policy (from the handoff's build notes):
 *   · Only URLs and phone numbers the handoff itself supplies are linked.
 *     NJ state program entries deliberately have NO url — the handoff
 *     requires every URL verified as current before publish, and it supplied
 *     none for them. Add them only with verified addresses.
 *   · External links open in a new tab with rel="noopener", dofollow.
 *   · Quarterly link check — resource pages rot faster than any other page.
 */

export interface ResourceEntry {
  name: string;
  /** Only handoff-supplied URLs. */
  url?: string;
  /** Display label for the url (e.g. "medicare.gov"). */
  urlLabel?: string;
  /** Only handoff-supplied numbers, as printed. */
  phone?: string;
  paragraphs: string[];
}

export interface ResourceTopic {
  id: string;
  title: string;
  /** Pill label for the sticky rail. */
  shortTitle: string;
  intro?: string;
  entries: ResourceEntry[];
}

export const topics: ResourceTopic[] = [
  {
    id: "paying",
    title: "Paying for care",
    shortTitle: "Paying for Care",
    intro: "This is where the most confusion lives, and where the costliest mistakes get made.",
    entries: [
      {
        name: "Medicare",
        url: "https://www.medicare.gov",
        urlLabel: "medicare.gov",
        paragraphs: [
          "Start here, because the misunderstanding is nearly universal. Medicare does not pay for ongoing custodial home care. It covers short-term skilled care after a qualifying hospital stay, meaning nursing, physical therapy, that kind of thing, for a limited window. It does not cover someone coming three days a week to help your mother bathe and make her lunch.",
          "Families lose months waiting for Medicare to approve something it was never going to approve. Find that out now rather than in October.",
        ],
      },
      {
        name: "New Jersey Medicaid and MLTSS",
        paragraphs: [
          "Managed Long Term Services and Supports is the New Jersey Medicaid program that can cover long-term home care, and it does cover the kind of care Medicare will not.",
          "There are income and asset limits, and there is a five year lookback period on asset transfers. This is the part that matters: if there is any chance Medicaid will be part of the picture down the road, talk to an elder law attorney before spending down savings or moving assets around. Well-meaning families disqualify themselves every day by doing what seems obviously reasonable.",
        ],
      },
      {
        name: "VA Aid and Attendance",
        url: "https://www.va.gov",
        urlLabel: "va.gov",
        paragraphs: [
          "The most underused benefit we encounter. It is an additional monthly payment on top of a VA pension for veterans who need help with daily activities, and surviving spouses can qualify as well.",
          "That last part surprises people constantly. If your mother's husband served, she may be eligible even though she never served herself. The application takes patience and documentation, and it is worth the effort.",
        ],
      },
      {
        name: "Long-term care insurance",
        paragraphs: [
          "If a policy exists, find it and read it now rather than at the crisis. Two things trip families up. Most policies have an elimination period, meaning you pay out of pocket for a set number of days before coverage starts, so file early. And most require documentation that the person needs help with a specific number of daily activities, which means how the assessment is worded matters.",
          "Denials get overturned on appeal more often than people expect. Do not treat the first no as final.",
        ],
      },
      {
        name: "Private pay",
        paragraphs: [
          "For many families this is the reality, at least at first. The practical advice is to start with fewer hours than you think you need and add as you go. Over-scheduling early burns through savings and often gets resisted by the person receiving care anyway.",
        ],
      },
    ],
  },
  {
    id: "new-jersey",
    title: "New Jersey programs",
    shortTitle: "NJ Programs",
    entries: [
      {
        name: "NJ Division of Aging Services",
        paragraphs: [
          "The state agency overseeing senior programs. Useful as a starting point for what New Jersey funds and administers.",
        ],
      },
      {
        name: "Aging and Disability Resource Connection (ADRC)",
        paragraphs: [
          "Your county's ADRC is genuinely the best first phone call most families can make. They know what exists locally, they are free, and they are not selling anything. If you read one thing on this page and act on it, make it this.",
        ],
      },
      {
        name: "County Area Agencies on Aging",
        paragraphs: [
          "Every New Jersey county has one. Services vary by county and include meal programs, transportation, in-home support, and caregiver assistance. Worth calling even if you assume you will not qualify.",
        ],
      },
      {
        name: "NJ SHIP, State Health Insurance Assistance Program",
        paragraphs: [
          "Free, unbiased Medicare counseling from trained volunteers. Not affiliated with any insurance company, which is exactly why it is valuable. Use them before a Medicare Advantage decision, not after.",
        ],
      },
      {
        name: "NJ Save",
        paragraphs: [
          "A single application that screens for multiple New Jersey benefit programs at once, including help with Medicare premiums, prescription costs, and utility bills.",
        ],
      },
      {
        name: "NJ 211",
        phone: "211",
        paragraphs: [
          "Dial 211. General help line for New Jersey residents, useful when you are not sure who to ask.",
        ],
      },
      {
        name: "Eldercare Locator",
        phone: "1-800-677-1116",
        paragraphs: [
          "Federal service that connects you to local aging services anywhere in the country. Helpful if you are managing care for a parent in a different state.",
        ],
      },
    ],
  },
  {
    id: "discharge",
    title: "Hospital discharge",
    shortTitle: "Discharge",
    intro:
      "Discharge is the moment most families get overwhelmed, and it happens fast. Usually you get about a day of notice.",
    entries: [
      {
        name: "You can appeal a discharge",
        paragraphs: [
          "If you believe your loved one is being sent home too early and unsafely, you have the right to appeal. Ask the hospital for the notice explaining your appeal rights. Most families never know this is an option and accept a discharge date they were uneasy about.",
        ],
      },
      {
        name: "New Jersey's caregiver law",
        paragraphs: [
          "New Jersey requires hospitals to let a patient designate a caregiver, record that person in the record, and provide instruction on the aftercare tasks that person will be doing at home. Ask to be designated. Ask to be shown, not just handed paperwork.",
        ],
      },
      {
        name: "Questions worth asking before they leave",
        paragraphs: [
          "What medications changed and why. What the follow-up appointments are and who schedules them. What warning signs mean call the doctor versus call 911. What the person cannot do on their own for the next two weeks. Whether the home needs equipment before they arrive.",
          "Write the answers down. Nobody remembers a hallway conversation at four in the afternoon.",
        ],
      },
      {
        name: "The first seventy two hours matter most",
        paragraphs: [
          "Most readmissions trace back to something simple. Medications taken wrong, a follow-up appointment missed, not enough to eat, a fall on the way to the bathroom. If you can only arrange help for a short window, make it the first few days home.",
        ],
      },
    ],
  },
  {
    id: "dementia",
    title: "Memory changes and dementia",
    shortTitle: "Dementia",
    entries: [
      {
        name: "Alzheimer's Association 24/7 Helpline",
        url: "https://www.alz.org",
        urlLabel: "alz.org",
        phone: "1-800-272-3900",
        paragraphs: [
          "Free, staffed around the clock, by people who know what they are talking about. We give this number out constantly. It exists specifically for the two in the morning moment when something has happened and you do not know what to do and it is not an emergency room situation.",
        ],
      },
      {
        name: "Alzheimer's New Jersey",
        paragraphs: [
          "A separate New Jersey organization with local support groups, education, and family programs. Worth knowing about alongside the national association.",
        ],
      },
      {
        name: "On support groups",
        paragraphs: [
          "Families resist these and then, almost without exception, wish they had gone sooner. The value is not advice. It is sitting in a room with people who already understand the thing you are trying to explain to everyone else.",
        ],
      },
      {
        name: "A practical note",
        paragraphs: [
          "Early dementia care works best on routine and familiarity. Same caregiver, same schedule, same order of the day. Correcting someone who is confused tends to escalate things. Redirecting works better. That is a learnable skill, and it is one of the things we screen caregivers for.",
        ],
      },
    ],
  },
  {
    id: "legal",
    title: "Legal and financial planning",
    shortTitle: "Legal",
    entries: [
      {
        name: "Talk to an elder law attorney earlier than feels necessary",
        paragraphs: [
          "This is the single most common regret we hear. Families call an attorney in the middle of a crisis, when options have already narrowed. The right time is while your parent is still able to participate in the decisions.",
          "The National Academy of Elder Law Attorneys maintains a searchable directory, and the New Jersey State Bar Association operates a lawyer referral service.",
        ],
      },
      {
        name: "Power of attorney and advance directives",
        paragraphs: [
          "A financial power of attorney and a healthcare directive are the two documents that determine whether you can act when you need to. Without them, families end up in court asking a judge for guardianship, which is expensive, slow, and public.",
          "New Jersey has its own advance directive forms. An attorney can prepare these, and in straightforward situations they are not expensive.",
        ],
      },
      {
        name: "Adult Protective Services",
        paragraphs: [
          "Every New Jersey county has an APS office. If you suspect abuse, neglect, exploitation, or a senior living in unsafe conditions, this is who to call. Financial exploitation of older adults is far more common than most families realize, and it is usually someone known to the person.",
        ],
      },
    ],
  },
  {
    id: "caregiver-support",
    title: "For the caregiver",
    shortTitle: "For Caregivers",
    intro: "If you are the one holding all of this together, this section is for you specifically.",
    entries: [
      {
        name: "NJ Statewide Respite Care Program",
        paragraphs: [
          "New Jersey funds respite care for eligible families caring for adults who cannot be left alone. Income guidelines apply. Many families who qualify never apply because they do not know it exists.",
        ],
      },
      {
        name: "Family Caregiver Alliance",
        url: "https://www.caregiver.org",
        urlLabel: "caregiver.org",
        paragraphs: [
          "Practical, well-organized guidance on the things nobody prepares you for. Their state-by-state resource tool is useful.",
        ],
      },
      {
        name: "AARP Caregiving",
        url: "https://www.aarp.org/caregiving",
        urlLabel: "aarp.org/caregiving",
        paragraphs: [
          "Strong plain-language material on care coordination, legal basics, and long-distance caregiving. You do not need to be a member for most of it.",
        ],
      },
      {
        name: "Caregiver Action Network",
        url: "https://www.caregiveraction.org",
        urlLabel: "caregiveraction.org",
        paragraphs: [
          "Peer support and practical tools, oriented toward the emotional side of caregiving rather than the logistics.",
        ],
      },
      {
        name: "One thing worth saying plainly",
        paragraphs: [
          "Caregiver burnout is not a character flaw and it is not rare. It shows up as exhaustion, resentment you feel guilty about, skipped doctor appointments of your own, and a slow withdrawal from your own life.",
          "The people who last in this role are the ones who accept help early. Whether that help comes from us, from family, from a county program, or from a neighbor does not matter. Waiting until you are past the point of coping is the thing to avoid.",
        ],
      },
    ],
  },
];

// ==========================================
// 8. WHERE FAMILIES GET STUCK — the five things
// ==========================================
export interface StuckItem {
  claim: string;
  note: string;
  /** Icon name from src/icons/ */
  icon: string;
}

export const stuck: StuckItem[] = [
  {
    claim: "Medicare will not pay for ongoing home care.",
    note: "Confirm this early so you can plan around it instead of waiting on it.",
    icon: "insurance-card",
  },
  {
    claim: "Moving money to qualify for Medicaid can backfire.",
    note: "There is a five year lookback. Talk to an elder law attorney before making any transfers.",
    icon: "lookback-clock",
  },
  {
    claim: "Surviving spouses can qualify for VA benefits.",
    note: "The veteran does not have to still be living.",
    icon: "benefits-shield",
  },
  {
    claim: "Powers of attorney have to be signed while the person still can.",
    note: "Once capacity is gone, the option is guardianship, and that is a different and much harder road.",
    icon: "signature-doc",
  },
  {
    claim: "Your county's ADRC is free and knows more than any website.",
    note: "Including this one. Call them.",
    icon: "phone-call",
  },
];
