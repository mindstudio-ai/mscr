# Update Multiple Records in Airtable

This connector allows you to update up to 10 records in an Airtable table in a single operation.

## Configuration

### Table Information
- **Base ID**: Enter your Airtable base ID. This can be found in the API URL when viewing your Airtable base (looks like `appXXXXXXXXXXXXXX`).
- **Table ID or Name**: Enter either the table name (e.g., "Projects") or table ID (e.g., `tblXXXXXXXXXXXXXX`). Using the table ID is recommended as it won't break if you rename your table.

### Records to Update
- **Records**: Enter a JSON array of records to update. Each record must include an `id` and the `fields` to update.

Example format:
```json
[
  {
    "id": "rec123456789012",
    "fields": {
      "Name": "Updated Project Name",
      "Status": "Completed",
      "Due Date": "2023-12-31"
    }
  },
  {
    "id": "rec987654321098",
    "fields": {
      "Status": "In Progress",
      "Priority": "High"
    }
  }
]
```

### Advanced Options
- **Typecast**: When enabled, Airtable will try to convert string values to the appropriate cell value types (e.g., converting "true" to a boolean value).
- **Return Fields By Field ID**: If enabled, the response will key fields by field ID instead of field name.
- **Output Variable**: Name of the variable where the API response will be stored.

## Notes
- You can update up to 10 records in a single request.
- Only the fields you include will be updated; other fields will remain unchanged.
- Make sure the record IDs exist in your table, or the request will fail.