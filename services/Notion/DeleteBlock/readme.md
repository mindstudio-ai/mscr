# Delete Block

This connector moves a Notion block to the trash by setting its `archived` property to `true`. This is equivalent to moving the block to the "Trash" in the Notion UI, where it can still be accessed and restored.

## Prerequisites

- You must have a Notion integration with "update content" capabilities.
- Your integration must have access to the block you want to delete.

## Configuration

### Block Information

- **Block ID or URL**: Enter either a Notion block ID or a URL containing the block ID.
  - Block ID format: `7985540b-2e77-4ac6-8615-c3047e36f872`
  - URL format: `https://www.notion.so/myworkspace/7985540b2e774ac68615c3047e36f872`
  - The connector will automatically extract the ID from a URL if provided.

### Output

- **Result Variable**: Name of the variable that will store the deletion result information.

## Output Format

The output variable will contain the deleted block information, including its `archived: true` status. Example:

```json
{
  "object": "block",
  "id": "7985540b-2e77-4ac6-8615-c3047e36f872",
  "parent": {
    "type": "page_id",
    "page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
  },
  "created_time": "2022-07-06T19:52:00.000Z",
  "last_edited_time": "2022-07-06T19:52:00.000Z",
  "created_by": {
    "object": "user",
    "id": "0c3e9826-b8f7-4f73-927d-2caaf86f1103"
  },
  "last_edited_by": {
    "object": "user",
    "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
  },
  "has_children": false,
  "archived": true,
  "type": "paragraph",
  "paragraph": {
    "rich_text": [],
    "color": "default"
  }
}
```

## Notes

- To restore the block later, you can use the "Update a block" or "Update page" API endpoints to set `archived: false`.
- The API will return a 404 error if the block doesn't exist or if your integration doesn't have access to it.
- The API will return a 403 error if your integration doesn't have "update content" capabilities.