# List Comments

Lists all comments on a sheet or specific row.

## Configuration
- **Sheet ID**: Sheet to list comments from
- **Row ID**: Optional - filter to specific row's comments
- **Output Variable**: Variable to store comments

## Example Response
```json
{
  "totalCount": 2,
  "comments": [
    {
      "id": 123456789,
      "text": "Great progress!",
      "createdBy": { "name": "John Doe", "email": "john@example.com" },
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

