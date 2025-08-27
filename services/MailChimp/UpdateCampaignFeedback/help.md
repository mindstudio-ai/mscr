# Update Campaign Feedback in Mailchimp

This connector allows you to update a specific feedback message for a Mailchimp campaign.

## Prerequisites

- A Mailchimp account with API access
- Your Mailchimp API key (configured in the service settings)
- Your Mailchimp server prefix (e.g., us19) (configured in the service settings)
- An existing campaign with feedback messages

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the campaign. This can be found in the URL when viewing the campaign in Mailchimp or via the Mailchimp API.
  
- **Feedback ID**: Enter the unique identifier for the feedback message you want to update. This can be obtained from the Mailchimp API when listing feedback for a campaign.

### Feedback Details

- **Message**: Enter the updated content for the feedback message. This can be multiple lines of text.

- **Block ID** (optional): If the feedback is associated with a specific content block in the campaign, enter the block ID. If you don't know the block ID or if it's not relevant, you can leave this field empty.

- **Mark as Complete**: Select whether to mark the feedback as complete or not.
  - Select "Yes" to mark the feedback as complete
  - Select "No" to mark the feedback as incomplete or in progress

- **Output Variable**: Enter a name for the variable that will store the response from Mailchimp. This variable will contain all the details of the updated feedback message.

## Example Response

The output variable will contain a JSON object with details about the updated feedback, similar to:

```json
{
  "feedback_id": 123,
  "parent_id": 0,
  "block_id": 789,
  "message": "Your updated feedback message",
  "is_complete": true,
  "created_by": "user@example.com",
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": "2023-01-02T12:00:00Z",
  "source": "api",
  "campaign_id": "abc123def"
}
```