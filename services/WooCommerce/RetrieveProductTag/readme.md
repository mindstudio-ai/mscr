# Retrieve Product Tag

This connector retrieves a single product tag from your WooCommerce store by its ID.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store set up
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. The ID of the product tag you want to retrieve

## Configuration

### Product Tag Details

- **Tag ID**: Enter the numeric ID of the product tag you want to retrieve (e.g., `34`).

### Output

- **Output Variable**: Enter a name for the variable that will store the product tag information.

## Output Format

The connector returns a JSON object containing the product tag details:

```json
{
  "id": 34,
  "name": "Leather Shoes",
  "slug": "leather-shoes",
  "description": "",
  "count": 0,
  "_links": {
    "self": [{"href": "https://example.com/wp-json/wc/v3/products/tags/34"}],
    "collection": [{"href": "https://example.com/wp-json/wc/v3/products/tags"}]
  }
}
```

## Troubleshooting

- **401 Unauthorized**: Check your WooCommerce API credentials in the service configuration.
- **404 Not Found**: Verify that the tag ID exists in your WooCommerce store.