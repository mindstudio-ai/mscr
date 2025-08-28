# Search for Accounts

This connector allows you to search for accounts in your Apollo database using various filters and parameters.

## How to use this connector

### Search Parameters

- **Organization Name**: Enter keywords to search for in account names. For example, entering "microsoft" will find accounts with "microsoft" in their name.
- **Account Stage IDs**: Enter a comma-separated list of account stage IDs to filter by. For example: `61b8e913e0f4d2012e3af74e,61b8e913e0f4d2012e3af74f`. You can get these IDs by calling the List Account Stages endpoint in Apollo.

### Sorting and Pagination

- **Sort By**: Choose a field to sort the results by:
  - Last Activity Date: Sort by the most recent activity date
  - Creation Date: Sort by when the account was created
  - Updated Date: Sort by when the account was last updated
  
- **Sort Order**: Choose whether to sort in ascending or descending order
  
- **Results Per Page**: Specify how many results to return per page (maximum 100)
  
- **Page Number**: Specify which page of results to retrieve

### Output

The connector will return a JSON object containing:
- Pagination information
- List of accounts matching your search criteria

Each account in the results will include details such as:
- ID
- Domain
- Name
- Phone
- Account stage
- Creation date
- And more

## Example Output

```json
{
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_entries": 25,
    "total_pages": 3
  },
  "accounts": [
    {
      "id": "66e9abf95ac32901b20d1a0d",
      "domain": "example.com",
      "name": "Example Company",
      "phone": "555-303-8080",
      "account_stage_id": "61b8e913e0f4d2012e3af74e",
      "created_at": "2024-09-17T16:19:05.663Z"
    },
    // More accounts...
  ]
}
```

## Notes

- This endpoint has a display limit of 50,000 records (100 records per page, up to 500 pages)
- This feature is not accessible to Apollo users on free plans