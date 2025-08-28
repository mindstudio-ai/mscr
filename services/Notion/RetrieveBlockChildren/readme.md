# Retrieve Block Children

This connector retrieves the children blocks of a specified Notion block or page. It's useful for fetching the content of a Notion page or the children of any block within Notion.

## Configuration

### Block Information

- **Block ID or URL**: Enter either a Notion block ID (a UUID like `59833787-2cf9-4fdf-8782-e53db20768a5`) or a full Notion URL. The connector will automatically extract the block ID from URLs.
  - Example URL: `https://www.notion.so/workspace/My-Page-59833787-2cf9-4fdf-8782-e53db20768a5`
  - Example ID: `59833787-2cf9-4fdf-8782-e53db20768a5`

### Pagination Options

- **Page Size**: Number of items to return per request (maximum 100). Default is 100.
- **Start Cursor**: Optional cursor for pagination. If provided, the connector will return results starting after this cursor. This is useful when retrieving large numbers of blocks in multiple requests.

### Output

- **Output Variable**: Name of the variable where the results will be stored. The output will contain an array of block objects in the `results` property, along with pagination information.

## Output Format

The connector returns the full response from the Notion API, which includes:

```json
{
  "object": "list",
  "results": [
    {
      "object": "block",
      "id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
      "type": "heading_2",
      "heading_2": {
        "rich_text": [{ "text": { "content": "Heading content" } }]
      },
      // Additional block properties...
    },
    // More blocks...
  ],
  "next_cursor": "cursor-value-for-pagination",
  "has_more": true
}
```

## Notes

- This connector requires that your integration has been granted access to the specified block or page.
- Different block types have different structures. Refer to the [Notion API documentation](https://developers.notion.com/reference/block) for details on block types.
- To retrieve nested blocks, you would need to make additional requests using the IDs of blocks that have `has_children` set to `true`.