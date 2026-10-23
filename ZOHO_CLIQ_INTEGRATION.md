# Zoho Cliq submission notifications

New queries and career applications saved by the backend send a message to **rippotaiwebdesk** when enabled. Both `frontend` and `frontend-v2` use their existing submission APIs and attach a source label. Credentials belong only in the backend environment.

## Destination

- Company: `60062812007`
- Channel ID: `O836535000000580001`
- Unique name: `rippotaiwebdesk`
- Chat ID: `CT_1207137706867467348_60062812007`
- POST endpoint: `https://cliq.zoho.in/company/60062812007/api/v2/channelsbyname/rippotaiwebdesk/message`

The channel unique name selects the destination; the other IDs are retained here for reference.

## Setup

### Recommended: channel webhook

In Zoho Cliq, open **Bots & Tools > Webhook Tokens**, generate a token, then use **Get Webhook URL > Channels > rippotaiwebdesk**. Copy the complete generated India-region channel URL, including its `zapikey` query parameter, into the backend environment:

```dotenv
ZOHO_CLIQ_ENABLED=true
ZOHO_CLIQ_WEBHOOK_URL="PASTE_COMPLETE_GENERATED_CHANNEL_WEBHOOK_URL_HERE"
```

Restart the backend. This setting takes precedence over all OAuth settings: no client ID, client secret, authorization code, or refresh token is needed. The generated URL is a credential; keep it out of frontend configuration and source control. Existing `ZOHO_CLIQ_MESSAGE_URL` values containing `zapikey` are also recognized as webhooks. Use a channel message URL, not a bot incoming-handler URL. Generated query parameters are preserved. Requests cannot follow redirects, keeping the key at the configured Zoho host.

See [Zoho webhook token instructions](https://www.zoho.com/cliq/help/platform/webhook-tokens.html).

### Optional: OAuth fallback

1. Use Node.js 18 or newer for the backend (native fetch and request timeouts).
2. Register an OAuth client in the [Zoho India API console](https://api-console.zoho.in/). Authorize a user who can post in the channel with scope `ZohoCliq.Webhooks.CREATE` and offline access. Exchange the authorization code for refresh credentials using the India accounts domain. Follow [Zoho OAuth documentation](https://www.zoho.com/cliq/help/restapi/v2/oauth/).
3. Add the settings from `rippotai-backend/.env.example` to the backend `.env` or hosting secret configuration. Keep existing database, FTP, and other configuration. Set `ZOHO_CLIQ_CLIENT_ID`, `ZOHO_CLIQ_CLIENT_SECRET`, and `ZOHO_CLIQ_REFRESH_TOKEN`.
4. For a bot sender, add the bot to this channel and set `ZOHO_CLIQ_BOT_UNIQUE_NAME` to its unique name. The channel unique name is not the bot unique name. Without this setting, messages are sent as the authorized user.
5. Set `ZOHO_CLIQ_ENABLED=true` and restart the backend. No Zoho settings are needed in either frontend. Each frontend must point its existing API URL at this backend.

For a temporary smoke test, `ZOHO_CLIQ_ACCESS_TOKEN` can replace refresh credentials. It takes precedence and must be removed when using automatic refresh. Access tokens expire; production should use refresh credentials. Tokens refresh in memory; concurrent refreshes share one request.

## Message content and behavior

Queries include ID, source, name, email, branch, subject, and message. Applications include ID, source, name, email, department, designation, phone, cover letter, and resume URL. Ensure channel membership is appropriate for these personal details. Source is a client-supplied label, not trusted audit information.

Notifications run only after a successful database creation (and resume upload for applications). Invalid or duplicate submissions do not trigger messages. Each request has a five-second timeout: webhook delivery can add about five seconds, and OAuth refresh plus delivery about ten seconds. Submission success remains HTTP 201 if notification delivery fails. Logs identify the submission type and ID and safe error details without credentials or message content. Notifications are disabled by default.

Delivery is best effort: there is no persistent queue, automatic resend, or historical backfill. A failed delivery can be correlated with its saved record using the backend log. A 401 clears the cached token for the next submission. Zoho documents a shared limit of 50 channel-message requests per minute per user; higher volumes need a persistent queue and rate limiting.

## Verification

Run `node --test test/zohoCliq.test.js` from `rippotai-backend`. Tests mock Zoho and do not post to the channel.

After configuring credentials, submit a contact query and a career application from each frontend. Confirm four messages in the channel with the appropriate source, fields, and saved ID. Confirm the admin dashboard still contains the saved records. With an invalid token, confirm submissions still succeed and a notification failure appears in backend logs. Live delivery has to be checked with configured credentials.

API reference: [Zoho Cliq messages](https://www.zoho.com/cliq/help/restapi/v2/messages/).
