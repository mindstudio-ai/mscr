# Get Webhook By ID

This connector retrieves detailed information about a specific webhook from HeyReach by its unique ID.

## Prerequisites

- You need a HeyReach account with API access
- Your HeyReach API key should be configured in the service settings

## Configuration

### Webhook ID
Enter the numeric ID of the webhook you want to retrieve. This is typically a number like `123` that uniquely identifies your webhook in the HeyReach system.

### Output Variable
Specify a variable name where the webhook details will be stored. This variable will contain all information about the webhook including:
- ID
- Name
- URL
- Event type
- Associated campaign IDs
- Active status

## Example Response

The output variable will contain a JSON object similar to:

```json
{
  "id": 123,
  "webhookName": "My Webhook Name",
  "webhookUrl": "https://webhook.site/my-webhook-url",
  "eventType": "CONNECTION_REQUEST_SENT",
  "campaignIds": [123, 124],
  "isActive": true
}
```

You can use this information in subsequent steps of your workflow.