# Get List By ID

This connector retrieves a specific list from HeyReach by its ID. The endpoint returns details about the list including its name, total items count, creation time, and associated campaign IDs.

## Configuration

### List ID
Enter the numeric ID of the HeyReach list you want to retrieve. This is a required field.

Example: `12345`

### Output Variable
Specify a name for the variable that will store the list details. This variable will contain the full response from the HeyReach API, including:
- id
- name
- totalItemsCount
- listType
- creationTime
- campaignIds (array)

## Response Example

```json
{
  "id": 12345,
  "name": "My Sales Leads",
  "totalItemsCount": 250,
  "listType": null,
  "creationTime": "2023-01-15T10:30:45Z",
  "campaignIds": [
    67890,
    67891
  ]
}
```

## Error Handling

The connector will handle the following error scenarios:
- Invalid API key (401 Unauthorized)
- List not found (404 Not Found)
- Rate limiting (429 Too Many Requests)

If an error occurs, the connector will throw an exception with details about the error.