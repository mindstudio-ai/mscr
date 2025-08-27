# List Record Comments

This connector retrieves comments for a specific record in an Airtable base.

## Configuration

### Record Information

- **Base ID**: Enter your Airtable base ID. This can be found in the API documentation or in the URL when viewing your base (e.g., `appXXXXXXXXXXXXXX`).

- **Table ID or Name**: Enter either the table ID (e.g., `tblXXXXXXXXXXXXXX`) or the table name exactly as it appears in Airtable.

- **Record ID**: Enter the ID of the specific record for which you want to retrieve comments (e.g., `recXXXXXXXXXXXXXX`).

### Optional Parameters

- **Page Size**: Specify the maximum number of comments to return in a single request. Maximum value is 100, which is also the default if left empty.

- **Offset**: Used for pagination. Leave empty for the first page of results. For subsequent pages, use the offset value returned from the previous request.

### Output

- **Output Variable**: The name of the variable that will store the retrieved comments. The output will be an object containing:
  - `comments`: An array of comment objects
  - `offset`: A pagination token (null if there are no more pages)

## Example Output

```json
{
  "comments": [
    {
      "author": {
        "email": "user@example.com",
        "id": "usrL2PNC5o3H4lBEi",
        "name": "User Name"
      },
      "createdTime": "2021-03-01T09:00:00.000Z",
      "id": "comB5z37Mg9zaEPw6",
      "lastUpdatedTime": null,
      "text": "This is a comment"
    }
  ],
  "offset": null
}
```

## Authentication

This connector uses your Airtable Personal Access Token for authentication, which should be configured in the MindStudio integration settings.