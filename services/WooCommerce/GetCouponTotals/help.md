# Get Coupon Totals

This connector retrieves totals for all coupons in your WooCommerce store, grouped by coupon type.

## What it does

The connector makes a request to your WooCommerce store and returns a summary of your coupons broken down by type (percentage discount, fixed cart discount, fixed product discount, etc.), including the count of each type.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with the REST API enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Added these credentials to the WooCommerce service configuration in MindStudio

## Configuration

### Output Variable

Enter a name for the variable that will store the coupon totals data. This variable will contain an array of objects, with each object representing a coupon type.

## Output Format

The output will be an array of objects with this structure:

```json
[
  { "slug": "percent", "name": "Percentage discount", "total": 2 },
  { "slug": "fixed_cart", "name": "Fixed cart discount", "total": 1 },
  { "slug": "fixed_product", "name": "Fixed product discount", "total": 1 }
]
```

Each object in the array contains:
- `slug`: The coupon type identifier
- `name`: The human-readable name of the coupon type
- `total`: The count of coupons of this type

## Common Use Cases

- Analyzing which types of coupons are most used in your store
- Creating reports on coupon distribution
- Monitoring coupon creation patterns