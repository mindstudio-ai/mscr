# Get Campaign Feedback

This connector retrieves team feedback for a specific Mailchimp campaign. Use it to view comments and feedback left by team members on your campaigns.

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. This is required to retrieve feedback for a specific campaign.
  - You can find this ID in the URL when viewing a campaign in Mailchimp, or in the campaign listing in your Mailchimp account.
  - Example: `b93e58745a`

### Response Options

- **Fields to Include** (Optional): Specify which fields you want to include in the response.
  - Use a comma-separated list without spaces.
  - Use dot notation for nested fields.
  - Example: `feedback.message,feedback.created_at,feedback.created_by`

- **Fields to Exclude** (Optional): Specify which fields you want to exclude from the response.
  - Use a comma-separated list without spaces.
  - Example: `_links,campaign_id`

- **Output Variable**: The name of the variable where the campaign feedback data will be stored.
  - This variable will contain an object with the feedback array and metadata.

## Example Response

The output variable will contain a response like this:

```json
{
  "feedback": [
    {
      "feedback_id": 123456,
      "message": "I think we should change the headline",
      "is_complete": false,
      "created_by": "john.doe@example.com",
      "created_at": "2023-06-15T14:30:00+00:00"
    },
    {
      "feedback_id": 123457,
      "message": "The image looks great!",
      "is_complete": true,
      "created_by": "jane.smith@example.com",
      "created_at": "2023-06-16T09:15:00+00:00"
    }
  ],
  "campaign_id": "b93e58745a",
  "total_items": 2
}
```