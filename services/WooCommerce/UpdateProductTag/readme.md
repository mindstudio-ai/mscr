# Update Product Tag

This action allows you to update an existing product tag in your WooCommerce store.

## Configuration

### Tag ID
Enter the ID of the product tag you want to update. This is a required field.
Example: `34`

### Tag Name
Enter the new name for the product tag. Leave empty if you don't want to change the name.
Example: `Leather Shoes`

### Tag Slug
Enter the new slug for the product tag. The slug is used in URLs and should be URL-friendly.
Leave empty if you don't want to change the slug or if you want WooCommerce to auto-generate it from the name.
Example: `leather-shoes`

### Tag Description
Enter the new description for the product tag. This can be a longer text explaining what the tag represents.
Leave empty if you don't want to change the description.
Example: `Genuine leather products of the highest quality.`

### Output Variable
Enter a name for the variable that will store the updated tag information. This variable will contain all the tag details returned by WooCommerce, including ID, name, slug, description, and count.

## Notes

- You must provide at least one field to update (name, slug, or description).
- The Tag ID is required to identify which tag to update.
- The response will include the complete updated tag object.