# Create Base

This action creates a new Airtable base with your specified tables and fields.

## Configuration

### Base Configuration
- **Base Name**: Enter a name for your new Airtable base (e.g., "Project Tracker", "Customer Database")
- **Workspace ID**: Enter the ID of the workspace where you want to create the base. You can find this in the URL when viewing your workspace in Airtable (e.g., `wspmhESAta6clCCwF`)

### Tables Configuration
- **Tables**: Define the tables and fields for your new base using JSON format. Each table requires a name and an array of fields.

#### Tables JSON Format Example:
```json
[
  {
    "name": "Projects",
    "description": "All current and upcoming projects",
    "fields": [
      {
        "name": "Project Name",
        "type": "singleLineText",
        "description": "Name of the project"
      },
      {
        "name": "Description",
        "type": "multilineText"
      },
      {
        "name": "Due Date",
        "type": "date"
      },
      {
        "name": "Complete",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Tasks",
    "description": "Individual tasks for each project",
    "fields": [
      {
        "name": "Task Name",
        "type": "singleLineText"
      },
      {
        "name": "Status",
        "type": "singleSelect",
        "options": {
          "choices": [
            {"name": "Not Started"},
            {"name": "In Progress"},
            {"name": "Complete"}
          ]
        }
      }
    ]
  }
]
```

#### Common Field Types:
- `singleLineText` - Short text field
- `multilineText` - Long text field
- `checkbox` - Yes/No checkbox
- `date` - Date field
- `number` - Numeric field
- `singleSelect` - Dropdown with predefined options
- `multipleSelects` - Multiple choice field
- `url` - URL field
- `email` - Email field
- `phone` - Phone number field

### Output
- **Output Variable**: Name of the variable that will store information about your newly created base, including the base ID and details of all created tables.

## Notes
- The first field in each table will automatically become the primary field
- A default grid view will be created for each table
- You must specify at least one table with at least one field