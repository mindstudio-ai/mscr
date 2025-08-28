# Send Order Notification Email

This connector allows you to send order notification emails to customers using WooCommerce's email templates.

## What it does

Sends a specific email template to a customer based on an order ID. This is useful for:
- Manually triggering order status notifications
- Resending notifications that may have failed
- Sending notifications to alternative email addresses

## Configuration

### Order Information
- **Order ID**: Enter the numeric ID of the WooCommerce order. You can find this in your WooCommerce admin dashboard under Orders.

### Email Configuration
- **Email Template**: Select one of the following templates:
  - **Completed Order**: Notifies the customer that their order has been completed
  - **Order on Hold**: Notifies the customer that their order is on hold
  - **Invoice/Order Details**: Sends the order details/invoice to the customer
  - **Refunded Order**: Notifies the customer that their order has been refunded

- **Custom Email Address** (optional): If you want to send the notification to an email address other than the one associated with the order, enter it here.

- **Update Order Email**: Choose whether to update the order's billing email with the custom email address:
  - **No**: Only sends to the custom email but doesn't update the order
  - **Yes**: Updates the order's billing email with the custom email address

### Output
- **Result Variable**: Name of the variable that will store the result of the operation.

## Notes

- The email template must be valid for the current status of the order, or you'll receive an error.
- If you don't provide a custom email address, the notification will be sent to the email address associated with the order.
- Authentication is handled using your WooCommerce API credentials configured in the service settings.

## Example Response

```json
{
  "success": true,
  "message": "Email template \"Completed order\" sent to customer@example.com, via REST API.",
  "error": null
}
```