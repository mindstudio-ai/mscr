# Add Column

This connector adds a new column to a Smartsheet with specified properties and data type.

## Configuration

### Sheet Information
- **Sheet ID**: The unique identifier of the sheet
  - Find this in the sheet URL: `https://app.smartsheet.com/sheets/{sheetId}`

### Column Details
- **Column Title**: The name for the new column
- **Column Type**: The type of data this column will contain
  - **Text/Number**: General text or numeric values
  - **Picklist (Dropdown)**: Predefined dropdown options
  - **Date**: Date values
  - **Contact List**: Contact information
  - **Checkbox**: Boolean checkbox values
  - **Duration**: Time duration values

- **Picklist Options**: Required for PICKLIST type columns
  - Enter options as comma-separated values: `Option 1,Option 2,Option 3`
  - Or as JSON array: `["Option 1", "Option 2", "Option 3"]`

### Position
- **Insert Position**: Where to insert the new column
  - **At End**: Add to the rightmost position (default)
  - **At Beginning**: Add as the first column (leftmost)
  - **Before Column**: Insert before a specific column
  - **After Column**: Insert after a specific column

- **Sibling Column Index**: Required for "Before" or "After" positioning
  - 0-based index of the column to insert relative to
  - Example: To insert after the first column, use index 0 with "After Column"

### Output
- **Output Variable**: Name of the variable to store the result
  - Output includes the complete column object with:
    - `id`: Column ID
    - `title`: Column title
    - `type`: Column type
    - `index`: Position in the sheet

## Examples

### Simple Text Column
```
Title: Notes
Type: TEXT_NUMBER
Position: At End
```

### Picklist Column with Options
```
Title: Status
Type: PICKLIST
Picklist Options: Not Started,In Progress,Complete,On Hold
Position: At End
```

### Date Column at Beginning
```
Title: Due Date
Type: DATE
Position: At Beginning
```

## Example Response

```json
{
  "id": 2331373580117892,
  "title": "Status",
  "type": "PICKLIST",
  "index": 2,
  "options": ["Not Started", "In Progress", "Complete"]
}
```

## Column Position Indexing

Columns are indexed starting from 0:
- Index 0: First column (leftmost)
- Index 1: Second column
- And so on...

To find existing column indices, use the "Get Sheet" connector.

## Notes
- You must have editor or admin access to add columns
- PICKLIST columns require at least one option
- Column titles must be unique within the sheet
- Some column types have specific validation rules
- System columns (like Auto-Number) cannot be added via API

