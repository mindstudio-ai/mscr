# List Attachment Versions

Lists all versions of an attachment.

## Configuration
- **Sheet ID**: Sheet containing the attachment
- **Attachment ID**: Attachment to get versions for
- **Output Variable**: Variable to store version list

## Example Response
```json
{
  "totalCount": 3,
  "versions": [
    {"id": 123, "name": "doc.pdf", "createdAt": "2024-11-01T10:00:00Z"},
    {"id": 124, "name": "doc.pdf", "createdAt": "2024-11-05T14:30:00Z"}
  ]
}
```

