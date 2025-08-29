# Delete Webhook Subscription

This action allows you to delete an existing webhook subscription in Calendly.

## When to use this action

Use this action when you need to:
- Remove a webhook that is no longer needed
- Clean up webhook subscriptions
- Update your integration by removing old webhooks before creating new ones

## Required information

### Webhook UUID
Enter the UUID of the webhook subscription you want to delete. This is a unique identifier for the webhook in the format:
```
00000000-0000-0000-0000-000000000000
```

You can find your webhook UUIDs by using the "List Webhook Subscriptions" action or from the Calendly developer dashboard.

### Success Variable
Specify a variable name to store the result of the deletion operation. This variable will be set to `true` when the webhook is successfully deleted.

## What happens

When this action runs:
1. It sends a request to Calendly to delete the specified webhook subscription
2. If successful, the webhook will be permanently removed from your Calendly account
3. The success variable will be set to `true`

## Notes
- This action requires a valid Calendly OAuth connection
- Once deleted, webhooks cannot be recovered - you'll need to create a new webhook if needed
- If the webhook UUID doesn't exist, the action will return an error