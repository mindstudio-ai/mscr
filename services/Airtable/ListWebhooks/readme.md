# List Webhooks

This action lists all webhooks that are registered for an Airtable base, along with their statuses.

## Prerequisites

- You need an Airtable account with a Personal Access Token or OAuth integration
- You need read-level permissions on the base to list webhooks
- Your token must have the `webhook:manage` scope

## Configuration

### Base ID

Enter the ID of your Airtable base. This is the string that starts with "app" in your Airtable base URL.

For example, if your base URL is `https://airtable.com/appABC123xyz/tblXYZ789`, then your Base ID is `appABC123xyz`.

### Output Variable

Specify a variable name to store the list of webhooks. This will contain an array of webhook objects with details like:

- Webhook ID
- Notification status
- Webhook enabled status
- Notification URL
- Expiration time
- Last notification results
- Webhook specifications

## Example Output

```json
{
  "webhooks": [
    {
      "areNotificationsEnabled": true,
      "cursorForNextPayload": 1,
      "expirationTime": "2023-01-20T00:00:00.000Z",
      "id": "ach00000000000000",
      "isHookEnabled": true,
      "lastNotificationResult": {
        "completionTimestamp": "2022-02-01T21:25:05.663Z",
        "durationMs": 2.603,
        "retryNumber": 0,
        "success": true
      },
      "lastSuccessfulNotificationTime": "2022-02-01T21:25:05.663Z",
      "notificationUrl": "https://example.com/webhook",
      "specification": {
        "options": {
          "filters": {
            "dataTypes": ["tableData"],
            "recordChangeScope": "tbltp8DGLhqbUmjK1"
          }
        }
      }
    }
  ]
}
```