# Create a Webhook in beehiiv

This connector creates a new webhook for your beehiiv publication, allowing you to receive notifications when specific events occur.

## Configuration

### Publication Details
- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard.

### Webhook Configuration
- **Webhook URL**: The URL where beehiiv will send event notifications. This should be a valid endpoint that can receive and process HTTP POST requests.

- **Event Types**: Select one or more events that you want to be notified about. Options include:
  - Post Sent: When a new post is published
  - Post Updated: When an existing post is updated
  - Subscription Confirmed: When a subscriber confirms their subscription
  - Subscription Created: When a new subscription is created
  - And many more subscription and survey-related events

- **Description** (Optional): Add a description to help you remember the purpose of this webhook.

### Output
- **Output Variable**: The name of the variable that will store the webhook details after creation.

## Example Response

The connector will return details about the created webhook, including:

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

## Common Use Cases

- Track new subscribers to your newsletter
- Get notified when new posts are published
- Monitor subscription upgrades and downgrades
- Collect survey responses