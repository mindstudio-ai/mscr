# Duplicate Product

This action creates a duplicate copy of an existing product in your WooCommerce store. The duplicated product will be created in draft status with "(Copy)" added to the original product name.

## Configuration

### Product Information
- **Product ID**: Enter the numeric ID of the product you want to duplicate. You can find this ID in your WooCommerce admin dashboard by going to Products and looking at the product URL or by viewing the product list.

### Output
- **Output Variable**: Enter a name for the variable that will store the duplicated product information. You can use this variable in subsequent steps of your workflow.

## Example Usage

1. Configure the action with the ID of the product you want to duplicate (e.g., "123")
2. Set an output variable name (e.g., "duplicatedProduct")
3. Use the output variable in subsequent steps to access properties of the duplicated product:
   - `{{duplicatedProduct.id}}` - The ID of the new product
   - `{{duplicatedProduct.name}}` - The name of the new product
   - `{{duplicatedProduct.status}}` - The status of the new product (will be "draft")

## Notes

- The duplicated product will be created in draft status, so you'll need to publish it manually or use another action to update its status.
- All product data including images, variations, and metadata will be copied to the new product.
- The duplicated product will have a new SKU if the original product had one.