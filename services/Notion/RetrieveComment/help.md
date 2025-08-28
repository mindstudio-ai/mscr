# Retrieve a Notion Comment

This connector retrieves a comment from Notion using its ID. You can provide either the comment ID directly or a Notion URL that contains the comment ID.

## Prerequisites

- Your integration must have comment capabilities enabled in the Notion integration settings
- You must have connected your Notion account to MindStudio

## Configuration

### Comment Information

- **Comment ID or URL**: Enter either:
  - A Notion comment ID (e.g., `249911a-125e-803e-a164-001cf338b8ec`)
  - A Notion URL that contains the comment ID

### Output

- **Output Variable**: Name of the variable where the comment data will be stored

## Output Format

The connector returns the full comment object from Notion, which includes:

```json
{
  "object": "comment",
  "id": "249911a-125e-803e-a164-001cf338b8ec",
  "parent": {
    "type": "block_id",
    "block_id": "247vw11a-125e-8053-8e73-d3b3ed4f5768"
  },
  "discussion_id": "1mv7b911a-125e-80df-8c9e-001c179f63ef",
  "created_time": "2025-08-06T20:36:00.000Z",
  "last_edited_time": "2025-08-06T20:36:00.000Z",
  "created_by": {
    "object": "user",
    "id": "2092e755-4912-81f0-98dd-0002ad4ec952"
  },
  "rich_text": [
    {
      "type": "text",
      "text": {
        "content": "hello there",
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
      "plain_text": "hello there",
      "href": null
    }
  ],
  "display_name": {
    "type": "integration",
    "resolved_name": "int"
  }
}
```

## Common Issues

- **403 Error**: Ensure your integration has comment capabilities enabled in the Notion integration settings
- **Invalid Comment ID**: Check that you've provided a valid comment ID or URL
- **Comment Not Found**: Verify that the comment exists and that your integration has access to it