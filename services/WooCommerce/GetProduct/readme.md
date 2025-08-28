# Get Product from WooCommerce

This action retrieves a single product from your WooCommerce store using its unique ID.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store with the REST API enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. The ID of the product you want to retrieve

## Configuration

### Product Information

- **Product ID**: Enter the numeric ID of the product you want to retrieve. You can find this in your WooCommerce admin dashboard by viewing a product and looking at the URL (e.g., `wp-admin/post.php?post=794&action=edit`), where `794` would be the product ID.

### Output

- **Output Variable**: Enter a name for the variable that will store the product information. This variable will contain all the product details including name, price, images, etc.

## Example Response

The output variable will contain a JSON object with product details similar to:

```json
{
  "id": 794,
  "name": "Premium Quality",
  "type": "simple",
  "status": "publish",
  "price": "21.99",
  "regular_price": "21.99",
  "sale_price": "",
  "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
  "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  "images": [
    {
      "id": 792,
      "src": "https://example.com/wp-content/uploads/2017/03/T_2_front-4.jpg",
      "alt": ""
    }
  ]
}
```

## Troubleshooting

- If you receive a 404 error, verify that the product ID exists in your store
- If you receive authentication errors, check your Consumer Key and Consumer Secret in the connection settings