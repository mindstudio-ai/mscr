# Create Product Category

This action creates a new product category in your WooCommerce store.

## Prerequisites

Before using this action, you need to:
1. Have a WooCommerce store set up
2. Generate WooCommerce REST API keys with write permissions
3. Configure the WooCommerce service in MindStudio with:
   - Your store URL (e.g., `https://example.com`)
   - Your API Consumer Key
   - Your API Consumer Secret

## Configuration

### Category Details

- **Name** (required): The name of your product category (e.g., "Clothing", "Electronics")
- **Slug** (optional): A URL-friendly identifier for the category. If left blank, WooCommerce will automatically generate one based on the name.
- **Parent Category ID** (optional): If this is a subcategory, enter the ID of the parent category. Leave blank for top-level categories.
- **Description** (optional): HTML description of the category. You can include formatting tags.
- **Display Type** (optional): Controls how the category is displayed in your store:
  - Default: Uses your theme's default display
  - Products: Shows products in this category
  - Subcategories: Shows subcategories only
  - Both: Shows both products and subcategories

### Category Image

- **Image URL** (optional): The full URL to an image for this category (e.g., `https://example.com/images/clothing.jpg`)
- **Image Alt Text** (optional): Alternative text for the image for accessibility purposes

### Output

- **Output Variable**: Name of the variable that will store the created category information, including its ID and other details

## Example Use Cases

- Creating a new top-level category for your store
- Setting up subcategories for organizing products
- Building an automated category creation workflow for store management

## Response

The action returns the complete category object, including:
- Category ID (useful for referencing in other actions)
- Name, slug, and description
- Image details (if provided)
- Parent information
- Display settings