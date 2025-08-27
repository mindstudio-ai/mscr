# Get File from MailChimp File Manager

This action retrieves detailed information about a specific file stored in your MailChimp File Manager.

## Prerequisites

- You need a MailChimp account with API access
- You need to know the File ID of the file you want to retrieve information about

## Configuration

### File ID

Enter the unique identifier for the file in MailChimp's File Manager. This is a required numeric value that identifies which file you want to retrieve information about.

### Fields to Include (Optional)

You can specify which fields you want to include in the response by providing a comma-separated list. This is useful to make your response more concise if you only need specific information.

**Example:** `id,name,full_size_url,size`

### Fields to Exclude (Optional)

Similarly, you can specify which fields you want to exclude from the response by providing a comma-separated list.

**Example:** `_links,created_by`

### Output Variable

Specify a name for the variable that will store the file information. This variable will contain a JSON object with details about the file, such as:

```json
{
  "id": 12345,
  "folder_id": 67890,
  "type": "image",
  "name": "logo.png",
  "full_size_url": "https://example.com/files/logo.png",
  "thumbnail_url": "https://example.com/files/logo_thumb.png",
  "size": 24680,
  "created_at": "2023-01-01T12:00:00Z",
  "created_by": "user@example.com",
  "width": 800,
  "height": 600
}
```

## Use Cases

- Retrieve file URLs to include in emails or campaigns
- Get file metadata like size, dimensions, and creation date
- Check if a file exists in your File Manager