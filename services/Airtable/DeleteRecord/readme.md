# Delete Record

This action deletes a single record from an Airtable table.

## Configuration

### Base ID
Enter the ID of your Airtable base. You can find this in the API documentation section of your base or in the URL when viewing your base.

Example: `app12345abcde`

### Table Name or ID
Enter the name or ID of the table containing the record you want to delete. You can use either the table name as it appears in the Airtable interface or the table ID.

Example: `Tasks` or `tblxyz123456`

### Record ID
Enter the ID of the specific record you want to delete. Record IDs typically start with "rec" followed by alphanumeric characters.

Example: `rec560UJdUtocSouk`

## Output

The action will return a JSON object containing information about the deleted record:

```json
{
  "deleted": true,
  "id": "rec560UJdUtocSouk"
}
```

Where:
- `deleted`: A boolean value that is `true` when the record was successfully deleted
- `id`: The ID of the deleted record