# Update Product Category

This action allows you to update an existing product category in your WooCommerce store.

## Configuration

### Category ID
Enter the ID of the category you want to update. This is a required field and can be found in your WooCommerce admin panel under Products > Categories.

### Name
The name of the category as it appears in your store. Leave blank if you don't want to change it.

### Slug
The URL-friendly version of the name. This is what appears in the URL. Leave blank if you don't want to change it.

### Parent Category ID
If this is a subcategory, enter the ID of the parent category. Use "0" for a top-level category. Leave blank if you don't want to change it.

### Description
A detailed description of the category. This may appear on your store depending on your theme. Leave blank if you don't want to change it.

### Display Type
Choose how products in this category should be displayed:
- **Default**: Use the store's default display setting
- **Products**: Show products only
- **Subcategories**: Show subcategories only
- **Both**: Show both products and subcategories

### Menu Order
Control the order in which categories appear in menus (lower numbers appear first). Leave blank if you don't want to change it.

## Output

The action will return the complete updated category object, including all fields and metadata from WooCommerce.

## Example

Updating a category with ID 9 to change its description:
- **Category ID**: 9
- **Description**: All kinds of clothes.
- Leave other fields blank to keep their current values