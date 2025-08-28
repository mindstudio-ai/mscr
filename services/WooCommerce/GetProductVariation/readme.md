# Get Product Variation

This action retrieves detailed information about a specific product variation from your WooCommerce store.

## Prerequisites

Before using this action, you need to:

1. Have a WooCommerce store set up
2. Have created API credentials in your WooCommerce store
3. Configure the WooCommerce service connection with:
   - Store URL (e.g., `https://example.com`)
   - API Consumer Key
   - API Consumer Secret

## Configuration

### Product ID
Enter the ID of the parent product that contains the variation you want to retrieve. This is a numeric value that can be found in your WooCommerce admin dashboard when viewing a product.

### Variation ID
Enter the ID of the specific variation you want to retrieve. This is a numeric value that can be found in your WooCommerce admin dashboard when viewing a product variation.

### Output Variable
Enter a name for the variable that will store the product variation data. This variable will contain all the information about the retrieved product variation, including:

- ID
- Description
- Price
- Regular price
- Sale price
- Stock status
- Attributes
- Images
- Other metadata

## Example Usage

After configuring this action, you can use the output variable in subsequent actions to access specific properties of the product variation:

- `{{outputs.variationData.id}}` - The variation's ID
- `{{outputs.variationData.price}}` - The variation's price
- `{{outputs.variationData.attributes}}` - The variation's attributes
- `{{outputs.variationData.image.src}}` - The URL of the variation's image