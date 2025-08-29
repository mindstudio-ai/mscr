# Retrieve Account Workspaces

This connector retrieves all workspaces you have access to within a specific Typeform account.

## Prerequisites

- A Typeform account with API access
- Your Typeform account must be connected to MindStudio

## Configuration

### Account Information

- **Account ID**: Enter the ID of your Typeform account for which you want to retrieve workspaces. This is typically found in your Typeform account settings.

### Search Options (Optional)

- **Search Term**: Optionally filter workspaces that contain a specific text string
- **Page**: The page number of results to retrieve (default is 1)
- **Page Size**: Number of results per page (default is 10, maximum allowed is 200)

### Output

- **Output Variable**: Enter a name for the variable that will store the retrieved workspaces data

## Response Structure

The connector returns workspace data in the following format:

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

## Common Issues

- **401 Unauthorized**: Ensure your Typeform account is properly connected to MindStudio
- **404 Not Found**: Verify that the Account ID is correct
- **400 Bad Request**: Check that your page size is not greater than 200