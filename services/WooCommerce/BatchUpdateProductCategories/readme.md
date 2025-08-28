# Batch Update Product Categories

This action allows you to create, update, and delete WooCommerce product categories in a single request. You can perform up to 100 category operations at once.

## Configuration

### Create Categories (Optional)
Enter a JSON array of category objects to create. Each object should include at least a `name` property.

**Example:**
```json
[
  {
    "name": "Electronics",
    "description": "Electronic devices and accessories"
  },
  {
    "name": "Books",
    "parent": 0,
    "description": "All types of books",
    "display": "products"
  }
]
```

Available properties:
- `name` (string, required): Category name
- `slug` (string): URL-friendly identifier
- `parent` (integer): ID of parent category (0 for top-level)
- `description` (string): Category description
- `display` (string): Display type - "default", "products", "subcategories", or "both"
- `image` (object): Category image with properties: id, src, name, alt
- `menu_order` (integer): Menu order position

### Update Categories (Optional)
Enter a JSON array of category objects to update. Each object must include the `id` of an existing category.

**Example:**
```json
[
  {
    "id": 10,
    "name": "Updated Name",
    "description": "New description text"
  },
  {
    "id": 15,
    "parent": 10
  }
]
```

### Delete Categories (Optional)
Enter a comma-separated list of category IDs to delete.

**Example:** `11,12,13`

### Response
Specify a variable name to store the complete API response, which will include details of all created, updated, and deleted categories.

## Note
You must include at least one operation (create, update, or delete) for this action to work.