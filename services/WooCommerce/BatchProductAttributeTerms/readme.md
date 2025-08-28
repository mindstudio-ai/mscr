# Batch Product Attribute Terms

This connector allows you to perform batch operations on WooCommerce product attribute terms, enabling you to create, update, and delete multiple terms in a single API call.

## Configuration

### Attribute ID
Enter the numeric ID of the product attribute you want to manage terms for. You can find this ID in your WooCommerce admin panel under Products > Attributes.

Example: `2`

### Create Terms
A JSON array of terms you want to create. Each term object should include:
- `name` (required): The term name
- `slug` (optional): Custom URL slug
- `description` (optional): Term description
- `menu_order` (optional): Order of the term

Example:
```json
[
  {"name": "XXS"},
  {"name": "Small", "slug": "s", "description": "Small size", "menu_order": 1},
  {"name": "Medium", "slug": "m", "description": "Medium size", "menu_order": 2}
]
```

### Update Terms
A JSON array of terms you want to update. Each term object must include:
- `id` (required): The term ID to update
- Any of: `name`, `slug`, `description`, `menu_order` to modify

Example:
```json
[
  {"id": 19, "name": "Extra Large", "slug": "xl", "menu_order": 6},
  {"id": 20, "description": "Updated description"}
]
```

### Delete Terms
A comma-separated list of term IDs you want to permanently delete.

Example: `21,22,23`

### Output Variable
The name of the variable where the operation results will be stored. The output will contain three arrays:
- `create`: Newly created terms with their IDs
- `update`: Updated terms
- `delete`: Deleted terms

## Notes
- You must include at least one operation (create, update, or delete)
- Deletions are permanent and cannot be recovered
- By default, WooCommerce allows up to 100 objects per batch operation