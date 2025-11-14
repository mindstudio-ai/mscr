# Create Cross-sheet Reference

Creates a new cross-sheet reference for use in formulas.

## Configuration
- **Sheet ID**: Sheet to add the reference to
- **Reference Name**: Name for the reference
- **Source Sheet ID**: Sheet being referenced
- **Start/End Row ID**: Row range in source sheet
- **Start/End Column ID**: Column range in source sheet
- **Output Variable**: Variable for created reference

## Example
If you want to reference a budget range from another sheet:
- Name: "Q1 Budget"
- Source Sheet: Budget sheet ID
- Row/Column IDs: Define the range

## Notes
- Used to create formulas like `=SUM({Budget Range})`
- Maximum of 100 references per sheet
- Both sheets must be accessible

