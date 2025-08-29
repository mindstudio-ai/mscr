# Update Asset in Canva

This connector allows you to update the metadata (name and tags) for an existing asset in a user's Canva projects.

## Prerequisites

- You need a Canva API access token with the `asset:write` scope
- You need the ID of the asset you want to update

## Configuration

### Asset ID

Enter the unique identifier of the asset you want to update. This is a required field.

Example: `Msd59349ff`

### Asset Name

Enter the new name for the asset. This field is optional - if you leave it empty, the existing name will not be changed.

- Maximum length: 50 characters
- Example: `My Awesome Upload`

### Tags

Enter a comma-separated list of tags you want to assign to the asset. This field is optional - if you leave it empty, the existing tags will not be changed.

- Maximum number of tags: 50
- When you provide tags, they will completely replace any existing tags on the asset

Example: `image, holiday, best day ever`

### Output Variable

Enter a name for the variable that will store the response from the Canva API. This response will include the updated asset information.

## Rate Limits

This API endpoint is rate limited to 30 requests per minute per user.

## Example Response

The output variable will contain information about the updated asset, similar to:

```json
{
  "asset": {
    "type": "image",
    "id": "Msd59349ff",
    "name": "My Awesome Upload",
    "tags": [
      "image",
      "holiday",
      "best day ever"
    ],
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