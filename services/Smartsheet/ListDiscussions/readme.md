# List Discussions

Lists all discussions on a sheet.

## Configuration
- **Sheet ID**: Sheet to list discussions from
- **Output Variable**: Variable to store discussions

## Example Response
```json
{
  "totalCount": 2,
  "discussions": [
    {
      "id": 123456789,
      "title": "Project Review",
      "commentCount": 5,
      "lastCommentedAt": "2025-01-15T10:30:00Z",
      "comments": [...]
    }
  ]
}
```

## Notes
- Discussions are conversation threads
- Can be attached to rows or sheets

