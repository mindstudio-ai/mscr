# List Coupons

This connector retrieves a list of coupons from your WooCommerce store with optional filtering and pagination options.

## Prerequisites

- You must have a WooCommerce store set up
- You need to have configured your WooCommerce API credentials in the connector settings:
  - Store URL
  - API Consumer Key
  - API Consumer Secret

## Configuration Options

### Pagination

- **Page Number**: Which page of results to return (default: 1)
- **Results Per Page**: Number of coupons to display per page, up to 100 (default: 10)

### Filtering Options

- **Search Term**: Search for coupons by matching text in the coupon code
- **Coupon Code**: Filter by a specific coupon code (e.g., "SUMMER2023")
- **Order By**: Sort results by a specific field (date, ID, title, etc.)
- **Order Direction**: Sort in ascending or descending order

### Output

- **Output Variable**: The name of the variable where the list of coupons will be stored

## Example Output

The connector returns an array of coupon objects. Each coupon object contains information like:

```json
[
  {
    "id": 719,
    "code": "10off",
    "amount": "10.00",
    "date_created": "2023-03-22T21:39:27",
    "discount_type": "percent",
    "description": "10% discount for all products",
    "date_expires": null,
    "usage_count": 2,
    "individual_use": true,
    "usage_limit": 100,
    "usage_limit_per_user": 1,
    "free_shipping": false,
    "minimum_amount": "50.00"
    // Additional coupon properties...
  },
  // More coupons...
]
```

## Notes

- For best performance, use specific filters when possible
- The maximum number of results per page is 100