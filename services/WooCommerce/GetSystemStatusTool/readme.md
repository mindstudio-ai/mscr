# Get System Status Tool

This action retrieves detailed information about a specific WooCommerce system status tool by its ID.

## When to use this action

Use this action when you need to:
- Check the details of a specific system tool before running it
- Get information about what a particular tool does
- Verify if a system tool exists in your WooCommerce installation

## Configuration

### Tool ID
Enter the unique identifier of the system status tool you want to retrieve information about. Common tool IDs include:

- `clear_transients` - Clears WooCommerce transients cache
- `clear_expired_transients` - Clears expired WooCommerce transients
- `regenerate_product_lookup_tables` - Regenerates product lookup tables
- `reset_roles` - Resets WooCommerce roles
- `clear_sessions` - Clears all customer sessions
- `install_pages` - Creates default WooCommerce pages
- `delete_taxes` - Deletes all tax rates
- `reset_tracking` - Resets usage tracking settings

### Output Variable
Specify a name for the variable that will store the tool information. This variable will contain a JSON object with details about the tool, including:

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

## Prerequisites

Make sure you have configured your WooCommerce connection with:
- Your store URL
- API Consumer Key
- API Consumer Secret

These credentials must have permission to access the WooCommerce REST API and System Status tools.