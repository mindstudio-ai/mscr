# Create Reply to Canva Comment

This connector allows you to reply to an existing comment or suggestion thread on a Canva design.

## Prerequisites

- You need to have a Canva account and be authenticated with the proper permissions
- The OAuth connection must have the `comment:write` scope
- You need to know the Design ID and Thread ID of the comment you want to reply to

## Configuration

### Design ID

The unique identifier for the Canva design. You can find this in the URL of your design:
`https://www.canva.com/design/[DESIGN_ID]/view`

Example: `DAFVztcvd9z`

### Thread ID

The unique identifier for the comment thread you're replying to. You can get this from:
- A previous "Create Comment" action
- The response of a "Get Comments" action
- The `thread_id` value of an existing reply

Example: `KeAbiEAjZEj`

### Reply Message

The text content of your reply. This supports:
- Plain text messages
- Mentioning users with the format `[user_id:team_id]`
- Maximum length: 2048 characters

### Output Variable

The connector will store the complete response from Canva in this variable. The response includes:
- Reply ID
- Design ID
- Thread ID
- Author information
- Content (plaintext and markdown)
- Mentions
- Creation and update timestamps

## Limitations

- Each thread can have a maximum of 100 replies
- This API is rate limited to 20 requests per minute per user