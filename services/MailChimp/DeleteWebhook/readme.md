# Delete Webhook

This action allows you to delete a specific webhook from a MailChimp list.

## Prerequisites

Before using this action, you need to:

1. Have a MailChimp account with API access
2. Have existing webhooks set up in your MailChimp list
3. Know the List ID and Webhook ID you want to delete

## Configuration

### List ID

Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account:

1. Go to Audience → All Contacts
2. Click on the "Settings" dropdown
3. Select "Audience name and defaults"
4. The List ID is shown as "Audience ID" near the top of the page

Example: `a1b2c3d4e5`

### Webhook ID

Enter the ID of the webhook you want to delete. You can find this:

1. In your MailChimp account, go to Audience → Settings → Webhooks
2. The Webhook ID is in the URL when you edit a webhook
3. Or you can get it programmatically by first listing all webhooks for a list

Example: `123456789`

## Important Notes

- This action permanently deletes the webhook. This cannot be undone.
- The action will return a success message when the webhook is deleted successfully.
- If the webhook ID or list ID is invalid, you'll receive an error message.