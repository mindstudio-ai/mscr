# Batch Update Product Attributes

This connector allows you to perform multiple product attribute operations in a single request to your WooCommerce store. You can create new attributes, update existing ones, and delete attributes you no longer need.

## Configuration

### Create Attributes
Specify attributes you want to create as a JSON array. Each object in the array should include at least a `name` field.

**Example:**
```json
[
  { "name": "Brand" },
  { 
    "name": "Material",
    "slug": "pa_material",
    "type": "select",
    "order_by": "name",
    "has_archives": true
  }
]
```

Available fields:
- `name` (required): The attribute name
- `slug`: Custom attribute slug
- `type`: Attribute type (default: "select")
- `order_by`: Sort order (options: "menu_order", "name", "name_num", "id")
- `has_archives`: Enable/disable attribute archives (boolean)

### Update Attributes
Specify attributes you want to update as a JSON array. Each object must include an `id` field and any fields you want to update.

**Example:**
```json
[
  { "id": 2, "order_by": "name" },
  { "id": 5, "name": "Updated Name", "has_archives": false }
]
```

### Delete Attributes
Specify attribute IDs to delete as a JSON array of integers.

**Example:**
```json
[1, 3, 7]
```

### Output
The connector will return the complete results of the batch operation, including details of all created, updated, and deleted attributes.

## Notes
- You must specify at least one operation (create, update, or delete)
- The WooCommerce API typically limits batch operations to around 100 items per request
- All operations are performed in a single transaction - if any operation fails, the entire batch will fail