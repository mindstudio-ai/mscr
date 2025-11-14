# Add Rows

This connector adds one or more rows to a Smartsheet with specified cell values.

## Configuration

### Sheet Information
- **Sheet ID**: The unique identifier of the sheet
  - Find this in the sheet URL: `https://app.smartsheet.com/sheets/{sheetId}`

### Row Data
- **Rows Data**: Define the rows to add in JSON format
  - Each row is an object containing:
    - `cells`: Array of cell objects with `columnId` and `value`
    - Position indicator: `toBottom`, `toTop`, `siblingId` (with optional `above` flag), or `parentId`

#### Simple Example - Add to Bottom
```json
[
  {
    "toBottom": true,
    "cells": [
      {
        "columnId": 2331373580117892,
        "value": "New Task"
      },
      {
        "columnId": 6835173207488388,
        "value": "Not Started"
      }
    ]
  }
]
```

#### Multiple Rows Example
```json
[
  {
    "toBottom": true,
    "cells": [
      {"columnId": 2331373580117892, "value": "Task 1"},
      {"columnId": 6835173207488388, "value": "In Progress"}
    ]
  },
  {
    "toBottom": true,
    "cells": [
      {"columnId": 2331373580117892, "value": "Task 2"},
      {"columnId": 6835173207488388, "value": "Complete"}
    ]
  }
]
```

#### Hierarchical Row Example
```json
[
  {
    "toTop": true,
    "cells": [
      {"columnId": 2331373580117892, "value": "Parent Task"}
    ]
  },
  {
    "parentId": 1234567890,
    "cells": [
      {"columnId": 2331373580117892, "value": "Child Task"}
    ]
  }
]
```

### Position Options
- **Position Type**: Where to add rows (if not specified per row)
  - To Bottom: Add at the bottom of the sheet
  - To Top: Add at the top of the sheet
  - Above Row: Add above a specific row (requires Sibling Row ID)
  - Below Row: Add below a specific row (requires Sibling Row ID)
  
- **Sibling Row ID**: Row ID for Above/Below positioning
  - Required when Position Type is "Above Row" or "Below Row"

### Output
- **Output Variable**: Name of the variable to store the result
  - Output includes:
    - `addedRows`: Array of created row objects with IDs
    - `count`: Number of rows added

## Getting Column IDs

To get column IDs for your sheet:
1. Use the "Get Sheet" connector
2. Look at the `columns` array in the response
3. Each column has an `id` field

## Notes
- You must have editor or admin access to add rows
- Column IDs must be valid for the target sheet
- Cell values must match the column type
- If no position is specified, rows are added to the bottom
- You can add up to 500 rows per request

