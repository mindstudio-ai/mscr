# Get Webhook

This action retrieves details about a specific webhook belonging to a publication in beehiiv.

## Configuration

### Publication ID
Enter your beehiiv publication ID. This ID starts with `pub_` and can be found in your beehiiv dashboard or API settings.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Webhook ID
Enter the ID of the webhook you want to retrieve. This ID starts with `ep_` and can be found in your beehiiv webhook settings.

Example: `ep_0000000000000000000000000000`

### Output Variable
Specify a name for the variable that will store the webhook details. You can reference this variable in subsequent steps of your workflow.

## Response Data

The action returns a JSON object containing the webhook details:

```json
{
  "id": "ep_0ca1a8505a64924059c391744d0",
  "url": "https://example.com/webhook",
  "created": 1666800076,
  "updated": 1666800076,
  "event_types": [
    "post.sent",
    "subscription.confirmed"
  ],
  "description": "A webhook to receive new posts data and new subscription confirmations."
}
```

## Common Event Types
- `post.sent` - Triggered when a post is sent
- `post.updated` - Triggered when a post is updated
- `subscription.confirmed` - Triggered when a subscription is confirmed
- `subscription.created` - Triggered when a subscription is created
- And many more related to subscriptions and surveys