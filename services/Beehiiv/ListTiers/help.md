# List Tiers

This connector retrieves all tiers belonging to a specific Beehiiv publication. Tiers are used for paid subscriptions in Beehiiv.

## Configuration

### Publication Information

- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_` followed by a UUID.
  - Example: `pub_00000000-0000-0000-0000-000000000000`
  - You can find your publication ID in the Beehiiv dashboard or API section.

- **Output Variable**: Name of the variable that will store the retrieved tiers data.

### Optional Parameters

- **Include Stats**: Choose whether to include statistics about the tiers, such as the number of active subscriptions.
  - Default: Yes

- **Include Prices**: Choose whether to include pricing details for each tier.
  - Default: Yes

- **Results Per Page**: Number of tiers to return per page (1-100).
  - Default: 10

- **Page Number**: Which page of results to retrieve.
  - Default: 1

- **Sort Direction**: The order in which to sort the results.
  - Ascending: Sorts from smallest to largest
  - Descending: Sorts from largest to smallest
  - Default: Ascending

## Output

The connector will return an array of tier objects with details like:
- Tier ID
- Name
- Status (active or archived)
- Description
- Statistics (if requested)
- Prices (if requested)

## Example Response

```json
{
  "data": [
    {
      "id": "tier_00000000-0000-0000-0000-000000000000",
      "name": "Gold",
      "status": "active",
      "description": "Premium subscription tier",
      "stats": {
        "active_subscriptions": 42
      },
      "prices": [
        {
          "id": "price_00000000-0000-0000-0000-000000000000",
          "amount_cents": 500,
          "interval": "month",
          "currency": "usd"
        }
      ]
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 1,
  "total_pages": 1
}
```