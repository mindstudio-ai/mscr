# Batch Update Coupons

This connector allows you to create, update, and delete multiple WooCommerce coupons in a single operation.

## Prerequisites

- A WooCommerce store with REST API access
- Your WooCommerce Consumer Key and Consumer Secret
- Your store URL

## Configuration

### Create Coupons

Enter a JSON array of coupon objects you want to create. Each coupon must have at least a `code` field.

**Example:**
```json
[
  {
    "code": "summer25",
    "discount_type": "percent",
    "amount": "25",
    "individual_use": true,
    "exclude_sale_items": true,
    "minimum_amount": "50.00"
  },
  {
    "code": "freeship",
    "discount_type": "fixed_cart",
    "amount": "0",
    "free_shipping": true
  }
]
```

### Update Coupons

Enter a JSON array of coupon objects you want to update. Each object must include an `id` field and the fields you want to modify.

**Example:**
```json
[
  {
    "id": 123,
    "amount": "30",
    "minimum_amount": "75.00"
  },
  {
    "id": 456,
    "date_expires": "2023-12-31"
  }
]
```

### Delete Coupons

Enter a JSON array of coupon IDs you want to delete.

**Example:**
```json
[789, 1011]
```

### Output Variable

Enter a name for the variable that will store the results of the batch operation. The output will contain information about the created, updated, and deleted coupons.

## Common Coupon Fields

- `code` (required for new coupons): Coupon code
- `discount_type`: "percent", "fixed_cart", or "fixed_product"
- `amount`: Discount amount as string (e.g., "10")
- `individual_use`: Boolean (true/false)
- `exclude_sale_items`: Boolean (true/false)
- `minimum_amount`: Minimum order amount as string (e.g., "50.00")
- `maximum_amount`: Maximum order amount as string (e.g., "100.00")
- `free_shipping`: Boolean (true/false)
- `product_ids`: Array of product IDs the coupon applies to
- `excluded_product_ids`: Array of product IDs the coupon doesn't apply to
- `usage_limit`: Maximum number of times the coupon can be used
- `date_expires`: Expiration date (e.g., "2023-12-31")

## Notes

- You must specify at least one operation (create, update, or delete)
- WooCommerce typically limits batch operations to 100 total objects by default