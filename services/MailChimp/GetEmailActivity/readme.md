# Get Email Activity Report

This connector retrieves detailed subscriber activity for a specific Mailchimp campaign, including opens, clicks, and bounces.

## Configuration

### Campaign Information
- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. This can be found in the URL when viewing a campaign in Mailchimp or via the Mailchimp API.

### Filter Options
- **Number of Records**: The maximum number of subscriber records to return (default: 10, maximum: 1000).
- **Offset**: Number of records to skip, useful for pagination when retrieving large datasets.
- **Activity Since**: Optional filter to only show activity after a specific date and time. Must be in ISO 8601 format (e.g., `2023-10-21T15:41:36+00:00`).

### Output
- **Output Variable**: Name of the variable that will store the activity report results.

## Example Response

The connector returns detailed subscriber activity data in this format:

```json
{
  "emails": [
    {
      "email_address": "subscriber@example.com",
      "campaign_id": "abc123def456",
      "list_id": "list123",
      "activity": [
        {
          "action": "open",
          "timestamp": "2023-10-21T15:45:36+00:00",
          "ip": "192.0.2.1"
        },
        {
          "action": "click",
          "timestamp": "2023-10-21T15:46:12+00:00",
          "url": "https://example.com/page",
          "ip": "192.0.2.1"
        }
      ]
    }
  ],
  "campaign_id": "abc123def456",
  "total_items": 1
}
```

## Use Cases
- Track which subscribers are engaging with your campaigns
- Analyze open and click patterns for campaign optimization
- Identify bounced emails to clean your subscriber lists