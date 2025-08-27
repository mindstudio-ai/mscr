# Delete Multiple Records from Airtable

This action allows you to delete multiple records from an Airtable table at once.

## Configuration

### Base and Table Configuration

- **Base ID**: Enter your Airtable base ID. This can be found in the API documentation section of your base or in the URL when viewing your base (e.g., `app12345abcde`).

- **Table Name or ID**: Enter either the name of your table (e.g., "Projects") or the table ID (e.g., "tblxyz123").

### Records to Delete

- **Record IDs**: Enter the IDs of the records you want to delete, separated by commas. You can delete up to 10 records at once.

Example:
```
rec123abc, rec456def, rec789ghi
```

> **Note**: Each record ID typically starts with "rec" followed by a string of characters.

### Output Configuration

- **Output Variable**: Enter a name for the variable that will store the result of the deletion operation. This variable will contain information about which records were successfully deleted.

## Example Response

The output variable will contain a response like this:

```json
{
  "records": [
    {
      "deleted": true,
      "id": "rec123abc"
    },
    {
      "deleted": true,
      "id": "rec456def"
    }
  ]
}
```

## Limitations

- You can delete a maximum of 10 records in a single request.
- You must have editor access to the base to delete records.