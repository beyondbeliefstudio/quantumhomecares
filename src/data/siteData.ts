export const baseData = {
  title: "Quantum Home Cares",
  legalName: "Quantum Home Cares, LLC",
  description:
    "In-home senior care across New Jersey. Quantum Home Cares pairs everyday support with hands-on medical advocacy so aging at home stays safe and dignified.",
  phone: "732-498-2960",
  email: "quantumhomecares@yahoo.com",

  // Statewide in-home agency — no storefront address to publish.
  serviceArea: {
    state: "New Jersey",
    summary: "Serving all of New Jersey",
    regions: "North, Central, and South Jersey",
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

/** `tel:` href with every non-digit stripped, so markup never has to do it. */
export const telHref = `tel:${baseData.phone.replace(/\D/g, "")}`;

/** `mailto:` href for the published inbox. */
export const mailHref = `mailto:${baseData.email}`;
