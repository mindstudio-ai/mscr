# Create Webhook

Creates a new webhook to receive notifications about events in Smartsheet.

## Inputs

- `name` (string, required): Name of the webhook
- `callbackUrl` (string, required): URL to send webhook events to
- `scope` (string, required): Scope of the webhook (e.g., "sheet")
- `scopeObjectId` (string, required): ID of the object to monitor
- `events` (array, required): Array of event types to monitor (e.g., ["*.*"])
- `version` (number, optional): Webhook version (default is 1)
- `outputVariable` (string, required): Variable to store the created webhook

## Outputs

Returns the created webhook with its ID and verification status.

## Example

```javascript
{
  "name": "My Webhook",
  "callbackUrl": "https://example.com/webhook",
  "scope": "sheet",
  "scopeObjectId": "987654321",
  "events": ["*.*"],
  "version": 1,
  "outputVariable": "newWebhook"
}
```

