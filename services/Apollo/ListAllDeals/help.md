# List All Deals

This connector retrieves all deals from your Apollo account. It requires a master API key to function properly.

## Prerequisites

- You must have an Apollo account with deals created
- You need a master API key (not a regular API key)
- This feature is not accessible to Apollo users on free plans

## Configuration Options

### Sorting and Pagination

- **Sort By Field**: Choose how to sort the returned deals:
  - **Amount (largest first)**: Sort by deal value, with largest amounts first
  - **Closed Status**: Deals that have been closed will appear first
  - **Won Status**: Deals that have been won will appear first

- **Page Number**: The page of results to retrieve (starts at 1)
  - Use this with "Results Per Page" for navigating through large result sets

- **Results Per Page**: How many deals to return in each request
  - Limiting this number improves performance for large datasets

### Output

- **Output Variable**: Name of the variable where the deals data will be stored
  - This will contain an array of deal objects with details like ID, amount, name, etc.
  - Also includes pagination information

## Example Response Structure

```json
{
  "opportunities": [
    {
      "id": "66e09ea8e3cfcf01b2208ec7",
      "team_id": "6095a710bd01d100a506d4ac",
      "owner_id": "66302798d03b9601c7934ebf",
      "amount": 9999999999,
      "closed_date": "2026-10-15T00:00:00.000+00:00",
      "account_id": "60afffecbff6de00a4b82be7",
      "is_closed": false,
      "is_won": false,
      "name": "Ridiculously Massive Space Deal",
      "stage_name": null,
      // additional fields...
    }
    // more deals...
  ],
  "pagination": {
    "page": 1,
    "per_page": 25,
    "total_entries": 100,
    "total_pages": 4
  }
}
```

## Troubleshooting

- If you receive a 403 Forbidden error, ensure you're using a master API key
- If you receive a 429 error, you've hit the rate limit and should try again later