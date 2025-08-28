# MailChimp List Campaigns

This action retrieves a list of campaigns from your MailChimp account.

## Prerequisites

Before using this action, make sure you have:

1. A MailChimp account
2. Your MailChimp API key (found in your account settings under the "Extras" > "API keys" section)
3. Your server prefix (e.g., "us19") - this is the prefix in your MailChimp URL: `https://[SERVER-PREFIX].admin.mailchimp.com/`

## Configuration

### Campaign Filters

Filter the campaigns you want to retrieve:

- **Campaign Type**: Select the type of campaign to filter by (Regular, Plain Text, A/B Split, RSS, or Variate). Leave as "All Types" to retrieve all campaign types.
- **Campaign Status**: Filter campaigns by their status (Save, Paused, Schedule, Sending, or Sent). Leave as "All Statuses" to retrieve campaigns with any status.
- **List ID**: Optionally filter campaigns by the audience/list they were sent to. You can find the List ID in your MailChimp account under Audience settings.

### Pagination

Control how many campaigns are returned:

- **Count**: The number of campaigns to return (default: 10, maximum: 1000)
- **Offset**: The number of campaigns to skip (useful for pagination)

### Output

- **Output Variable**: The variable name where the list of campaigns will be stored. This will contain an object with campaign data including IDs, names, status, and statistics.

## Example Output

The output variable will contain a structure like this:

```json
{
  "campaigns": [
    {
      "id": "campaign_id",
      "web_id": 123456,
      "type": "regular",
      "status": "sent",
      "create_time": "2023-01-01T12:00:00+00:00",
      "send_time": "2023-01-02T12:00:00+00:00",
      "emails_sent": 1000,
      "settings": {
        "subject_line": "Campaign Subject",
        "title": "Campaign Title",
        "from_name": "Your Name",
        "reply_to": "email@example.com"
      },
      "report_summary": {
        "opens": 500,
        "unique_opens": 450,
        "open_rate": 45,
        "clicks": 200,
        "subscriber_clicks": 180,
        "click_rate": 18
      }
    }
  ],
  "total_items": 10
}
```

## Notes

- For large accounts, consider using filters to limit the number of campaigns returned
- The campaigns are returned in reverse chronological order (newest first)