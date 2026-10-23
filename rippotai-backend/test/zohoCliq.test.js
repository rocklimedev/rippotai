const { test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
beforeEach(() => {
  for (const key of Object.keys(process.env)) {
    if (key.startsWith("ZOHO_CLIQ_")) delete process.env[key];
  }
});
afterEach(() => { global.fetch = originalFetch; process.env = { ...originalEnv }; });
function service() {
  process.env.ZOHO_CLIQ_CLIENT_ID = "test-client";
  process.env.ZOHO_CLIQ_CLIENT_SECRET = "test-secret";
  process.env.ZOHO_CLIQ_REFRESH_TOKEN = "test-refresh";
  delete require.cache[require.resolve("../utils/zohoCliq")];
  return require("../utils/zohoCliq");
}

test("disabled integration makes no external request", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "false";
  global.fetch = () => { throw new Error("unexpected request"); };
  assert.equal((await service().notifySubmission("query", {})).status, "disabled");
});

test("posts application to configured channel as bot without exposing credentials in payload", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  process.env.ZOHO_CLIQ_ACCESS_TOKEN = "secret";
  process.env.ZOHO_CLIQ_BOT_UNIQUE_NAME = "webdeskbot";
  global.fetch = async (url, options) => {
    assert.equal(url.hostname, "cliq.zoho.in");
    assert.match(url.pathname, /rippotaiwebdesk\/message$/);
    assert.equal(url.searchParams.get("bot_unique_name"), "webdeskbot");
    assert.equal(options.headers.Authorization, "Zoho-oauthtoken secret");
    const { text } = JSON.parse(options.body);
    assert.match(text, /New Rippotai job application/);
    assert.match(text, /Source: frontend-v2/);
    assert.match(text, /\*\*Resume\*\*\nhttps:\/\/example.com\/cv.pdf/);
    assert.ok(!text.includes("secret"));
    return { ok: true };
  };
  assert.equal((await service().notifySubmission("application", { id: 1, resume: "https://example.com/cv.pdf" }, "frontend-v2")).status, "sent");
});

test("refreshes OAuth token once for concurrent notifications", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  delete process.env.ZOHO_CLIQ_ACCESS_TOKEN;
  let refreshes = 0;
  global.fetch = async (url) => {
    if (String(url).includes("accounts.zoho.in")) {
      refreshes++;
      return { ok: true, json: async () => ({ access_token: "refreshed", expires_in: 3600 }) };
    }
    return { ok: true };
  };
  const { notifySubmission } = service();
  const results = await Promise.all([notifySubmission("query", { id: 1 }), notifySubmission("query", { id: 2 })]);
  assert.equal(refreshes, 1);
  assert.ok(results.every(result => result.status === "sent"));
});

test("delivery and OAuth errors return failed without throwing", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  process.env.ZOHO_CLIQ_ACCESS_TOKEN = "secret";
  global.fetch = async () => ({ ok: false, status: 429, json: async () => ({}) });
  assert.equal((await service().notifySubmission("query", { id: 1 })).status, "failed");
  delete process.env.ZOHO_CLIQ_ACCESS_TOKEN;
  global.fetch = async () => ({ ok: true, json: async () => ({ error: "invalid_client" }) });
  assert.equal((await service().notifySubmission("query", { id: 2 })).status, "failed");
});

test("user content cannot trigger mentions and field lengths are bounded", () => {
  const text = service().messageText("query", { message: "@all <tag> " + "x".repeat(5000) }, "frontend");
  assert.ok(!text.includes("@all"));
  assert.ok(text.length < 1600);
});

test("notification groups details, preserves email and paragraphs, and formats saved time in IST", () => {
  const text = service().messageText("query", {
    id: "query-1", name: "Asha", email: "asha@example.com",
    branch: "Delhi", subject: "Home design", message: "Hello team,\n\nPlease call me.",
    createdAt: "2026-10-23T06:30:00Z",
  }, "frontend");
  assert.match(text, /\*\*Contact details\*\*\nName: Asha\nEmail: asha@example.com/);
  assert.match(text, /\*\*Message\*\*\nHello team,\n\nPlease call me\./);
  assert.match(text, /Submitted: .*23 Oct 2026.*12:00.*IST/);
  assert.ok(!text.includes("undefined"));
});

test("logs safe OAuth error identifiers without upstream secrets", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  delete process.env.ZOHO_CLIQ_ACCESS_TOKEN;
  const logs = [];
  const originalError = console.error;
  console.error = line => logs.push(line);
  try {
    global.fetch = async () => ({ ok: true, status: 200, json: async () => ({ error: "invalid_client", secret: "do-not-log" }) });
    assert.equal((await service().notifySubmission("query", { id: 3 })).status, "failed");
    assert.match(logs[0], /OAuth refresh HTTP 200 \(invalid_client\)/);
    assert.ok(!logs[0].includes("do-not-log"));
  } finally { console.error = originalError; }
});

test("webhook takes precedence over OAuth and preserves generated parameters", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  process.env.ZOHO_CLIQ_WEBHOOK_URL = "https://cliq.zoho.in/company/60062812007/api/v2/channelsbyname/rippotaiwebdesk/message?zapikey=private-key&bot_unique_name=generatedbot";
  process.env.ZOHO_CLIQ_ACCESS_TOKEN = "unused-token";
  process.env.ZOHO_CLIQ_BOT_UNIQUE_NAME = "otherbot";
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++;
    assert.equal(url.searchParams.get("zapikey"), "private-key");
    assert.equal(url.searchParams.get("bot_unique_name"), "generatedbot");
    assert.equal(options.headers.Authorization, undefined);
    assert.equal(options.redirect, "error");
    assert.match(JSON.parse(options.body).text, /New Rippotai query/);
    return { ok: true };
  };
  assert.equal((await service().notifySubmission("query", { id: 4 })).status, "sent");
  assert.equal(calls, 1);
});

test("webhook in MESSAGE_URL works without any OAuth credentials", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  process.env.ZOHO_CLIQ_MESSAGE_URL = "https://cliq.zoho.in/api/v2/channelsbyname/rippotaiwebdesk/message?zapikey=key";
  const { notifySubmission } = service();
  delete process.env.ZOHO_CLIQ_CLIENT_ID;
  delete process.env.ZOHO_CLIQ_CLIENT_SECRET;
  delete process.env.ZOHO_CLIQ_REFRESH_TOKEN;
  global.fetch = async (_, options) => {
    assert.equal(options.headers.Authorization, undefined);
    return { ok: true };
  };
  assert.equal((await notifySubmission("application", { id: 5 })).status, "sent");
});

test("invalid webhook configuration fails before any network request and never logs URL", async () => {
  process.env.ZOHO_CLIQ_ENABLED = "true";
  const logs = [];
  const originalError = console.error;
  console.error = line => logs.push(line);
  try {
    let calls = 0;
    global.fetch = async () => { calls++; throw new Error("unexpected request"); };
    const { notifySubmission } = service();
    for (const url of [
      "https://evil.example/api/v2/channelsbyname/rippotaiwebdesk/message?zapikey=secret-key",
      "https://cliq.zoho.in/api/v2/channelsbyname/rippotaiwebdesk/message",
      "https://cliq.zoho.in/api/v2/bots/example/incoming?zapikey=secret-key",
    ]) {
      process.env.ZOHO_CLIQ_WEBHOOK_URL = url;
      assert.equal((await notifySubmission("query", { id: 6 })).status, "failed");
    }
    assert.equal(calls, 0);
    assert.ok(logs.every(line => !line.includes("secret-key")));
  } finally { console.error = originalError; }
});
