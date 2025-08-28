# Delete Product Attribute

This action permanently deletes a product attribute from your WooCommerce store. When you delete an attribute, all terms associated with it will also be deleted.

## Configuration

### Product Attribute
- **Attribute ID**: Enter the unique numeric ID of the product attribute you want to delete. You can find this ID in your WooCommerce admin panel under Products > Attributes, or by using the "List Product Attributes" action.

### Options
- **Force Delete**: This must be set to "Yes" as WooCommerce product attributes do not support trashing (soft delete).

### Output
- **Output Variable**: Choose a name for the variable that will store the deleted attribute data. This variable will contain information about the attribute that was deleted, including its ID, name, slug, and other properties.

## Example Response

The output variable will contain data similar to this:

```json
{
  "id": 1,
  "name": "Color",
  "slug": "pa_color",
  "type": "select",
  "order_by": "menu_order",
  "has_archives": true
}
```

## Important Notes

- This action permanently deletes the attribute and cannot be undone.
- You must have appropriate permissions in your WooCommerce store to delete attributes.
- Make sure you're using the correct Attribute ID to avoid accidentally deleting the wrong attribute.