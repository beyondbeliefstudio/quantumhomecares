/**
 * Records store ISO timestamps; the owner should never have to read one. The
 * agency is New Jersey-wide, so her local time is the only one that means
 * anything in an email or on a confirmation page.
 *
 * Note the explicit component options — `dateStyle`/`timeStyle` cannot be
 * combined with `timeZoneName`, which throws a TypeError at runtime.
 */
export function formatTimestamp(iso) {
  const parsed = Date.parse(iso);
  if (Number.isNaN(parsed)) return String(iso ?? "");

  return new Date(parsed).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
