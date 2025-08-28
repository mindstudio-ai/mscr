# Update Product Attribute Term

This action updates an existing product attribute term in your WooCommerce store.

## Prerequisites

- You need to have your WooCommerce store URL and API credentials (Consumer Key and Consumer Secret) configured in the WooCommerce service settings.
- You need to know the Attribute ID and Term ID you want to update.

## Configuration

### Attribute ID
Enter the numeric ID of the product attribute that contains the term you want to update. For example, if you're updating a term in the "Size" attribute and its ID is 2, enter `2`.

### Term ID
Enter the numeric ID of the term you want to update. For example, if you're updating the "Large" term and its ID is 23, enter `23`.

### Name (Optional)
Enter the new name for the attribute term. For example, `XXS` to rename a size term.

### Slug (Optional)
Enter the new slug for the attribute term. This is used in URLs and should be lowercase with hyphens instead of spaces. For example, `xxs`. If left blank and a name is provided, a slug will be automatically generated from the name.

### Description (Optional)
Enter an HTML description for the term. For example, `<p>Extra extra small size</p>`.

### Menu Order (Optional)
Enter a number to determine the order in which the term appears. Lower numbers appear first. For example, `0` for the first item.

### Output Variable
Enter a name for the variable that will store the updated term data. This variable will contain all the information about the updated term, including its ID, name, slug, etc.

## Example Usage

- Update a "Size" attribute term from "Large" to "XXL"
- Change the description of a "Color" attribute term
- Reorder terms by updating their menu order

## Notes

- You only need to include the fields you want to change. Any fields left blank will remain unchanged.
- The output variable will contain the complete updated term object with all its properties.