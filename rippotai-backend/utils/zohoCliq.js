const DEFAULT_ENDPOINT = "https://cliq.zoho.in/company/60062812007/api/v2/channelsbyname/rippotaiwebdesk/message";
let cachedToken;
let expiresAt = 0;
let refreshing;

// Only known error identifiers are logged; never print arbitrary upstream text.
const SAFE_CODES = new Set([
  "invalid_client", "invalid_client_secret", "invalid_code", "invalid_token",
  "invalid_grant", "invalid_scope", "access_denied", "unauthorized_client",
  "INVALID_OAUTHTOKEN", "OAUTH_SCOPE_MISMATCH", "INVALID_TOKEN",
  "CHANNEL_NOT_FOUND", "BOT_NOT_IN_CHANNEL", "FORBIDDEN",
]);
function failure(stage, status, code) {
  const error = new Error("Zoho request failed");
  error.diagnostic = `${stage}${status ? ` HTTP ${status}` : ""}${SAFE_CODES.has(code) ? ` (${code})` : ""}`;
  return error;
}

async function accessToken() {
  if (process.env.ZOHO_CLIQ_ACCESS_TOKEN) return process.env.ZOHO_CLIQ_ACCESS_TOKEN;
  if (cachedToken && Date.now() < expiresAt) return cachedToken;
  if (!refreshing) {
    refreshing = (async () => {
      const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: process.env.ZOHO_CLIQ_CLIENT_ID || "",
          client_secret: process.env.ZOHO_CLIQ_CLIENT_SECRET || "",
          refresh_token: process.env.ZOHO_CLIQ_REFRESH_TOKEN || "",
        }),
        signal: AbortSignal.timeout(5000),
      });
      const data = await response.json();
      if (!response.ok || !data.access_token) throw failure("OAuth refresh", response.status, data.error);
      cachedToken = data.access_token;
      expiresAt = Date.now() + Math.max(0, Number(data.expires_in || 3600) - 60) * 1000;
      return cachedToken;
    })().finally(() => { refreshing = undefined; });
  }
  return refreshing;
}

// Limit user-controlled text and neutralize Cliq mentions/formatting.
function clean(value, multiline = false) {
  const text = String(value ?? "").replace(/\r\n?/g, "\n")
    .replace(multiline ? /[\x00-\x09\x0b-\x1f\x7f]/g : /[\x00-\x1f\x7f]/g, " ")
    .replace(/(^|\s)@/g, "$1")
    .replace(/[*`~<>\[\]]/g, "").trim();
  return text.length > 1200 ? `${text.slice(0, 1197)}...` : text;
}

function messageText(kind, record, source) {
  const application = kind === "application";
  const lines = fields => fields
    .filter(([, value]) => clean(value))
    .map(([label, value]) => `${label}: ${clean(value)}`).join("\n");
  const details = application
    ? [["Department", record.interestedIn], ["Designation", record.designation]]
    : [["Branch", record.branch], ["Subject", record.subject]];
  const content = clean(application ? record.coverLetter : record.message, true);
  const date = record.createdAt ? new Date(record.createdAt) : null;
  const submitted = date && !Number.isNaN(date.getTime())
    ? new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: true,
    }).format(date) + " IST" : null;
  return [
    application ? "📄 **New Rippotai job application**" : "💬 **New Rippotai query**",
    "A new submission has been received successfully.",
    "**Contact details**\n" + lines([["Name", record.name], ["Email", record.email], ["Phone", record.phone]]),
    `**${application ? "Application details" : "Enquiry details"}**\n` + lines(details),
    content ? `**${application ? "Cover letter" : "Message"}**\n${content}` : null,
    application && clean(record.resume) ? `**Resume**\n${clean(record.resume)}` : null,
    "**Submission reference**\n" + lines([["ID", record.id], ["Source", source], ["Submitted", submitted]]),
  ].filter(Boolean).join("\n\n");
}

async function notifySubmission(kind, record, source) {
  if (process.env.ZOHO_CLIQ_ENABLED !== "true") return { status: "disabled" };
  let stage = "configuration";
  try {
    const webhookUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL?.trim();
    const url = new URL(webhookUrl || process.env.ZOHO_CLIQ_MESSAGE_URL || DEFAULT_ENDPOINT);
    if (url.protocol !== "https:" || url.hostname !== "cliq.zoho.in" || url.username || url.password || (url.port && url.port !== "443")) {
      throw failure("configuration: endpoint must use https://cliq.zoho.in");
    }
    // Also accept an existing MESSAGE_URL containing a generated webhook key.
    const useWebhook = Boolean(webhookUrl || url.searchParams.has("zapikey"));
    if (useWebhook && !url.searchParams.get("zapikey")?.trim()) {
      throw failure("configuration: webhook URL must contain zapikey");
    }
    if (!/\/api\/v2\/channelsbyname\/[^/]+\/message\/?$/.test(url.pathname)) {
      throw failure("configuration: use a channel message URL from Zoho");
    }
    if (!url.searchParams.has("bot_unique_name") && process.env.ZOHO_CLIQ_BOT_UNIQUE_NAME) {
      url.searchParams.set("bot_unique_name", process.env.ZOHO_CLIQ_BOT_UNIQUE_NAME);
    }
    const headers = { "Content-Type": "application/json" };
    if (!useWebhook && !process.env.ZOHO_CLIQ_ACCESS_TOKEN) {
      const missing = ["ZOHO_CLIQ_CLIENT_ID", "ZOHO_CLIQ_CLIENT_SECRET", "ZOHO_CLIQ_REFRESH_TOKEN"]
        .filter(key => !process.env[key]?.trim());
      if (missing.length) throw failure(`configuration: missing ${missing.join(", ")}`);
    }
    if (!useWebhook) {
      stage = "OAuth refresh";
      const token = await accessToken();
      headers.Authorization = `Zoho-oauthtoken ${token}`;
    }
    stage = "channel message";
    const response = await fetch(url, {
      method: "POST",
      headers,
      redirect: "error",
      body: JSON.stringify({ text: messageText(kind, record, source) }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      if (response.status === 401) { cachedToken = undefined; expiresAt = 0; }
      const data = await response.json().catch(() => ({}));
      throw failure(stage, response.status, data.code || data.error?.code || data.error);
    }
    return { status: "sent" };
  } catch (error) {
    // Never log tokens, response bodies, or applicant personal details.
    const detail = error.diagnostic || `${stage}: ${error.name === "TimeoutError" ? "request timed out" : "request failed (check network or response format)"}`;
    console.error(`Zoho Cliq notification failed for ${kind} ${clean(record.id)}: ${detail}`);
    return { status: "failed" };
  }
}

module.exports = { notifySubmission, messageText };
