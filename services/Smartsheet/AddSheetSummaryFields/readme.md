# Add Sheet Summary Fields

Adds new summary fields to a sheet.

## Configuration
- **Sheet ID**: Sheet to add fields to
- **Fields JSON**: Array of field objects to add
- **Output Variable**: Variable for created fields

## Example Input
```json
[
  {"title": "Project Status", "type": "TEXT_NUMBER"},
  {"title": "Total Cost", "type": "TEXT_NUMBER", "formula": "=SUM([Cost]:[Cost])"}
]
```

## Notes
- Field types: TEXT_NUMBER, CONTACT_LIST, DATE, PICKLIST, CHECKBOX
- Can include initial value or formula
- Fields appear at top of sheet

