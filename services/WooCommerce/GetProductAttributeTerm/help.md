# Get Product Attribute Term

This connector retrieves a single term for a specific product attribute from your WooCommerce store.

## What You'll Need

- **Attribute ID**: The ID of the product attribute you want to query (e.g., 2 for Size)
- **Term ID**: The ID of the specific term to retrieve (e.g., 23 for 'XXS')

## Configuration

1. **Attribute ID**: Enter the numeric ID of the product attribute. You can find this in your WooCommerce admin by viewing the attribute details.

2. **Term ID**: Enter the numeric ID of the specific term you want to retrieve. You can find this by viewing the terms for a specific attribute in your WooCommerce admin.

3. **Output Variable**: Specify a name for the variable that will store the retrieved attribute term data.

## Output

The connector will return a JSON object containing the attribute term details, including:

- `id`: The term's ID
- `name`: The term's display name
- `slug`: The term's slug
- `description`: The term's description (if any)
- `menu_order`: The term's menu order
- `count`: The number of products using this term

## Example Usage

After running this connector, you can use the output variable in subsequent steps of your workflow, such as displaying the attribute term information or using it in conditional logic.