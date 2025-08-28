# List Comments from Notion

This connector retrieves a list of un-resolved comments from a specified Notion page or block.

## Prerequisites

- A Notion integration with comment capabilities enabled
- The integration must be added to the pages you want to access

## Configuration

### Block ID

Enter the ID of the Notion page or block from which you want to retrieve comments. You can provide:

- The full Notion URL (e.g., `https://www.notion.so/myworkspace/Page-Title-d40e767cd7af4b18a86d55c61f1e39a4`)
- Just the ID portion (e.g., `d40e767c-d7af-4b18-a86d-55c61f1e39a4`)

### Page Size

The number of comments to return per page. Maximum is 100. If left empty, defaults to 100.

### Start Cursor

For pagination. If you're retrieving a large number of comments, you can use the `next_cursor` value from a previous response to continue where you left off.

Leave this empty to start from the beginning.

### Output Variable

Name of the variable that will store the list of comments. The output will be a JSON object containing:

- `results`: Array of comment objects
- `next_cursor`: Cursor for pagination
- `has_more`: Boolean indicating if more results exist

## Example Output

```json
{
  "object": "list",
  "results": [
    {
      "object": "comment",
      "id": "94cc56ab-9f02-409d-9f99-1037e9fe502f",
      "parent": {
        "type": "page_id",
        "page_id": "5c6a2821-6bb1-4a7e-b6e1-c50111515c3d"
      },
      "discussion_id": "f1407351-36f5-4c49-a13c-49f8ba11776d",
      "created_time": "2022-07-15T16:52:00.000Z",
      "last_edited_time": "2022-07-15T19:16:00.000Z",
      "created_by": {
        "object": "user",
        "id": "9b15170a-9941-4297-8ee6-83fa7649a87a"
      },
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Single comment",
            "link": null
          },
          "annotations": {
            "bold": false,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "Single comment",
          "href": null
        }
      ]
    }
  ],
  "next_cursor": null,
  "has_more": false
}
```

## Troubleshooting

- Ensure your Notion integration has comment capabilities enabled
- Verify the block ID is correct and the integration has access to it
- If no comments are returned, check if there are any comments on the specified page/block