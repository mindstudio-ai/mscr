# Update Product Attribute

This connector allows you to update an existing product attribute in your WooCommerce store.

## Prerequisites

- You need a WooCommerce store with the REST API enabled
- You need to have your WooCommerce API Consumer Key and Consumer Secret
- You need to know the ID of the attribute you want to update

## Configuration

### Attribute ID
Enter the numeric ID of the product attribute you want to update. You can find this in your WooCommerce admin panel or by using the "List Product Attributes" connector.

### Name (Optional)
The name of the attribute as displayed in your store (e.g., "Color", "Size", "Material").

### Slug (Optional)
The attribute slug used in URLs. Usually prefixed with `pa_` (e.g., `pa_color`, `pa_size`).

### Type (Optional)
The attribute type. Currently, WooCommerce only supports "select" as the default type.

### Order By (Optional)
Determines how attribute values are sorted:
- **Menu Order**: Sort by custom ordering
- **Name**: Sort alphabetically
- **Name (numeric)**: Sort numerically
- **ID**: Sort by term ID

### Has Archives (Optional)
Determines whether the attribute should have archive pages in your store:
- **Yes**: Enable archive pages for this attribute
- **No**: Disable archive pages

### Output Variable
The name of the variable that will store the updated attribute information. You can use this variable in subsequent steps of your workflow.

## Example Response

```json
{
  "id": 1,
  "name": "Color",
  "slug": "pa_color",
  "type": "select",
  "order_by": "name",
  "has_archives": true,
  "_links": {
    "self": [{ "href": "https://your-store.com/wp-json/wc/v3/products/attributes/1" }],
    "collection": [{ "href": "https://your-store.com/wp-json/wc/v3/products/attributes" }]
  }
}
```

## Notes

- You only need to include the fields you want to update. Leave other fields blank to keep their current values.
- Changes to attributes may affect products that use them, so use caution when updating.