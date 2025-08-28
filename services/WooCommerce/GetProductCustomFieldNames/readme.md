# Get Product Custom Field Names

This action retrieves the list of recorded custom field names for products in your WooCommerce store.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store with the REST API enabled
2. Your WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. Set up the WooCommerce connection in MindStudio with:
   - Store URL (e.g., `https://example.com`)
   - API Consumer Key
   - API Consumer Secret

## Configuration Options

### Query Parameters

- **Results Per Page**: Maximum number of custom field names to return per page (default: 10)
- **Page Number**: Page number of results to retrieve (default: 1)
- **Search Term**: Optional filter to only return field names matching this term
- **Sort Order**: Choose between "Ascending" or "Descending" order for the results

### Output

- **Output Variable**: The variable name where the list of custom field names will be stored

## Output Format

The action returns an array of strings representing the custom field names in your WooCommerce store. For example:

```json
[
  "Custom field 1",
  "Custom field 2",
  "Custom field 3",
  "Custom field 4"
]
```

## Common Use Cases

- Get a list of all custom fields to use in product creation or updates
- Filter custom fields by name to find specific fields
- Paginate through large lists of custom fields

## Troubleshooting

If you encounter errors:
- Verify your WooCommerce API credentials are correct
- Ensure your store URL is properly formatted (including https://)
- Check that your WooCommerce REST API is enabled and accessible