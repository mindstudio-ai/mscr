# Query Notion Database

This connector allows you to retrieve entries from a Notion database with optional filtering and sorting capabilities.

## Prerequisites

- The database must be shared with your Notion integration
- Your integration must have "Read content" capabilities enabled

## How to Use

### Database Information

1. **Database ID or URL**: Enter either:
   - The Notion database ID (e.g., `d9824bdc-8445-4327-be8b-5b47500af6ce`)
   - The full Notion URL (e.g., `https://www.notion.so/myworkspace/d9824bdc84454327be8b5b47500af6ce`)

### Query Options

2. **Filter** (Optional): JSON object to filter database entries. Examples:

   ```json
   // Simple filter - find items where Status equals "Done"
   {"property":"Status","select":{"equals":"Done"}}
   
   // Compound filter - find items that are in stock OR cost more than $2
   {
     "or": [
       {
         "property": "In stock",
         "checkbox": {
           "equals": true
         }
       },
       {
         "property": "Cost",
         "number": {
           "greater_than_or_equal_to": 2
         }
       }
     ]
   }
   ```

3. **Sort** (Optional): JSON array of sort criteria. Example:

   ```json
   [
     {
       "property": "Last Updated",
       "direction": "descending"
     },
     {
       "property": "Name",
       "direction": "ascending"
     }
   ]
   ```

4. **Page Size** (Optional): Number of results to return per page (maximum 100, default 100)

5. **Start Cursor** (Optional): Cursor for pagination. Leave empty to start from the beginning.

6. **Filter Properties** (Optional): Comma-separated list of property IDs to include in the response. Leave empty to include all properties.

### Output

7. **Output Variable**: Name of the variable where the query results will be stored. The results will include an array of database entries with their properties.

## Common Issues

- **404 Error**: Make sure the database is shared with your integration
- **Invalid Filter/Sort**: Check your JSON syntax for any errors
- **Rate Limiting**: If you hit rate limits, try reducing the frequency of requests

## Example Output

The output will be a JSON object containing the database entries that match your query:

```json
{
  "object": "list",
  "results": [
    {
      "object": "page",
      "id": "59833787-2cf9-4fdf-8782-e53db20768a5",
      "properties": {
        "Name": {
          "id": "title",
          "type": "title",
          "title": [{ "text": { "content": "Task 1" } }]
        },
        "Status": {
          "id": "status",
          "type": "select",
          "select": { "name": "Done" }
        }
      }
    }
  ],
  "next_cursor": "cursor_value",
  "has_more": true
}
```