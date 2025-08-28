# Get Conversation Messages

This connector retrieves messages from a specific conversation in your Mailchimp account.

## Prerequisites

- You need a Mailchimp API key. You can generate one at [Mailchimp Developer Portal](https://mailchimp.com/developer/marketing/guides/quick-start/#generate-your-api-key).
- You need to know your Mailchimp server prefix (e.g., "us19").
- You need a valid conversation ID from your Mailchimp account.

## Configuration

### Conversation Details

- **Conversation ID**: Enter the unique identifier for the conversation you want to retrieve messages from. This is required.

### Filter Options

- **Filter by Read Status**: Optionally filter messages by whether they have been read or not.
  - All Messages: Return both read and unread messages
  - Read Messages Only: Return only messages that have been read
  - Unread Messages Only: Return only messages that have not been read

- **Since Timestamp**: Optionally filter to only include messages created after this time. Must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SS+00:00).
  Example: `2023-01-01T00:00:00+00:00`

- **Before Timestamp**: Optionally filter to only include messages created before this time. Must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SS+00:00).
  Example: `2023-12-31T23:59:59+00:00`

### Output

- **Output Variable**: Specify a name for the variable that will store the retrieved conversation messages.

## Output Format

The connector returns an object with the following structure:

```json
{
  "conversation_messages": [
    {
      "id": "string",
      "conversation_id": "string",
      "list_id": 0,
      "from_label": "string",
      "from_email": "string",
      "subject": "string",
      "message": "string",
      "read": true,
      "timestamp": "2023-01-01T00:00:00+00:00"
    }
  ],
  "conversation_id": "string",
  "total_items": 0
}
```

## Note

This endpoint has been deprecated by Mailchimp in favor of Inbox. Past Conversations are still available via this endpoint, but new campaign replies and other Inbox messages aren't available using this endpoint.