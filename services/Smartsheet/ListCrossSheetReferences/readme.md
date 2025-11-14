# List Cross-sheet References

Lists all cross-sheet references for a sheet. These are used in formulas that reference other sheets.

## Configuration
- **Sheet ID**: Sheet to list cross-sheet references for
- **Output Variable**: Variable to store references list

## Example Response
```json
{
  "totalCount": 2,
  "references": [
    {
      "id": 123456789,
      "name": "Budget Range",
      "sourceSheetId": 987654321,
      "startColumnId": 111,
      "endColumnId": 222,
      "startRowId": 333,
      "endRowId": 444
    }
  ]
}
```

## Notes
- Shows which sheets are referenced by this sheet
- Includes range details for each reference

