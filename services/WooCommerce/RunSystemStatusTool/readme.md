# Run System Status Tool

This connector allows you to execute WooCommerce system status tools to perform various maintenance operations on your store.

## What This Connector Does

WooCommerce includes several built-in maintenance tools that can help you troubleshoot and maintain your store. This connector lets you run these tools programmatically as part of your automation workflows.

## Configuration

### Tool Selection

Select the specific maintenance tool you want to run:

- **Clear Transients**: Clears the product/shop transients cache
- **Clear Template Cache**: Removes any cached templates
- **Clear API Keys**: Removes all API keys
- **Clear Expired Transients**: Removes only expired transients
- **Clear Product Transients**: Clears only product-related transients
- **Clear Shipping Transients**: Clears only shipping-related transients
- **Reset Roles**: Resets WooCommerce roles and capabilities
- **Recount Terms**: Recounts terms in your product categories and tags
- **Delete Orphaned Variations**: Removes product variations that no longer have a parent
- **Clear Sessions**: Removes all stored customer sessions
- **Update Database**: Updates the database to the latest version
- **Add Order Indexes**: Adds database indexes to order tables
- **Remove Order Indexes**: Removes database indexes from order tables
- **Reset Image Regeneration**: Resets the image regeneration process

### Confirmation

For safety, you must explicitly confirm that you want to run the selected tool:

- **Yes, I confirm**: Executes the selected tool
- **No, cancel**: Prevents execution (default)

⚠️ **Warning**: Some tools perform destructive actions that cannot be undone. Make sure you understand what each tool does before running it.

### Output

The result of the tool execution will be stored in the variable you specify. The result includes:

- Tool ID
- Tool name
- Action description
- Tool description
- Success status (true/false)
- Result message

## Example Output

```json
{
  "id": "clear_transients",
  "name": "WC transients",
  "action": "Clear transients",
  "description": "This tool will clear the product/shop transients cache.",
  "success": true,
  "message": "Product transients cleared"
}
```

## Prerequisites

Make sure you have configured your WooCommerce connection with:
- Store URL
- API Consumer Key
- API Consumer Secret

These credentials must have permission to access the WooCommerce System Status tools.