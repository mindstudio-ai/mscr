# List Sheets

This connector retrieves a list of all sheets owned by or shared with the user in Smartsheet.

## Configuration

### Query Options
- **Include Ownership Info**: Check this to include detailed ownership information in the response
  - When enabled, adds owner name and email to each sheet object
- **Modified Since**: Filter sheets to only include those modified after a specific date/time
  - Format: ISO 8601 (e.g., `2024-01-01T00:00:00Z`)
  - Leave empty to retrieve all sheets

### Output
- **Output Variable**: Name of the variable where the sheet list will be stored
  - The output contains:
    - `totalCount`: Total number of sheets
    - `sheets`: Array of sheet objects with properties like id, name, accessLevel, permalink, etc.

## Example Response

```json
{
  "totalCount": 15,
  "sheets": [
    {
      "id": 4583654299906948,
      "name": "Project Tracker",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/sheets/...",
      "createdAt": "2024-01-15T10:30:00Z",
      "modifiedAt": "2024-11-10T14:22:00Z"
    }
  ]
}
```

## Notes
- Only sheets you have access to will be returned
- The response includes sheets you own and sheets shared with you
- Use the `modifiedSince` parameter to efficiently track changes

