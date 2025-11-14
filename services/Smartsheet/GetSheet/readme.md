# Get Sheet

This connector retrieves the complete details of a specific sheet from Smartsheet, including all rows, columns, and cell data.

## Configuration

### Sheet Information
- **Sheet ID**: The unique identifier of the sheet you want to retrieve
  - You can find this in the sheet URL: `https://app.smartsheet.com/sheets/{sheetId}`
  - Example: `4583654299906948`

### Query Options
- **Include Attachments**: Check to include attachment information in the response
- **Include Discussions**: Check to include discussion threads in the response
- **Include Row Permalink**: Check to include direct links to each row

### Output
- **Output Variable**: Name of the variable where the sheet details will be stored
  - The output contains the complete sheet object including:
    - Basic info: id, name, accessLevel, permalink
    - Columns: Array of column definitions
    - Rows: Array of row objects with cells
    - Optional: attachments, discussions, permalinks

## Example Response

```json
{
  "id": 4583654299906948,
  "name": "Project Tracker",
  "columns": [
    {
      "id": 2331373580117892,
      "title": "Task Name",
      "type": "TEXT_NUMBER",
      "primary": true
    },
    {
      "id": 6835173207488388,
      "title": "Status",
      "type": "PICKLIST"
    }
  ],
  "rows": [
    {
      "id": 1539375965122436,
      "rowNumber": 1,
      "cells": [
        {
          "columnId": 2331373580117892,
          "value": "Design Phase"
        },
        {
          "columnId": 6835173207488388,
          "value": "In Progress"
        }
      ]
    }
  ]
}
```

## Notes
- You must have at least viewer access to the sheet
- Large sheets may take longer to retrieve
- Use the include options only when needed to optimize performance
- The sheet structure returned includes all metadata needed to update cells

