/**
 * AxisCare adapter — the only file that knows AxisCare's request shape.
 *
 * Contract below is taken from the live OpenAPI spec that backs
 * https://static.axiscare.com/api/documentation.html
 * (https://static.axiscare.com/api/stoplight/reference/api.yaml, version 2025-06-25):
 *
 *   POST https://{siteNumber}.axiscare.com/api/leads
 *   Authorization: Bearer {token}
 *   X-AxisCare-Api-Version: 2023-10-01   (the only value the enum accepts)
 *
 *   Required body fields: firstName, lastName. Everything else is optional, and
 *   a lead created this way lands with an Active status.
 *
 *   Relevant optional fields: personalEmail, mobilePhone, homePhone, priorityNote,
 *   region, status, dateOfBirth, residentialAddress, gender, and
 *   referredBy: { type: "client|caregiver|contact|organization|other", id?, name? }
 *   — type is required when referredBy is sent, plus one of id or name.
 *
 *   201 → { results: { id, firstName, lastName, ... }, errors: [] }
 *   4xx/5xx → { results: null, errors: ["message", ...] }
 *
 * Two things are documented but not yet verified against the live account, and
 * both are isolated here:
 *   - Phone formatting. The spec types phone as a bare string with no format or
 *     example, so this sends normalized digits.
 *   - referredBy. It is only sent when AXISCARE_REFERRAL_SOURCE_NAME or
 *     AXISCARE_REFERRAL_SOURCE_ID is set, because a source name that does not
 *     already exist in the account is a plausible way to earn a 400 on an
 *     otherwise good lead. Names can be read from GET /api/referral/other.
 *
 * AxisCare publishes no sandbox — the spec declares one server and nothing else
 * — so any call here writes a real record to the client's production account
 * that she has to delete by hand. Set AXISCARE_DRY_RUN=true to exercise the
 * whole approve path with the payload logged and no request sent.
 */

const API_VERSION = "2023-10-01";
const CREATE_LEAD_PATH = "/api/leads";

function redact(token) {
  if (!token) return "(missing)";
  return `${token.slice(0, 4)}…${token.slice(-4)} (${token.length} chars)`;
}

function baseUrl() {
  const siteNumber = process.env.AXISCARE_SITE_NUMBER;
  if (!siteNumber) return null;
  return `https://${siteNumber}.axiscare.com`;
}

/** Digits only — AxisCare's spec gives no format, so nothing is invented here. */
function normalizePhone(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

function referredBy() {
  const id = process.env.AXISCARE_REFERRAL_SOURCE_ID;
  const name = process.env.AXISCARE_REFERRAL_SOURCE_NAME;
  if (!id && !name) return undefined;

  const source = { type: process.env.AXISCARE_REFERRAL_SOURCE_TYPE || "other" };
  if (id) source.id = id;
  if (name) source.name = name;
  return source;
}

/**
 * AxisCare has no field for "what kind of help are you looking for", and no
 * field for which form the person used, so both ride along in priorityNote with
 * the free-text notes. If this needs to become a proper timeline entry later,
 * POST /api/notes/lead/{leadId} takes { note } and is a second call from here.
 */
function priorityNote(submission) {
  const parts = [];
  if (submission.helpType) parts.push(`Looking for: ${submission.helpType}`);
  if (submission.notes) parts.push(submission.notes);

  const origin = submission.source ? `website form (${submission.source})` : "website form";
  parts.push(`Submitted via ${origin} on ${submission.submittedAt}.`);

  return parts.join("\n\n");
}

export function buildLeadPayload(submission) {
  const payload = {
    firstName: submission.firstName,
    lastName: submission.lastName,
    personalEmail: submission.email || null,
    mobilePhone: normalizePhone(submission.phone) || null,
    priorityNote: priorityNote(submission),
  };

  const source = referredBy();
  if (source) payload.referredBy = source;

  return payload;
}

function extractLeadId(body) {
  return body?.results?.id ?? body?.results?.leadId ?? null;
}

function extractError(body, response) {
  const errors = body?.errors;
  if (Array.isArray(errors) && errors.length) return errors.join("; ");
  if (typeof errors === "string" && errors) return errors;
  if (typeof body === "string" && body) return body;
  return `AxisCare returned ${response.status} ${response.statusText} with no error detail.`;
}

/**
 * Never throws. Callers decide how a failure is presented; a thrown error here
 * would turn a recoverable API problem into a blank 500 in the owner's browser.
 */
export async function createLead(submission) {
  const url = baseUrl();
  const apiToken = process.env.AXISCARE_API_TOKEN;
  const dryRun = /^(1|true|yes)$/i.test(process.env.AXISCARE_DRY_RUN ?? "");

  const missing = [!url && "AXISCARE_SITE_NUMBER", !apiToken && "AXISCARE_API_TOKEN"].filter(
    Boolean
  );

  const endpoint = `${url ?? "https://{siteNumber}.axiscare.com"}${CREATE_LEAD_PATH}`;
  const payload = buildLeadPayload(submission);

  if (missing.length) {
    console.warn(`[axiscare] not configured — missing ${missing.join(" and ")}`);
  }

  console.log(
    "[axiscare] request",
    JSON.stringify({
      endpoint,
      method: "POST",
      headers: {
        Authorization: `Bearer ${redact(apiToken)}`,
        "X-AxisCare-Api-Version": API_VERSION,
        "Content-Type": "application/json",
      },
      body: payload,
    })
  );

  // Checked after the request log, so a dry run shows exactly what a live one
  // would have sent — and checked BEFORE the missing-credentials bail, so the
  // approval flow can be walked end to end before the API token exists. A dry
  // run sends nothing, so it has nothing to authenticate.
  if (dryRun) {
    console.log("[axiscare] DRY RUN — no request was sent, nothing was written to AxisCare");
    return { success: true, leadId: "dry-run", dryRun: true };
  }

  if (missing.length) {
    const error = `AxisCare is not configured — missing ${missing.join(" and ")}.`;
    console.error("[axiscare] " + error);
    return { success: false, error, statusCode: 0 };
  }

  let response;
  let raw;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "X-AxisCare-Api-Version": API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    raw = await response.text();
  } catch (err) {
    console.error("[axiscare] request failed before a response arrived:", err.message);
    return { success: false, error: `Could not reach AxisCare: ${err.message}`, statusCode: 0 };
  }

  let body;
  try {
    body = raw ? JSON.parse(raw) : null;
  } catch {
    body = raw;
  }

  console.log(
    "[axiscare] response",
    JSON.stringify({ status: response.status, ok: response.ok, body })
  );

  if (!response.ok) {
    return { success: false, error: extractError(body, response), statusCode: response.status };
  }

  const leadId = extractLeadId(body);

  if (!leadId) {
    // A 2xx with no id means the shape assumption above is wrong, and silently
    // succeeding would leave nothing to reconcile against later.
    return {
      success: false,
      error: `AxisCare accepted the request (${response.status}) but returned no lead ID. Response: ${raw}`,
      statusCode: response.status,
    };
  }

  return { success: true, leadId };
}
