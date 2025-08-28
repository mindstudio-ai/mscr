# Delete Product Category

This action permanently deletes a product category from your WooCommerce store.

## Prerequisites

- You need a WooCommerce store with API access configured
- You must have the Consumer Key and Consumer Secret for your WooCommerce API
- You need administrator permissions to delete categories

## Configuration

### Category Details

- **Category ID**: Enter the numeric ID of the category you want to delete. You can find category IDs in your WooCommerce admin panel under Products > Categories, or by using the "List Product Categories" action.

### Advanced Options

- **Force Delete**: This must be set to "Yes" as WooCommerce categories don't support moving to trash - they can only be permanently deleted.

### Output

- **Store Result As**: Enter a variable name to store the details of the deleted category. This will contain information like the category's name, slug, description, and other metadata.

## Important Notes

- This action permanently deletes the category. This operation cannot be undone.
- Deleting a category does not delete the products within that category. Products will remain in your store but will no longer be associated with the deleted category.
- If you delete a parent category that has subcategories, the subcategories will be reassigned to the parent's parent (or to the root level if there is no grandparent).

## Example Response

The output variable will contain the full details of the deleted category, similar to:

```json
{
  "id": 9,
  "name": "Clothing",
  "slug": "clothing",
  "parent": 0,
  "description": "All kinds of clothes.",
  "display": "default",
  "image": {
    "id": 730,
    "src": "https://example.com/wp-content/uploads/2017/03/T_2_front.jpg",
    "name": "",
    "alt": ""
  },
  "count": 36
}
```