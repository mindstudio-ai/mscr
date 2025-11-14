# List Home Content

Lists all items in the user's Home (top-level items).

## Configuration
- **Output Variable**: Variable to store Home content

## Example Response
```json
{
  "folders": [...],
  "sheets": [...],
  "reports": [...],
  "sights": [...],
  "workspaces": [...],
  "totalCount": 25
}
```

## Notes
- Returns items not in folders or workspaces
- Personal to authenticated user

