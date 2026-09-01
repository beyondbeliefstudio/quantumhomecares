/**
 * The owner reads these on a phone, straight from her inbox, so they are
 * self-contained HTML with no stylesheet, font, or script to fetch.
 */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TONE = {
  success: "#1a7f5a",
  neutral: "#767676",
  error: "#b3261e",
};

export function page({ statusCode = 200, tone = "neutral", title, message, detail }) {
  const accent = TONE[tone] ?? TONE.neutral;

  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(title)}</title>
<style>
  body { margin: 0; padding: 32px 20px; background: #f4f4f4; color: #111; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; line-height: 1.55; }
  main { max-width: 34rem; margin: 0 auto; background: #fff; border: 1px solid #e0e0e0; border-top: 5px solid ${accent}; border-radius: 6px; padding: 28px 24px; }
  h1 { margin: 0 0 12px; font-size: 1.4rem; color: ${accent}; }
  p { margin: 0 0 12px; font-size: 1.05rem; }
  pre { margin: 16px 0 0; padding: 12px; background: #f7f7f7; border: 1px solid #e5e5e5; border-radius: 4px; font-size: 0.85rem; white-space: pre-wrap; word-break: break-word; }
</style>
</head>
<body>
<main>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(message)}</p>
  ${detail ? `<pre>${escapeHtml(detail)}</pre>` : ""}
</main>
</body>
</html>`;

  return {
    statusCode,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // These URLs are single-use. Nothing about them should be cached by the
      // mail client, a link scanner, or an intermediate proxy.
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
    body,
  };
}
