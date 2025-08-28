# Get List Member Events

This action retrieves events for a specific contact in a MailChimp list.

## Required Configuration

### List Member Configuration
- **List ID**: Enter the unique identifier for your MailChimp list/audience. You can find this in your MailChimp account under Audience settings.
- **Subscriber Identifier**: Enter one of the following:
  - Email address (e.g., `user@example.com`)
  - Contact ID
  - MD5 hash of the lowercase version of the email address

### Output Configuration
- **Output Variable**: The name of the variable where the events data will be stored.

## Optional Parameters

- **Count**: The number of events to return (default: 10, maximum: 1000)
- **Offset**: The number of events to skip, useful for pagination (default: 0)
- **Fields to Include**: A comma-separated list of specific fields to include in the response
  - Example: `events.name,events.occurred_at,total_items`
- **Fields to Exclude**: A comma-separated list of fields to exclude from the response
  - Example: `_links`

## Example Response

The output variable will contain a response like this:

```json
{
  "events": [
    {
      "occurred_at": "2023-01-15T14:30:00Z",
      "name": "email_open",
      "properties": {
        "campaign_id": "abc123",
        "ip_address": "192.168.1.1"
      }
    },
    {
      "occurred_at": "2023-01-14T10:15:00Z",
      "name": "click",
      "properties": {
        "campaign_id": "abc123",
        "url": "https://example.com"
      }
    }
  ],
  "total_items": 2
}
```

## Authentication

This connector requires:
- **API Key**: Your MailChimp API key
- **Server Prefix**: Your MailChimp server prefix (e.g., us19)

These should be configured in the MailChimp service settings.