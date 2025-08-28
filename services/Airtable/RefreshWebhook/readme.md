# Refresh Airtable Webhook

This action refreshes an Airtable webhook, extending its life by 7 days from the time of refresh. This is useful for keeping your webhooks active without having to recreate them.

## Prerequisites

- You need an Airtable account with creator-level permissions for the base containing the webhook
- You need a valid Airtable Personal Access Token or OAuth token with the `webhook:manage` scope
- The webhook must be active and have an expiration time

## Configuration

### Base ID

Enter the ID of your Airtable base. This is the part that appears after `airtable.com/` in your base URL.

Example: If your base URL is `https://airtable.com/appABC123456789`, then your Base ID is `appABC123456789`.

### Webhook ID

Enter the ID of the webhook you want to refresh. You can find your webhook IDs in the Airtable API documentation for your base, or by listing webhooks using the Airtable API.

Example: `wnkXYZ987654321`

### Output Variable

Specify a variable name to store the webhook's new expiration time. The output will be an object containing the new expiration time in ISO format.

Example output:
```json
{
  "expirationTime": "2023-01-30T00:00:00.000Z"
}
```

## Notes

- This action requires creator-level permissions for the base
- This action only works on active webhooks with an expiration time
- The new expiration time will be 7 days from the time of refresh