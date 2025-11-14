# Update Webhook

Updates an existing webhook's configuration.

## Inputs

- `webhookId` (string, required): The ID of the webhook to update
- `name` (string, optional): New name for the webhook
- `enabled` (boolean, optional): Whether the webhook should be enabled
- `events` (array, optional): New array of event types to monitor
- `callbackUrl` (string, optional): New callback URL
- `outputVariable` (string, required): Variable to store the updated webhook

## Outputs

Returns the updated webhook information.

## Example

```javascript
{
  "webhookId": "123456789",
  "name": "Updated Webhook",
  "enabled": true,
  "outputVariable": "updatedWebhook"
}
```

