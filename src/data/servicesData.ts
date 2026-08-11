/**
 * /services page content. Client-approved — see
 * design_handoff_quantum_homepage/buildout-notes/02-services.md.
 *
 * Facts that must not drift:
 *   · Caregivers give medication REMINDERS. They never administer medication
 *     and never make clinical decisions.
 *   · This is not a skilled nursing agency — no wound care, injections, or
 *     IV therapy. (The "What we do not do" section that said so on the page
 *     was cut in design review; the constraint still holds for any copy
 *     written here — nothing may imply clinical services.)
 *   · Six services. The homepage shows four of them, collapsed — see
 *     `services` in homeData.ts, and keep the two lists from contradicting.
 *
 * Each block carries its own photo. Chosen to avoid repeating anything the
 * page's PhotoStrip shows (strip-medical/love/hug/outdoors) — six blocks plus
 * a four-photo strip means one duplicate would read as running out of film.
 */

import type { ImageMetadata } from "astro";

import photoAdvocacy from "@/assets/photos/newStock/pexels-vlada-karpovich-5790810.jpg";
import photoDailyLiving from "@/assets/photos/strip-hands.jpg";
import photoNutrition from "@/assets/photos/aging-at-home.jpg";
import photoCompanionship from "@/assets/photos/newStock/pexels-cottonbro-7232038.jpg";
import photoRespite from "@/assets/photos/newStock/pexels-cottonbro-7086034.jpg";
import photoOvernight from "@/assets/photos/newStock/pexels-kampus-7551683.jpg";

export interface ServiceDefinition {
  term: string;
  copy: string;
}

export interface ServiceDetail {
  /** In-page anchor. */
  id: string;
  /** Filename in src/icons/, without the extension. */
  icon: string;
  title: string;
  /** One or two words for the sticky sub-nav rail. */
  shortTitle: string;
  photo: ImageMetadata;
  photoAlt: string;
  /** One line under the heading — the reason a family cares about this. */
  lead: string;
  body: string[];
  /** Only Overnight uses these: the two ways a night can be covered. */
  definitions?: ServiceDefinition[];
  /** Paragraphs that run after the definitions. */
  bodyAfter?: string[];
  includes: string[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: "advocacy",
    icon: "care-plan",
    title: "Care Planning and Advocacy",
    shortTitle: "Advocacy",
    photo: photoAdvocacy,
    photoAlt: "A caregiver checking a senior man's blood pressure at home and recording the reading",
    lead: "This is the part most agencies do not do at all, and it is the reason many families call us in the first place.",
    body: [
      "An aide showing up is only half of what a family needs. The other half is the appointments, the specialists who do not talk to each other, the prescription that changed and nobody explained why, and the insurance company that puts you on hold for forty minutes and then transfers you.",
      "We take that on.",
      "We build a written care plan and keep it current. We go to medical appointments and ask the questions families do not think to ask until the drive home. We follow up on referrals that would otherwise sit for weeks. We handle the calls, the forms, and the coordination between providers, and we tell you what actually happened in plain language.",
      "Marvalyn spent twenty five years doing exactly this for her own parents before she did it professionally. That is where the standard comes from.",
    ],
    includes: [
      "A written care plan built from an in-home assessment",
      "Regular plan reviews and updates as needs change",
      "Attendance at medical appointments with notes back to the family",
      "Coordination between doctors, specialists, and providers",
      "Follow-through on referrals, orders, and test results",
      "Help navigating insurance calls and paperwork",
      "Connections to community resources most families never hear about",
      "Regular updates to family members, including those out of state",
    ],
  },
  {
    id: "daily-living",
    icon: "daily-living",
    title: "Daily Living Support",
    shortTitle: "Daily Living",
    photo: photoDailyLiving,
    photoAlt: "A caregiver's hands gently holding a senior's hand",
    lead: "The everyday things that get harder, handled in a way that protects your loved one's dignity.",
    body: [
      "Personal care is the hardest conversation most families have. A parent who has been independent for eighty years does not want their daughter helping them shower, and the daughter does not want to be the one asking. That resistance is normal and we expect it.",
      "Our approach is to start where the person is comfortable and build from there. Sometimes that means a caregiver spends the first two weeks doing laundry and making lunch before personal care ever comes up. Trust first, tasks second. It takes a little longer and it works far better than pushing.",
      "The home itself matters too. Clutter on the stairs, a bathroom without a grab bar, a loose rug in a hallway. Falls are the single biggest threat to someone staying at home, and most of what causes them is fixable in an afternoon.",
    ],
    includes: [
      "Bathing, showering, and personal hygiene assistance",
      "Dressing and grooming",
      "Toileting and incontinence care",
      "Mobility assistance and transfer support",
      "Light housekeeping and tidying",
      "Laundry and changing linens",
      "Basic home safety awareness and fall risk reduction",
      "Help with the small daily routines that keep a person feeling like themselves",
    ],
  },
  {
    id: "nutrition",
    icon: "meals",
    title: "Meals, Nutrition, and Wellness",
    shortTitle: "Nutrition",
    photo: photoNutrition,
    photoAlt: "A caregiver sharing time with seniors around a table at home",
    lead: "Nutrition is where decline usually starts, and it is one of the easiest things to catch early.",
    body: [
      "When someone lives alone, cooking stops being worth the effort. Appetite fades. Meals turn into toast and coffee, then just coffee. Dehydration follows, and dehydration in an older adult can look like confusion, weakness, or a fall.",
      "By the time a family notices, it has often been happening for months.",
      "A caregiver in the home a few times a week changes that. Real food gets made. The fridge gets checked. Somebody notices that the milk expired two weeks ago or that the same casserole has been sitting untouched since Tuesday. Those small observations are early warning signs, and they get reported back to you.",
      "Eating with someone matters too. People eat more, and better, when they are not eating alone.",
    ],
    includes: [
      "In-home meal preparation, including meals portioned and stored for later",
      "Cooking around dietary needs such as low sodium, diabetic, or soft foods",
      "Grocery shopping and pantry management",
      "Hydration encouragement and monitoring",
      "Medication reminders on schedule",
      "Watching for changes in appetite, weight, and energy, with updates to the family",
      "Company at the table",
    ],
  },
  {
    id: "companionship",
    icon: "transportation",
    title: "Transportation and Companionship",
    shortTitle: "Companionship",
    photo: photoCompanionship,
    photoAlt: "A caregiver and a senior woman laughing together over a magazine at home",
    lead: "Isolation is one of the biggest risks to senior health, and one of the easiest to solve.",
    body: [
      "Giving up the car keys is one of the hardest transitions a person goes through. It is not really about driving. It is about the grocery store, the hair appointment, church on Sunday, and lunch with the same three friends they have had for forty years. When the driving stops, all of that quietly stops with it.",
      "We put the world back within reach. A caregiver drives them there, goes in with them if that helps, and brings them home.",
      "The companionship side is not filler. Loneliness carries measurable health consequences in older adults, and a standing visit from someone who knows their stories and remembers to ask about the grandkids does real work. Some of our most valuable hours are spent on a porch talking about nothing in particular.",
    ],
    includes: [
      "Transportation to medical appointments, with a caregiver who can stay through the visit",
      "Errands including groceries, pharmacy, bank, and post office",
      "Rides to church, standing social commitments, and family gatherings",
      "Accompaniment to appointments and outings rather than drop-off",
      "Conversation, shared activities, hobbies, cards, and walks",
      "Help staying connected with family by phone or video",
      "Encouragement to stay active in whatever way is realistic for them",
    ],
  },
  {
    id: "respite",
    icon: "respite",
    title: "Respite and Specialized Care",
    shortTitle: "Respite",
    photo: photoRespite,
    photoAlt: "A senior man and his caregiver sharing a laugh outdoors in the sunshine",
    lead: "Caring for someone else should not cost you your own health.",
    body: [
      "Family caregivers are the ones we worry about most. They skip their own doctor appointments. They stop seeing friends. They tell themselves they will rest once things settle down, and things do not settle down.",
      "Respite is coverage so you can step away and not spend the whole time worrying. A few hours a week to get to the gym or have dinner out. A full week so you can take the vacation you canceled two years ago. Ongoing coverage so you can go back to being a son or a daughter instead of a full-time aide.",
      "We also provide closer supervision for situations that need it. Early dementia, where routine and familiarity matter more than anything. Recovery after a surgery or a hospital stay. A parent whose balance is not what it was and who should not be alone for long stretches.",
    ],
    includes: [
      "Short-term respite by the hour, the shift, or the day",
      "Extended respite for travel, surgery, or family emergencies",
      "Ongoing scheduled coverage so family caregivers get consistent time off",
      "Memory care support built on routine, redirection, and familiarity",
      "Post-hospital and post-surgical support at home",
      "Supervision and companionship for seniors at higher risk of falls or wandering",
      "Coverage that can scale up quickly when a situation changes",
    ],
  },
  {
    id: "overnight",
    icon: "overnight",
    title: "Overnight and Live-In Care",
    shortTitle: "Overnight",
    photo: photoOvernight,
    photoAlt: "Two caregivers settling a senior man comfortably into bed",
    lead: "For families worried about the hours nobody is watching.",
    body: [
      "Most of what families fear happens at night. The three in the morning bathroom trip in the dark. Sundowning that gets worse after dinner. A parent who wakes up disoriented, or who gets up and goes outside and nobody knows for hours.",
      "If you are the one lying awake at home listening for your phone, you already know what this costs you.",
      "There are two ways we cover nights, and the right one depends on the person.",
    ],
    definitions: [
      {
        term: "Awake overnight",
        copy: "means a caregiver stays awake through the shift and is actively watching. This is the right fit when someone gets up frequently, wanders, or needs help getting to the bathroom safely.",
      },
      {
        term: "Live-in",
        copy: "means a caregiver stays in the home with a designated sleeping arrangement, available if something happens. This works well when someone generally sleeps through but should not be alone in the house.",
      },
    ],
    bodyAfter: [
      "We will tell you honestly which one the situation calls for. Awake overnight is more coverage than many families need, and we would rather match it correctly than oversell it.",
    ],
    includes: [
      "Awake overnight shifts with active monitoring",
      "Live-in arrangements with a caregiver present in the home",
      "Nighttime bathroom assistance and fall prevention",
      "Support for sundowning and nighttime confusion",
      "Morning and evening routine assistance around the overnight shift",
      "Coverage scheduled around how the person actually sleeps, not a fixed template",
    ],
  },
];
