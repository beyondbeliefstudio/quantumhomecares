export const baseData = {
  title: "Quantum Home Cares",
  legalName: "Quantum Home Cares, LLC",
  description:
    "In-home senior care across New Jersey. Quantum Home Cares pairs everyday support with hands-on medical advocacy so aging at home stays safe and dignified.",
  phone: "732-498-2960",
  /**
   * PENDING: buildout-notes/01-home.md calls for a domain email here. Swapping
   * this one value updates the contact section, the footer, and the
   * LocalBusiness schema together — nothing else hardcodes an address.
   * The contact form's autoresponder is also blocked on it (needs DKIM).
   */
  email: "quantumhomecares@yahoo.com",

  // Statewide in-home agency — no storefront address to publish.
  serviceArea: {
    state: "New Jersey",
    summary: "Serving all of New Jersey",
    regions: "North, Central, South, and Western Jersey",
  },

  credentials: {
    license: "NJ Health Care Service Firm HP0426700",
    insurance: "Insured and bonded",
  },

  owner: {
    name: "Marvalyn Ellis",
    role: "Founder",
  },

  social: {
    // Add only platforms the business actually uses.
  },
};

/**
 * Stable @id fragments for the JSON-LD graph.
 *
 * BaseHead emits the business and founder nodes once. Page-level nodes — the
 * homepage's FAQPage, the Service nodes on /services — reference the business
 * by @id rather than redeclaring it, so the whole site describes one entity
 * instead of a new business per page. Derived from `site` in astro.config.mjs
 * so the URL is never written twice.
 */
export const schemaIds = (site: URL | undefined) => {
  const base = site?.toString().replace(/\/$/, "") ?? "";
  return { business: `${base}/#business`, founder: `${base}/#founder` };
};

/** `tel:` href with every non-digit stripped, so markup never has to do it. */
export const telHref = `tel:${baseData.phone.replace(/\D/g, "")}`;

/** `mailto:` href for the published inbox. */
export const mailHref = `mailto:${baseData.email}`;
