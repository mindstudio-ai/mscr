# WooCommerce Batch Webhooks

This connector allows you to create, update, and delete multiple WooCommerce webhooks in a single operation.

## Configuration

### Create Webhooks

Enter a JSON array of webhooks you want to create. Each webhook object should include:
- `name`: A descriptive name for the webhook
- `topic`: The event to trigger the webhook (e.g., `order.created`, `customer.deleted`)
- `delivery_url`: The URL that will receive the webhook payload

Example:
```json
[
  {
    "name": "New Order Notification",
    "topic": "order.created",
    "delivery_url": "https://example.com/webhooks/new-order"
  },
  {
    "name": "Product Updated",
    "topic": "product.updated",
    "delivery_url": "https://example.com/webhooks/product-update"
  }
]
```

### Update Webhooks

Enter a JSON array of webhooks you want to update. Each webhook object must include:
- `id`: The ID of the existing webhook
- Any fields you want to update (name, status, topic, delivery_url, secret)

Example:
```json
[
  {
    "id": 123,
    "name": "Updated Order Notification",
    "status": "paused"
  },
  {
    "id": 456,
    "delivery_url": "https://new-example.com/webhooks/product"
  }
]
```

### Delete Webhooks

Enter a comma-separated list of webhook IDs you want to delete.

Example:
```
123, 456, 789
```

### Output Variable

The result of the batch operation will be stored in this variable. The output will include details of all created, updated, and deleted webhooks.

## Notes

- You must provide at least one operation (create, update, or delete)
- WooCommerce typically limits batch operations to 100 objects per request
- Common webhook topics include:
  - `order.created`, `order.updated`, `order.deleted`
  - `product.created`, `product.updated`, `product.deleted`
  - `customer.created`, `customer.updated`, `customer.deleted`
  - `coupon.created`, `coupon.updated`, `coupon.deleted`