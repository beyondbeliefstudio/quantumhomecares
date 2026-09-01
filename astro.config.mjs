// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

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
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
