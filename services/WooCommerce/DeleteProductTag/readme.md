# Delete Product Tag

This connector allows you to permanently delete a product tag from your WooCommerce store.

## Important Notes

- This action **permanently deletes** the product tag and cannot be undone
- Trash is not supported for product tags in WooCommerce
- You must confirm deletion by selecting "Yes" in the confirmation dropdown

## Configuration

### Tag ID

Enter the numeric ID of the product tag you want to delete. You can find tag IDs in your WooCommerce admin panel under Products > Tags, or by using the "List Product Tags" connector.

Example: `34`

### Confirm Deletion

For safety, you must explicitly confirm that you want to delete the tag by selecting "Yes, permanently delete this tag" from the dropdown.

### Output Variable

The connector will return information about the deleted tag, including:

```json
{
  "id": 34,
  "name": "Leather Shoes",
  "slug": "leather-shoes",
  "description": "Genuine leather.",
  "count": 0,
  "_links": {
    "self": [{"href": "https://example.com/wp-json/wc/v3/products/tags/34"}],
    "collection": [{"href": "https://example.com/wp-json/wc/v3/products/tags"}]
  }
}
```

## Troubleshooting

- **404 Error**: The tag ID doesn't exist
- **401 Error**: Authentication failed. Check your WooCommerce API credentials
- **400 Error**: Missing required parameters or invalid input