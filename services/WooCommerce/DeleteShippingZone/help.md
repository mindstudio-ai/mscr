# Delete Shipping Zone

This action permanently deletes a shipping zone from your WooCommerce store.

## Prerequisites
- You need admin access to your WooCommerce store
- You need to have set up your WooCommerce API credentials in the connector settings

## Configuration

### Shipping Zone ID
Enter the ID of the shipping zone you want to delete. You can find this ID in your WooCommerce admin panel under Shipping settings, or by using the "List Shipping Zones" action.

Example: `5`

### Force Delete
This must be set to "Yes" as WooCommerce shipping zones do not support trashing (soft delete).

### Output Variable
The name of the variable that will store the details of the deleted shipping zone. This variable will contain information about the zone that was deleted, including its ID, name, and order.

## Example Response

```json
{
  "id": 5,
  "name": "Brazil",
  "order": 1,
  "_links": {
    "self": [{ "href": "https://your-store.com/wp-json/wc/v3/shipping/zones/5" }],
    "collection": [{ "href": "https://your-store.com/wp-json/wc/v3/shipping/zones" }]
  }
}
```

## Notes
- This action permanently deletes the shipping zone and cannot be undone
- Make sure you have the correct zone ID before proceeding