# Get Campaign Advice

This action retrieves feedback and advice based on a Mailchimp campaign's statistics, including opens, clicks, unsubscribes, bounces, and more.

## Configuration

### Campaign Details

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. This can be found in the URL when viewing your campaign in Mailchimp or via the Mailchimp API.

### Advanced Options

- **Fields to Include**: Optionally specify which fields you want to include in the response. Use a comma-separated list. For nested fields, use dot notation.
  
  Example: `advice.type,advice.message,campaign_id`

- **Fields to Exclude**: Optionally specify which fields you want to exclude from the response. Use a comma-separated list. For nested fields, use dot notation.
  
  Example: `_links,total_items`

### Output

- **Output Variable**: Enter a name for the variable that will store the campaign advice results. This variable will contain the complete response from Mailchimp with advice and feedback about your campaign.

## Example Response

The output will be a JSON object containing:

```json
{
  "advice": [
    {
      "type": "positive",
      "message": "Your open rate was higher than your list average."
    },
    {
      "type": "negative",
      "message": "Your unsubscribe rate was higher than your list average."
    }
  ],
  "campaign_id": "abc123def",
  "total_items": 2
}
```

## Notes

- You must have a valid Mailchimp API key and server prefix configured in your service settings.
- The campaign must exist in your Mailchimp account.