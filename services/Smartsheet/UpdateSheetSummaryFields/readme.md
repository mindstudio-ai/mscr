# Update Sheet Summary Fields

Updates values of existing summary fields.

## Configuration
- **Sheet ID**: Sheet to update summary for
- **Fields JSON**: Array of field objects to update
- **Output Variable**: Variable for updated fields

## Example Input
```json
[
  {"id": 123, "value": "New Value"},
  {"id": 456, "formula": "=SUM([Column1]:[Column1])"}
]
```

## Notes
- Can update value or formula
- Requires field IDs
- Maximum 100 fields per request

