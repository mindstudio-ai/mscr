# Get Campaign Abuse Reports

This connector retrieves a list of abuse complaints for a specific Mailchimp campaign. Abuse complaints occur when recipients click "report spam" in their email program.

## Configuration

### Campaign Configuration
- **Campaign ID**: Enter the unique identifier for the campaign you want to get abuse reports for. You can find this in your Mailchimp account under Campaigns.

### Response Options
- **Fields to Include** (Optional): A comma-separated list of specific fields you want to include in the response. This helps to filter the data to only what you need.
  - Example: `abuse_reports.email_address,total_items,campaign_id`

- **Fields to Exclude** (Optional): A comma-separated list of fields you want to exclude from the response.
  - Example: `_links,abuse_reports._links`

### Output
- **Output Variable**: Enter a name for the variable that will store the abuse reports data. You can reference this variable in subsequent actions.

## Output Data

The connector returns data in this format:

```json
{
  "abuse_reports": [
    {
      "id": 123,
      "campaign_id": "abc123def",
      "email_address": "example@example.com",
      "date": "2023-01-01T12:00:00Z",
      // additional fields...
    }
  ],
  "campaign_id": "abc123def",
  "total_items": 1
}
```

## Notes
- You must have the appropriate permissions in your Mailchimp account to access this data.
- This connector requires your Mailchimp API Key and Server Prefix to be configured in the service settings.