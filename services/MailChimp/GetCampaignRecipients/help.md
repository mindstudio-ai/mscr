# Get Campaign Recipients

This connector allows you to retrieve information about the recipients of a specific Mailchimp campaign, including their email addresses, delivery status, open counts, and more.

## Prerequisites

- A Mailchimp account with API access
- A campaign ID from a previously sent campaign
- Your Mailchimp API key and server prefix configured in the connection settings

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the campaign you want to analyze. This can be found in the URL when viewing a campaign in Mailchimp or via the Mailchimp API.
  - Example: `campaign_123abc` or `a1b2c3d4e5`

### Filtering Options

- **Count**: The number of recipient records to return. Default is 10, maximum is 1000.
- **Offset**: The number of records to skip (useful for pagination when retrieving large sets of data).

### Output

- **Output Variable**: The name of the variable where the campaign recipient data will be stored for use in subsequent actions.

## Output Data Structure

The connector returns data in the following structure:

```json
{
  "sent_to": [
    {
      "email_id": "md5hash",
      "email_address": "example@domain.com",
      "status": "sent",
      "open_count": 2,
      "last_open": "2023-01-01T12:00:00+00:00",
      "merge_fields": { ... }
    },
    // Additional recipients
  ],
  "campaign_id": "campaign_123abc",
  "total_items": 250
}
```

## Common Use Cases

- Analyzing campaign performance by recipient
- Creating targeted follow-up campaigns based on open behavior
- Identifying subscribers who haven't engaged with your campaigns