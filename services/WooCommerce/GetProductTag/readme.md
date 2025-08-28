# Get Product Tag

This connector retrieves a single product tag from your WooCommerce store using its unique ID.

## Prerequisites

Before using this connector, ensure you have:

1. A WooCommerce store set up and running
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. The ID of the product tag you want to retrieve

## Configuration

### Product Tag Details

- **Tag ID**: Enter the numeric ID of the product tag you want to retrieve (e.g., 34)

### Output

- **Output Variable**: Specify a name for the variable that will store the product tag information

## Example Response

The connector will return a JSON object with the product tag details:

```json
{
  "id": 34,
  "name": "Leather Shoes",
  "slug": "leather-shoes",
  "description": "",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://your-woocommerce-site.com/wp-json/wc/v3/products/tags/34" }],
    "collection": [{ "href": "https://your-woocommerce-site.com/wp-json/wc/v3/products/tags" }]
  }
}
```

## Troubleshooting

- If you receive a 404 error, verify that the tag ID exists in your WooCommerce store
- If you receive authentication errors, check your WooCommerce API credentials in the connection settings