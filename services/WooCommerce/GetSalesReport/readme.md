# Get Sales Report

This connector retrieves sales reports from your WooCommerce store for a specified time period or date range.

## Configuration

### Date Range Type
Choose how you want to specify the time period for the report:
- **Predefined Period**: Use standard time periods like "This Week" or "This Month"
- **Custom Date Range**: Specify exact start and end dates

### Period
If you selected "Predefined Period", choose one of the following options:
- Today
- This Week
- This Month
- Last Month
- This Year

### Start Date & End Date
If you selected "Custom Date Range", enter the start and end dates in YYYY-MM-DD format (e.g., 2023-01-01).

## Output

The connector will return a comprehensive sales report that includes:
- Total sales amount
- Net sales
- Average sales
- Total number of orders
- Total items sold
- Tax, shipping, refund, and discount information
- Daily breakdown of sales data

## Example Response

```json
{
  "total_sales": "14.00",
  "net_sales": "4.00",
  "average_sales": "2.00",
  "total_orders": 3,
  "total_items": 6,
  "total_tax": "0.00",
  "total_shipping": "10.00",
  "total_refunds": 0,
  "total_discount": "0.00",
  "totals_grouped_by": "day",
  "totals": {
    "2023-01-01": {
      "sales": "14.00",
      "orders": 3,
      "items": 6,
      "tax": "0.00",
      "shipping": "10.00",
      "discount": "0.00",
      "customers": 0
    }
  },
  "total_customers": 0
}
```

## Requirements

Make sure you have configured your WooCommerce API credentials in the connector settings:
- Store URL
- API Consumer Key
- API Consumer Secret

These can be created in your WooCommerce admin under WooCommerce → Settings → Advanced → REST API.