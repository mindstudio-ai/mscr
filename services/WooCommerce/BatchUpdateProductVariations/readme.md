# Batch Update Product Variations

This action allows you to batch create, update, and delete multiple variations for a WooCommerce product in a single operation.

## Configuration

### Product Information
- **Product ID**: Enter the ID of the parent product for which you want to manage variations. This is a required field.

### Create Variations
- **Create Variations**: Enter a JSON array of variation objects to create. Each object should include properties like `regular_price` and an `attributes` array.

Example:
```json
[
  {
    "regular_price": "10.00",
    "attributes": [
      {
        "id": 6,
        "option": "Blue"
      }
    ]
  },
  {
    "regular_price": "12.50",
    "attributes": [
      {
        "id": 6,
        "option": "Red"
      }
    ]
  }
]
```

### Update Variations
- **Update Variations**: Enter a JSON array of variation objects to update. Each object must include an `id` and the fields you want to update.

Example:
```json
[
  {
    "id": 733,
    "regular_price": "10.00"
  },
  {
    "id": 734,
    "description": "Updated description"
  }
]
```

### Delete Variations
- **Delete Variations**: Enter a JSON array of variation IDs to delete.

Example:
```json
[732, 733]
```

### Output Configuration
- **Output Variable**: Enter a name for the variable that will store the API response.

## Notes
- You must provide at least one of: create, update, or delete variations.
- By default, WooCommerce allows up to 100 objects to be created, updated, or deleted in a single batch operation.
- The response will contain separate arrays for created, updated, and deleted variations.