# Get Canva Asset

This connector retrieves detailed metadata for a specific asset in your Canva project.

## What You'll Need

- A valid Canva API access token with the `asset:read` scope
- The Asset ID of the Canva asset you want to retrieve information for

## Configuration

### Asset ID
Enter the unique identifier for the Canva asset you want to retrieve. This is typically in a format like `Msd59349ff`.

### Output Variable
Specify a name for the variable that will store the asset information. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns a JSON object with the asset's metadata, including:

```json
{
  "asset": {
    "type": "image",
    "id": "Msd59349ff",
    "name": "My Awesome Upload",
    "tags": ["image", "holiday", "best day ever"],
    "created_at": 1377396000,
    "updated_at": 1692928800,
    "owner": {
      "user_id": "auDAbliZ2rQNNOsUl5OLu",
      "team_id": "Oi2RJILTrKk0KRhRUZozX"
    },
    "thumbnail": {
      "width": 595,
      "height": 335,
      "url": "https://document-export.canva.com/Vczz9/zF9vzVtdADc/2/thumbnail/0001.png?"
    }
  }
}
```

## Rate Limits

This operation is rate limited to 100 requests per minute for each user of your integration.