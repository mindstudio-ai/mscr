# List Publications

This connector retrieves all publications associated with your beehiiv API key. Publications are the newsletters you've created in your beehiiv account.

## Configuration Options

### Publication Options

- **Include Publication Stats**: Choose what statistics to include with your publications:
  - **None**: No statistics included (fastest option)
  - **All Stats**: Include all available statistics
  - **Active Subscriptions Only**: Only include active subscription counts
  - **Premium Subscriptions Only**: Only include premium subscription counts
  - **Free Subscriptions Only**: Only include free subscription counts

- **Results Per Page**: Number of publications to return per page (between 1-100)

- **Page Number**: The page of results to retrieve (starts at 1)

### Sorting Options

- **Sort Direction**: Choose how to sort your publications:
  - **Ascending**: Sort from oldest to newest or A to Z
  - **Descending**: Sort from newest to oldest or Z to A

- **Sort By**: Choose which field to sort by:
  - **Creation Date**: Sort by when the publication was created
  - **Publication Name**: Sort alphabetically by publication name

### Output

- **Output Variable**: Name of the variable that will store the list of publications

## Example Response

The output will contain your publication data in this format:

```json
{
  "data": [
    {
      "id": "pub_ad76629e-4a39-43ad-8055-0ee89dc6db15",
      "name": "Bee Informed",
      "organization_name": "Barry's Hiiv",
      "referral_program_enabled": true,
      "created": 1715698529,
      "stats": {
        "active_subscriptions": 12,
        "active_premium_subscriptions": 2,
        "active_free_subscriptions": 10,
        "average_open_rate": 0.8,
        "average_click_rate": 0.45
      }
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 1,
  "total_pages": 1
}
```