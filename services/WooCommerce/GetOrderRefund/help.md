# Get Order Refund

This connector retrieves detailed information about a specific refund for a WooCommerce order.

## Prerequisites

Before using this connector, you need:

1. A WooCommerce store with API access enabled
2. Your WooCommerce REST API Consumer Key and Consumer Secret
3. Your store URL
4. The Order ID and Refund ID you want to retrieve

## Configuration

### Order Information

- **Order ID**: Enter the numeric ID of the order containing the refund you want to retrieve. This is a required field.
  
- **Refund ID**: Enter the numeric ID of the specific refund you want to retrieve. This is a required field.

### Options

- **Decimal Points** (optional): Specify the number of decimal points to use in monetary values in the response. For example, entering "2" will return amounts like "10.00" instead of "10".

- **Output Variable**: Enter a name for the variable that will store the refund information. You can reference this variable in subsequent steps of your workflow.

## Output

The connector will return detailed information about the refund, including:

- Refund ID
- Date created
- Amount refunded
- Reason for refund
- Who processed the refund
- Payment refund status
- Line items included in the refund
- And other refund metadata

Example output:
```json
{
  "id": 726,
  "date_created": "2017-03-21T17:07:11",
  "date_created_gmt": "2017-03-21T20:07:11",
  "amount": "10.00",
  "reason": "Customer requested refund",
  "refunded_by": 1,
  "refunded_payment": false,
  "meta_data": [],
  "line_items": [],
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/orders/723/refunds/726" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/orders/723/refunds" }],
    "up": [{ "href": "https://example.com/wp-json/wc/v3/orders/723" }]
  }
}
```