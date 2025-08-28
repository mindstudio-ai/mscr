# Get Order Email Templates

This connector retrieves a list of available email templates for a specific WooCommerce order. These templates can be used with the send_email endpoint.

## Prerequisites

You need to have the following WooCommerce API credentials configured in your environment:
- Store URL
- API Consumer Key
- API Consumer Secret

If you haven't set these up yet, you can create them in your WooCommerce admin dashboard under **WooCommerce → Settings → Advanced → REST API**.

## Configuration

### Order Information

- **Order ID**: Enter the numeric ID of the WooCommerce order for which you want to retrieve available email templates. You can find this ID in your WooCommerce admin dashboard under Orders.

### Output

- **Output Variable**: Specify a variable name to store the list of available email templates. This will contain an array of template objects with the following structure:
  ```json
  [
    {
      "id": "customer_completed_order",
      "title": "Completed order",
      "description": "Order complete emails are sent to customers when their orders are marked completed..."
    },
    {
      "id": "customer_invoice",
      "title": "Order details",
      "description": "Order detail emails can be sent to customers containing their order information..."
    }
  ]
  ```

## Usage Tips

- The returned template IDs can be used with the "Send Order Email" action to send specific email templates to customers.
- If the order ID doesn't exist, the connector will return an appropriate error message.