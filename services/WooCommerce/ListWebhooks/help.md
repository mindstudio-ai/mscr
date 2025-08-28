# List Webhooks

This connector retrieves a paginated list of webhooks from your WooCommerce store.

## Prerequisites

Make sure you have:
1. A WooCommerce store URL
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)

If you don't have API credentials yet, you can create them in your WordPress admin panel under **WooCommerce → Settings → Advanced → REST API**.

## Configuration Options

### Filter Options

- **Status**: Filter webhooks by their current status (All, Active, Paused, or Disabled)
- **Page**: The page number of results to retrieve (default: 1)
- **Per Page**: Number of results to show per page (default: 10)
- **Search**: Optional search term to filter webhooks by name
- **Order By**: Sort the results by Date, ID, or Title
- **Order**: Sort in Ascending or Descending order

### Output

- **Output Variable**: The variable name where the list of webhooks will be stored

## Output Format

The connector returns an array of webhook objects. Each webhook contains:

```json
{
  "id": 143,
  "name": "Customer created",
  "status": "active",
  "topic": "customer.created",
  "resource": "customer",
  "event": "created",
  "hooks": [
    "user_register",
    "woocommerce_created_customer",
    "woocommerce_api_create_customer"
  ],
  "delivery_url": "http://example.com/webhook-endpoint",
  "date_created": "2023-05-15T23:17:52",
  "date_created_gmt": "2023-05-15T20:17:52",
  "date_modified": "2023-05-15T23:17:52",
  "date_modified_gmt": "2023-05-15T20:17:52"
}
```

You can use this data in subsequent steps of your workflow to process or display webhook information.