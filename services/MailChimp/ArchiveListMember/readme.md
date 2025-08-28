# Archive List Member

This action archives a member from a MailChimp audience (list). Archiving removes the member from your list while preserving their data and history.

## When to use this action

Use this action when you want to:
- Remove a subscriber from your email list without permanently deleting their data
- Clean up your audience while maintaining subscriber history
- Implement unsubscribe workflows

## Configuration

### List Information

**List ID**: Enter the unique identifier for your MailChimp audience (list). 
- You can find this in your MailChimp account by going to Audience → Settings → Audience name and defaults
- The List ID appears in the form of a string like `a1b2c3d4e5`

### Member Information

**Member Identifier**: Enter one of the following to identify the list member:
- Email address (e.g., `user@example.com`)
- MD5 hash of the lowercase email address
- Contact ID from MailChimp

## Important Notes

- This action archives the member but does not permanently delete them
- Archived members can be reactivated later if needed
- The action will succeed even if the member is already archived
- If the member doesn't exist, the action will return an error

## Example Use Cases

- Trigger this action when a user submits an unsubscribe form
- Use in automated workflows to clean up inactive subscribers
- Remove users from marketing communications when they cancel their account