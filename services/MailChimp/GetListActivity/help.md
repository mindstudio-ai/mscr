# Get List Activity

This action retrieves up to 180 days of daily detailed activity statistics for a specified Mailchimp list. The data includes metrics such as emails sent, opens, clicks, bounces, subscribes, and unsubscribes.

## Configuration

### List Configuration
- **List ID**: Enter the unique identifier for your Mailchimp list. You can find your list ID in your Mailchimp account under Audience → Settings → Audience name and defaults.

### Activity Options
- **Count**: The number of activity records to return. Default is 10, maximum is 1000.
- **Offset**: Number of records to skip for pagination purposes. Default is 0.

### Output
- **Output Variable**: Name of the variable where the list activity results will be stored.

## Example Response

The output will contain detailed daily activity statistics in this format:

```json
{
  "activity": [
    {
      "day": "2023-06-01",
      "emails_sent": 100,
      "unique_opens": 45,
      "recipient_clicks": 15,
      "hard_bounce": 2,
      "soft_bounce": 1,
      "subs": 5,
      "unsubs": 1,
      "other_adds": 3,
      "other_removes": 0
    },
    // Additional days...
  ],
  "list_id": "abc123def",
  "total_items": 30
}
```

## Notes
- This action only retrieves regular campaign activity and does not include Automation or AutoResponder activity.
- The data is limited to the previous 180 days.