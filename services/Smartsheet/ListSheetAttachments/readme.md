# List Sheet Attachments

Lists all attachments attached to a specified sheet.

## Configuration

### Sheet Information
- **Sheet ID**: The unique identifier of the sheet

### Output
- **Output Variable**: Variable to store the list of attachments

## Example Response

```json
{
  "totalCount": 2,
  "attachments": [
    {
      "id": 7265982973541252,
      "name": "Document.pdf",
      "attachmentType": "FILE",
      "mimeType": "application/pdf",
      "sizeInKb": 1024,
      "createdAt": "2024-11-01T10:30:00Z",
      "url": "https://..."
    }
  ]
}
```

## Notes
- Requires viewer access to the sheet
- Includes all attachment types (files, links, etc.)

