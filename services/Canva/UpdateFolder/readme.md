# Update Folder in Canva

This connector allows you to update a folder's metadata in Canva. Currently, you can only update a folder's name.

## Prerequisites

- You need a Canva account with API access
- Your API token must have the `folder:write` scope

## Configuration

### Folder ID

Enter the unique identifier of the folder you want to update. You can find folder IDs in the Canva API response when listing folders or in the URL when viewing a folder in Canva.

Example: `FAF2lZtloor`

### Folder Name

Enter the new name for the folder. The name must be between 1 and 255 characters.

Example: `My awesome holiday`

### Output Variable

Specify a variable name to store the response from Canva, which will contain the updated folder information.

## Response

The connector will return the updated folder information including:

```json
{
  "folder": {
    "id": "FAF2lZtloor",
    "name": "My awesome holiday",
    "created_at": 1377396000,
    "updated_at": 1692928800,
    "thumbnail": {
      "width": 595,
      "height": 335,
      "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
    }
  }
}
```

## Error Handling

The connector will handle common errors such as:
- Authentication failures
- Permission issues
- Rate limiting (limited to 20 requests per minute per user)
- Invalid folder IDs
- Invalid folder names