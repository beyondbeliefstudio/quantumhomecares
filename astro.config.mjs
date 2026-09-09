// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import stripHtmlComments from "./src/integrations/strip-html-comments.mjs";

export default defineConfig({
  site: "https://quantumhomecares.net",
  integrations: [
    mdx(),
    sitemap({
      // /test-form is a temporary harness for the AxisCare integration. Drop
      // this filter when that page is deleted.
      filter: page => !page.includes("/test-form"),
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
