# Get Orders Totals

This connector retrieves totals for orders by status from your WooCommerce store.

## What This Connector Does

The connector makes a request to your WooCommerce store's API to fetch the total number of orders grouped by status (pending, processing, completed, etc.). This is useful for:

- Getting a quick overview of your store's order status distribution
- Monitoring order fulfillment progress
- Creating dashboards with order status metrics

## Prerequisites

Before using this connector, you need to have:

1. A WooCommerce store with REST API access enabled
2. WooCommerce API credentials (Consumer Key and Consumer Secret)
3. Properly configured service connection in MindStudio with:
   - Your store URL (e.g., `https://example.com`)
   - Your API Consumer Key
   - Your API Consumer Secret

## Output Format

The connector returns an array of order status objects with the following structure:

```json
[
  { "slug": "pending", "name": "Pending payment", "total": 7 },
  { "slug": "processing", "name": "Processing", "total": 2 },
  { "slug": "on-hold", "name": "On hold", "total": 1 },
  { "slug": "completed", "name": "Completed", "total": 3 },
  { "slug": "cancelled", "name": "Cancelled", "total": 0 },
  { "slug": "refunded", "name": "Refunded", "total": 0 },
  { "slug": "failed", "name": "Failed", "total": 0 }
]
```

Each object contains:
- `slug`: The status identifier
- `name`: The human-readable status name
- `total`: The number of orders with this status

## Configuration

Simply specify the output variable name where you want to store the results.