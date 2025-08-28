# Update Notion Page Properties

This connector allows you to update properties of a Notion page that belongs to a database. You can modify page properties, change the icon or cover image, and manage the page's archive status.

## Configuration

### Page Information
- **Page ID or URL**: Enter either the Notion page ID (a UUID like `59833787-2cf9-4fdf-8782-e53db20768a5`) or the full URL to the page (e.g., `https://www.notion.so/workspace/My-Page-59833787-2cf9-4fdf-8782-e53db20768a5`).

### Page Properties
- **Properties**: A JSON object containing the properties you want to update. The keys are the property names or IDs, and the values are the property values in Notion's format.

#### Example Property Formats:

```json
{
  "Status": {
    "select": {
      "name": "Completed"
    }
  },
  "Priority": {
    "select": {
      "name": "High"
    }
  },
  "Due Date": {
    "date": {
      "start": "2023-12-31"
    }
  },
  "Assigned To": {
    "people": [
      {
        "id": "user-id-here"
      }
    ]
  },
  "Tags": {
    "multi_select": [
      {
        "name": "Urgent"
      },
      {
        "name": "Feature"
      }
    ]
  },
  "Complete": {
    "checkbox": true
  },
  "Description": {
    "rich_text": [
      {
        "text": {
          "content": "This is a description"
        }
      }
    ]
  },
  "Score": {
    "number": 85
  }
}
```

### Page Appearance (Optional)
- **Icon**: Enter an emoji (e.g., `🚀`) or a URL to an external image.
- **Cover Image URL**: Enter a URL to an external image to use as the page cover.

### Page Status (Optional)
- **Archive Status**: Choose whether to archive the page, restore it from the archive, or make no changes to its current status.

### Output
- **Output Variable**: Name of the variable that will store the updated page information.

## Notes
- You must have update permissions for the page you're trying to modify.
- The page must be a child of a database for property updates to work.
- Property formats must match the expected format for the property type in Notion.