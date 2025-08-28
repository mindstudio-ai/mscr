# Update Product Shipping Class

This connector allows you to update an existing shipping class in your WooCommerce store.

## Prerequisites

- You need your WooCommerce store URL
- You need your WooCommerce API Consumer Key and Consumer Secret
- You need to know the ID of the shipping class you want to update

## Configuration

### Shipping Class Details

- **Shipping Class ID**: Enter the numeric ID of the shipping class you want to update (e.g., `32`)
- **Name** (optional): The new name for the shipping class (e.g., "Priority")
- **Slug** (optional): The new slug for the shipping class used in URLs (e.g., "priority")
- **Description** (optional): A detailed description of the shipping class (e.g., "Priority mail.")

You only need to provide the fields you want to update. Any fields left blank will remain unchanged.

### Response Handling

- **Output Variable**: Enter a name for the variable that will store the updated shipping class information. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns the complete updated shipping class object, which includes:

```json
{
  "id": 32,
  "name": "Priority",
  "slug": "priority",
  "description": "Priority mail.",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/products/shipping_classes/32" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/products/shipping_classes" }]
  }
}
```