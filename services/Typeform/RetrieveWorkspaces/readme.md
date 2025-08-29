# Retrieve Typeform Workspaces

This connector retrieves all workspaces you have access to from your Typeform account.

## What You'll Need

- A Typeform account with API access
- Your account must be connected to MindStudio via OAuth

## Configuration

### Query Parameters

- **Search Term** (Optional): Filter workspaces containing this text
- **Page** (Optional): The page number of results to retrieve (default: 1)
- **Page Size** (Optional): Number of results per page (default: 10, maximum: 200)

### Output

- **Output Variable**: Name of the variable where the workspace data will be stored

## Output Format

The connector returns a JSON object containing:

```json
{
  "items": [
    {
      "account_id": "ABCD1234",
      "forms": {
        "count": 12,
        "href": "https://api.typeform.com/workspaces/a1b2c3/forms"
      },
      "id": "a1b2c3",
      "name": "My Workspace",
      "self": {
        "href": "https://api.typeform.com/workspaces/a1b2c3"
      },
      "shared": false
    }
  ],
  "page_count": 1,
  "total_items": 10
}
```

## Common Use Cases

- Get a list of all your Typeform workspaces
- Find a specific workspace by name using the search parameter
- Use the workspace IDs to make additional API calls for forms within a workspace

## Troubleshooting

- If you receive a 401 error, your OAuth connection may need to be refreshed
- If you receive a 403 error, your account may not have permission to access certain workspaces
- For pagination issues, try adjusting the page and page size parameters