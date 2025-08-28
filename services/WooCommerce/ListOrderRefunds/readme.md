# List Order Refunds

This connector retrieves a list of refunds for a specific WooCommerce order.

## Configuration

### Order Information
- **Order ID**: Enter the numeric ID of the WooCommerce order for which you want to retrieve refunds. This is required.

### Pagination Options
- **Page**: The page number of results to retrieve (default: 1)
- **Results Per Page**: Number of refunds to return per page (default: 10)

### Advanced Filtering
- **Search**: Optional text to filter refunds
- **After Date**: Show refunds created after this date (ISO8601 format, e.g., `2023-01-01T00:00:00`)
- **Before Date**: Show refunds created before this date (ISO8601 format, e.g., `2023-12-31T23:59:59`)
- **Sort Order**: Choose between descending (newest first) or ascending (oldest first)
- **Sort By**: Choose the field to sort results by (date, ID, or modified date)

### Output
- **Output Variable**: The name of the variable where the refund data will be stored

## Example Response

The connector returns an array of refund objects. Each refund object contains information like:

```json
{
  "id": 726,
  "date_created": "2017-03-21T17:07:11",
  "date_created_gmt": "2017-03-21T20:07:11",
  "amount": "10.00",
  "reason": "",
  "refunded_by": 1,
  "refunded_payment": false,
  "meta_data": [],
  "line_items": []
}
```

## Notes
- Make sure your WooCommerce store URL, API Consumer Key, and Consumer Secret are configured in the service settings.
- If no refunds exist for the specified order, an empty array will be returned.