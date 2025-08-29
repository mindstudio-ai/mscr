# Get Design

This connector retrieves detailed metadata for a specific Canva design.

## What it does
Fetches information about a Canva design including:
- Design title and ID
- Owner information (user ID and team ID)
- URLs for editing and viewing the design
- Thumbnail information and URL
- Creation and last update timestamps
- Page count

## Requirements
- A valid Canva API access token with the `design:meta:read` scope
- The design ID of the Canva design you want to retrieve

## Configuration

### Design ID
Enter the ID of the Canva design you want to retrieve information about. The design ID is typically found in the URL of your Canva design.

For example, if your design URL is `https://www.canva.com/design/DAFVztcvd9z/view`, the design ID would be `DAFVztcvd9z`.

### Output Variable
Specify a name for the variable that will store the design information. You can reference this variable in subsequent steps of your workflow.

## Example Output
```json
{
  "id": "DAFVztcvd9z",
  "title": "My summer holiday",
  "owner": {
    "user_id": "auDAbliZ2rQNNOsUl5OLu",
    "team_id": "Oi2RJILTrKk0KRhRUZozX"
  },
  "thumbnail": {
    "width": 595,
    "height": 335,
    "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
  },
  "urls": {
    "edit_url": "https://www.canva.com/api/design/...",
    "view_url": "https://www.canva.com/api/design/..."
  },
  "created_at": 1377396000,
  "updated_at": 1692928800,
  "page_count": 5
}
```

## Notes
- The thumbnail URL expires after 15 minutes
- The edit and view URLs are temporary and valid for 30 days