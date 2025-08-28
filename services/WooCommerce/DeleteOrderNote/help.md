# Delete Order Note

This action allows you to permanently delete a specific note from a WooCommerce order.

## Configuration

### Order Information

- **Order ID**: Enter the numeric ID of the order containing the note you want to delete. This can be found in your WooCommerce admin dashboard.
- **Note ID**: Enter the numeric ID of the specific note you want to delete. You can find note IDs by viewing the order details or using the "List Order Notes" action.

### Options

- **Force Delete**: Select "Yes" to permanently delete the note. WooCommerce requires this parameter to be set to true as order notes do not support trashing.
- **Output Variable**: Enter a name for the variable that will store the deleted note information.

## Example Response

The output variable will contain the deleted note information in this format:

```json
{
  "id": 281,
  "author": "system",
  "date_created": "2017-03-21T16:46:41",
  "date_created_gmt": "2017-03-21T19:46:41",
  "note": "Order ok!!!",
  "customer_note": false,
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/orders/723/notes/281" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/orders/723/notes" }],
    "up": [{ "href": "https://example.com/wp-json/wc/v3/orders/723" }]
  }
}
```

## Requirements

This action requires your WooCommerce store URL, API Consumer Key, and API Consumer Secret to be configured in the WooCommerce service settings.