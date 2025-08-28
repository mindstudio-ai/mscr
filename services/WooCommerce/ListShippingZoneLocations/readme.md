# List Shipping Zone Locations

This connector retrieves all locations assigned to a specific WooCommerce shipping zone.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with shipping zones configured
2. Your WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. Your store URL configured in the WooCommerce service settings

## Configuration

### Shipping Zone ID

Enter the numeric ID of the shipping zone you want to retrieve locations for. You can find the shipping zone ID in your WooCommerce admin panel under WooCommerce > Settings > Shipping > Shipping Zones, or by using the List Shipping Zones connector.

Example: `5`

### Output Variable

Specify a name for the variable that will store the array of shipping zone locations. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns an array of location objects with the following properties:

```json
[
  {
    "code": "BR",
    "type": "country",
    "_links": {
      "collection": [
        { "href": "https://your-store.example/wp-json/wc/v3/shipping/zones/5/locations" }
      ],
      "describes": [
        { "href": "https://your-store.example/wp-json/wc/v3/shipping/zones/5" }
      ]
    }
  }
]
```

- `code`: The location code (e.g., country code, state code, postcode)
- `type`: The location type (postcode, state, country, or continent)

## Common Issues

- **Authentication Error**: Verify your WooCommerce REST API credentials are correctly set up in the service configuration.
- **404 Not Found**: Confirm the shipping zone ID exists in your WooCommerce store.
- **Invalid URL**: Ensure your store URL is correctly configured in the WooCommerce service settings.