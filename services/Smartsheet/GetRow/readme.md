# Get Row

This connector retrieves the complete details of a specific row from a Smartsheet.

## Configuration

### Row Information
- **Sheet ID**: The unique identifier of the sheet
  - Find this in the sheet URL: `https://app.smartsheet.com/sheets/{sheetId}`
- **Row ID**: The unique identifier of the row to retrieve
  - Get row IDs using the "Get Sheet" connector

### Query Options
- **Include Discussions**: Check to include discussion threads attached to this row
- **Include Attachments**: Check to include attachment information for this row
- **Include Columns**: Check to include column definitions in the response

### Output
- **Output Variable**: Name of the variable where the row details will be stored
  - The output contains the complete row object including:
    - `id`: Row ID
    - `rowNumber`: Position in the sheet
    - `cells`: Array of cell objects with columnId, value, and displayValue
    - Optional: discussions, attachments, columns

## Example Response

```json
{
  "id": 1539375965122436,
  "rowNumber": 1,
  "expanded": true,
  "cells": [
    {
      "columnId": 2331373580117892,
      "value": "Design Phase",
      "displayValue": "Design Phase"
    },
    {
      "columnId": 6835173207488388,
      "value": "In Progress",
      "displayValue": "In Progress"
    },
    {
      "columnId": 1083573813793668,
      "value": "2024-12-01",
      "displayValue": "12/01/24"
    }
  ],
  "createdAt": "2024-11-01T10:30:00Z",
  "modifiedAt": "2024-11-10T14:22:00Z"
}
```

## Use Cases

- Retrieve current values before updating
- Check row metadata (created/modified dates)
- Get discussions and attachments for a specific row
- Validate row exists before performing operations

## Notes
- You must have at least viewer access to the sheet
- Row ID must be valid for the specified sheet
- Cell values may include both `value` (raw) and `displayValue` (formatted)
- Use the include options only when needed to optimize performance

