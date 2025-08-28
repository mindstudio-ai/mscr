# Delete Product Variation

This action permanently deletes a product variation from your WooCommerce store.

## Prerequisites
- You need to have WooCommerce API credentials configured (Consumer Key and Consumer Secret)
- You need to know both the parent product ID and the variation ID you want to delete

## Configuration

### Product ID
Enter the ID of the parent product that contains the variation you want to delete. This is a numeric value that can be found in your WooCommerce admin dashboard when viewing products.

Example: `123`

### Variation ID
Enter the ID of the specific variation you want to delete. This is a numeric value that can be found by viewing the variations of a product in your WooCommerce admin dashboard.

Example: `456`

### Force Delete
WooCommerce requires this parameter to be set to "Yes" to permanently delete a variation. Product variations don't support being moved to trash first.

### Output Variable
The name of the variable that will store the deleted variation data. This variable will contain all the information about the variation that was deleted.

## Notes
- This action cannot be undone - the variation will be permanently deleted
- The action returns the complete data of the deleted variation
- You must have proper permissions in your WooCommerce store to delete variations