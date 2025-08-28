# Get All Webhooks

This connector retrieves a list of all webhooks configured in your HeyReach account.

## What This Connector Does

The Get All Webhooks connector allows you to fetch all webhooks that you have set up in HeyReach. This is useful for:

- Reviewing your existing webhook configurations
- Checking webhook status (active/inactive)
- Viewing webhook URLs and associated campaign IDs
- Getting webhook IDs for use in other operations

## Configuration

### Pagination

- **Offset**: Number of records to skip (for pagination). Default is 0.
- **Limit**: Maximum number of webhooks to return. Default is 100, which is also the maximum allowed by the API.

### Output

- **Output Variable**: Name of the variable where the results will be stored. This variable will contain the full response including the total count and the list of webhooks.

## Response Structure

The output variable will contain a JSON object with this structure:

```json
{
  "totalCount": 1,
  "items": [
    {
      "id": 123,
      "webhookName": "New Connection Alert",
      "webhookUrl": "https://example.com/webhook",
      "eventType": "CONNECTION_REQUEST_SENT",
      "campaignIds": [456, 789],
      "isActive": true
    }
  ]
}
```

## Example Usage

1. Use this connector to retrieve all webhooks
2. Loop through the items array in the response
3. Use the webhook IDs for other operations like updating or deleting webhooks

## Authentication

This connector uses your HeyReach API key which should be configured in the HeyReach service settings.