# List Webhooks

This connector retrieves all webhooks belonging to a specific publication in beehiiv.

## Configuration

### Publication ID
Enter the ID of your beehiiv publication. This ID starts with `pub_` followed by a UUID.

Example: `pub_00000000-0000-0000-0000-000000000000`

You can find your publication ID in the URL when viewing your publication in the beehiiv dashboard or via the beehiiv API.

### Limit (Optional)
Specify the maximum number of webhooks to return. The value must be between 1 and 100.

If left blank, the default value of 10 will be used.

### Output Variable
Specify a variable name to store the list of webhooks. This variable will contain an array of webhook objects with the following properties:

```json
[
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
]
```

## Available Event Types

Webhooks can be configured for any of these event types:
- post.sent
- post.updated
- subscription.confirmed
- subscription.created
- subscription.downgraded
- subscription.paused
- subscription.resumed
- subscription.tier.paused
- subscription.tier.resumed
- subscription.upgraded
- subscription.tier.created
- subscription.tier.deleted
- subscription.deleted
- survey.response_submitted