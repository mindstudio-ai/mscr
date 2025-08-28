# Retrieve Block from Notion

This connector retrieves a single block from Notion using its ID.

## Configuration

### Block ID or URL

You can provide either:
- A direct Notion block ID (e.g., `c02fc1d3-db8b-45c5-a222-27595b15aea7`)
- A full Notion URL that contains the block ID (e.g., `https://www.notion.so/workspace/c02fc1d3db8b45c5a22227595b15aea7`)

The connector will automatically extract the block ID from the URL if needed.

### Output Variable

Specify a name for the variable that will store the retrieved block data. This variable will contain the complete block object with all its properties, including:
- Block ID
- Block type (paragraph, heading, list, etc.)
- Content
- Creation and edit timestamps
- Parent information
- And more

## Example Response

```json
{
  "object": "block",
  "id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
  "parent": {
    "type": "page_id",
    "page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
  },
  "created_time": "2022-03-01T19:05:00.000Z",
  "last_edited_time": "2022-03-01T19:05:00.000Z",
  "has_children": false,
  "archived": false,
  "type": "heading_2",
  "heading_2": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        },
        "plain_text": "Lacinato kale"
      }
    ]
  }
}
```

## Notes

- The connector requires read access to the block you're trying to retrieve
- If the block has children (indicated by `has_children: true`), you'll need to use a separate "Retrieve Block Children" action to get the child blocks