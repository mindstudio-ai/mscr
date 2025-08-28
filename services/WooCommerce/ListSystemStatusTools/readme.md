# List System Status Tools

This action retrieves a list of all available System Status tools in your WooCommerce store. These tools can be used for maintenance tasks like clearing caches, removing orphaned data, and other system operations.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store with REST API access enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your store URL configured in the connector settings

## Configuration

### Output Variable

Enter a name for the variable that will store the list of system status tools. This variable will contain an array of all available tools with their details.

## Output Format

The output will be an array of tools, each containing:

```json
{
  "id": "clear_transients",
  "name": "WC transients",
  "action": "Clear transients",
  "description": "This tool will clear the product/shop transients cache.",
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/system_status/tools/clear_transients" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/system_status/tools" }]
  }
}
```

## Common Use Cases

- Getting a list of maintenance tools before running them
- Checking what system tools are available in your WooCommerce installation
- Retrieving tool IDs to use with the "Run System Status Tool" action