# Delete Tax Class

This action permanently deletes a tax class and all associated tax rates from your WooCommerce store.

## Configuration

### Tax Class Slug
Enter the unique identifier (slug) of the tax class you want to delete. This is typically a lowercase, hyphenated version of the tax class name.

Examples:
- `zero-rate`
- `reduced-rate`
- `standard`

### Confirm Deletion
You must explicitly confirm the deletion by selecting "Yes" from the dropdown. This is a safety measure since this action:
- Permanently deletes the tax class
- Removes all tax rates associated with the class
- Cannot be undone

### Result Variable
The connector will store the result of the deletion operation in this variable. The result includes details about the deleted tax class.

## Important Notes

- This operation requires proper WooCommerce API credentials with write/delete permissions for taxes
- The standard tax class cannot be deleted as it's the default class in WooCommerce
- After deletion, any products assigned to this tax class will automatically use the standard tax class

## Example Response

```json
{
  "slug": "zero-rate",
  "name": "Zero Rate",
  "_links": {
    "collection": [
      { "href": "https://your-store-domain.com/wp-json/wc/v3/taxes/classes" }
    ]
  }
}
```