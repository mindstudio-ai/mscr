# Delete Shipping Class

This action permanently deletes a WooCommerce shipping class by its ID.

## Prerequisites

- You need to have WooCommerce API credentials configured in your MindStudio service connections
- You need to know the ID of the shipping class you want to delete

## Configuration

### Shipping Class ID
Enter the numeric ID of the shipping class you want to delete. You can find this ID in your WooCommerce admin panel under Products > Shipping Classes, or by using the "List Shipping Classes" action.

Example: `32`

### Force Delete
This must be set to "Yes (Permanently Delete)" as WooCommerce doesn't support trashing for shipping classes.

### Output Variable
Enter a name for the variable that will store the deleted shipping class data. This variable will contain the complete shipping class object that was deleted.

## Response Data

The output variable will contain the deleted shipping class information in this format:

```json
{
  "id": 32,
  "name": "Priority",
  "slug": "priority",
  "description": "Priority mail.",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://yourstore.com/wp-json/wc/v3/products/shipping_classes/32" }],
    "collection": [{ "href": "https://yourstore.com/wp-json/wc/v3/products/shipping_classes" }]
  }
}
```

## Notes

- This action permanently deletes the shipping class and cannot be undone
- Make sure you're deleting the correct shipping class before proceeding