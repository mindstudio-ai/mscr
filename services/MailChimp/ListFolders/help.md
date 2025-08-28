# List Folders in MailChimp File Manager

This action retrieves a list of all folders in your MailChimp File Manager.

## Prerequisites

- You need a MailChimp account with API access
- Your API Key must be configured in the MailChimp service settings
- Your Server Prefix must be configured in the MailChimp service settings

## Configuration Options

### Folder Filtering

- **Created By**: Optionally filter folders by the username that created them
- **Before Created At**: Optionally filter to show only folders created before this date (in ISO 8601 format)
- **Since Created At**: Optionally filter to show only folders created after this date (in ISO 8601 format)

Example date format: `2023-04-15T14:30:00+00:00`

### Pagination

- **Count**: Number of folders to return in one request (default: 10, maximum: 1000)
- **Offset**: Number of folders to skip (useful for pagination)

### Output

- **Output Variable**: Name of the variable that will store the results

## Output Format

The output will be a JSON object containing:

```json
{
  "folders": [
    {
      "id": 123456,
      "name": "My Folder",
      "file_count": 5,
      "created_at": "2023-04-15T14:30:00+00:00",
      "created_by": "user@example.com",
      "_links": [...]
    },
    ...
  ],
  "total_items": 25,
  "_links": [...]
}
```

## Example Use Cases

- Retrieve a list of all folders to display in your application
- Find folders created by a specific user
- Get folders created within a specific date range