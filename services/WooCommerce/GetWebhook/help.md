# Get Webhook

This connector retrieves detailed information about a specific WooCommerce webhook using its ID.

## Prerequisites

Before using this connector, you need to:

1. Have a WooCommerce store set up
2. Have API credentials (Consumer Key and Consumer Secret) with appropriate permissions
3. Know the ID of the webhook you want to retrieve

## Configuration

### Webhook Details

- **Webhook ID**: Enter the numeric ID of the webhook you want to retrieve (e.g., `142`)

### Output

- **Output Variable**: Specify a name for the variable that will store the webhook details

## Example Response

The connector will return a JSON object with webhook details like:

```json
{
  "id": 142,
  "name": "Order updated",
  "status": "active",
  "topic": "order.updated",
  "resource": "order",
  "event": "updated",
  "hooks": [
    "woocommerce_process_shop_order_meta",
    "woocommerce_api_edit_order",
    "woocommerce_order_edit_status",
    "woocommerce_order_status_changed"
  ],
  "delivery_url": "http://requestb.in/1g0sxmo1",
  "date_created": "2016-05-15T23:17:52",
  "date_created_gmt": "2016-05-15T20:17:52",
  "date_modified": "2016-05-15T23:17:52",
  "date_modified_gmt": "2016-05-15T20:17:52"
}
```

## Troubleshooting

- If you receive a 404 error, verify that the webhook ID exists in your WooCommerce store
- If you receive authentication errors, check your API credentials in the connector settings