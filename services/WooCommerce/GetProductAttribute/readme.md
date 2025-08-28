# Get Product Attribute

This action retrieves a specific product attribute by ID from your WooCommerce store.

## Prerequisites

Before using this action, ensure you have:

1. A WooCommerce store with the REST API enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your store URL configured in the connector settings

## Configuration

### Attribute ID

Enter the numeric ID of the product attribute you want to retrieve. You can find attribute IDs in your WooCommerce admin panel under Products > Attributes, or by using the "List All Product Attributes" action.

Example: `1`

### Output Variable

Specify a name for the variable that will store the retrieved attribute data. You can reference this variable in subsequent actions.

## Output

The action returns a JSON object containing the product attribute details:

```json
{
  "id": 1,
  "name": "Color",
  "slug": "pa_color",
  "type": "select",
  "order_by": "menu_order",
  "has_archives": true
}
```

## Common Issues

- **404 Error**: This usually means the attribute ID doesn't exist. Verify the ID is correct.
- **Authentication Error**: Check that your WooCommerce API credentials are correctly configured in the connector settings.