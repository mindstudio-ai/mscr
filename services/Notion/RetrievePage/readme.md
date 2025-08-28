# Retrieve Notion Page

This connector retrieves a Notion page's properties and metadata using the Notion API.

## What This Connector Does

- Retrieves a page's properties, metadata, and attributes
- Returns page information like title, icon, cover image, and custom properties
- Works with both database pages and standalone pages

## What This Connector Doesn't Do

- Does not retrieve the actual content/blocks of the page (only metadata)
- Limited to returning a maximum of 25 references per page property

## Configuration

### Page ID or URL

Enter either:
- A Notion page ID (e.g., `59833787-2cf9-4fdf-8782-e53db20768a5`)
- A full Notion page URL (e.g., `https://www.notion.so/myworkspace/Page-Title-59833787-2cf9-4fdf-8782-e53db20768a5`)

The connector will automatically extract the page ID from the URL if needed.

### Filter Properties (Optional)

If you only want specific properties returned, enter a comma-separated list of property IDs:

```
prop1,prop2,prop3
```

Leave this field empty to return all page properties.

### Output Variable

The name of the variable that will store the retrieved page data. This will contain all the page properties and metadata in JSON format.

## Example Response

The output will contain a JSON object with page details similar to:

```json
{
  "object": "page",
  "id": "59833787-2cf9-4fdf-8782-e53db20768a5",
  "created_time": "2022-03-01T19:05:00.000Z",
  "last_edited_time": "2022-07-06T20:25:00.000Z",
  "created_by": {
    "object": "user",
    "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
  },
  "icon": {
    "type": "emoji",
    "emoji": "🥬"
  },
  "parent": {
    "type": "database_id",
    "database_id": "d9824bdc-8445-4327-be8b-5b47500af6ce"
  },
  "archived": false,
  "properties": {
    // Page properties will appear here
  }
}
```

## Permissions Required

This connector requires the Notion integration to have "Read content" capabilities.