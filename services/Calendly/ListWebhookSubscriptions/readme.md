# List Webhook Subscriptions

This connector retrieves a list of webhook subscriptions for your Calendly organization. Webhook subscriptions notify external systems when events occur in Calendly.

## Configuration

### Organization URL
Enter the URL of your Calendly organization. This is required to identify which organization's webhooks to retrieve.

Example format:
```
https://api.calendly.com/organizations/ABCDEF123456789
```

You can find your organization ID in the Calendly web app under Settings > Organization > General.

### Scope (Optional)
Filter webhooks by their scope:
- **All**: Return all webhook subscriptions (default)
- **Organization**: Only return organization-scoped webhooks
- **User**: Only return user-scoped webhooks

### Count (Optional)
Specify how many webhook subscriptions to return per page (1-100). Defaults to 10 if not specified.

### Page Token (Optional)
If you've already retrieved some webhooks and want to get the next page of results, enter the page token from the previous response's pagination object.

### Output Variable
Enter a name for the variable that will store the webhook subscription data. This variable will contain:

- A `collection` array with webhook subscription objects
- A `pagination` object with details for retrieving additional pages

## Example Response

```json
{
  "collection": [
    {
      "uri": "https://api.calendly.com/webhook_subscriptions/WEBHOOK_UUID",
      "callback_url": "https://your-callback-url.com/webhooks",
      "created_at": "2023-01-01T12:00:00.000000Z",
      "updated_at": "2023-01-01T12:00:00.000000Z",
      "retry_started_at": null,
      "state": "active",
      "events": ["invitee.created", "invitee.canceled"],
      "scope": "organization",
      "organization": "https://api.calendly.com/organizations/ORGANIZATION_UUID",
      "user": null,
      "creator": "https://api.calendly.com/users/USER_UUID"
    }
  ],
  "pagination": {
    "count": 1,
    "next_page": null,
    "previous_page": null,
    "next_page_token": null,
    "previous_page_token": null
  }
}
```