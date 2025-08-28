# List Conversations

This action retrieves a list of conversations from your MailChimp account. Conversations track replies to your campaigns.

> **Note**: MailChimp has deprecated the Conversations feature in favor of Inbox. This endpoint still provides access to past conversations, but new campaign replies and other Inbox messages won't be available.

## Configuration Options

### Conversation Filters

- **Has Unread Messages**: Filter conversations by whether they have unread messages
  - Choose "Any" to see all conversations
  - Choose "Yes" to only see conversations with unread messages
  - Choose "No" to only see conversations with no unread messages

- **List ID**: Filter conversations by a specific list ID
  - Leave blank to include conversations from all lists
  - Example: `a1b2c3d4e5`

- **Campaign ID**: Filter conversations by a specific campaign ID
  - Leave blank to include conversations from all campaigns
  - Example: `f6g7h8i9j0`

### Pagination

- **Count**: The number of records to return (default: 10, maximum: 1000)
- **Offset**: Number of records to skip for pagination (useful for retrieving additional pages)

## Output

The action returns conversation data that includes:
- Conversation IDs
- Message counts
- Campaign and list IDs
- Unread message counts
- Sender information
- Subject lines
- Last message details

## Example Response

```json
{
  "conversations": [
    {
      "id": "conversation_id",
      "message_count": 3,
      "campaign_id": "campaign_id",
      "list_id": "list_id",
      "unread_messages": 1,
      "from_label": "John Doe",
      "from_email": "john@example.com",
      "subject": "Re: Your Campaign",
      "last_message": {
        "from_label": "John Doe",
        "from_email": "john@example.com",
        "subject": "Re: Your Campaign",
        "message": "This is the message content",
        "read": false,
        "timestamp": "2023-01-01T12:00:00+00:00"
      }
    }
  ],
  "total_items": 1
}
```