# Retrieve Product Shipping Class

This action retrieves a specific shipping class from your WooCommerce store by its ID.

## Prerequisites

Before using this action, make sure you have:

1. Set up your WooCommerce API credentials in the connector settings:
   - Store URL (e.g., `https://mystore.com`)
   - API Consumer Key
   - API Consumer Secret

## Configuration

### Shipping Class ID

Enter the numeric ID of the shipping class you want to retrieve. You can find shipping class IDs in your WooCommerce admin panel under Products > Shipping Classes, or by using the "List All Shipping Classes" action.

Example: `32`

### Output Variable

Specify a variable name to store the shipping class details. The output will contain the following information:

```json
{
  "id": 32,
  "name": "Priority",
  "slug": "priority",
  "description": "",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/products/shipping_classes/32" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/products/shipping_classes" }]
  }
}
```

## Common Issues

- **404 Error**: This usually means the shipping class ID doesn't exist. Verify the ID is correct.
- **401 Error**: Authentication failed. Check your WooCommerce API credentials.