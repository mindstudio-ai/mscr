# List Folder Contents

Lists all items contained in a folder.

## Configuration
- **Folder ID**: Folder to list contents of
- **Output Variable**: Variable to store contents

## Example Response
```json
{
  "sheets": [...],
  "folders": [...],
  "reports": [...],
  "sights": [...],
  "totalCount": 10
}
```

## Notes
- Returns all direct children of folder
- Includes sheets, child folders, reports, and dashboards

