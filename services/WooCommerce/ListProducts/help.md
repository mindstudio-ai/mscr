# List Products from WooCommerce

This connector allows you to retrieve a list of products from your WooCommerce store with various filtering, sorting, and pagination options.

## Configuration

### Filtering Options

- **Search Term**: Enter keywords to search for specific products
- **Category ID**: Filter products by their category ID (e.g., `15`)
- **Tag ID**: Filter products by their tag ID (e.g., `34`)
- **SKU**: Filter products by their SKU code (e.g., `WOO-123`)
- **Product Type**: Select a specific product type to filter by
- **Stock Status**: Filter products by their current stock status
- **Featured Products Only**: Set to "Yes" to show only featured products
- **On Sale Products Only**: Set to "Yes" to show only products that are on sale

### Sorting & Pagination

- **Sort By**: Choose which field to sort the products by
- **Sort Order**: Choose between ascending (A-Z, low to high) or descending (Z-A, high to low) order
- **Products Per Page**: Specify how many products to return per page (default: 10, maximum: 100)
- **Page Number**: Specify which page of results to return (starts at 1)

### Output

- **Output Variable**: Enter a name for the variable that will store the list of products

## Example Response

The connector returns an array of product objects with details like:

```json
[
  {
    "id": 799,
    "name": "Ship Your Idea",
    "type": "variable",
    "status": "publish",
    "price": "24.99",
    "regular_price": "24.99",
    "sale_price": "",
    "stock_status": "instock",
    "images": [
      {
        "id": 795,
        "src": "https://example.com/wp-content/uploads/2017/03/T_4_front-11.jpg"
      }
    ]
  },
  {
    "id": 794,
    "name": "Premium Quality",
    "type": "simple",
    "status": "publish",
    "price": "21.99",
    "regular_price": "21.99",
    "sale_price": "",
    "stock_status": "instock"
  }
]
```