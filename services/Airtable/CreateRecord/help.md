# Create Record in Airtable

This action creates a new record in an Airtable table.

## Prerequisites

You need an Airtable account and a personal access token configured in your environment. The token should have appropriate permissions to write to your Airtable bases.

## Configuration

### Base Configuration

- **Base ID**: The ID of your Airtable base, which starts with "app". You can find this in the API documentation section of your Airtable workspace or in the URL when viewing your base.
- **Table Name or ID**: The name of the table where you want to create the record (e.g., "Projects", "Contacts").

### Record Data

- **Record Fields**: A JSON object containing the field names and values for your new record. Field names must match exactly with your Airtable table.
- **Typecast**: Choose whether Airtable should automatically convert string values to the appropriate field type (e.g., dates, numbers).
- **Output Variable**: Name of the variable that will store the ID of the newly created record.

## Example Record Fields

```json
{
  "Name": "New Project",
  "Status": "In Progress",
  "Due Date": "2023-12-31",
  "Priority": "High",
  "Notes": "This is a sample project created via the API",
  "Assigned To": ["rec123456789"]
}
```

## Tips

- For linked record fields, use an array of record IDs
- For attachment fields, use the Airtable attachment object format
- Field names are case-sensitive and must match exactly with your table
- For multi-select fields, use an array of strings

## Output

The action returns the ID of the newly created record, which typically starts with "rec".