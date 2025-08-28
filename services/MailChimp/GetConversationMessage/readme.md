# Get Conversation Message

This connector retrieves an individual message from a conversation in your MailChimp account.

## When to use this connector

Use this connector when you need to:
- Retrieve the details of a specific message within a conversation
- Access the content, subject, sender information, and other details of a message
- Check if a message has been read

## Prerequisites

- You need a MailChimp account with API access
- You need to have the Conversation ID and Message ID of the message you want to retrieve

## Important Notes

This endpoint is marked as deprecated in the MailChimp API, as Conversations has been deprecated in favor of Inbox. However, it's still functional for accessing past conversations. New campaign replies and other Inbox messages aren't available using this endpoint.

## Configuration

### Message Information

- **Conversation ID**: Enter the unique identifier for the conversation containing the message
- **Message ID**: Enter the unique identifier for the specific message you want to retrieve

### Optional Parameters

- **Fields to Include**: Specify which fields to include in the response as a comma-separated list
  - Example: `id,subject,message,read,timestamp`
- **Fields to Exclude**: Specify which fields to exclude from the response as a comma-separated list
  - Example: `_links,list_id`

### Output

- **Output Variable**: The name of the variable where the message details will be stored

## Output Format

The output will be a JSON object containing details about the message, including:

```json
{
  "id": "message_id",
  "conversation_id": "conversation_id",
  "list_id": 123456,
  "from_label": "Sender Name",
  "from_email": "sender@example.com",
  "subject": "Message Subject",
  "message": "The plain-text content of the message",
  "read": true,
  "timestamp": "2023-01-01T12:00:00+00:00"
}
```