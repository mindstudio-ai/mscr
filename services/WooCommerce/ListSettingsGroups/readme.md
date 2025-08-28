# List Settings Groups

This action retrieves all WooCommerce settings groups from your store. Settings groups are categories like "General," "Products," "Tax," etc. that organize your WooCommerce configuration options.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store with REST API access enabled
2. API credentials (Consumer Key and Consumer Secret) with read permissions
3. Configured these credentials in the WooCommerce service settings

## Configuration

### Output Variable

Enter a name for the variable that will store the list of settings groups. This variable will contain an array of all your WooCommerce settings groups.

## Output Format

The output will be an array of settings group objects, each containing:

```json
{
  "id": "general",
  "label": "General",
  "description": "",
  "parent_id": "",
  "sub_groups": [],
  "_links": {
    "options": [
      { "href": "https://example.com/wp-json/wc/v3/settings/general" }
    ]
  }
}
```

## Common Use Cases

- Getting a list of all available settings categories in your WooCommerce store
- Finding specific settings group IDs for use with other WooCommerce API actions
- Building a settings navigation interface

## Troubleshooting

If you encounter errors:
- Verify your WooCommerce site URL is correct and includes the protocol (https://)
- Ensure your API credentials have proper read permissions
- Check that your WooCommerce REST API is enabled in your store settings