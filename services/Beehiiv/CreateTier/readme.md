# Create a Tier in Beehiiv

This connector creates a new subscription tier for your Beehiiv publication. Subscription tiers allow you to offer premium content to paying subscribers.

## Configuration

### Publication Details
- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard URL or in the publication settings.

### Tier Information
- **Tier Name**: Enter a name for your subscription tier (e.g., "Premium", "Gold", "Supporter").
- **Description**: Provide a description of what subscribers will get with this tier. This helps potential subscribers understand the value of subscribing.

### Pricing (Optional)
- **Add Pricing**: Select "Yes" if you want to set up pricing for this tier.
- **Currency**: Select the currency for the subscription price.
- **Amount (in cents)**: Enter the price amount in cents. For example:
  - $5.00 = 500
  - $9.99 = 999
  - $25.00 = 2500
- **Billing Interval**: Choose how often subscribers will be billed:
  - Monthly: Subscribers are billed every month
  - Yearly: Subscribers are billed once per year
  - One-time payment: Subscribers pay once for permanent access
  - Donation: For donation-based subscriptions

### Output
- **Output Variable**: Name of the variable where the created tier information will be stored. You can use this variable in subsequent steps of your workflow.

## Example Response

The connector will return information about the created tier, including:

```json
{
  "id": "tier_00000000-0000-0000-0000-000000000000",
  "name": "Gold",
  "status": "active",
  "description": "Premium content for dedicated readers",
  "stats": {
    "active_subscriptions": 0
  },
  "prices": [
    {
      "id": "price_00000000-0000-0000-0000-000000000000",
      "amount_cents": 500
    }
  ]
}
```