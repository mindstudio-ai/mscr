# Get Campaign Unsubscribed Members

This connector retrieves information about members who have unsubscribed from a specific Mailchimp campaign.

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the Mailchimp campaign you want to analyze. You can find this ID in your Mailchimp account or in the URL when viewing the campaign.
  - Example: `b93e6b3cde`

### Pagination Options

- **Results Per Page**: The number of unsubscribed members to return per request. Maximum value is 1000.
  - Default: `10`
  
- **Offset**: The number of records to skip. Useful for pagination when retrieving large sets of results.
  - Default: `0`
  - Example: To get the second page of results with 10 per page, set this to `10`

### Field Selection

- **Fields to Include**: Optionally specify which fields to include in the response as a comma-separated list. Leave blank to return all fields.
  - Example: `email_address,timestamp,reason`

- **Exclude Fields**: Optionally specify which fields to exclude from the response as a comma-separated list. Leave blank to include all fields.
  - Example: `_links,merge_fields`

### Output

- **Output Variable**: The name of the variable that will store the unsubscribed members data. This will contain an object with the following structure:
  - `unsubscribes`: Array of members who unsubscribed
  - `campaign_id`: The campaign ID
  - `total_items`: Total number of unsubscribed members

## Example Response

```json
{
  "unsubscribes": [
    {
      "email_id": "abc123def456",
      "email_address": "example@example.com",
      "reason": "No longer interested",
      "timestamp": "2023-04-15T14:30:00+00:00",
      "campaign_id": "b93e6b3cde",
      "list_id": "a1b2c3d4e5"
    }
  ],
  "campaign_id": "b93e6b3cde",
  "total_items": 1
}
```

## Requirements

To use this connector, you need to have:
1. A Mailchimp API key configured in your environment
2. The server prefix for your Mailchimp account (e.g., "us19")