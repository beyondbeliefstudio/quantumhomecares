// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import stripHtmlComments from "./src/integrations/strip-html-comments.mjs";

const EXCLUDED_FROM_SITEMAP = [
  "/test-form",
  "/submit-contact",
  "/submit-referral",
  "/submit-application",
];

export default defineConfig({
  site: "https://quantumhomecares.net",

  /*
    Netlify serves these pages at a trailing slash and 301s the bare path to
    it, and the canonical tags and sitemap have always said the same. Only the
    site's own links disagreed, so every internal click spent a redirect hop.
    Declaring it here makes the dev server enforce what production enforces,
    so a link written without the slash fails locally instead of in an audit.
  */
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      // Pages that must not be submitted to search engines.
      //
      // /test-form is a temporary harness for the AxisCare integration; drop
      // its entry when that page is deleted. The /submit-* pages are the form
      // POST destinations — real pages, but a searcher landing on "Request
      // Received" has submitted nothing and reads it as broken, and indexed
      // thank-you pages fire false conversions if a goal is set on the URL.
      //
      // Each of these also carries its own noindex tag, so the two defences
      // stay in step. Keep them that way.
      filter: page => !EXCLUDED_FROM_SITEMAP.some(path => page.includes(path)),
    }),
    icon({
      iconDir: "src/icons",
    }),
    // Source comments stay in the .astro files; they just do not ship.
    stripHtmlComments(),
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
