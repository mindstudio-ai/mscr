# Create a WooCommerce Webhook

This connector creates a new webhook in your WooCommerce store. Webhooks allow your store to send notifications to external services when specific events occur.

## When to use this connector

Use this connector when you want to:
- Receive notifications when orders are created, updated, or deleted
- Track product changes in your store
- Monitor customer account activities
- Integrate WooCommerce with external systems that need real-time updates

## Configuration

### Webhook Name
Enter a descriptive name for your webhook (e.g., "New Order Notification" or "Product Update Alert").

### Event Topic
Select the specific event that will trigger this webhook:
- Order events (created, updated, deleted)
- Product events (created, updated, deleted)
- Customer events (created, updated, deleted)
- Coupon events (created, updated, deleted)

### Delivery URL
Enter the full URL where WooCommerce should send the webhook data. This must be a publicly accessible HTTP or HTTPS endpoint that can receive POST requests.

Example: `https://example.com/api/woocommerce-webhooks`

### Secret Key (Optional)
You can provide a custom secret key that WooCommerce will use to sign the webhook payload. This allows you to verify that incoming webhook requests are authentic.

If you leave this blank, WooCommerce will generate a default secret.

### Output Variable
The connector will store the complete webhook information (including the assigned ID, status, and other details) in this variable for use in subsequent steps.

## What happens next?

After creating the webhook:
1. WooCommerce will immediately activate it
2. When the selected event occurs, WooCommerce will send a POST request to your Delivery URL
3. The payload will include detailed information about the event that occurred

## Security Note

Ensure your Delivery URL endpoint is properly secured and can handle the incoming webhook requests. WooCommerce includes signature headers that you can use to verify the authenticity of incoming webhook requests.