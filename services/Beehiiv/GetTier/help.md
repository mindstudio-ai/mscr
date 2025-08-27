# Get Tier

This connector retrieves detailed information about a single subscription tier from your beehiiv publication.

## Configuration

### Tier Information

- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard.
  - Example: `pub_00000000-0000-0000-0000-000000000000`

- **Tier ID**: Enter the ID of the specific tier you want to retrieve information about. Tier IDs start with `tier_`.
  - Example: `tier_00000000-0000-0000-0000-000000000000`

### Additional Options

- **Include Statistics**: Choose whether to include statistics about the tier, such as the number of active subscriptions.
  - Default: Yes

- **Include Prices**: Choose whether to include pricing information for the tier.
  - Default: Yes

### Output

- **Output Variable**: Enter a name for the variable that will store the tier information. You can reference this variable in subsequent steps of your workflow.

## Response Structure

When successful, the connector returns a tier object with the following structure:

```json
{
  "id": "tier_00000000-0000-0000-0000-000000000000",
  "name": "Gold",
  "status": "active",
  "description": "Super engaged readers",
  "stats": {
    "active_subscriptions": 42
  },
  "prices": [
    {
      "id": "price_00000000-0000-0000-0000-000000000000",
      "amount_cents": 500,
      "currency": "usd",
      "interval": "month"
    }
  ]
}
```