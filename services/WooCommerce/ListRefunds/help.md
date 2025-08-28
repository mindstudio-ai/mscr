# List Refunds

This connector retrieves a list of refunds from your WooCommerce store.

## Prerequisites

- Your WooCommerce store URL
- WooCommerce REST API credentials (Consumer Key and Consumer Secret)
  - You can create these in your WordPress admin under WooCommerce > Settings > Advanced > REST API

## Configuration

### Query Parameters

- **Items Per Page**: Number of refunds to return per page (between 1-100). Default is 10.
- **Page Number**: Page number of results to return. Default is 1.
- **Sort Order**: Order of results (newest first or oldest first). Default is descending (newest first).
- **Sort By**: Field to sort refunds by. Options include date, ID, or modified date. Default is date.
- **Search Term**: Optional search term to filter refunds.
- **After Date**: Optional filter to return refunds created after this date. Use ISO8601 format (YYYY-MM-DDTHH:MM:SS).
  - Example: `2023-01-01T00:00:00`
- **Before Date**: Optional filter to return refunds created before this date. Use ISO8601 format (YYYY-MM-DDTHH:MM:SS).
  - Example: `2023-12-31T23:59:59`
- **Parent Order IDs**: Optional filter to return refunds for specific parent orders. Enter as comma-separated list.
  - Example: `123,456,789`

### Output

- **Output Variable**: Name of the variable where the list of refunds will be stored. This will contain an array of refund objects with details like ID, parent order ID, date created, amount, reason, and line items.

## Example Response

```json
[
  {
    "id": 726,
    "parent_id": 124,
    "date_created": "2017-03-21T17:07:11",
    "date_created_gmt": "2017-03-21T20:07:11",
    "amount": "10.00",
    "reason": "",
    "refunded_by": 1,
    "refunded_payment": false,
    "meta_data": [],
    "line_items": []
  }
]
```