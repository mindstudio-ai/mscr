# Get Webhook Subscription

This connector retrieves detailed information about a specific webhook subscription from your Calendly account.

## Prerequisites

- You must have a Calendly account with API access
- You need to have already created webhook subscriptions in your Calendly account
- You need to know the UUID of the webhook subscription you want to retrieve

## Configuration

### Webhook Subscription UUID

Enter the UUID of the webhook subscription you want to retrieve. This is a unique identifier in the format `00000000-0000-0000-0000-000000000000`.

Example: `123e4567-e89b-12d3-a456-426614174000`

### Output Variable

Enter a name for the variable that will store the webhook subscription details. You can reference this variable in subsequent steps of your workflow.

Example: `webhookDetails`

## Output

The connector will return detailed information about the webhook subscription, including:

- URI
- Creation and update timestamps
- Callback URL
- Creator information
- Subscribed events
- Organization details
- Scope
- State
- User information

Example output:
```json
{
  "resource": {
    "uri": "https://api.calendly.com/webhook_subscriptions/1234abcd-5678-efgh-9012-ijklmnopqrst",
    "created_at": "2023-01-15T09:30:00.000000Z",
    "updated_at": "2023-01-15T09:30:00.000000Z",
    "callback_url": "https://example.com/webhooks/calendly",
    "creator": "https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST",
    "events": ["invitee.created", "invitee.canceled"],
    "organization": "https://api.calendly.com/organizations/ABCDEFGHIJKLMNOPQRST",
    "scope": "https://api.calendly.com/organizations/ABCDEFGHIJKLMNOPQRST",
    "state": "active",
    "user": "https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST"
  }
}
```