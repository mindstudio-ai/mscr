# Get Subscriber Email Activity

This action retrieves detailed activity information for a specific subscriber in a MailChimp campaign, including opens, clicks, and bounces.

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the campaign you want to check. You can find this in your MailChimp dashboard or in the URL when viewing a campaign.
  
- **Subscriber Email or Hash**: Enter either:
  - The subscriber's email address (e.g., `example@email.com`)
  - The MD5 hash of the lowercase version of the email address (e.g., `55502f40dc8b7c769880b10874abc12d`)
  
  The connector will automatically convert an email address to its MD5 hash format if needed.

### Optional Filters

- **Activity Since**: Limit results to activity that occurred after a specific time. Use ISO 8601 format: `YYYY-MM-DDThh:mm:ss+00:00`
  Example: `2023-01-01T00:00:00+00:00`

- **Fields to Include**: Specify only the fields you want to include in the response as a comma-separated list.
  Example: `email_address,activity,campaign_id`

- **Fields to Exclude**: Specify fields you want to exclude from the response as a comma-separated list.
  Example: `_links,list_id`

### Output

- **Output Variable**: Name of the variable that will store the subscriber's email activity data. This will contain information about opens, clicks, bounces, and other interactions with the campaign email.

## Example Response

The output will contain data similar to:

```json
{
  "campaign_id": "campaign123",
  "list_id": "list123",
  "email_address": "example@email.com",
  "activity": [
    {
      "action": "open",
      "timestamp": "2023-01-15T14:30:45+00:00",
      "ip": "192.168.1.1"
    },
    {
      "action": "click",
      "timestamp": "2023-01-15T14:31:12+00:00",
      "url": "https://example.com/page",
      "ip": "192.168.1.1"
    }
  ]
}
```

## Troubleshooting

- If you're not seeing any results, check that the Campaign ID is correct and that the subscriber was included in that campaign.
- Verify that the email address is spelled correctly or that the MD5 hash was generated properly.
- Make sure your MailChimp API Key and Server Prefix are correctly configured in the service settings.