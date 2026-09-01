import { randomBytes } from "node:crypto";

import {
  PENDING_TTL_MS,
  isDuplicate,
  leadStore,
  listRecent,
  pruneRecent,
  rateLimitReason,
  recordRecent,
  writePending,
} from "./lib/blobs.js";
import { ownerNotification, send } from "./lib/email.js";

/**
 * Netlify fires this automatically on every form submission on the site. The
 * filename is the trigger — renaming it silently unhooks the whole integration.
 *
 * Nothing reaches AxisCare from here. This function only validates, stores, and
 * emails the owner an approval link; the CRM write happens in approve-lead when
 * she clicks it.
 *
 * Every rejection path exits quietly and sends no email. A bot that gets a
 * different outcome for a caught submission than for a clean one learns what to
 * change, and the owner gets an inbox full of rejections either way.
 */

const REQUIRED_FIELDS = ["firstName", "lastName", "phone", "email", "helpType"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function normalizePhone(phone) {
  return String(phone ?? "").replace(/\D/g, "");
}

function validate(data) {
  const missing = REQUIRED_FIELDS.filter(field => !String(data[field] ?? "").trim());
  if (missing.length) return `missing required field(s): ${missing.join(", ")}`;

  if (String(data["bot-field"] ?? "").trim()) return "honeypot field was filled";

  if (!EMAIL_PATTERN.test(String(data.email).trim())) {
    return `email did not validate: ${data.email}`;
  }

  const digits = normalizePhone(data.phone);
  if (digits.length !== 10 && digits.length !== 11) {
    return `phone normalized to ${digits.length} digits, expected 10 or 11`;
  }

  return null;
}

export const handler = async event => {
  let payload;

  try {
    payload = JSON.parse(event.body ?? "{}").payload ?? {};
  } catch (err) {
    console.error("[submission] could not parse the event body:", err.message);
    return { statusCode: 200, body: "ignored" };
  }

  const data = payload.data ?? {};
  const formName = payload.form_name ?? "(unknown form)";
  const source = String(data.source ?? formName).trim();
  const ip = String(data.ip ?? payload.ip ?? "unknown").trim();

  console.log(`[submission] received from form "${formName}", source "${source}", ip ${ip}`);

  const invalid = validate(data);
  if (invalid) {
    console.warn(`[submission] rejected — ${invalid}`);
    return { statusCode: 200, body: "ignored" };
  }
  console.log("[submission] validation passed");

  const submission = {
    firstName: String(data.firstName).trim(),
    lastName: String(data.lastName).trim(),
    phone: String(data.phone).trim(),
    email: String(data.email).trim(),
    helpType: String(data.helpType).trim(),
    notes: String(data.notes ?? "").trim(),
    source,
    ip,
    submittedAt: new Date().toISOString(),
  };

  const now = Date.now();
  const fingerprint = {
    email: submission.email,
    phone: normalizePhone(submission.phone),
    ip,
  };

  let store;
  let recent;

  try {
    store = leadStore();
    recent = await listRecent(store);
  } catch (err) {
    console.error("[submission] blob store unavailable:", err.message);
    return { statusCode: 200, body: "ignored" };
  }

  if (isDuplicate(recent, fingerprint, now)) {
    console.warn(
      `[submission] rejected — duplicate email or phone within the last 24h (${submission.email})`
    );
    return { statusCode: 200, body: "ignored" };
  }

  const limited = rateLimitReason(recent, fingerprint, now);
  if (limited) {
    console.warn(`[submission] rejected — rate limited: ${limited}`);
    return { statusCode: 200, body: "ignored" };
  }

  const token = randomBytes(32).toString("hex");

  try {
    await writePending(store, token, {
      ...submission,
      token,
      status: "pending",
      expiresAt: new Date(now + PENDING_TTL_MS).toISOString(),
    });
    await recordRecent(store, { timestamp: now, ...fingerprint });
  } catch (err) {
    console.error("[submission] could not store the submission:", err.message);
    return { statusCode: 200, body: "ignored" };
  }

  console.log(`[submission] stored as pending/${token}`);

  const pruned = await pruneRecent(store, recent, now).catch(() => 0);
  if (pruned) console.log(`[submission] pruned ${pruned} expired index entries`);

  const siteUrl = (process.env.SITE_URL ?? process.env.URL ?? "").replace(/\/$/, "");
  if (!siteUrl) {
    console.error("[submission] SITE_URL is not set — the approval links would be relative");
    return { statusCode: 200, body: "ignored" };
  }

  const result = await send({
    to: process.env.OWNER_EMAIL,
    ...ownerNotification({ submission, token, siteUrl }),
  });

  if (result.success) {
    console.log(`[submission] owner notification sent (id ${result.id ?? "unknown"})`);
  } else {
    // The blob stays in place: the token is still valid, so the lead can be
    // approved from a resent email rather than being lost with the send.
    console.error(`[submission] owner notification failed: ${result.error}`);
  }

  return { statusCode: 200, body: "ok" };
};
