# Delete Refund

This action permanently deletes a refund from a WooCommerce order. Once deleted, the refund cannot be recovered.

## Prerequisites

- You need to have your WooCommerce store URL, API Consumer Key, and API Consumer Secret configured in the WooCommerce service settings.
- The refund must exist in your WooCommerce store.

## Configuration

### Refund Information

- **Order ID**: Enter the numeric ID of the order that contains the refund you want to delete. For example: `123`.
- **Refund ID**: Enter the numeric ID of the specific refund you want to delete. For example: `456`.

### Output

- **Output Variable**: Enter a name for the variable that will store the deleted refund data. This variable will contain information about the refund that was deleted.

## Example Response

The output variable will contain the deleted refund data in this format:

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

- Deletion is permanent. WooCommerce refunds do not support trashing.
- You must have appropriate permissions in your WooCommerce store to delete refunds.