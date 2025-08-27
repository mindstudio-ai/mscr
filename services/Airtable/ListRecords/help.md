# Airtable List Records

This connector allows you to retrieve records from an Airtable table with options for filtering, sorting, and pagination.

## Configuration

### Base and Table Configuration

- **Base ID**: Enter your Airtable base ID. You can find this in your Airtable URL after `airtable.com/` (e.g., `appXXXXXXXXXXXXX`).
- **Table Name or ID**: Enter the name of your table (e.g., "Projects") or the table ID.

### Record Options

- **Max Records**: Maximum number of records to return. Leave empty to retrieve all records.
- **Page Size**: Number of records to return per page (maximum 100). Default is 100.
- **View**: Optionally specify a view name (e.g., "Grid view") to only return records from that view.

### Filtering and Sorting

- **Filter Formula**: Use Airtable formula syntax to filter records. Examples:
  - `{Status}='Complete'` - Only records where the Status field equals "Complete"
  - `AND({Priority}='High', {DueDate}<TODAY())` - High priority items due before today
  - `OR({AssignedTo}='John', {AssignedTo}='Sarah')` - Items assigned to John or Sarah

- **Fields to Include**: A comma-separated list of field names to include in the results. Leave empty to include all fields.
  - Example: `Name, Email, Status, Due Date`

- **Sort Field**: The field name to sort records by (e.g., "Created Time", "Name").
- **Sort Direction**: Choose between Ascending or Descending order.

### Output

- **Output Variable**: Name of the variable that will store the retrieved records. You can reference this variable in subsequent steps of your workflow.

## Notes

- The connector uses your Airtable API token which is securely stored in MindStudio.
- The output will be an array of records with their fields and values.
- If you need to filter by multiple conditions, use Airtable's formula syntax with AND(), OR(), etc.