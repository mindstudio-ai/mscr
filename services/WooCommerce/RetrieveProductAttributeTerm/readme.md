# Retrieve Product Attribute Term

This connector retrieves a specific product attribute term by ID from your WooCommerce store.

## When to use this connector

Use this connector when you need to:
- Get detailed information about a specific product attribute term
- Verify a term exists before performing operations on it
- Display term information in your workflow

## Required inputs

### Attribute ID
Enter the numeric ID of the product attribute that contains the term you want to retrieve.

Example: `2` (for a Color attribute)

### Term ID
Enter the numeric ID of the specific term you want to retrieve.

Example: `23` (for a "Red" term within the Color attribute)

### Output Variable
Enter a name for the variable that will store the retrieved term data. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns a JSON object containing the term data with properties like:
- `id`: The term's unique identifier
- `name`: The term's display name
- `slug`: The term's URL-friendly slug
- `description`: The term's description
- `menu_order`: The term's sort order
- `count`: Number of products using this term

## Example response

```json
{
  "id": 23,
  "name": "Red",
  "slug": "red",
  "description": "Red colored products",
  "menu_order": 1,
  "count": 5,
  "_links": {
    "self": [
      {
        "href": "https://example.com/wp-json/wc/v3/products/attributes/2/terms/23"
      }
    ],
    "collection": [
      {
        "href": "https://example.com/wp-json/wc/v3/products/attributes/2/terms"
      }
    ]
  }
}
```

## Troubleshooting

- Ensure your WooCommerce store URL and API credentials are correctly configured in the service settings
- Verify that both the Attribute ID and Term ID exist in your WooCommerce store
- Check that your API user has permission to access product attributes