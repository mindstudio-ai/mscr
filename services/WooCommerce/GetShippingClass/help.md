# Get Shipping Class

This connector retrieves a product shipping class by ID from your WooCommerce store.

## Prerequisites

To use this connector, you need:

1. A WooCommerce store with API access enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your store URL

These credentials should be configured in the WooCommerce service settings.

## Configuration

### Shipping Class Details

- **Shipping Class ID**: Enter the numeric ID of the shipping class you want to retrieve (e.g., `32`). You can find shipping class IDs in your WooCommerce admin panel under Products > Shipping Classes, or by using the List Shipping Classes API endpoint.

### Output

- **Output Variable**: Specify a name for the variable that will store the shipping class information. This variable will contain all details about the shipping class including its ID, name, slug, description, and count.

## Example Response

The connector will return data in this format:

```json
{
  "id": 32,
  "name": "Priority",
  "slug": "priority",
  "description": "",
  "count": 0
}
```

## Troubleshooting

- If you receive a 404 error, verify that the shipping class ID exists in your WooCommerce store.
- If you receive authentication errors, check your WooCommerce API credentials in the service settings.
- Ensure your store URL is correctly formatted (e.g., `https://example.com`).