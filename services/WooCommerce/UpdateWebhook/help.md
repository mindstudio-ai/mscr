# Update a WooCommerce Webhook

This connector allows you to update an existing webhook in your WooCommerce store. Webhooks let you receive notifications when specific events occur in your store, such as when an order is created or updated.

## Prerequisites

- You need a WooCommerce store with API access configured
- You need your WooCommerce Consumer Key and Consumer Secret
- You need to know the ID of the webhook you want to update

## Configuration

### Webhook Details

- **Webhook ID**: Enter the numeric ID of the webhook you want to update. You can find this in your WooCommerce admin dashboard under Settings > Advanced > Webhooks, or from the webhook's URL.

### Update Options

You only need to provide the fields you want to update. Any fields left blank will remain unchanged.

- **Name**: A descriptive name for the webhook (e.g., "New Order Notification")
- **Status**: Choose the webhook status:
  - **Active**: Webhook will receive and process events
  - **Paused**: Webhook is temporarily disabled but can be easily reactivated
  - **Disabled**: Webhook is turned off (note: webhooks are automatically disabled after 5 consecutive delivery failures)
- **Topic**: The event that triggers the webhook. Common formats include:
  - `order.created`
  - `order.updated`
  - `product.created`
  - `customer.updated`
- **Delivery URL**: The URL where webhook data will be sent when the event occurs
- **Secret**: A secret key used to generate a signature hash for webhook verification

### Output

- **Output Variable**: Name of the variable that will store the complete webhook object after updating

## Notes

- After updating a webhook, the connector returns the complete webhook object with all its properties
- If a webhook has been automatically disabled due to delivery failures, you can re-enable it by setting the status to "active"