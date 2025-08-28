# Get Campaign Report

This connector retrieves detailed performance metrics and statistics for a specific MailChimp campaign that has been sent.

## When to use this connector

Use this connector when you need to:
- Analyze campaign performance metrics
- Get open rates, click rates, and other engagement statistics
- Monitor bounce rates and unsubscribe counts
- Access e-commerce data related to your campaign
- Export campaign data for reporting purposes

## Required information

### Campaign Information
- **Campaign ID**: The unique identifier for the campaign you want to get a report for. You can find this in your MailChimp account or from the URL when viewing a campaign.

### Report Options (Optional)
- **Fields to Include**: A comma-separated list of specific fields you want to include in the response. Leave empty to return all fields.
  - Example: `id,campaign_title,emails_sent,opens,clicks`
  
- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response.
  - Example: `_links,timeseries,ab_split`

### Output
- **Output Variable**: Name of the variable that will store the campaign report data.

## Example Response

The connector returns a comprehensive report with metrics such as:

```json
{
  "id": "campaign123",
  "campaign_title": "Monthly Newsletter",
  "emails_sent": 5000,
  "opens": {
    "opens_total": 3200,
    "unique_opens": 2800,
    "open_rate": 56,
    "last_open": "2023-04-15T14:30:00+00:00"
  },
  "clicks": {
    "clicks_total": 1500,
    "unique_clicks": 1200,
    "click_rate": 24,
    "last_click": "2023-04-15T16:45:00+00:00"
  },
  "bounces": {
    "hard_bounces": 15,
    "soft_bounces": 30
  },
  "unsubscribed": 5
}
```

## Troubleshooting

- **Invalid Campaign ID**: Ensure you're using the correct campaign ID and that the campaign has been sent.
- **Authentication Error**: Verify your MailChimp API key and server prefix in the connection settings.
- **No Data Available**: Make sure the campaign has been sent and enough time has passed for metrics to be collected.
