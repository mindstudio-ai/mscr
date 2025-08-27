# Create Field in Airtable

This connector creates a new column (field) in an Airtable table and returns the schema for the newly created column.

## Configuration

### Base and Table Information
- **Base ID**: The ID of your Airtable base. You can find this in your Airtable URL: `airtable.com/[baseId]/...`
- **Table ID**: The ID of the table where you want to create the field. You can find this in the table URL: `airtable.com/[baseId]/[tableId]/...`

### Field Details
- **Field Name**: The name of the new column you want to create (e.g., "Status", "Priority", "Due Date")
- **Field Type**: Select the type of field you want to create:
  - Single line text: For short text entries
  - Long text: For paragraphs of text
  - Checkbox: For yes/no values
  - Single select: For dropdown selection from predefined options
  - Number: For numeric values
  - Date: For date values
  - URL: For web links
  - Email: For email addresses
  - Phone: For phone numbers
- **Field Description**: Optional description of what the field is for

### Advanced Options
- **Select Options**: Only required for Single Select fields. Enter the dropdown options as comma-separated values (e.g., "High,Medium,Low" or "Red,Green,Blue")

### Output
- **Output Variable**: The variable name where the created field information will be stored. This will contain the field ID, name, type, and other details returned by Airtable.

## Example Use Cases

- Adding a "Status" single select field with options like "Not Started", "In Progress", "Complete"
- Creating a "Due Date" field to track deadlines
- Adding a "Priority" field to categorize items
- Creating a "Notes" long text field for detailed information

## Permissions Required

This connector requires a bearer token with the `schema.bases:write` scope and you must have base creator permissions.