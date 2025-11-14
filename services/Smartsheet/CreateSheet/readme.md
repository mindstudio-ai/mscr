# Create Sheet

This connector creates a new sheet in Smartsheet with custom columns.

## Configuration

### Sheet Details
- **Sheet Name**: The name for your new sheet
- **Columns Definition**: Define the columns for your sheet in JSON format
  - Each column requires:
    - `title`: Column name
    - `type`: Column type (see available types below)
    - `primary`: Set to `true` for the first column (optional for others)
    - `options`: Array of options for PICKLIST columns (optional)

#### Available Column Types
- `TEXT_NUMBER`: Text or numbers
- `PICKLIST`: Dropdown list (requires `options` array)
- `DATE`: Date values
- `CONTACT_LIST`: Contact information
- `CHECKBOX`: Checkbox values
- `DURATION`: Duration values
- `PREDECESSOR`: Task dependencies

#### Example Columns
```json
[
  {
    "title": "Task Name",
    "type": "TEXT_NUMBER",
    "primary": true
  },
  {
    "title": "Status",
    "type": "PICKLIST",
    "options": ["Not Started", "In Progress", "Complete"]
  },
  {
    "title": "Due Date",
    "type": "DATE"
  },
  {
    "title": "Assigned To",
    "type": "CONTACT_LIST"
  }
]
```

### Location
- **Folder ID**: (Optional) Create the sheet in a specific folder
- **Workspace ID**: (Optional) Create the sheet in a specific workspace
  - Note: If both are provided, workspace takes precedence
  - Leave both empty to create in your home

### Output
- **Output Variable**: Name of the variable where the created sheet info will be stored
  - Output includes: id, name, permalink, columns, and accessLevel

## Example Response

```json
{
  "id": 4583654299906948,
  "name": "My New Sheet",
  "permalink": "https://app.smartsheet.com/sheets/...",
  "accessLevel": "OWNER",
  "columns": [
    {
      "id": 2331373580117892,
      "title": "Task Name",
      "type": "TEXT_NUMBER",
      "primary": true
    }
  ]
}
```

## Notes
- At least one column must be defined
- The first column is typically set as primary
- PICKLIST columns require an `options` array
- You must have permission to create sheets in the target location

