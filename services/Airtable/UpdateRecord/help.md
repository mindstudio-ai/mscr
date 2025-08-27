# Update Record in Airtable

This connector allows you to update a single record in an Airtable table. It uses the PATCH method, which only updates the fields you specify while leaving other fields untouched.

## Configuration

### Base and Table Information
- **Base ID**: Enter your Airtable base ID. This can be found in your Airtable API documentation or in the URL when viewing your base (looks like `appXXXXXXXXXXXXXX`).
- **Table Name or ID**: Enter either the name of your table (e.g., "Projects") or the table ID (e.g., `tblXXXXXXXXXXXXXX`). Using the ID is recommended as it won't change if you rename your table.
- **Record ID**: Enter the ID of the specific record you want to update (looks like `recXXXXXXXXXXXXXX`).

### Record Fields
- **Fields to Update**: Enter a JSON object containing the fields you want to update. Each key should be a field name in your table, and each value should be the new value for that field.

Example:
```json
{
  "Name": "Ferry Building",
  "Address": "1 Ferry Building",
  "Visited": true,
  "Rating": 4.5,
  "Notes": "Historic ferry terminal with great food vendors"
}
```

### Options (Advanced)
- **Enable Automatic Type Conversion**: If set to "Yes", Airtable will attempt to automatically convert string values to appropriate types (numbers, dates, etc.). This is useful when integrating with other systems.
- **Return Fields By Field ID**: If set to "Yes", the response will use field IDs as keys instead of field names.

### Output
- **Output Variable**: Name of the variable that will store the updated record information.

## Example Response

The connector will return the updated record information, which will include:
- Record ID
- Created Time
- Updated Fields

```json
{
  "id": "rec3lbPRG4aVqkeOQ",
  "createdTime": "2022-09-12T21:03:48.000Z",
  "fields": {
    "Address": "1 Ferry Building",
    "Name": "Ferry Building",
    "Visited": true
  }
}
```