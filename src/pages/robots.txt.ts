import type { APIRoute } from "astro";

/**
 * Generated rather than kept in public/ so the staging deploy can disallow
 * everything while production stays open. Driven by the same PUBLIC_NOINDEX
 * flag as the meta tag in BaseHead — robots.txt alone will not keep a URL out
 * of the index if it is linked from somewhere else, so both are set together.
 */
export const GET: APIRoute = ({ site }) => {
  const noIndex = import.meta.env.PUBLIC_NOINDEX === "true";

  const body = noIndex
    ? ["User-agent: *", "Disallow: /"].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        // The test harness for the AxisCare integration. Also noindex'd in its
        // own head and kept out of the sitemap; remove this with the page.
        "Disallow: /test-form",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", site).href}`,
      ].join("\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
