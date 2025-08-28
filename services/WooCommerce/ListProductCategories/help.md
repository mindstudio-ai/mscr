# List Product Categories

This action retrieves a paginated list of product categories from your WooCommerce store.

## Configuration

### Search Term
Optionally filter categories by a search term. Leave empty to return all categories.

### Items Per Page
The number of categories to return per page. Default is 10, maximum is 100.

### Page Number
The page number to retrieve. Default is 1.

### Order
Sort order for the categories:
- **Ascending**: Sort in ascending order (A-Z, 1-100)
- **Descending**: Sort in descending order (Z-A, 100-1)

### Order By
Field to order categories by:
- **Name**: Sort by category name
- **ID**: Sort by category ID
- **Slug**: Sort by category slug
- **Count**: Sort by number of products in the category
- **Description**: Sort by category description

### Hide Empty Categories
- **Yes**: Only show categories that contain products
- **No**: Show all categories, including empty ones

### Parent Category ID
Optionally filter by parent category ID:
- Leave empty to show categories at all levels
- Enter `0` to show only top-level categories
- Enter a specific category ID to show only its child categories

### Output Variable
The name of the variable where the list of categories will be stored. This will be an array of category objects, each containing properties like id, name, slug, parent, description, etc.

## Example Response

```json
[
  {
    "id": 15,
    "name": "Albums",
    "slug": "albums",
    "parent": 11,
    "description": "",
    "display": "default",
    "image": [],
    "menu_order": 0,
    "count": 4
  },
  {
    "id": 9,
    "name": "Clothing",
    "slug": "clothing",
    "parent": 0,
    "description": "",
    "display": "default",
    "image": {
      "id": 730,
      "src": "https://example.com/wp-content/uploads/2017/05/clothing.jpg"
    },
    "menu_order": 0,
    "count": 18
  }
]
```