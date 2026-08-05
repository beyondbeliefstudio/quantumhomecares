> **Context for Claude Code:** This file contains the content for one page only.
> Read `00-global.md` first for site structure, header, footer, and shared conventions.
> The site is already built and live. This is a content implementation, not a redesign.
> Inherit the existing design system, components, and styling.

---

# PAGE 1: HOME

**Route:** `/`

## SEO

**Title tag**
Quantum Home Cares | In-Home Senior Care Across New Jersey

**Meta description**
Advocacy-led in-home senior care across New Jersey: daily living support, meals, transportation, respite, and an advocate in the room at medical appointments.

**H1**
Home is where they want to be. We help them stay there.

**Primary keyword target**
senior home care New Jersey

**Schema**
LocalBusiness / HomeHealthCareService, plus Person schema for Marvalyn Ellis, plus FAQPage for the FAQ section.

---

## Section 1 — Hero

**ID:** `hero`

**Eyebrow**
In-Home Senior Care Across New Jersey

**Headline (H1)**
Home is where they want to be. We help them stay there.

**Subhead**
Quantum Home Cares pairs everyday in-home support with hands-on medical advocacy, so aging at home stays safe and dignified and your family is not managing it alone.

**Primary CTA**
Request a Free Consultation → `#contact`

**Secondary CTA**
See How It Works → `#how`

---

## Section 2 — Trust Bar

**ID:** `trust`

Four items, icon plus label plus short supporting line. No paragraph text.

**Licensed and registered**
New Jersey Health Care Service Firm HP0426700

**Insured and bonded**
Every caregiver vetted, screened, and background checked

**Advocacy included**
We attend appointments and follow through

**Serving all of New Jersey**
North, Central, South, and Western Jersey

---

## Section 3 — Why Families Reach Out

**ID:** `why`

**Eyebrow**
Why Families Reach Out

**Headline (H2)**
Caring for someone you love becomes a second full-time job.

**Body**
The appointments. The medications. The insurance calls that go nowhere. The phone ringing at two in the morning and the drive over to check on them.

Most people are holding all of it alongside a job and a family of their own, with the constant sense that something is being missed. That is not a personal failure. It is what happens when one person is asked to be a nurse, a scheduler, a driver, and an advocate at once.

**Closing line**
Quantum Home Cares takes that weight off your family.

---

## Section 4 — Services Snapshot

**ID:** `services`

**Eyebrow**
What We Do

**Headline (H2)**
Complete support, built around one person.

**Intro**
Every family arrives with a different situation. We build a care plan around what your loved one actually needs, then adjust it as things change.

**Card 1 — Care Planning and Advocacy**
A written plan, and someone in the room at medical appointments.

**Card 2 — Daily Living Support**
Hygiene, housekeeping, and laundry, handled with dignity.

**Card 3 — Meals, Nutrition, and Wellness**
Meal preparation, groceries, and medication reminders.

**Card 4 — Respite, Overnight, and Live-In**
Coverage for the hours nobody is watching, and rest for the family.

**Section link**
See everything we provide → `/services`

**Content note:** Reduced from six cards to four. Transportation and Companionship now appears on the Services page only.

---

## Section 5 — Our Approach & Marvalyn

**ID:** `approach`

**Eyebrow**
Our Approach

**Headline (H2)**
Most agencies send help. We show up and follow through.

**Body**
Large agencies run on clinical quotas and insurance billing. An aide arrives, hours get logged, and your family is still the one on hold with the insurance company at four in the afternoon.

We build the care plan, attend the appointments, handle the follow-through, and stay in contact before something goes wrong rather than after.

Advocacy is not an add-on service here. It is the reason this company exists.

**Founder block** (alongside photo of Marvalyn)

Quantum Home Cares was founded by Marvalyn Ellis after more than 25 years in healthcare advocacy and senior housing, alongside her own experience managing care for her parents. She built the company she wishes her family had.

**Section link**
Read Marvalyn's story and how we work → `/our-approach`

---

## Section 6 — How It Works

**ID:** `how`

**Eyebrow**
Getting Started

**Headline (H2)**
From first message to first day of care.

**Step 1 — Tell us what is going on**
Send the form, call, or email, and we respond within one business day. We listen, ask a few questions, and tell you what would help, even if that is less care than you expected. The conversation is free.

**Step 2 — We build a plan for your loved one**
A visit to the home, an assessment of the real needs and routines, and a written care plan you approve before anything begins.

**Step 3 — Care begins, and we stay involved**
We match a caregiver, get started, and stay in regular contact. As needs change, the plan changes with them.

---

## Section 7 — For Care Professionals

**ID:** `professionals`

**Eyebrow**
For Care Professionals

**Headline (H2)**
A referral partner who closes the loop.

**Body**
Discharge planners, social workers, case managers, and elder law attorneys work with us because referrals get acknowledged the same business day and homes get staffed within days, not weeks.

**Section link**
See how referrals work → `/for-professionals`

**Content note:** This addresses a different audience than the rest of the page. Tone should read as efficient rather than warm. It is a routing signal, not a pitch.

---

## Section 8 — Resources

**ID:** `resources`

**Eyebrow**
Resources

**Headline (H2)**
Most families do not know what is available to them.

**Body**
Medicare, Medicaid, VA benefits, county programs, caregiver support. We put together the guidance we give families on the phone, whether or not they ever hire us.

**Section link**
Browse resources for families → `/resources`

---

## Section 9 — FAQ

**ID:** `faq`

**Headline (H2)**
Questions families ask first

**Intro**
Don't see your question here? Send it with the form and we will get back to you within one business day.

**Q: What is the minimum commitment?**
There is no long contract. We start with the schedule your loved one needs and adjust month to month.

**Q: How quickly can care start?**
In most cases within a few days of the assessment, and faster for hospital discharges.

**Q: What if my loved one refuses help?**
Common, and expected. We start small, often with companionship or errands, and let trust build before adding personal care.

**Q: Will it be the same caregiver?**
Yes, with a named backup who already knows the care plan for vacations and sick days.

**Technical note:** Implement FAQPage schema on this section.

---

## Section 10 — Contact

**ID:** `contact`

**Headline (H2)**
Tell us about your situation.

**Body**
Send us the situation and we will respond within one business day. Families, seniors, and referring professionals all use this form. It costs nothing to ask, and there is nothing to sign.

**Alternate contact line**
Prefer to talk? Call 732-498-2960 or email [DOMAIN EMAIL]

**Form fields**
- First name (required)
- Last name (required)
- Phone (required)
- Email (required)
- What kind of help are you looking for? (required)
- Anything else you want us to know (optional)

**Submit button**
Send Request

**Under-form note**
We respond within one business day. Please leave out medical details, we will gather what we need when we speak.

**Technical note:** Netlify form, email notification to client only, no stored submissions retained. Honeypot field for spam. Autoresponder to submitter via `submission-created` function once domain email and DKIM are configured.

---

## Content Moved Off the Homepage

| Content | New location |
|---|---|
| Six full service descriptions | `/services` |
| Transportation and Companionship card | `/services` |
| Agency comparison table | `/our-approach` |
| Who We Help (four moments) | `/our-approach` |
| The Six Cs | `/our-approach` |
| Marvalyn's full story | `/our-approach` |
| In the News / HomeCare Magazine | `/our-approach` |
| Where We Work (county grid) | `/our-approach` |
| For Professionals detail cards | `/for-professionals` |
| Image strips | Distributed across interior pages |

---
