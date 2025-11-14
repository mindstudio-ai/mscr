# Search Sheets

This connector searches for content across all accessible sheets or within a specific sheet in Smartsheet.

## Configuration

### Search Parameters
- **Search Query**: The text to search for
  - Searches through sheet names, row data, column names, and cell values
  - Minimum length: 2 characters
  - Case-insensitive search

- **Sheet ID**: (Optional) Limit search to a specific sheet
  - Leave empty to search across all accessible sheets
  - Provide a sheet ID to search within that sheet only

### Output
- **Output Variable**: Name of the variable where search results will be stored
  - Output includes:
    - `query`: The search query used
    - `totalCount`: Number of results found
    - `results`: Array of result objects

## Search Scope

### Global Search (No Sheet ID)
Searches across:
- Sheet names
- Row data in all accessible sheets
- Cell values
- Column headers

### Sheet-Specific Search (With Sheet ID)
Searches within the specified sheet:
- Row data
- Cell values
- Column headers

## Example Response - Global Search

```json
{
  "query": "project",
  "totalCount": 3,
  "results": [
    {
      "objectType": "sheet",
      "objectId": 4583654299906948,
      "contextData": ["Project Tracker"],
      "text": "Project Tracker"
    },
    {
      "objectType": "row",
      "objectId": 1539375965122436,
      "parentObjectType": "sheet",
      "parentObjectId": 4583654299906948,
      "contextData": ["Project Phase 1"],
      "text": "Complete project phase 1"
    }
  ]
}
```

## Example Response - Sheet Search

```json
{
  "query": "design",
  "totalCount": 2,
  "results": [
    {
      "objectType": "row",
      "objectId": 1539375965122436,
      "contextData": ["Design Phase"],
      "text": "Design Phase"
    },
    {
      "objectType": "row",
      "objectId": 2043775592797060,
      "contextData": ["Review designs"],
      "text": "Review designs with team"
    }
  ]
}
```

## Result Object Properties

Each result includes:
- `objectType`: Type of object (sheet, row, discussion, attachment, etc.)
- `objectId`: ID of the found object
- `text`: The matching text
- `contextData`: Array of surrounding context
- `parentObjectType` & `parentObjectId`: Parent container (for rows, etc.)

## Use Cases

- Find all sheets containing specific keywords
- Locate rows with particular values
- Search for tasks or items across projects
- Find mentions of people, dates, or terms
- Audit and compliance searches

## Notes
- Search results only include content you have access to
- Minimum query length is 2 characters
- Search is case-insensitive
- Results are limited to 100 items per search
- Complex queries with special characters may need proper escaping

