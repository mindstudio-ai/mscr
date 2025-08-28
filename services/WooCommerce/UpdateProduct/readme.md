# Update a WooCommerce Product

This action allows you to update an existing product in your WooCommerce store.

## Prerequisites

Before using this action, make sure you have:
- A WooCommerce store
- API credentials (Consumer Key and Consumer Secret) with appropriate permissions
- The ID of the product you want to update

## Configuration

### Product Information
- **Product ID**: Enter the numeric ID of the product you want to update. You can find this in your WooCommerce admin dashboard or in the URL when editing a product.

### Product Details to Update
You only need to fill in the fields you want to update. Empty fields will be ignored.

- **Name**: The product name
- **Description**: The full product description (supports HTML)
- **Short Description**: A brief description that appears in product listings
- **Regular Price**: The normal price (e.g., "19.99")
- **Sale Price**: The discounted price (e.g., "15.99")
- **Status**: The product's publication status
- **Catalog Visibility**: Controls where the product appears
- **Featured**: Whether to mark the product as featured in your store

### Output
- **Output Variable**: The name of the variable that will store the updated product information

## Example Use Cases

- Update product prices during a sale
- Change product descriptions or details
- Modify product status (e.g., from draft to published)
- Toggle featured status for promotional campaigns

## Notes

- Only the fields you provide values for will be updated
- The response will contain the complete updated product object
- If you encounter errors, check that your API credentials have proper permissions