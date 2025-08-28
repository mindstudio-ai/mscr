# Create WooCommerce Coupon

This action creates a new coupon in your WooCommerce store. Coupons can be used to offer discounts to your customers.

## Basic Configuration

- **Coupon Code**: Enter a unique code that customers will use at checkout (e.g., `SUMMER10`).
- **Discount Type**: Choose how the discount will be applied:
  - **Percentage discount**: A percentage off the entire cart (e.g., 10% off)
  - **Fixed cart discount**: A fixed amount off the entire cart (e.g., $10 off)
  - **Fixed product discount**: A fixed amount off each eligible product
- **Discount Amount**: Enter the numeric value of the discount (e.g., `10` for 10% or $10)
- **Description**: Optional internal note about the coupon's purpose

## Usage Restrictions

- **Individual Use Only**: If set to "Yes", this coupon cannot be combined with other coupons
- **Exclude Sale Items**: If set to "Yes", this coupon won't apply to products already on sale
- **Minimum Spend**: Optional minimum cart total required to use this coupon (e.g., `50.00`)
- **Maximum Spend**: Optional maximum cart total for which this coupon can be used (e.g., `200.00`)
- **Email Restrictions**: Optional comma-separated list of customer emails allowed to use this coupon

## Usage Limits

- **Usage Limit Per Coupon**: Optional maximum number of times this coupon can be used
- **Usage Limit Per User**: Optional maximum number of times each customer can use this coupon
- **Expiry Date**: Optional date when the coupon will expire (format: `YYYY-MM-DD`)

## Additional Options

- **Allow Free Shipping**: If set to "Yes", this coupon will also grant free shipping

## Output

- **Output Variable**: Name of the variable that will store the created coupon details

## Example

Creating a 15% discount coupon that expires at the end of the year:
- **Coupon Code**: HOLIDAY15
- **Discount Type**: Percentage discount
- **Discount Amount**: 15
- **Individual Use Only**: Yes
- **Minimum Spend**: 100.00
- **Expiry Date**: 2023-12-31