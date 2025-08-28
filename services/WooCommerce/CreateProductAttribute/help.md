# Create Product Attribute

This action creates a new product attribute in your WooCommerce store. Product attributes allow you to define additional data for your products, such as color, size, material, etc.

## Configuration

### Attribute Name (Required)
Enter the name of the attribute you want to create (e.g., "Color", "Size", "Material").

### Attribute Slug (Optional)
The unique identifier for this attribute in the system. Best practices:
- Start with "pa_" (e.g., "pa_color", "pa_size")
- Use only lowercase letters, numbers, and hyphens
- No spaces

If left blank, WooCommerce will automatically generate a slug based on the attribute name.

### Order By (Optional)
Controls how the terms within this attribute will be sorted:
- **Menu Order**: Sort manually (drag and drop in admin)
- **Name**: Sort alphabetically by term name
- **Name Numeric**: Sort numerically by term name
- **ID**: Sort by term ID

### Enable Archives (Optional)
When enabled, WooCommerce will create archive pages for each term in this attribute, allowing customers to browse products by attribute (e.g., see all "Red" products).

### Output Variable (Required)
The name of the variable that will store the created attribute information. This variable will contain all details about the new attribute, including its ID, which you can use in subsequent actions.

## Example Response

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