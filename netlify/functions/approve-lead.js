import { createLead } from "./lib/axiscare.js";
import { leadStore, readPending, writePending } from "./lib/blobs.js";
import { formatTimestamp } from "./lib/format.js";
import { page } from "./lib/pages.js";

/**
 * The owner clicks "Add to AxisCare" in her email and lands here. This is the
 * only place in the integration that writes to the CRM.
 */
export const handler = async event => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    console.warn("[approve] request arrived with no token");
    return page({
      statusCode: 400,
      tone: "error",
      title: "Something is missing",
      message:
        "This link is incomplete — it did not include a submission token. Try clicking the button in the email again.",
    });
  }

  console.log(`[approve] clicked for token ${token}`);

  let store;
  let record;

  try {
    store = leadStore();
    record = await readPending(store, token);
  } catch (err) {
    console.error(`[approve] blob store unavailable: ${err.message}`);
    return page({
      statusCode: 500,
      tone: "error",
      title: "Could not look this up",
      message:
        "Something went wrong reading this submission. Nothing was added to AxisCare. Please contact your developer.",
      detail: err.message,
    });
  }

  if (!record) {
    console.warn(`[approve] no pending record for token ${token}`);
    return page({
      statusCode: 404,
      tone: "error",
      title: "This request was not found",
      message:
        "This submission has expired or was already removed. Submissions are kept for 30 days. Nothing was added to AxisCare.",
    });
  }

  const name = `${record.firstName} ${record.lastName}`;

  // Mail clients and link scanners pre-fetch URLs, and the owner may well click
  // twice. Neither may produce a second lead, so status is the guard.
  if (record.status === "approved") {
    console.log(`[approve] token ${token} was already approved as lead ${record.leadId}`);
    return page({
      tone: "neutral",
      title: "Already added",
      message: `${name} was already added to AxisCare${record.approvedAt ? ` on ${formatTimestamp(record.approvedAt)}` : ""}. No duplicate was created.`,
      detail: record.leadId ? `AxisCare lead ID: ${record.leadId}` : undefined,
    });
  }

  if (record.status === "ignored") {
    console.log(`[approve] token ${token} was previously ignored — adding it anyway`);
  }

  const result = await createLead(record);

  if (!result.success) {
    // Deliberately left pending so the same link still works on a retry once
    // the underlying problem is fixed.
    console.error(`[approve] AxisCare rejected token ${token}: ${result.error}`);
    return page({
      statusCode: 502,
      tone: "error",
      title: "AxisCare did not accept this lead",
      message: `${name} was not added. This submission is still saved, so the same button will work once the problem is fixed. Please send this message to your developer.`,
      detail: `${result.statusCode ? `Status ${result.statusCode}\n` : ""}${result.error}`,
    });
  }

  // A dry run deliberately leaves the record pending. Marking it approved would
  // trip the idempotency guard above and block the real click that follows.
  if (result.dryRun) {
    console.log(`[approve] token ${token} passed a dry run — still pending, nothing sent`);
    return page({
      tone: "neutral",
      title: "Dry run — nothing was sent",
      message: `${name} was NOT added to AxisCare. AXISCARE_DRY_RUN is switched on, so the lead was built and logged but no request was made. This link still works, so clicking it again once the flag is off will create the record for real.`,
      detail: "See the function log for the exact payload that would have been sent.",
    });
  }

  try {
    await writePending(store, token, {
      ...record,
      status: "approved",
      approvedAt: new Date().toISOString(),
      leadId: result.leadId,
    });
  } catch (err) {
    // The lead exists in AxisCare either way. Say so, because a retry from here
    // would create a second one.
    console.error(
      `[approve] lead ${result.leadId} created but the record did not update: ${err.message}`
    );
    return page({
      tone: "success",
      title: "Added to AxisCare",
      message: `${name} was added to AxisCare. Do not click the button again — the record was created, but this page could not save that it was, so a second click would create a duplicate.`,
      detail: `AxisCare lead ID: ${result.leadId}`,
    });
  }

  console.log(`[approve] token ${token} approved as AxisCare lead ${result.leadId}`);

  return page({
    tone: "success",
    title: "Added to AxisCare",
    message: `${name} is now a lead in AxisCare. You can close this page.`,
    detail: `AxisCare lead ID: ${result.leadId}`,
  });
};
