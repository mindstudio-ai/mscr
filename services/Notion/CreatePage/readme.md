# Create Page in Notion

This connector creates a new page in Notion, either as a child of an existing page or database.

## Configuration

### Parent
- **Parent Type**: Choose whether to create the page under a database or another page
- **Parent ID**: Enter the ID of the database or page where the new page will be created
  - You can find this ID in the URL of your Notion page or database
  - Example: For `https://www.notion.so/myworkspace/d9824bdc84454327be8b5b47500af6ce`, the ID is `d9824bdc84454327be8b5b47500af6ce`

### Page Content
- **Page Title**: The title of your new page
- **Page Properties**: (JSON format) Additional properties for the page
  - Required when parent is a database
  - Must match the schema of the parent database
  - Example for a database with "Status" and "Priority" properties:
  ```json
  {
    "Status": {
      "select": {
        "name": "In Progress"
      }
    },
    "Priority": {
      "select": {
        "name": "High"
      }
    }
  }
  ```
- **Page Content**: (JSON format) Content blocks to add to the page
  - Example for adding a paragraph and a to-do list:
  ```json
  [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "This is a new page created via the API"
            }
          }
        ]
      }
    },
    {
      "object": "block",
      "type": "to_do",
      "to_do": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "Task to complete"
            }
          }
        ],
        "checked": false
      }
    }
  ]
  ```

### Page Appearance
- **Icon Type**: Choose the type of icon for your page (None, Emoji, or External URL)
- **Icon Value**: 
  - For Emoji: Enter a single emoji character (e.g., `🚀`)
  - For External URL: Enter the full URL to an image (e.g., `https://example.com/icon.png`)
- **Cover Image URL**: Enter a URL to an image to use as the page cover

### Output
- **Output Variable**: Name of the variable where the created page information will be stored

## Notes
- The connector requires a Notion integration with the appropriate permissions
- When creating a page under a database, the properties must match the database schema
- For complex content and properties, prepare your JSON in advance