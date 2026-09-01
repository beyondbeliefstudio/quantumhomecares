#!/usr/bin/env bash
# Sends one test email through Resend using the exact same request that
# netlify/functions/lib/email.js makes, so a success here means the integration's
# email will work.
#
# Reads RESEND_API_KEY, FROM_EMAIL and OWNER_EMAIL from .env. Anything missing is
# prompted for; the key prompt is silent so it never reaches shell history.
#
#   ./scripts/test-resend.sh

set -uo pipefail
cd "$(dirname "$0")/.."

# Parsed rather than sourced. A .env is not a shell script: FROM_EMAIL holds the
# "Name <address>" form, and `.` would read the < as a redirect and die. Parsing
# also means nothing in .env can execute.
if [ -f .env ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in ""|\#*) continue ;; esac
    line=${line#export }
    key=${line%%=*}
    val=${line#*=}
    key=$(printf '%s' "$key" | tr -d "[:space:]")
    case "$key" in
      RESEND_API_KEY | FROM_EMAIL | OWNER_EMAIL) ;;
      *) continue ;;
    esac
    val=${val%\"} && val=${val#\"}
    val=${val%\'} && val=${val#\'}
    printf -v "$key" '%s' "$val"
  done < .env
fi

if [ -z "${RESEND_API_KEY:-}" ]; then
  read -rsp "Resend API key (input hidden): " RESEND_API_KEY && echo
fi
if [ -z "${FROM_EMAIL:-}" ]; then
  read -rp "From address: " FROM_EMAIL
fi
if [ -z "${OWNER_EMAIL:-}" ]; then
  read -rp "Send the test to: " OWNER_EMAIL
fi

for var in RESEND_API_KEY FROM_EMAIL OWNER_EMAIL; do
  if [ -z "${!var:-}" ]; then
    echo "✗ $var is empty. Add it to .env or enter it when prompted."
    exit 1
  fi
done

echo "From: $FROM_EMAIL"
echo "To:   $OWNER_EMAIL"
echo "Key:  ${RESEND_API_KEY:0:4}…${RESEND_API_KEY: -4} (${#RESEND_API_KEY} chars)"
echo

payload=$(cat <<JSON
{
  "from": $(printf '%s' "$FROM_EMAIL" | sed 's/"/\\"/g; s/^/"/; s/$/"/'),
  "to": $(printf '%s' "$OWNER_EMAIL" | sed 's/"/\\"/g; s/^/"/; s/$/"/'),
  "subject": "Resend test — Quantum Home Cares",
  "html": "<p>If you are reading this, Resend is wired up correctly.</p>",
  "text": "If you are reading this, Resend is wired up correctly."
}
JSON
)

response=$(curl -sS -w '\n%{http_code}' -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$payload")

status=$(printf '%s' "$response" | tail -1)
body=$(printf '%s' "$response" | sed '$d')

echo "HTTP $status"
echo "$body"
echo

case "$status" in
  200|201)
    echo "✓ Accepted by Resend. Check the inbox — and the spam folder, since this"
    echo "  domain has no sending history yet."
    ;;
  401|403)
    echo "✗ Rejected. Either the API key is wrong, or it is not permitted to send"
    echo "  from that domain. Check the key's permission and domain restriction."
    ;;
  422)
    echo "✗ Resend rejected the payload — usually the From address is not on a"
    echo "  verified domain. It must match the domain verified in the dashboard."
    ;;
  *)
    echo "✗ Unexpected response. The body above has the detail."
    ;;
esac
