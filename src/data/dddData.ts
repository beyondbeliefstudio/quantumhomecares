/**
 * /ddd-support page content.
 *
 * Marvalyn was approved as a New Jersey Division of Developmental Disabilities
 * provider in September 2026. This page exists because the approval was not
 * visible anywhere — not on the site, and not on the flyer she was sending to
 * Support Coordinators.
 *
 * SCOPE — this is a short page on purpose (rewritten 2026-09-16)
 *
 * It was briefly a full service-by-service treatment: a photo chapter card per
 * service, a paragraph of prose and a four-item "what this includes" list on
 * each, a two-branch getting-started section, and an eleven-item subnav. Chris
 * cut it back. Senior care is the business; DDD is a door, and a door needs a
 * sign, not a brochure.
 *
 * So the rule for this file is one line per service and nothing else. If a
 * service needs a paragraph to explain, that's a phone call, not more copy.
 *
 * TONE — WHAT THIS PAGE IS ABOUT (Chris, 2026-09-16, second pass)
 *
 * An earlier draft organised the whole page around money and eligibility: the
 * hero opened on "if you have a DDD budget", the services section explained
 * that DDD approves providers for specific lists, and the third section was
 * headed "Who DDD will fund". Twenty-three references to budgets, funding,
 * approval, plans, Medicaid and eligibility above the contact band. Chris:
 * "everything feels like it ties back to budget. The focus should be entirely
 * on providing the care."
 *
 * So: no visitor-facing copy mentions a budget, funding, Medicaid, NJ
 * FamilyCare or eligibility. The seven services are still exactly the seven on
 * the approval letter — that constraint has not moved — but the page presents
 * them as what we do, not as a list of what we are permitted to bill. Never
 * write "these are the services we are approved to deliver" again; just say
 * what the care is.
 *
 * The administrative facts live in the coordinator half of the closing panel
 * and nowhere else.
 *
 * VOICE (Chris, 2026-09-16): the first draft of this page read as obviously
 * machine-written and was rewritten. The tells, so they don't creep back:
 * stacked sentence fragments used for rhythm ("Showing up when we said we
 * would."), things arriving in threes, every paragraph landing on a short
 * declarative zinger, and — the big one — zero contractions. At the time of the
 * rewrite the site had 173 uncontracted forms ("it is", "we are", "do not") in
 * its copy and exactly two contractions, both inside real customer
 * testimonials, which is to say the only human-written text on the site was the
 * only text using them. Write these lines the way you'd say them out loud.
 * Resist re-adding `body` or `includes` — the long version is in git history
 * (see the commits around 2026-09-16) if a future DDD page ever wants it back.
 *
 * PHOTOGRAPHY — READ BEFORE SWAPPING ANY OF THESE
 *
 * Each service carries a photo instead of an icon (Chris, 2026-09-16). The
 * library does not really support that yet and three of these are placeholders.
 * Of the sixteen images in newStock, exactly FOUR show adults with
 * developmental disabilities; the rest are seniors — wrong page — or already
 * placed elsewhere on the site.
 *
 * Strong, and specific to this page:
 *   · care-assure          → Individual Supports
 *   · pexels-cliff-booth-4058413 → the hero
 *   · pexels-cliff-booth-4058325 → Community Inclusion Services
 *   · raj-tuladhar         → Occupational Therapy (adaptive equipment)
 *
 * PLACEHOLDERS — borrowed from other pages, replace when real photography
 * arrives. Each `photoAlt` describes the image honestly, so check the alt still
 * matches whatever you swap in:
 *   · jimmy-woo      (Community Based Support) — a street, nobody in it
 *   · pexels-ilayda0700 (Respite)  — also on the Testimonial component
 *   · pexels-gustavo-fring (Behavioral Supports) — reads clinical, and this is
 *     a non-medical agency everywhere else on the site
 *   · dominik-lange  (Physical Therapy) — a dusk silhouette, melancholy for a
 *     service about keeping your independence
 *
 * What to buy: adults 21–60, one image that reads as therapy or mobility work
 * with a practitioner, and one of a family caregiver getting a break.
 *
 * ACCURACY GUARD — THE APPROVED SERVICE LIST IS ON RECORD
 *
 * DDD is a regulated Medicaid program. A service listed here that Marvalyn is
 * not actually approved to deliver will bring referrals she has to turn down,
 * from the exact audience this page is meant to win over.
 *
 * The list below matches the Approved Services table on Marvalyn's DDD
 * approval, received September 2026. Seven services carry an (X) in at least
 * one program column, and those seven — and only those seven — appear here:
 *
 *   Supports Program + Community Care Program
 *     · Behavioral Supports
 *     · Community Inclusion Services
 *     · Occupational Therapy
 *     · Physical Therapy
 *     · Respite
 *
 *   Supports Program only (Not Applicable under Community Care)
 *     · Community Based Support
 *
 *   Community Care Program only (Not Applicable under Supports Program)
 *     · Individual Supports
 *
 * That split is real money: asking for Individual Supports against a Supports
 * Program budget, or Community Based Support against a Community Care budget,
 * is a plan that will not fund. It is too fine-grained for the service cards on
 * a page this short, so it is stated once in `programNote` below, in the
 * coordinator block where the people who need it will be reading.
 *
 * NOT approved — do not add any of these back without a newer approval letter:
 * Assistive Technology, Career Planning, Cognitive Rehabilitation, Day
 * Habilitation, Interpreter Services, Natural Supports Training, Personal
 * Emergency Response System, Prevocational Training, Speech/Language/Hearing
 * Therapy, Support Coordination, Supported Employment (Individual and Small
 * Group), Support Brokerage, Transportation.
 *
 * Occupational and Physical Therapy ARE approved, and that sits oddly beside
 * the non-medical position held everywhere else on the site (see the accuracy
 * notes in professionalsData.ts). Approval is permission, not staffing: both
 * require a licensed therapist. The `specialist` flag below drives the one line
 * on the page that says so.
 *
 * Other facts that must not drift:
 *   · Never state a DDD provider ID or contract number — the client chose to
 *     say "approved provider" without publishing numbers.
 *   · DDD-funded services begin at age 21. Do not imply services for children.
 *   · Medicaid / NJ FamilyCare eligibility is required. Do not soften this.
 *   · Service names are spelled exactly as the approval letter spells them, so
 *     a coordinator can match them line for line. "Individual Supports" and
 *     "Community Based Support" really do differ on that trailing s.
 *   · Do not link to nj.gov program pages without checking them first; the
 *     Division reorganizes those URLs and several old ones now 404.
 */

import type { ImageMetadata } from "astro";

import photoIndividual from "@/assets/photos/newStock/care-assure-Zx4ddAfk0Ck-unsplash.jpg";
import photoCommunity from "@/assets/photos/newStock/jimmy-woo-bgBzB13ek8w-unsplash.jpg";
import photoInclusion from "@/assets/photos/newStock/pexels-cliff-booth-4058325.jpg";
import photoRespite from "@/assets/photos/newStock/pexels-ilayda0700-36706841.jpg";
import photoBehavioral from "@/assets/photos/newStock/pexels-gustavo-fring-7446759.jpg";
import photoOt from "@/assets/photos/newStock/raj-tuladhar-VZ2J246wEqE-unsplash.jpg";
import photoPt from "@/assets/photos/newStock/dominik-lange-VUOiQW4OeLI-unsplash.jpg";

export interface DddService {
  /** Card image. See the photography note above before changing one. */
  photo: ImageMetadata;
  /** Describe the photo that is actually there, not the service. */
  photoAlt: string;
  /** Spelled as the approval letter spells it. */
  title: string;
  /** One line a family can understand without knowing the program. One. */
  lead: string;
  /**
   * Clinical or specially credentialed work — not something the caregiver on
   * shift delivers. Drives a single qualifying line under the grid rather than
   * a section of its own.
   */
  specialist?: boolean;
}

/**
 * Page order is deliberate: the four a family is most likely to want first,
 * the three specialist ones last. DddCallout on the homepage takes the first
 * four off the top of this array, so do not reorder without looking there.
 */
export const dddServices: DddService[] = [
  {
    photo: photoIndividual,
    photoAlt:
      "A support worker kneeling beside a young woman in a wheelchair as she lifts a hand weight at home",
    title: "Individual Supports",
    lead: "A caregiver at home with you for the routine parts of the day: dressing, meals, medication reminders, keeping the house running.",
  },
  {
    photo: photoCommunity,
    photoAlt: "Shops and parked cars along a New Jersey main street on an autumn afternoon",
    title: "Community Based Support",
    lead: "Someone with you when you're out of the house, whether that's an appointment, a shift at work, or the grocery store.",
  },
  {
    photo: photoInclusion,
    photoAlt:
      "A boxing coach wrapping the hands of a young woman with Down syndrome before a session",
    title: "Community Inclusion Services",
    lead: "Help finding things going on locally that you'd actually want to keep doing, and support to stay with them.",
  },
  {
    photo: photoRespite,
    photoAlt: "Two pairs of hands held together, one older, one younger",
    title: "Respite",
    lead: "Scheduled hours so whoever normally does the caregiving gets a real break.",
  },
  {
    photo: photoBehavioral,
    photoAlt: "A support worker sitting with a woman at her kitchen table, checking in",
    title: "Behavioral Supports",
    lead: "Working out what's driving a behavior and getting everyone around the person responding the same way.",
    specialist: true,
  },
  {
    photo: photoOt,
    photoAlt: "A man using a wheelchair boarding an accessible van on a lift while a worker assists",
    title: "Occupational Therapy",
    lead: "Practical help with everyday tasks, including adaptive equipment and changes to how a room is set up.",
    specialist: true,
  },
  {
    photo: photoPt,
    photoAlt: "A person pushing someone in a wheelchair along a park path at sunset",
    title: "Physical Therapy",
    lead: "Strength, balance, walking and transfers, plus keeping mobility equipment fitted properly.",
    specialist: true,
  },
];

/**
 * The one piece of administrative detail left on the page, and it sits in the
 * coordinator half of the closing panel because that is who it is for. See the
 * accuracy guard above for why the split matters. Everything above this on the
 * page is about the caregiving; keep it that way.
 */
export const programNote =
  "We're approved under both the Supports Program and Community Care, with two exceptions worth catching before you build the plan: Individual Supports is Community Care only, and Community Based Support is Supports Program only.";

// ==========================================
// HOW WE WORK — this used to be three eligibility gates (21+, NJ FamilyCare,
// found eligible by the Division) and it made the section, and the page around
// it, read like a benefits office. Chris cut that on 2026-09-16. What is left
// is about the people and the caregiving. The age fact survives because
// implying we support children would bring referrals we have to turn down; the
// Medicaid and eligibility facts moved to the coordinator block, where the
// audience is the people who actually handle them.
// ==========================================
export interface Commitment {
  label: string;
  copy: string;
}

export const commitments: Commitment[] = [
  {
    label: "The same faces",
    copy: "We schedule so the same caregivers keep coming back, rather than sending whoever happens to be free that morning.",
  },
  {
    label: "However much help is wanted",
    copy: "Some people need a hand with one part of the day and some need company for most of it. We don't sort anybody into a level.",
  },
  {
    label: "Adults across New Jersey",
    copy: "We support adults 21 and older, and we staff homes across the whole state rather than one county.",
  },
];

// ==========================================
// GETTING STARTED — one route, because it is one route. The old version split
// this into "you have a coordinator" and "you are new to DDD" and spent eight
// numbered steps on it; the honest short answer is that the coordinator holds
// the budget either way.
// ==========================================
export const startSteps: string[] = [
  "Tell your Support Coordinator you'd like to work with Quantum Home Cares.",
  "They take care of the arrangements on their end. It's a routine request.",
  "We come out, meet everyone, and work out what a good week looks like.",
];
