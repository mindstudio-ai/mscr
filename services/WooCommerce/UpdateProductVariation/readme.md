# Update Product Variation

This connector allows you to update an existing product variation in your WooCommerce store.

## Prerequisites

- You need a WooCommerce store with the REST API enabled
- You need your WooCommerce REST API consumer key and secret
- You need to know the Product ID and Variation ID you want to update

## Configuration

### Product Information

- **Product ID**: Enter the ID of the parent product that contains the variation. This is a numeric value (e.g., `123`).
- **Variation ID**: Enter the ID of the specific variation you want to update. This is a numeric value (e.g., `456`).

### Variation Details

- **Regular Price**: The standard price of the variation (e.g., `19.99`). Use decimal format without currency symbols.
- **Sale Price**: The discounted price of the variation (e.g., `15.99`). Use decimal format without currency symbols.
- **Status**: The publication status of the variation:
  - Published: Visible to customers
  - Private: Hidden from the shop but accessible via direct link
  - Draft: Not visible or purchasable
- **SKU**: A unique identifier for the variation (e.g., `PROD-VAR-001`).

### Inventory

- **Manage Stock**: Choose whether to enable stock management for this variation.
- **Stock Quantity**: The number of items in stock (e.g., `100`). Only applicable if Manage Stock is set to "Yes".
- **Stock Status**: The availability status of the variation:
  - In Stock: Available for purchase
  - Out of Stock: Not available for purchase
  - On Backorder: Can be purchased but is currently out of stock

### Output

- **Output Variable**: The name of the variable that will store the updated variation data. This variable will contain the complete variation object returned by WooCommerce.

## Notes

- You only need to provide the fields you want to update. Any fields left blank will remain unchanged.
- Price fields should be entered as numbers without currency symbols (e.g., `19.99` not `$19.99`).
- After updating, the connector will return the complete variation object with all fields, not just the ones you updated.