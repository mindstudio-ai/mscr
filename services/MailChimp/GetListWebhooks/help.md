# Get List Webhooks

This connector retrieves all webhooks configured for a specific MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the service settings
- Your MailChimp server prefix must be configured in the service settings
- You need a MailChimp list ID

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for your MailChimp list. This is a required field.
  - Example: `4ca5becb8d`
  - You can find your list ID in the MailChimp dashboard by going to Audience > Settings > Audience name and defaults. The list ID appears as "Audience ID" in the settings.

### Output Configuration

- **Output Variable**: Enter a name for the variable that will store the webhook data returned by this action.
  - Example: `webhooks`

## Output

The connector will return an object with the following structure:

```json
{
  "webhooks": [
    {
      "id": "5d9a5e3f7b",
      "url": "http://yourdomain.com/webhook",
      "events": {
        "subscribe": true,
        "unsubscribe": true,
        "profile": true,
        "cleaned": true,
        "upemail": true,
        "campaign": true
      },
      "sources": {
        "user": true,
        "admin": true,
        "api": true
      },
      "list_id": "4ca5becb8d",
      "_links": [...]
    }
  ],
  "list_id": "4ca5becb8d",
  "total_items": 1,
  "_links": [...]
}
```

You can access the webhook data in subsequent steps using the output variable you specified.