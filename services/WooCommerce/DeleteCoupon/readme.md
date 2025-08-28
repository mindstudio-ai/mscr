# Delete Coupon

This action allows you to delete a coupon from your WooCommerce store.

## Prerequisites

- You must have a WooCommerce store set up
- You need to have configured your WooCommerce API credentials in the connection settings:
  - Store URL
  - API Consumer Key
  - API Consumer Secret

## Configuration

### Coupon Details

- **Coupon ID**: Enter the numeric ID of the coupon you want to delete. You can find this in your WooCommerce admin dashboard or by using the "List Coupons" action.
- **Permanently Delete**: Choose whether to permanently delete the coupon:
  - **No**: The coupon will be moved to trash (can be restored later)
  - **Yes**: The coupon will be permanently deleted (cannot be restored)

### Response Handling

- **Output Variable**: Enter a name for the variable that will store the deleted coupon data. You can reference this variable in subsequent steps of your workflow.

## Output

The action returns the deleted coupon object with all its properties, including:

- `id`: The coupon ID
- `code`: The coupon code
- `amount`: The coupon amount
- `discount_type`: The type of discount
- Other coupon properties

## Example Use Cases

- Clean up expired or unused coupons
- Remove promotional coupons after a campaign ends
- Delete test coupons from your store

## Troubleshooting

If you encounter an error:
- Verify the coupon ID exists in your WooCommerce store
- Check that your API credentials have permission to delete coupons
- Ensure your WooCommerce REST API is enabled