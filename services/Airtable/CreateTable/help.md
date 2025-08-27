# Create a Table in Airtable

This connector creates a new table in an existing Airtable base with your specified fields.

## Configuration

### Base ID
Enter the ID of your Airtable base. This is the part after `airtable.com/` in your base URL.

Example: If your base URL is `https://airtable.com/appABC123xyz`, then your Base ID is `appABC123xyz`.

### Table Name
Enter a name for your new table. This will be displayed in your Airtable base.

### Table Description (Optional)
Add a description for your table to provide context about its purpose.

## Fields

Define the fields for your table in JSON format. The first field in the array will automatically become the primary field for the table.

Each field requires:
- `name`: The display name of the field
- `type`: The field type (see examples below)

Optionally, you can include:
- `description`: A description of the field
- `options`: Additional configuration for the field (varies by type)

### Example Field Definitions

**Simple example with basic fields:**
```json
[
  {
    "name": "Name",
    "type": "singleLineText",
    "description": "Name of the item"
  },
  {
    "name": "Notes",
    "type": "multilineText"
  },
  {
    "name": "Complete",
    "type": "checkbox"
  }
]
```

**Advanced example with field options:**
```json
[
  {
    "name": "Property",
    "type": "singleLineText",
    "description": "Name of the property"
  },
  {
    "name": "Address",
    "type": "singleLineText"
  },
  {
    "name": "Status",
    "type": "singleSelect",
    "options": {
      "choices": [
        {"name": "Available", "color": "greenBright"},
        {"name": "Pending", "color": "yellowBright"},
        {"name": "Sold", "color": "redBright"}
      ]
    }
  },
  {
    "name": "Visited",
    "type": "checkbox",
    "options": {
      "color": "blueBright",
      "icon": "check"
    }
  }
]
```

### Common Field Types
- `singleLineText` - Single line of text
- `multilineText` - Multiple lines of text
- `number` - Numeric value
- `checkbox` - Yes/No checkbox
- `singleSelect` - Dropdown with single selection
- `multipleSelects` - Dropdown with multiple selections
- `date` - Date picker
- `dateTime` - Date and time picker
- `email` - Email address
- `url` - Website URL
- `phoneNumber` - Phone number

## Output Variable

The output variable will contain the full details of the created table, including generated IDs for the table and each field.