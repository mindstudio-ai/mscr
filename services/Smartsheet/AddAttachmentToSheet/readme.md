# Add Attachment to Sheet

Attaches a file or URL to a sheet.

## Configuration

### Sheet Information
- **Sheet ID**: Sheet to attach to
- **Attachment Type**: FILE or LINK
- **File Path**: Path to file (for FILE type, max 30MB)
- **URL**: URL to attach (for LINK type)
- **Attachment Name**: Optional display name

## Example Response

```json
{
  "id": 7265982973541252,
  "name": "Document.pdf",
  "attachmentType": "FILE",
  "mimeType": "application/pdf",
  "sizeInKb": 1024,
  "url": "https://..."
}
```

## Notes
- Requires editor access
- Max file size: 30MB
- Supported file types: various

