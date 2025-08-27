# Add Campaign Feedback

This connector allows you to add feedback to a specific Mailchimp campaign.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have configured your Mailchimp API Key and Server Prefix in the connection settings
- You need an existing campaign ID to add feedback to

## Configuration

### Campaign ID
Enter the unique identifier for the campaign you want to add feedback to. This can be found in the URL when viewing a campaign in Mailchimp or via the Mailchimp API.

Example: `abc123def456`

### Feedback Message
Enter the content of your feedback. This is the actual message that will be added as feedback to the campaign.

Example:
```
This campaign needs a more compelling subject line to improve open rates. Consider adding personalization.
```

### Block ID (Optional)
If you want to associate your feedback with a specific editable block in the campaign, enter the block ID here. This is optional.

Example: `12345`

### Mark as Complete
Select whether the feedback should be marked as complete or not:
- **Yes**: The feedback is marked as complete
- **No**: The feedback is not marked as complete (default)

### Output Variable
Enter a name for the variable that will store the response from Mailchimp. This variable will contain all the details of the created feedback, including its ID, creation date, and other metadata.

## Example Response

The output variable will contain a response similar to this:

```json
{
  "feedback_id": 42,
  "parent_id": 0,
  "block_id": 12345,
  "message": "This campaign needs a more compelling subject line to improve open rates.",
  "is_complete": false,
  "created_by": "user@example.com",
  "created_at": "2023-06-01T12:00:00+00:00",
  "updated_at": "2023-06-01T12:00:00+00:00",
  "source": "api",
  "campaign_id": "abc123def456"
}
```