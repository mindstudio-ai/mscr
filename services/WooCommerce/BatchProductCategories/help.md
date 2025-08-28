# Batch Product Categories

This connector allows you to create, update, and delete multiple WooCommerce product categories in a single operation.

## Configuration

### Create Categories
Enter a JSON array of category objects you want to create. Each object must include at least a `name` property.

Example:
```json
[
  {
    "name": "Electronics",
    "description": "Electronic devices and accessories"
  },
  {
    "name": "Books",
    "parent": 0,
    "description": "All types of books"
  }
]
```

### Update Categories
Enter a JSON array of category objects you want to update. Each object must include an `id` and the fields you want to update.

Example:
```json
[
  {
    "id": 10,
    "name": "Updated Electronics",
    "description": "New description for electronics"
  },
  {
    "id": 11,
    "description": "Updated book description"
  }
]
```

### Delete Categories
Enter a comma-separated list of category IDs to permanently delete.

Example:
```
10, 11, 12
```

## Notes
- You must include at least one operation (create, update, or delete)
- The operation is limited to 100 objects per request by default
- All changes are permanent and cannot be undone
- The connector will return details of all created, updated, and deleted categories