# Get Record from Airtable

This connector retrieves a single record from an Airtable table.

## Configuration

### Base ID
Enter your Airtable Base ID. You can find this in the API documentation section of your base or in the URL when viewing your base.
- Example: `appABC123xyz456`

### Table ID or Name
Enter either the name of your table (e.g., "Projects") or the table ID.
- Example table name: `Tasks`
- Example table ID: `tblABC123xyz456`

### Record ID
Enter the ID of the specific record you want to retrieve.
- Example: `recABC123xyz456`

## Advanced Options

### Cell Format
- **JSON**: Returns values in their native format based on field type (default)
- **String**: Returns values as user-facing strings

### Return Fields By Field ID
- **False**: Field objects will be keyed by field name (default)
- **True**: Field objects will be keyed by field ID

## Output

The connector will return the record with its ID, creation time, and all non-empty fields. The output will be stored in the variable you specify.

Example output:
```json
{
  "id": "rec560UJdUtocSouk",
  "createdTime": "2022-09-12T21:03:48.000Z",
  "fields": {
    "Address": "333 Post St",
    "Name": "Union Square",
    "Visited": true
  }
}
```