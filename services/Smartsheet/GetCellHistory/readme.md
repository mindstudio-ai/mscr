# Get Cell History

Gets the complete modification history of a specific cell.

## Configuration
- **Sheet ID**: Sheet containing the cell
- **Row ID**: Row containing the cell
- **Column ID**: Column of the cell
- **Output Variable**: Variable to store history

## Example Response
```json
{
  "totalCount": 3,
  "history": [
    {
      "modifiedAt": "2024-11-12T10:30:00Z",
      "modifiedBy": "user@example.com",
      "displayValue": "In Progress"
    },
    {
      "modifiedAt": "2024-11-10T14:22:00Z",
      "modifiedBy": "admin@example.com",
      "displayValue": "Not Started"
    }
  ]
}
```

## Notes
- Requires viewer access
- Shows all historical values
- Includes timestamps and users

