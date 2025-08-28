# Get All Lists from HeyReach

This connector retrieves a paginated collection of all company and lead lists from your HeyReach account.

## Configuration

### List Filters

- **Keyword**: Optionally filter lists by name. For example, enter "prospects" to find lists with that word in the name.
- **List Type**: Choose the type of lists to retrieve:
  - **All Lists**: Retrieve both user and system lists
  - **User Lists**: Only retrieve lists created by users
  - **System Lists**: Only retrieve system-generated lists

### Pagination

- **Offset**: The number of items to skip. Use this for pagination (e.g., set to 10 to get the second page when limit is 10).
- **Limit**: Maximum number of lists to return per request. The maximum allowed value is 100.

### Output

- **Output Variable**: Name of the variable where the results will be stored. This variable will contain an object with:
  - `totalCount`: Total number of lists matching your criteria
  - `items`: Array of list objects with details like ID, name, item count, and creation time

## Example Response

```json
{
  "totalCount": 25,
  "items": [
    {
      "id": 12345,
      "name": "Sales Prospects Q2",
      "totalItemsCount": 87,
      "listType": "USER_LIST",
      "creationTime": "2023-04-15T10:30:45Z",
      "campaignIds": [123, 456]
    },
    {
      "id": 12346,
      "name": "Tech Companies",
      "totalItemsCount": 42,
      "listType": "USER_LIST",
      "creationTime": "2023-05-20T14:22:10Z",
      "campaignIds": [789]
    }
  ]
}
```

## Notes

- The API key is configured at the service level and doesn't need to be provided for each action.
- If you need more than 100 results, use multiple requests with different offset values.