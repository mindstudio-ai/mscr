# Create Shipping Class

This action creates a new shipping class in your WooCommerce store. Shipping classes allow you to group products that require similar shipping methods.

## Prerequisites

- You must have a WooCommerce store set up
- You need your WooCommerce API Consumer Key and Consumer Secret
- Your store URL must be configured in the connector settings

## Configuration

### Shipping Class Details

- **Name** (Required): Enter a descriptive name for your shipping class (e.g., "Priority", "Standard", "Overnight")
- **Slug** (Optional): A unique identifier for the shipping class. If left empty, WooCommerce will automatically generate one based on the name.
- **Description** (Optional): A detailed description of the shipping class that explains its purpose or usage.

### Output

- **Output Variable**: The name of the variable that will store the created shipping class information. This variable will contain all details of the newly created shipping class, including its ID.

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
    "self": [{ "href": "https://yourstore.com/wp-json/wc/v3/products/shipping_classes/32" }],
    "collection": [{ "href": "https://yourstore.com/wp-json/wc/v3/products/shipping_classes" }]
  }
}
```

## What's Next?

After creating a shipping class, you can:
- Assign products to this shipping class
- Set up shipping zones and methods that apply specifically to this shipping class
- Create shipping rates based on shipping classes