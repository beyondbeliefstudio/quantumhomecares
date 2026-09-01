import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "lead-submissions";
const PENDING_PREFIX = "pending/";
const RECENT_PREFIX = "recent/";

export const PENDING_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;
export const RATE_WINDOW_MS = 60 * 60 * 1000;
export const MAX_PER_IP_PER_HOUR = 3;
export const MAX_PER_SITE_PER_HOUR = 20;

/**
 * Strong consistency matters here: the owner can click the approval link within
 * seconds of the blob being written, and the default eventual read would miss it.
 */
export function leadStore() {
  const options = { name: STORE_NAME, consistency: "strong" };

  // Netlify normally wires the blobs context automatically inside functions, but
  // freshly created sites sometimes ship without it and every read fails with
  // MissingBlobsEnvironmentError. BLOBS_SITE_ID + BLOBS_TOKEN are the escape
  // hatch: set both and they win outright, no questions asked, because someone
  // setting them has already hit that failure and means it.
  //
  // The choice has to be made from the environment up front: getStore itself
  // never throws, so a try/catch around it would never reach the fallback —
  // @netlify/blobs only raises the "not configured" error on the first read or
  // write, by which point the store has already been handed out.
  if (process.env.BLOBS_SITE_ID && process.env.BLOBS_TOKEN) {
    return getStore({
      ...options,
      siteID: process.env.BLOBS_SITE_ID,
      token: process.env.BLOBS_TOKEN,
    });
  }

  // Netlify's own build vars, used only when the automatic context is absent.
  const siteID = process.env.SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN;

  if (!process.env.NETLIFY_BLOBS_CONTEXT && siteID && token) {
    return getStore({ ...options, siteID, token });
  }

  return getStore(options);
}

export function pendingKey(token) {
  return `${PENDING_PREFIX}${token}`;
}

/**
 * Blobs has no native TTL, so expiry is carried on the record and enforced on
 * read. An expired record is deleted and reported as missing, which gives the
 * approve/ignore pages the same "expired or not found" path either way.
 */
export async function readPending(store, token) {
  const record = await store.get(pendingKey(token), { type: "json" });
  if (!record) return null;

  if (record.expiresAt && Date.parse(record.expiresAt) < Date.now()) {
    await store.delete(pendingKey(token)).catch(() => {});
    return null;
  }

  return record;
}

export async function writePending(store, token, record) {
  await store.setJSON(pendingKey(token), record);
}

function digest(value) {
  return createHash("sha256")
    .update(
      String(value ?? "")
        .trim()
        .toLowerCase()
    )
    .digest("hex")
    .slice(0, 16);
}

/**
 * The de-dupe and rate-limit index lives entirely in blob *keys*, never in a
 * blob body. One shared JSON index would need a read-modify-write, and two
 * submissions landing together would clobber each other's entry; a key per
 * submission cannot race, and listing returns everything the checks need
 * without fetching a single body.
 *
 * Key shape: recent/{epochMs}-{emailHash}-{phoneHash}-{ipHash}
 */
export function recentKey({ timestamp, email, phone, ip }) {
  return `${RECENT_PREFIX}${timestamp}-${digest(email)}-${digest(phone)}-${digest(ip)}`;
}

function parseRecentKey(key) {
  const [timestamp, email, phone, ip] = key.slice(RECENT_PREFIX.length).split("-");
  return { timestamp: Number(timestamp), email, phone, ip };
}

export async function listRecent(store) {
  const { blobs } = await store.list({ prefix: RECENT_PREFIX });
  return blobs
    .map(blob => ({ key: blob.key, ...parseRecentKey(blob.key) }))
    .filter(entry => Number.isFinite(entry.timestamp));
}

export async function recordRecent(store, entry) {
  await store.set(recentKey(entry), "");
}

/** Opportunistic cleanup — anything past the de-dupe window can never match again. */
export async function pruneRecent(store, entries, now = Date.now()) {
  const stale = entries.filter(entry => now - entry.timestamp > DUPLICATE_WINDOW_MS);
  await Promise.all(stale.map(entry => store.delete(entry.key).catch(() => {})));
  return stale.length;
}

export function isDuplicate(entries, { email, phone }, now = Date.now()) {
  const emailHash = digest(email);
  const phoneHash = digest(phone);

  return entries.some(
    entry =>
      now - entry.timestamp <= DUPLICATE_WINDOW_MS &&
      (entry.email === emailHash || entry.phone === phoneHash)
  );
}

export function rateLimitReason(entries, { ip }, now = Date.now()) {
  const inWindow = entries.filter(entry => now - entry.timestamp <= RATE_WINDOW_MS);

  if (inWindow.length >= MAX_PER_SITE_PER_HOUR) {
    return `site-wide cap reached (${inWindow.length}/${MAX_PER_SITE_PER_HOUR} in the last hour)`;
  }

  const ipHash = digest(ip);
  const fromIp = inWindow.filter(entry => entry.ip === ipHash);
  if (fromIp.length >= MAX_PER_IP_PER_HOUR) {
    return `per-IP cap reached (${fromIp.length}/${MAX_PER_IP_PER_HOUR} in the last hour)`;
  }

  return null;
}
