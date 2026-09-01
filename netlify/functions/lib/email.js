/**
 * Transactional email. Resend is reached with a plain fetch, so there is no SDK
 * to keep current — swapping providers means rewriting `send` and nothing else.
 *
 * A visitor confirmation email is planned but out of scope for this build. When
 * it lands it should be a second exported builder plus one more `send` call;
 * nothing in here needs to change to accommodate it.
 */

import { formatTimestamp } from "./format.js";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function send({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !from || !to) {
    return {
      success: false,
      error: `email not configured (RESEND_API_KEY: ${apiKey ? "set" : "missing"}, FROM_EMAIL: ${from ? "set" : "missing"}, to: ${to ? "set" : "missing"})`,
    };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, text }),
    });

    const body = await response.text();

    if (!response.ok) {
      return { success: false, error: body, statusCode: response.status };
    }

    let id;
    try {
      id = JSON.parse(body).id;
    } catch {
      id = undefined;
    }

    return { success: true, id };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

const FIELD_LABELS = {
  firstName: "First name",
  lastName: "Last name",
  phone: "Phone",
  email: "Email",
  helpType: "Kind of help",
  notes: "Anything else",
  source: "Form",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function button(href, label, background) {
  return `<td style="padding:0 12px 0 0;"><a href="${escapeHtml(href)}" style="background:${background};border-radius:4px;color:#ffffff;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;padding:14px 28px;text-decoration:none;">${escapeHtml(label)}</a></td>`;
}

/**
 * Table-based layout with inline styles — the only thing that renders reliably
 * across Outlook and mobile mail clients. No framework, no external CSS.
 */
export function ownerNotification({ submission, token, siteUrl }) {
  const { firstName, lastName, helpType } = submission;
  const approveUrl = `${siteUrl}/.netlify/functions/approve-lead?token=${encodeURIComponent(token)}`;
  const ignoreUrl = `${siteUrl}/.netlify/functions/ignore-lead?token=${encodeURIComponent(token)}`;

  const rows = Object.entries(FIELD_LABELS)
    .filter(([field]) => submission[field])
    .map(
      ([field, label]) =>
        `<tr><td style="padding:6px 16px 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666666;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111111;">${escapeHtml(submission[field]).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");

  const submittedAt = formatTimestamp(submission.submittedAt);

  const meta = `<tr><td style="padding:6px 16px 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666666;white-space:nowrap;">Submitted</td><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111111;">${escapeHtml(submittedAt)}</td></tr><tr><td style="padding:6px 16px 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666666;white-space:nowrap;">IP address</td><td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111111;">${escapeHtml(submission.ip)}</td></tr>`;

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;padding:24px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e0e0e0;border-radius:6px;">
        <tr>
          <td style="padding:28px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#111111;">
            New inquiry from the website
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 20px 28px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              ${rows}
              ${meta}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 16px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444444;line-height:1.5;">
            Only click &ldquo;Add to AxisCare&rdquo; if this looks like a real inquiry. Spam submissions can be ignored.
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 28px 28px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${button(approveUrl, "Add to AxisCare", "#1a7f5a")}
                ${button(ignoreUrl, "Ignore", "#767676")}
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const textLines = Object.entries(FIELD_LABELS)
    .filter(([field]) => submission[field])
    .map(([field, label]) => `${label}: ${submission[field]}`);

  const text = [
    "New inquiry from the website",
    "",
    ...textLines,
    `Submitted: ${submittedAt}`,
    `IP address: ${submission.ip}`,
    "",
    'Only click "Add to AxisCare" if this looks like a real inquiry. Spam submissions can be ignored.',
    "",
    `Add to AxisCare: ${approveUrl}`,
    `Ignore: ${ignoreUrl}`,
  ].join("\n");

  return {
    subject: `New inquiry: ${firstName} ${lastName} — ${helpType}`,
    html,
    text,
  };
}
