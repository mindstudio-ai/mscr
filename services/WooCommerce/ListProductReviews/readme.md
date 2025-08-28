# List Product Reviews

This connector retrieves product reviews from your WooCommerce store with optional filtering and pagination options.

## Configuration

### Review Filters

- **Product IDs**: Enter a comma-separated list of product IDs to filter reviews by specific products (e.g., `123, 456, 789`). Leave empty to get reviews for all products.

- **Status**: Select the status of reviews to retrieve:
  - All: Retrieve reviews with any status
  - Approved: Only retrieve approved reviews (default)
  - Hold: Only retrieve reviews on hold
  - Spam: Only retrieve reviews marked as spam
  - Trash: Only retrieve reviews in trash

- **Sort Order**: Choose how to order the results:
  - Newest First (descending): Shows newest reviews first (default)
  - Oldest First (ascending): Shows oldest reviews first

- **Sort By**: Choose which field to sort by:
  - Date: Sort by review date (default)
  - ID: Sort by review ID
  - Product: Sort by product ID

### Pagination

- **Results Per Page**: Number of reviews to return per page (default: 10, max: 100)

- **Page Number**: The page of results to return (default: 1)

- **Search Term**: Optionally filter reviews that contain this search term

- **Output Variable**: Name of the variable where the results will be stored. This will contain an array of review objects.

## Output Format

The connector returns an array of review objects with the following properties:

```json
[
  {
    "id": 22,
    "date_created": "2018-10-18T17:59:17",
    "product_id": 22,
    "status": "approved",
    "reviewer": "John Doe",
    "reviewer_email": "john.doe@example.com",
    "review": "Nice album!",
    "rating": 5,
    "verified": false
  },
  ...
]
```

## Authentication

This connector uses your WooCommerce API credentials configured in the service settings:
- Store URL
- API Consumer Key
- API Consumer Secret