# List Product Attribute Terms

This connector retrieves all terms for a specific product attribute from your WooCommerce store.

## What You'll Need

- Your WooCommerce store URL (configured in the service settings)
- Your WooCommerce API Consumer Key and Secret (configured in the service settings)
- The ID of the product attribute you want to list terms for

## Basic Configuration

### Attribute ID
Enter the numeric ID of the product attribute you want to list terms for. For example, if you want to list terms for the "Color" attribute and its ID is 1, enter `1`.

### Output Variable
Specify a variable name to store the results. This will contain an array of attribute terms with their details.

## Pagination Options

### Items Per Page
The number of attribute terms to return per page. Default is 10.

### Page Number
The page of results to return. Default is 1 (first page).

## Filtering Options

### Search
Optionally filter terms by a search string.

### Sort Order
Choose whether to sort results in ascending or descending order.

### Sort By
Select which field to sort the results by:
- Name: Sort alphabetically by term name
- ID: Sort by term ID
- Slug: Sort alphabetically by term slug
- Count: Sort by number of products using the term
- Description: Sort alphabetically by term description

### Hide Empty Terms
Choose whether to hide terms that aren't assigned to any products.

## Example Output

The connector will return an array of attribute term objects that looks like this:

```json
[
  {
    "id": 23,
    "name": "Red",
    "slug": "red",
    "description": "Red colored products",
    "count": 12
  },
  {
    "id": 24,
    "name": "Blue",
    "slug": "blue",
    "description": "Blue colored products",
    "count": 8
  }
]
```