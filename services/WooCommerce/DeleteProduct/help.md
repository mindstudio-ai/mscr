# Delete a WooCommerce Product

This connector allows you to delete a product from your WooCommerce store by its ID.

## Configuration

### Product ID
Enter the numeric ID of the product you want to delete. You can find a product's ID in your WooCommerce dashboard or through the Products list.

Example: `123`

### Permanently Delete
Choose whether to permanently delete the product or just move it to trash:
- **Yes (permanent delete)**: The product will be completely removed from your database
- **No (move to trash)**: The product will be moved to trash and can be restored later

### Output Variable
Enter a name for the variable that will store information about the deleted product. This variable will contain details like the product ID, name, type, status, and price.

## Example Response

When the product is successfully deleted, the output variable will contain data similar to:

```json
{
  "id": 794,
  "name": "Premium Quality",
  "type": "simple",
  "status": "publish",
  "price": "24.54",
  "regular_price": "24.54",
  "sale_price": "",
  "date_created": "2017-03-23T17:03:12",
  "date_modified": "2017-03-23T17:03:12"
}
```

## Notes
- Make sure your WooCommerce API credentials have permission to delete products
- When using "move to trash" option, products can be restored from the WooCommerce admin interface