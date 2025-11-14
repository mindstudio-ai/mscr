# Update Rows

This connector updates one or more existing rows in a Smartsheet by modifying cell values.

## Configuration

### Sheet Information
- **Sheet ID**: The unique identifier of the sheet
  - Find this in the sheet URL: `https://app.smartsheet.com/sheets/{sheetId}`

### Row Updates
- **Rows Data**: Define the rows to update in JSON format
  - Each row object must contain:
    - `id`: The row ID (required)
    - `cells`: Array of cell objects with `columnId` and `value`

#### Single Row Update Example
```json
[
  {
    "id": 1539375965122436,
    "cells": [
      {
        "columnId": 2331373580117892,
        "value": "Updated Task Name"
      },
      {
        "columnId": 6835173207488388,
        "value": "Complete"
      }
    ]
  }
]
```

#### Multiple Rows Update Example
```json
[
  {
    "id": 1539375965122436,
    "cells": [
      {
        "columnId": 2331373580117892,
        "value": "Task 1 - Updated"
      }
    ]
  },
  {
    "id": 2043775592797060,
    "cells": [
      {
        "columnId": 2331373580117892,
        "value": "Task 2 - Updated"
      },
      {
        "columnId": 6835173207488388,
        "value": "In Progress"
      }
    ]
  }
]
```

#### Clearing Cell Values
To clear a cell value, set it to an empty string:
```json
[
  {
    "id": 1539375965122436,
    "cells": [
      {
        "columnId": 6835173207488388,
        "value": ""
      }
    ]
  }
]
```

### Output
- **Output Variable**: Name of the variable to store the result
  - Output includes:
    - `updatedRows`: Array of updated row objects
    - `count`: Number of rows updated

## Getting Row IDs and Column IDs

1. **Row IDs**: Use the "Get Sheet" connector to retrieve all rows with their IDs
2. **Column IDs**: Also available in the "Get Sheet" response under the `columns` array

## Notes
- You must have editor or admin access to update rows
- Row IDs and column IDs must be valid for the target sheet
- Cell values must match the column type
- You only need to specify cells you want to update, not all cells in the row
- You can update up to 500 rows per request
- Empty string values will clear the cell content

