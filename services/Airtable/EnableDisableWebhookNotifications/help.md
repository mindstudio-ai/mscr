# Enable/Disable Webhook Notifications

This action allows you to enable or disable notification pings for an existing webhook in your Airtable base.

## Prerequisites

- You must have creator-level permissions for the Airtable base
- The webhook must already be created in your Airtable base
- You need the Base ID and Webhook ID

## Configuration

### Base ID

Enter the ID of your Airtable base. This is the string that starts with "app" in your Airtable URL.

Example: `appABC123xyz456`

### Webhook ID

Enter the ID of the webhook you want to enable or disable. This is the string that starts with "web" that you received when you created the webhook.

Example: `webXYZ789abc123`

### Notification Status

Select whether to enable or disable webhook notification pings:
- **Enable**: Turn on webhook notifications
- **Disable**: Turn off webhook notifications

## Important Notes

- This action only enables or disables notifications for an existing webhook
- The action returns no data on success
- You must have creator-level permissions to use this action