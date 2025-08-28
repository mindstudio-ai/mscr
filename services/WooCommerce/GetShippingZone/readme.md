# Get Shipping Zone

This connector retrieves a specific shipping zone by ID from your WooCommerce store.

## Prerequisites

Before using this connector, you need to have:

1. A WordPress site with WooCommerce installed
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. The ID of the shipping zone you want to retrieve

## Configuration

### Zone ID

Enter the numeric ID of the shipping zone you want to retrieve. You can find your shipping zone IDs by:

1. Going to your WooCommerce admin panel
2. Navigating to WooCommerce > Settings > Shipping
3. The zones are listed with their IDs in the URL when you edit them

Example: `5`

### Output Variable

Specify a name for the variable that will store the shipping zone data. You can reference this variable in subsequent steps of your workflow.

Example: `shippingZone`

## Output

The connector will return a JSON object containing the shipping zone details, including:

- `id`: The numeric ID of the shipping zone
- `name`: The name of the shipping zone
- `order`: The order/priority of the shipping zone
- `_links`: Related API links

Example output:
```json
{
  "id": 5,
  "name": "Brazil",
  "order": 0,
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/shipping/zones/5" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/shipping/zones" }],
    "describedby": [{ "href": "https://example.com/wp-json/wc/v3/shipping/zones/5/locations" }]
  }
}
```