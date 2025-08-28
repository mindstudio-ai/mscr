# Send LinkedIn Message

This connector allows you to send a message to a LinkedIn conversation through HeyReach.

## Configuration

### Message Details

- **Message Content**: The text content of your LinkedIn message. You can use multiple lines.
- **Subject**: An optional subject line for your message.
- **Conversation ID**: The unique identifier for the LinkedIn conversation you want to send a message to. This should be in the format like `2-ODM0YmIzNzgtOGEyOS00ZTYzLWExYTItNmM0MWNhMjNlNGZj`.
- **LinkedIn Account ID**: The numeric ID of your LinkedIn sender account in HeyReach. This is typically a number like `123`.
- **Success Variable**: Name of the variable that will store whether the message was sent successfully (`true`) or not.

## Example Usage

You can use this connector to:
- Send follow-up messages to LinkedIn connections
- Respond to LinkedIn messages as part of an automated workflow
- Send templated messages to LinkedIn conversations

## Requirements

- You must have a HeyReach account with a valid API key configured
- The LinkedIn account ID must be valid and connected to your HeyReach account
- The conversation ID must be a valid LinkedIn conversation that your account has access to

## Notes

- Rate limits may apply based on your HeyReach plan
- Messages will appear as sent from the specified LinkedIn account