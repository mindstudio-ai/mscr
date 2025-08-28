# Get Member Activity

This action retrieves a member's activity on a specific Mailchimp list, including opens, clicks, unsubscribes, and other engagement data.

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your Mailchimp list/audience. You can find this in your Mailchimp account under Audience → Settings → Audience name and defaults.
  
  Example: `a1b2c3d4e5`

- **Subscriber Identifier**: Enter one of the following:
  - Email address (e.g., `user@example.com`)
  - MD5 hash of the lowercase email address
  - Contact ID from Mailchimp

### Query Options

- **Activity Types to Include**: Select one or more activity types to filter the results. If left empty, all activity types will be included.

- **Number of Records**: Specify how many activity records to return. Default is 10, maximum is 1000.

### Output

- **Output Variable**: Name the variable that will store the member's activity data. This will be an object containing an array of activities and related information.

## Example Response

The output will contain an array of activity objects with details about each interaction:

```json
{
  "activity": [
    {
      "activity_type": "open",
      "created_at_timestamp": "2023-01-15T14:30:00Z",
      "campaign_id": "abc123",
      "campaign_title": "January Newsletter"
    },
    {
      "activity_type": "click",
      "created_at_timestamp": "2023-01-15T14:32:00Z",
      "campaign_id": "abc123",
      "campaign_title": "January Newsletter",
      "link_clicked": "https://example.com/special-offer"
    }
  ],
  "email_id": "md5hash",
  "list_id": "a1b2c3d4e5"
}
```

## Notes

- The activity data includes timestamps, campaign information, and details specific to each activity type.
- For large audiences, consider using filters to limit the results to specific activity types.
- This action requires a valid Mailchimp API key and server prefix configured in your environment variables.