# Delete Product Attribute Term

This action permanently deletes a product attribute term from your WooCommerce store.

## Prerequisites
- You must have admin access to your WooCommerce store
- You need your WooCommerce REST API credentials (Consumer Key and Consumer Secret)
- The store URL must be configured in the service settings

## Important Notes
- This action **permanently deletes** the term and cannot be undone
- The `force=true` parameter is automatically applied as WooCommerce requires it for deletion

## Configuration

### Attribute ID
Enter the numeric ID of the product attribute that contains the term you want to delete. You can find attribute IDs in your WooCommerce admin panel under Products > Attributes, or by using the "List Product Attributes" action.

### Term ID
Enter the numeric ID of the specific term you want to delete. You can find term IDs by using the "List Product Attribute Terms" action.

## Output
The action returns the data of the deleted term as confirmation of the deletion.

## Example Use Cases
- Removing outdated or incorrect product attribute terms
- Cleaning up your product taxonomy
- Automating store maintenance workflows