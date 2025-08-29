# Canva List Designs

This connector allows you to list all designs in a Canva user's account with various filtering and sorting options.

## Prerequisites

- A Canva account with API access
- Authentication set up with proper OAuth scopes (`design:meta:read`)

## Configuration Options

### Search Term
Enter keywords to filter designs by title or content. Leave empty to list all designs.

### Ownership Filter
Choose which designs to include based on ownership:
- **Any (owned and shared)**: Lists all designs the user has access to
- **Owned by user**: Only shows designs created by the user
- **Shared with user**: Only shows designs shared with the user

### Sort By
Select how the results should be ordered:
- **Relevance**: Default sorting using Canva's relevance algorithm
- **Last modified (newest first)**: Most recently updated designs first
- **Last modified (oldest first)**: Oldest updated designs first
- **Title (A-Z)**: Alphabetical order by title
- **Title (Z-A)**: Reverse alphabetical order by title

### Continuation Token
For pagination. If your previous list request returned a continuation token, you can paste it here to retrieve the next page of results. Leave empty for the first page.

### Output Variable
The name of the variable where the results will be stored. The output will contain:
- An array of design items with metadata (id, title, thumbnail URLs, etc.)
- A continuation token (if more results exist)

## Example Output

```json
{
  "continuation": "RkFGMgXlsVTDbMd:MR3L0QjiaUzycIAjx0yMyuNiV0OildoiOwL0x32G4NjNu4FwtAQNxowUQNMMYN",
  "items": [
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
  ]
}
```

## Rate Limiting

This operation is rate limited to 100 requests per minute for each user of your integration.