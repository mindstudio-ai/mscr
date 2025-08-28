# Get Base Schema

This connector retrieves the schema of tables in a specified Airtable base, including information about fields, views, and other metadata.

## Configuration

### Base Information

- **Base ID**: Enter your Airtable base ID. You can find this in the URL of your Airtable base:
  - Example URL: `https://airtable.com/appABC123XYZ/tblDEF456/viwGHI789`
  - Base ID: `appABC123XYZ`

### Options

- **Include Visible Field IDs**: Choose whether to include visible field IDs in the response for grid views.
  - Select "Yes" to include this additional information
  - Select "No" (default) to exclude it

### Output

- **Output Variable**: Enter a name for the variable that will store the schema response.

## Response Format

The connector returns a JSON object containing an array of tables with their fields, views, and other metadata. Example:

```json
{
  "tables": [
    {
      "description": "Apartments to track.",
      "fields": [
        {
          "description": "Name of the apartment",
          "id": "fld1VnoyuotSTyxW1",
          "name": "Name",
          "type": "singleLineText"
        },
        ...
      ],
      "id": "tbltp8DGLhqbUmjK1",
      "name": "Apartments",
      "primaryFieldId": "fld1VnoyuotSTyxW1",
      "views": [...]
    },
    ...
  ]
}
```

## Authentication

This connector uses your Airtable personal access token for authentication, which is managed by the platform.