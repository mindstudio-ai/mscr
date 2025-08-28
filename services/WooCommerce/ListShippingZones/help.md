# List Shipping Zones

This connector retrieves all shipping zones from your WooCommerce store.

## What are Shipping Zones?

Shipping zones in WooCommerce define geographic regions where specific shipping methods are available. Each zone can have its own set of shipping methods and rates.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store set up on your WordPress site
2. API credentials (Consumer Key and Consumer Secret) with appropriate permissions
3. Configured the WooCommerce service in MindStudio with:
   - Your store URL (e.g., `https://mystore.com`)
   - Your API Consumer Key
   - Your API Consumer Secret

## Output

This connector returns an array of all shipping zones in your WooCommerce store. Each zone object includes:

- `id`: The unique identifier for the shipping zone
- `name`: The name of the shipping zone
- `order`: The order in which the zone appears

Example output:
```json
[
  {
    "id": 0,
    "name": "Rest of the World",
    "order": 0
  },
  {
    "id": 5,
    "name": "Brazil",
    "order": 0
  }
]
```

## Common Use Cases

- Display shipping zones in your application
- Use zone information to calculate shipping costs
- Create conditional logic based on available shipping zones