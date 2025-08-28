# Batch Shipping Classes

This connector allows you to create, update, and delete multiple WooCommerce shipping classes in a single operation.

## Configuration

### Create Shipping Classes
Enter a JSON array of shipping classes you want to create. Each object should include:
- `name` (required): The name of the shipping class
- `slug` (optional): A URL-friendly identifier
- `description` (optional): A description of the shipping class

Example:
```json
[
  {
    "name": "Small Items"
  },
  {
    "name": "Large Items",
    "slug": "large-items",
    "description": "For bulky shipments"
  }
]
```

### Update Shipping Classes
Enter a JSON array of shipping classes to update. Each object must include:
- `id` (required): The ID of the existing shipping class
- `name` (optional): New name for the shipping class
- `slug` (optional): New URL-friendly identifier
- `description` (optional): New description

Example:
```json
[
  {
    "id": 33,
    "name": "Express",
    "description": "Fast shipping option"
  },
  {
    "id": 34,
    "slug": "standard-shipping"
  }
]
```

### Delete Shipping Classes
Enter a comma-separated list of shipping class IDs to delete.

Example:
```
32, 45, 67
```

### Output
The connector will return the complete result of the operation, including details of all created, updated, and deleted shipping classes.

## Notes
- You must provide at least one of: classes to create, classes to update, or class IDs to delete
- By default, WooCommerce allows up to 100 objects to be created, updated, or deleted per request