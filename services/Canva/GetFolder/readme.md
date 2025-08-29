# Canva Get Folder

This connector retrieves metadata for a specific folder from your Canva account.

## Prerequisites

- You need a valid Canva API access token with the `folder:read` scope.
- You need to know the ID of the folder you want to retrieve.

## Configuration

### Folder ID

Enter the unique identifier of the Canva folder you want to retrieve information about. This is typically a string like `FAF2lZtloor`.

### Output Variable

Specify a name for the variable that will store the folder information. This variable will contain a JSON object with all the folder details.

## Output Format

The connector returns a JSON object with the following structure:

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

## Notes

- This endpoint is rate limited to 100 requests per minute per user.
- The thumbnail URL expires after 15 minutes.