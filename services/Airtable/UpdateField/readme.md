# Update Field in Airtable

This connector allows you to update the name and/or description of a field in an Airtable table.

## Requirements

- An Airtable account with access to the base you want to modify
- A Personal Access Token with the `schema.bases:write` scope
- You must be the creator of the base

## Configuration

### Base Information

- **Base ID**: The ID of your Airtable base. This is the string that appears after `airtable.com/` when viewing your base (e.g., `appABC123456789`).
- **Table ID**: The ID of the table containing the field. You can find this in the URL when viewing a table (e.g., `tblXYZ987654321`).
- **Field ID**: The ID of the field you want to update. This typically starts with `fld` (e.g., `fldoi0c3GaRQJ3xnI`).

### Field Updates

You must provide at least one of the following:

- **Field Name**: The new name you want to assign to the field.
- **Field Description**: The new description for the field. This can be up to 20,000 characters.

### Output

- **Output Variable**: Name of the variable that will store the API response containing the updated field information.

## Example Response

The output variable will contain a JSON object similar to:

```json
{
  "description": "I was changed!",
  "id": "fldoi0c3GaRQJ3xnI",
  "name": "Name (revised)",
  "type": "singleLineText"
}
```

## Notes

- You must provide either a new name, a new description, or both.
- The connector will return an error if neither a name nor description is provided.
- The field type cannot be changed with this connector.