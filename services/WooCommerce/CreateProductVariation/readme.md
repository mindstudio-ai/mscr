# Create Product Variation

This connector creates a new variation for an existing WooCommerce product.

## Prerequisites

- You need a WooCommerce store with API access configured
- You need the Product ID of the parent product you want to add a variation to
- The parent product must be a variable product

## Configuration

### Product Information

- **Product ID**: The ID of the parent product (you can find this in your WooCommerce admin)
- **Regular Price**: The standard price for this variation (e.g., "19.99")
- **Sale Price** (optional): A discounted price, if applicable (e.g., "14.99")
- **SKU** (optional): Stock Keeping Unit for inventory tracking

### Attributes

- **Attributes**: This defines what makes this variation unique (color, size, etc.)
  
  You must provide this as a JSON array. Each attribute needs either an ID or name, plus the option value.
  
  Example:
  ```json
  [
    {"id": 1, "option": "Red"},
    {"name": "Size", "option": "Large"}
  ]
  ```

### Stock Settings

- **Manage Stock**: Choose whether to manage inventory for this variation
- **Stock Quantity**: Number of items in stock (only used if stock management is enabled)
- **Stock Status**: Current availability status

### Advanced Settings

- **Status**: Publication status of the variation
- **Virtual Product**: Set to "Yes" for non-physical products that don't require shipping
- **Downloadable Product**: Set to "Yes" for products that provide a downloadable file
- **Image ID**: The ID of a media item to use as the variation's image

## Output

The connector will return the complete variation data from WooCommerce, including the generated variation ID and other details.

## Example Use Case

Creating a "Small Blue T-shirt" variation with 10 items in stock:
- Product ID: 123 (the parent T-shirt product)
- Regular Price: 19.99
- Attributes: `[{"id": 1, "option": "Blue"}, {"id": 2, "option": "Small"}]`
- Manage Stock: Yes
- Stock Quantity: 10