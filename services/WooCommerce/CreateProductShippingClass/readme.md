# Create Product Shipping Class

This action creates a new shipping class for products in your WooCommerce store. Shipping classes allow you to group products with similar shipping requirements.

## Prerequisites
- You need a WooCommerce store with API access configured
- You must have the Consumer Key and Consumer Secret from your WooCommerce store
- Your store URL must be correctly configured in the connector settings

## Configuration

### Shipping Class Details

- **Name** (required): The name of the shipping class as it will appear in your WooCommerce admin panel and potentially to customers (e.g., "Priority", "Express", "Standard").

- **Slug** (optional): A URL-friendly version of the name. It will be automatically generated from the name if not provided. Should contain only lowercase letters, numbers, and hyphens (e.g., "priority", "express-delivery").

- **Description** (optional): A detailed description of the shipping class. This can help you and other administrators understand the purpose of this shipping class.

### Output

- **Output Variable**: The name of the variable that will store the complete response from WooCommerce, including the ID of the newly created shipping class and other details.

## Example Response

The output variable will contain a JSON object similar to:

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

You can use this output in subsequent steps of your workflow, for example, to assign products to this shipping class.