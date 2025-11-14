# List Columns

Lists all columns in a sheet with their properties.

## Configuration
- **Sheet ID**: Sheet to list columns for
- **Output Variable**: Variable to store column list

## Example Response
```json
{
  "totalCount": 5,
  "columns": [
    {
      "id": 2331373580117892,
      "title": "Task Name",
      "type": "TEXT_NUMBER",
      "primary": true,
      "index": 0
    },
    {
      "id": 6835173207488388,
      "title": "Status",
      "type": "PICKLIST",
      "index": 1,
      "options": ["Not Started", "In Progress", "Complete"]
    }
  ]
}
```

## Notes
- Returns all column metadata
- Includes column IDs needed for other operations

