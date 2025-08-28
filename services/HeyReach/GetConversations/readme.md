# Get LinkedIn Conversations

This connector allows you to retrieve LinkedIn conversations from your HeyReach account with optional filtering capabilities.

## Configuration

### Filtering Options

- **LinkedIn Account IDs**: Enter a comma-separated list of LinkedIn account IDs to filter conversations by specific accounts. Leave empty to include all accounts.
  - Example: `123, 456, 789`

- **Campaign IDs**: Enter a comma-separated list of campaign IDs to filter conversations by specific campaigns. Leave empty to include all campaigns.
  - Example: `1001, 1002, 1003`

- **Search String**: Enter text to search for within conversations. This will filter conversations containing the specified text.

- **Lead LinkedIn Profile URL**: Filter conversations by a specific LinkedIn profile URL.
  - Example: `https://www.linkedin.com/in/johndoe/`

- **Message Status**: Filter conversations by their read/unread status:
  - All Messages: Include both read and unread messages
  - Read Messages: Only include messages that have been read
  - Unread Messages: Only include unread messages

### Pagination

- **Limit**: Maximum number of conversations to return in a single request. Maximum allowed is 100.
  - Default: `10`

- **Offset**: Number of conversations to skip. Useful for pagination when retrieving large sets of data.
  - Default: `0`

### Output

- **Output Variable**: The name of the variable where the retrieved conversations will be stored. This variable will contain the full response from the API, including conversation details, correspondent profiles, and message history.

## Response Structure

The connector returns data in the following structure:

```json
{
  "totalCount": 42,
  "items": [
    {
      "id": "conversation-id",
      "read": true,
      "lastMessageAt": "2023-03-28T12:00:19.007Z",
      "lastMessageText": "Thanks for connecting!",
      "correspondentProfile": {
        "firstName": "Jane",
        "lastName": "Smith",
        "headline": "Marketing Director at TechCorp",
        "profileUrl": "https://www.linkedin.com/in/janesmith/"
        // Additional profile details...
      },
      "messages": [
        {
          "createdAt": "2023-03-28T12:00:19.007Z",
          "body": "Thanks for connecting!",
          "sender": "PARTICIPANT"
        }
        // Additional messages...
      ]
      // Additional conversation details...
    }
    // Additional conversations...
  ]
}
```