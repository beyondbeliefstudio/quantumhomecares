import { leadStore, readPending, writePending } from "./lib/blobs.js";
import { page } from "./lib/pages.js";

/**
 * The counterpart to approve-lead. It touches nothing outside the blob store —
 * its whole job is to give spam a definitive resting place, so the owner has an
 * action to take rather than just deleting the email and wondering later.
 */
export const handler = async event => {
  const token = event.queryStringParameters?.token;

  if (!token) {
    console.warn("[ignore] request arrived with no token");
    return page({
      statusCode: 400,
      tone: "error",
      title: "Something is missing",
      message:
        "This link is incomplete — it did not include a submission token. Try clicking the button in the email again.",
    });
  }

  console.log(`[ignore] clicked for token ${token}`);

  let store;
  let record;

  try {
    store = leadStore();
    record = await readPending(store, token);
  } catch (err) {
    console.error(`[ignore] blob store unavailable: ${err.message}`);
    return page({
      statusCode: 500,
      tone: "error",
      title: "Could not look this up",
      message: "Something went wrong reading this submission. Please contact your developer.",
      detail: err.message,
    });
  }

  if (!record) {
    console.warn(`[ignore] no pending record for token ${token}`);
    return page({
      statusCode: 404,
      tone: "error",
      title: "This request was not found",
      message: "This submission has expired or was already removed. Nothing was added to AxisCare.",
    });
  }

  const name = `${record.firstName} ${record.lastName}`;

  if (record.status === "approved") {
    console.log(`[ignore] token ${token} was already approved as lead ${record.leadId}`);
    return page({
      tone: "neutral",
      title: "Already added",
      message: `${name} was already added to AxisCare, so it cannot be ignored from here. If it needs to come out, delete the lead in AxisCare.`,
      detail: record.leadId ? `AxisCare lead ID: ${record.leadId}` : undefined,
    });
  }

  if (record.status !== "ignored") {
    try {
      await writePending(store, token, {
        ...record,
        status: "ignored",
        ignoredAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`[ignore] could not update the record: ${err.message}`);
      return page({
        statusCode: 500,
        tone: "error",
        title: "Could not save that",
        message:
          "This submission could not be marked as ignored. Nothing was added to AxisCare either way.",
        detail: err.message,
      });
    }
  }

  console.log(`[ignore] token ${token} marked as ignored`);

  return page({
    tone: "neutral",
    title: "Ignored",
    message: `${name} was marked as ignored. Nothing was sent to AxisCare. You can close this page and delete the email.`,
  });
};
