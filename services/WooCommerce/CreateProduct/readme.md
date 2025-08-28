# Create a WooCommerce Product

This connector creates a new product in your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store URL
2. WooCommerce API Consumer Key
3. WooCommerce API Consumer Secret

You can find or create these credentials in your WordPress admin under **WooCommerce → Settings → Advanced → REST API**.

## Configuration

### Basic Product Information

- **Name**: The name of your product (e.g., "Premium Quality T-Shirt")
- **Type**: Choose from Simple, Variable, Grouped, or External product types
- **Regular Price**: The regular price without currency symbol (e.g., "21.99")
- **Sale Price**: Optional discounted price without currency symbol (e.g., "19.99")
- **Description**: Detailed product description with full formatting
- **Short Description**: Brief summary that appears in product listings

### Product Status

- **Status**: Control the publication status of your product
  - Published: Visible and available for purchase
  - Draft: Saved but not published
  - Pending: Awaiting review
  - Private: Only visible to store administrators
- **Featured**: Whether to mark the product as featured in your store

### Categories and Tags

- **Categories**: Enter category IDs as comma-separated values (e.g., "9,14")
  - You can find category IDs in your WordPress admin under Products → Categories
- **Tags**: Enter tag IDs as comma-separated values (e.g., "34,56")
  - You can find tag IDs in your WordPress admin under Products → Tags

### Images

- **Image URLs**: Enter image URLs as comma-separated values
  - Example: `https://example.com/image1.jpg,https://example.com/image2.jpg`

### Output

- **Output Variable**: Name of the variable that will store the created product data

## Example Usage

Creating a basic t-shirt product:
- **Name**: Premium Quality T-Shirt
- **Type**: Simple
- **Regular Price**: 21.99
- **Description**: Our premium quality t-shirt is made from 100% organic cotton...
- **Categories**: 9,14 (where 9 might be "Clothing" and 14 might be "T-Shirts")
- **Image URLs**: https://example.com/tshirt-front.jpg,https://example.com/tshirt-back.jpg

The connector will return the complete product data including the generated product ID.