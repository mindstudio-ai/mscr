# Update Webhook

This action allows you to update an existing webhook subscription for a Beehiiv publication. You can modify the event types that trigger the webhook and update the webhook's description.

## Configuration

### Publication ID
Enter the ID of your Beehiiv publication. This ID starts with `pub_` followed by a UUID.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Webhook ID
Enter the ID of the webhook you want to update. This ID starts with `ep_` followed by a string of characters.

Example: `ep_0ca1a8505a64924059c391744d0`

### Description
Optionally provide a new description for your webhook. This helps you identify the purpose of the webhook.

Example: `A webhook to receive new posts data and new subscription confirmations.`

### Event Types
Select one or more event types that you want this webhook to receive. These determine which actions in Beehiiv will trigger a notification to your webhook endpoint.

Available event types include:
- Post Sent
- Post Updated
- Subscription Confirmed
- Subscription Created
- And many more

## Output

The action will return the updated webhook information, including its ID, URL, creation timestamp, update timestamp, event types, and description.