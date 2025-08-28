# Create Product Attribute Term

This action creates a new term for a specific product attribute in your WooCommerce store.

## When to use this action

Use this action when you need to:
- Add new options to existing product attributes (like new sizes, colors, materials, etc.)
- Programmatically expand your product attribute taxonomy
- Create attribute terms as part of an automated workflow

## Required inputs

- **Attribute ID**: The numeric ID of the product attribute to which this term will be added. You can find this in your WooCommerce admin under Products > Attributes.
- **Term Name**: The display name of the attribute term (e.g., "XXS", "Red", "Cotton").

## Optional inputs

- **Term Slug**: A URL-friendly version of the name. If left blank, it will be automatically generated from the name.
- **Description**: HTML description of the term. Use this to provide additional information about the term.
- **Menu Order**: Numeric value that determines the order in which terms appear. Lower numbers appear first.

## Output

The action returns a complete JSON object containing all details of the created attribute term, including:
- ID
- Name
- Slug
- Description
- Menu order
- Count (number of products using this term)
- API links

## Example

Creating a new size option for a "Size" attribute with ID 2:

**Attribute ID**: `2`  
**Term Name**: `XXS`  
**Term Slug**: `xxs`  
**Description**: `Extra extra small size option`  
**Menu Order**: `1`

This would create a new "XXS" size option that would appear first in the list of sizes.