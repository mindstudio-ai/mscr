# Get Coupon

This action retrieves a single coupon by ID from your WooCommerce store.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store set up
2. API access configured in your WooCommerce store
3. The following credentials added to your MindStudio environment variables:
   - Store URL
   - API Consumer Key
   - API Consumer Secret

## Configuration

### Coupon Details

- **Coupon ID**: Enter the numeric ID of the coupon you want to retrieve. You can find this ID in your WooCommerce admin dashboard under Marketing > Coupons, or by viewing the URL when editing a coupon (e.g., `wp-admin/post.php?post=123&action=edit` where 123 is the ID).

### Output

- **Output Variable**: Enter a name for the variable that will store the coupon details. This variable will contain all coupon information including code, amount, discount type, expiration date, usage limits, etc.

## Example Response

The output variable will contain a JSON object with coupon details similar to:

```json
{
  "id": 719,
  "code": "summer2023",
  "amount": "10.00",
  "discount_type": "percent",
  "description": "Summer sale discount",
  "date_created": "2023-06-01T00:00:00",
  "date_expires": "2023-08-31T23:59:59",
  "usage_count": 42,
  "individual_use": true,
  "product_ids": [101, 102, 103],
  "excluded_product_ids": [],
  "usage_limit": 100,
  "usage_limit_per_user": 1,
  "free_shipping": false,
  "minimum_amount": "50.00"
}
```

## Troubleshooting

- If you receive a 404 error, verify that the coupon ID exists in your WooCommerce store.
- If you receive an authentication error, check that your API credentials are correct.
- Ensure your WooCommerce REST API is enabled and your user has appropriate permissions.