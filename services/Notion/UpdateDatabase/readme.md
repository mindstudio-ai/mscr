# Update Notion Database

This connector allows you to update a Notion database's title, description, and properties (schema).

## How to use

1. Enter the **Database ID or URL** of the Notion database you want to update. You can copy this from your browser's address bar when viewing the database in Notion.

2. Optionally provide a new **Database Title** to rename the database.

3. Optionally provide a new **Database Description** to update the database description.

4. Optionally update the database's properties (columns) by providing a **Database Properties** JSON object.

5. Specify an **Output Variable** name to store the updated database information.

## Database Properties JSON Format

The properties JSON should follow Notion's API format for defining database properties. Here are some examples:

### Adding a new text property
```json
{
  "New Text Property": {
    "rich_text": {}
  }
}
```

### Adding a new number property
```json
{
  "Score": {
    "number": {
      "format": "number"
    }
  }
}
```

### Adding a new select property with options
```json
{
  "Status": {
    "select": {
      "options": [
        {"name": "Not Started", "color": "red"},
        {"name": "In Progress", "color": "blue"},
        {"name": "Done", "color": "green"}
      ]
    }
  }
}
```

### Adding a date property
```json
{
  "Due Date": {
    "date": {}
  }
}
```

### Removing a property
To remove a property, set its value to null:
```json
{
  "Property to Remove": null
}
```

## Notes

- The database must be shared with your integration for this connector to work.
- Formula, select, and status properties cannot be updated via the API.
- To update a relation property, the related database must also be shared with your integration.