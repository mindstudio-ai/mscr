# Append Block Children to Notion

This connector allows you to add new content blocks to an existing Notion page or block.

## How to Use

### Block ID or URL
Enter either:
- A Notion block ID (e.g., `b55c9c91-384d-452b-81db-d1ef79372b75`)
- A full Notion page URL (e.g., `https://www.notion.so/myworkspace/My-Page-b55c9c91384d452b81dbd1ef79372b75`)

The connector will automatically extract the block ID from URLs.

### Content Blocks
Enter the blocks to append in JSON format following the Notion API block structure. You can add up to 100 blocks in a single request.

**Example formats:**

Simple text paragraph:
```json
[
  {
    "paragraph": {
      "rich_text": [
        {
          "text": {
            "content": "This is a simple paragraph"
          }
        }
      ]
    }
  }
]
```

Heading with a paragraph:
```json
[
  {
    "heading_2": {
      "rich_text": [
        {
          "text": {
            "content": "My Heading"
          }
        }
      ]
    }
  },
  {
    "paragraph": {
      "rich_text": [
        {
          "text": {
            "content": "This is a paragraph with a link",
            "link": {
              "url": "https://example.com"
            }
          }
        }
      ]
    }
  }
]
```

### After Block ID (Optional)
If you want to insert the new blocks after a specific block (rather than at the end), enter the ID of the existing block here.

### Result Variable
The name of the variable where the response will be stored. The response includes details about the newly created blocks, including their IDs.

## Limitations
- Maximum of 100 blocks per request
- Maximum of 2 levels of nesting in a single request
- Blocks can only be appended, not moved or reordered
- Your integration must have "Insert Content" capabilities