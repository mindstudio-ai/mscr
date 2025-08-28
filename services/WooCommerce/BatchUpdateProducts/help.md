# Batch Update Products

This connector allows you to create, update, and delete multiple WooCommerce products in a single request. You can perform up to 100 operations in one call.

## Configuration

### Create Products
Enter a JSON array of products you want to create. Each product should be a JSON object with properties like:
- `name` (required): The product name
- `type` (required): Product type (e.g., "simple", "variable")
- `regular_price`: The product's regular price
- `description`: Product description
- `categories`: Array of category objects with IDs
- `images`: Array of image objects with source URLs

Example:
```json
[
  {
    "name": "Premium T-Shirt",
    "type": "simple",
    "regular_price": "24.99",
    "description": "High-quality cotton t-shirt",
    "categories": [{"id": 11}],
    "images": [{"src": "https://example.com/images/tshirt.jpg"}]
  },
  {
    "name": "Designer Jeans",
    "type": "variable",
    "regular_price": "59.99"
  }
]
```

### Update Products
Enter a JSON array of products to update. Each product must include an `id` and the properties you want to update.

Example:
```json
[
  {
    "id": 123,
    "name": "Updated Product Name",
    "regular_price": "29.99"
  },
  {
    "id": 456,
    "stock_status": "outofstock"
  }
]
```

### Delete Products
Enter a JSON array of product IDs to delete.

Example:
```json
[123, 456, 789]
```

## Notes
- At least one operation (create, update, or delete) must be provided
- The response will include details of all operations performed
- You must have appropriate permissions in your WooCommerce store to perform these operations