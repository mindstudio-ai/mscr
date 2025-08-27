# List Automations

This connector retrieves a list of automations for a specified Beehiiv publication.

## Configuration

### Publication ID
Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard or API settings.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Results Per Page (Optional)
Specify how many automation results to return per page. If not specified, the default is 10.
- Minimum: 1
- Maximum: 100

### Page Number (Optional)
Specify which page of results to retrieve. If not specified, the default is page 1.

## Output

The connector will return a JSON object containing:
- `data`: An array of automation objects with details like ID, status, name, trigger events, and description
- `limit`: The number of results per page
- `page`: The current page number
- `total_results`: Total number of automations
- `total_pages`: Total number of pages available

Example output:
```json
{
  "data": [
    {
      "id": "aut_00000000-0000-0000-0000-000000000000",
      "status": "running",
      "name": "Custom welcome series",
      "trigger_events": ["api"],
      "description": "Sends 2 days after signing up"
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 1,
  "total_pages": 1
}
```