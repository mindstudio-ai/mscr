# Create Product Tag

This action creates a new product tag in your WooCommerce store.

## Prerequisites

Before using this action, make sure you have:
- A WooCommerce store
- WooCommerce REST API credentials (Consumer Key and Consumer Secret)
- Configured these credentials in the WooCommerce service settings

## Configuration

### Name (Required)
Enter the name of the product tag you want to create. This is how the tag will appear in your WooCommerce admin and on your site.

Example: `Leather Shoes`

### Slug (Optional)
A URL-friendly version of the tag name. This will be used in URLs pointing to the tag archive page.

- If left blank, WooCommerce will automatically generate a slug from the name
- Use only lowercase letters, numbers, and hyphens
- No spaces allowed

Example: `leather-shoes`

### Description (Optional)
HTML description of the tag. This may be displayed on your store depending on your theme.

Example: `<p>Premium quality leather shoes for all occasions.</p>`

### Output Variable (Required)
Name of the variable where the created tag information will be stored. This variable will contain the complete tag object including:
- id
- name
- slug
- description
- count (number of products with this tag)

## Example Response

```json
{
  "id": 34,
  "name": "Leather Shoes",
  "slug": "leather-shoes",
  "description": "",
  "count": 0,
  "_links": {
    "self": [{"href": "https://example.com/wp-json/wc/v3/products/tags/34"}],
    "collection": [{"href": "https://example.com/wp-json/wc/v3/products/tags"}]
  }
}
```

## Common Issues

- **400 Bad Request**: Check that your tag name is valid
- **401 Unauthorized**: Verify your WooCommerce API credentials
- **409 Conflict**: A tag with the same name or slug already exists