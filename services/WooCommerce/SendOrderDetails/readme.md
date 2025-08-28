# Send Order Details to Customer

This action sends an email to a customer with their order details from your WooCommerce store.

## When to use this action

Use this action when you want to:
- Manually trigger an order confirmation email to a customer
- Send order details to an email address different from the billing email
- Resend order details if the customer didn't receive the original email

## Configuration

### Order Information
- **Order ID**: Enter the numeric ID of the WooCommerce order for which to send details.

### Email Options
- **Email Address**: (Optional) The email address to send the order details to. This is required in two cases:
  1. If the order doesn't have a billing email
  2. If you want to send to a different email than the one on the order (in this case, you must also set "Force Email Update" to "Yes")

- **Force Email Update**: Choose whether to overwrite the existing billing email with the provided email address.
  - **No**: Use the order's existing billing email (default)
  - **Yes**: Update the order's billing email with the email you provided

### Response
- **Output Variable**: Name of the variable that will store the response message from WooCommerce.

## Example Response

The output variable will contain a message like:
```
Order details sent to customer@example.com, via REST API.
```

Or if you updated the email:
```
Billing email updated to somebody@example.com. Order details sent to somebody@example.com, via REST API.
```

## Notes

- This action requires your WooCommerce store URL, API Consumer Key, and API Consumer Secret to be configured in the WooCommerce service settings.
- The order must exist in your WooCommerce store.
- If the order has no billing email and you don't provide one, the action will fail.