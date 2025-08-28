# List Shipping Classes

This connector retrieves a list of all product shipping classes from your WooCommerce store.

## Prerequisites

Before using this connector, you need to:

1. Have a WooCommerce store set up
2. Generate API credentials in your WooCommerce admin panel:
   - Go to WooCommerce → Settings → Advanced → REST API
   - Add a new key with "Read" permissions
   - Note your Consumer Key and Consumer Secret
3. Configure these credentials in the WooCommerce service settings

## Configuration Options

### Results Per Page

The number of shipping classes to return per page. Default is 10, but you can set it between 1-100.

### Page Number

The page of results to return. Starts at 1 for the first page.

### Sort Order

How to sort the results:
- **Ascending** (default): A to Z, lowest to highest
- **Descending**: Z to A, highest to lowest

### Sort By

The field to sort the results by:
- **Name** (default): Sort alphabetically by shipping class name
- **ID**: Sort by the shipping class ID
- **Slug**: Sort alphabetically by the URL-friendly slug
- **Count**: Sort by the number of products using each shipping class
- **Description**: Sort alphabetically by description

### Search Term

Optional text to search for within shipping class names. Leave empty to return all shipping classes.

### Output Variable

The name of the variable that will store the results. This variable will contain an array of shipping class objects, each with:
- `id`: The unique identifier
- `name`: The shipping class name
- `slug`: The URL-friendly identifier
- `description`: Any description text
- `count`: Number of products using this shipping class

## Example Output

```json
[
  {
    "id": 33,
    "name": "Express",
    "slug": "express",
    "description": "",
    "count": 0
  },
  {
    "id": 32,
    "name": "Priority",
    "slug": "priority",
    "description": "",
    "count": 0
  }
]
```