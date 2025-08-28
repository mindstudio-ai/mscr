# Update a WooCommerce Coupon

This connector allows you to update an existing coupon in your WooCommerce store.

## Prerequisites

- You need a WooCommerce store with API access configured
- You need the Consumer Key and Consumer Secret for your WooCommerce API
- You need to know the ID of the coupon you want to update

## Configuration

### Coupon Details

- **Coupon ID**: Enter the numeric ID of the coupon you want to update. You can find this in your WooCommerce admin dashboard under Marketing > Coupons, or by viewing the URL when editing a coupon (e.g., `wp-admin/post.php?post=719&action=edit`).

### Coupon Properties

You only need to fill in the fields you want to update. Empty fields will be ignored.

- **Discount Amount**: The numerical value of the discount (without currency symbol). For percentage discounts, just enter the number (e.g., `10` for 10%).

- **Discount Type**: Choose how the discount should be applied:
  - Fixed cart discount: A fixed total discount for the entire cart
  - Percentage discount: A percentage discount for the entire cart
  - Fixed product discount: A fixed discount applied to selected products
  - Percentage product discount: A percentage discount applied to selected products

- **Description**: Internal note about the purpose of the coupon (not shown to customers).

- **Expiry Date**: The date when the coupon becomes invalid, in YYYY-MM-DD format (e.g., `2023-12-31`).

- **Minimum Spend**: The minimum order subtotal required to use the coupon.

- **Maximum Spend**: The maximum order subtotal allowed when using the coupon.

- **Individual Use Only**: If set to "Yes", this coupon cannot be used in conjunction with other coupons.

- **Exclude Sale Items**: If set to "Yes", this coupon cannot be applied to products that are on sale.

- **Usage Limit Per Coupon**: The maximum number of times this coupon can be used by all customers.

- **Usage Limit Per User**: The maximum number of times this coupon can be used by an individual customer.

### Output

- **Output Variable**: The name of the variable that will store the updated coupon information. You can use this variable in subsequent steps of your workflow.

## Example

To update a coupon with ID 719 to offer a 15% discount with a minimum spend of $50:

1. Set **Coupon ID** to `719`
2. Set **Discount Amount** to `15`
3. Set **Discount Type** to `Percentage discount`
4. Set **Minimum Spend** to `50`
5. Leave other fields blank to keep their current values
6. Set **Output Variable** to `updatedCoupon`