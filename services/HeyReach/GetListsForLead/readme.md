# Get Lists For Lead

This connector retrieves the lists associated with a specific lead in HeyReach.

## Configuration

### Lead Identification
You must provide at least one of the following fields to identify the lead:

- **Email**: The email address of the lead (e.g., `john_doe@example.com`)
- **LinkedIn ID**: The LinkedIn ID of the lead (e.g., `121313fsdf234`)
- **LinkedIn Profile URL**: The full LinkedIn profile URL of the lead (e.g., `https://www.linkedin.com/in/john_doe/`)

### Pagination
Control how many results are returned:

- **Offset**: The number of records to skip (default: 0)
- **Limit**: The maximum number of records to return (default: 100)

### Output
- **Output Variable**: Name of the variable where the results will be stored

## Response Format

The connector returns an object with:
- `totalCount`: Total number of lists associated with the lead
- `items`: Array of list objects, each containing:
  - `listId`: The ID of the list
  - `listName`: The name of the list

Example response:
```json
{
  "totalCount": 2,
  "items": [
    {
      "listId": 3457,
      "listName": "Veterans in USA"
    },
    {
      "listId": 3468,
      "listName": "Rich and Famous"
    }
  ]
}
```

## Requirements

Make sure you have configured your HeyReach API key in the service settings.