# Update Subscription in beehiiv

This connector allows you to update an existing subscription in your beehiiv publication.

## Required Information

- **Publication ID**: Your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard.
- **Subscription ID**: The ID of the subscription you want to update, which starts with `sub_`.

## Subscription Options

- **Subscription Tier**: Choose whether this subscriber should be on the Free or Premium tier.
- **Unsubscribe**: Set to "Yes" if you want to unsubscribe this person from your publication.
- **Stripe Customer ID**: Optional - The Stripe customer ID associated with this subscription.

## Custom Fields

You can update custom fields for the subscription by providing a JSON array of objects. Each object should include:

- `name`: The name of the existing custom field
- `value`: The value to set for the field (can be string, number, boolean, or array of strings)
- `delete`: (Optional) Set to `true` to delete this custom field

### Example Custom Fields JSON:

```json
[
  {
    "name": "company",
    "value": "Acme Corp"
  },
  {
    "name": "interests",
    "value": ["marketing", "sales"]
  },
  {
    "name": "old_field",
    "value": "",
    "delete": true
  }
]
```

## Output

The connector will return the complete updated subscription object with all its details.