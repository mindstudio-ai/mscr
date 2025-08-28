# Create Tax Class

This connector creates a new tax class in your WooCommerce store.

## Prerequisites

Before using this connector, you need:
1. A WooCommerce store
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret) with write permissions for taxes
3. These credentials should be configured in the WooCommerce service settings

## Configuration

### Tax Class Name
Enter the name for the new tax class you want to create. For example:
- "Zero Rate"
- "Reduced Rate"
- "Standard"

The slug for the tax class will be automatically generated based on the name you provide.

### Output Variable
Specify a variable name to store the created tax class information. The output will include:
- `slug`: The auto-generated slug for the tax class
- `name`: The name you provided for the tax class
- `_links`: Links related to the tax class

## Example Output

```json
{
  "slug": "zero-rate",
  "name": "Zero Rate",
  "_links": {
    "collection": [
      { "href": "https://your-store-domain.com/wp-json/wc/v3/taxes/classes" }
    ]
  }
}
```

## Common Issues

- **Authentication Error**: Make sure your WooCommerce API credentials are correct and have the proper permissions
- **Duplicate Tax Class**: If a tax class with a similar name already exists, the API may return an error
- **Invalid Store URL**: Ensure your store URL is correctly configured in the WooCommerce service settings