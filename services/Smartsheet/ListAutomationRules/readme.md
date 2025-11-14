# List Automation Rules

Lists all automation rules configured for a sheet.

## Configuration
- **Sheet ID**: Sheet to list rules for
- **Output Variable**: Variable to store automation rules list

## Example Response
```json
{
  "totalCount": 2,
  "automationRules": [
    {
      "id": 123,
      "name": "Notify on Status Change",
      "enabled": true,
      "action": {"type": "NOTIFICATION"},
      "createdAt": "2024-11-01T10:00:00Z"
    }
  ]
}
```

## Notes
- Requires owner or admin access
- Returns all automated workflows

