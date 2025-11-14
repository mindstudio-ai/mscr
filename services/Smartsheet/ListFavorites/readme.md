# List Favorites

Lists all items marked as favorites by the authenticated user.

## Configuration
- **Output Variable**: Variable to store favorites list

## Example Response
```json
{
  "totalCount": 3,
  "favorites": [
    {
      "objectId": 123456789,
      "type": "sheet"
    },
    {
      "objectId": 987654321,
      "type": "workspace"
    }
  ]
}
```

## Notes
- Returns sheets, workspaces, and folders marked as favorites
- Personal to each user

