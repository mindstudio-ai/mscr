# WooCommerce Batch Product Tags

This connector allows you to perform batch operations on WooCommerce product tags - creating new tags, updating existing ones, and deleting tags, all in a single API call.

## Configuration

### Create Tags
Enter a JSON array of tag objects you want to create. Each object should include:
- `name` (required): The name of the tag
- `slug` (optional): URL-friendly version of the name
- `description` (optional): Description of the tag

Example:
```json
[
  {
    "name": "Round toe"
  },
  {
    "name": "Flat",
    "description": "Flat shoes and accessories"
  }
]
```

### Update Tags
Enter a JSON array of tag objects to update. Each object must include:
- `id` (required): The ID of the existing tag
- Any fields you want to update (name, slug, description)

Example:
```json
[
  {
    "id": 34,
    "description": "Genuine leather."
  },
  {
    "id": 42,
    "name": "Updated Tag Name",
    "description": "New description"
  }
]
```

### Delete Tags
Enter a JSON array of tag IDs to delete.

Example:
```json
[35, 36, 37]
```

### Output
The results of all operations will be stored in the variable you specify, containing:
- Created tags with their new IDs
- Updated tags with their updated information
- Deleted tags with their information before deletion

## Notes
- You can perform up to 100 operations in total (across create, update, and delete)
- At least one operation type must contain data
- All JSON inputs must be valid arrays