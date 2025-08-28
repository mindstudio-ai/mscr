# Delete Order

This connector allows you to delete a WooCommerce order from your store. You can choose to either move the order to trash or permanently delete it.

## Prerequisites

Before using this connector, make sure you have:
1. A WooCommerce store
2. API credentials (Consumer Key and Consumer Secret) with appropriate permissions
3. The Order ID of the order you want to delete

## Configuration

### Order Details

- **Order ID**: Enter the numeric ID of the order you want to delete. You can find this in your WooCommerce admin dashboard or through the "List Orders" connector.
  
- **Force Delete**: Choose whether to permanently delete the order or just move it to trash:
  - **No (Move to Trash)**: The order will be moved to trash and can be restored later
  - **Yes (Permanently Delete)**: The order will be permanently deleted and cannot be recovered

### Response

- **Output Variable**: Enter a name for the variable that will store the deleted order details. This variable will contain all the information about the deleted order, including its ID, status, customer details, line items, etc.

## Example Output

The output variable will contain the complete order object that was deleted, similar to:

```json
{
  "id": 727,
  "status": "trash",
  "currency": "USD",
  "date_created": "2023-03-22T20:49:26",
  "total": "38.24",
  "customer_id": 25,
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  },
  "line_items": [
    {
      "id": 315,
      "name": "Woo Album #1",
      "product_id": 24,
      "quantity": 2
    }
  ]
}
```

## Notes

- Permanently deleting an order cannot be undone
- You must have appropriate permissions in your WooCommerce store to delete orders
- This connector requires your WooCommerce REST API to be accessible