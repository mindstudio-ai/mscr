# Delete Product Shipping Class

This action permanently deletes a shipping class from your WooCommerce store.

## Prerequisites
- You need to have administrator access to your WooCommerce store
- You need to have set up API credentials in your WooCommerce store settings

## Configuration

### Shipping Class ID
Enter the numeric ID of the shipping class you want to delete. You can find this ID in your WooCommerce admin panel under Products > Shipping Classes, or by using the "List Product Shipping Classes" action.

Example: `32`

### Output Variable
Specify a variable name to store the response data from the deletion operation. The response will contain details of the deleted shipping class.

## Important Notes
- This action permanently deletes the shipping class. This operation cannot be undone.
- The shipping class must not be in use by any products to be deleted successfully.
- The response will include the ID, name, slug, description, and other details of the deleted shipping class.

## Example Response
```json
{
  "id": 32,
  "name": "Priority",
  "slug": "priority",
  "description": "Priority mail.",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/products/shipping_classes/32" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/products/shipping_classes" }]
  }
}
```