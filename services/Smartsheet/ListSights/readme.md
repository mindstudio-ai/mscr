# List Sights (Dashboards)

Lists all dashboards (called "Sights" in the API) accessible to the authenticated user.

## Configuration
- **Output Variable**: Variable to store dashboards list

## Example Response
```json
{
  "totalCount": 2,
  "sights": [
    {
      "id": 123456789,
      "name": "Project Dashboard",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/..."
    }
  ]
}
```

## Notes
- Dashboards provide visual summaries of sheet data
- Includes widgets like charts, reports, and metrics

