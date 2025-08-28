# Get Product Category

This action retrieves a single product category from your WooCommerce store using its ID.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store with API access enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your store URL configured in the connector settings

## Configuration

### Category Details

- **Category ID**: Enter the unique identifier of the product category you want to retrieve. This is a numeric value (e.g., `9`).

### Output

- **Output Variable**: Enter a name for the variable that will store the retrieved category information. This variable will contain all the category details as a JSON object.

## Output Format

The action returns a JSON object with the following structure:

```json
{
  "id": 9,
  "name": "Clothing",
  "slug": "clothing",
  "parent": 0,
  "description": "",
  "display": "default",
  "image": {
    "id": 730,
    "src": "https://example.com/wp-content/uploads/2017/03/T_2_front.jpg",
    "name": "",
    "alt": ""
  },
  "menu_order": 0,
  "count": 36
}
```

## Common Issues

- **Category Not Found**: If you provide an ID that doesn't exist, the action will return an error.
- **Authentication Issues**: Make sure your API credentials are correctly configured in the connector settings.
- **API Limits**: Be aware of any rate limits your WooCommerce store might have for API requests.