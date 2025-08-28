# Get Reviews Totals

This action retrieves the totals for product reviews by rating from your WooCommerce store. It returns a breakdown of how many reviews exist for each star rating (1-5).

## Prerequisites

Before using this action, you need to set up the WooCommerce service with:
- Your store URL (e.g., https://example.com)
- Your WooCommerce API Consumer Key
- Your WooCommerce API Consumer Secret

If you haven't created API credentials yet, you can do so in your WordPress admin panel under WooCommerce → Settings → Advanced → REST API.

## Configuration

This action doesn't require any input parameters. You only need to specify:

- **Output Variable**: Name of the variable where the review totals data will be stored

## Output Format

The action returns an array of objects with the following structure:

```json
[
  { "slug": "rated_1_out_of_5", "name": "Rated 1 out of 5", "total": 1 },
  { "slug": "rated_2_out_of_5", "name": "Rated 2 out of 5", "total": 0 },
  { "slug": "rated_3_out_of_5", "name": "Rated 3 out of 5", "total": 3 },
  { "slug": "rated_4_out_of_5", "name": "Rated 4 out of 5", "total": 0 },
  { "slug": "rated_5_out_of_5", "name": "Rated 5 out of 5", "total": 4 }
]
```

Each object in the array represents a rating level and includes:
- `slug`: The rating identifier
- `name`: The human-readable rating description
- `total`: The number of reviews with this rating