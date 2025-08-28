# List Currencies

This action retrieves a list of all supported currencies from your WooCommerce store.

## Prerequisites

Before using this action, you need to have:

1. A WooCommerce store set up
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. Configured the WooCommerce service in MindStudio with:
   - Your store URL (e.g., `https://example.com`)
   - API Consumer Key
   - API Consumer Secret

## Configuration

**Output Variable**: Enter a name for the variable that will store the list of currencies. This variable will contain an array of currency objects.

## Output Format

The output will be an array of currency objects, each containing:

```json
{
  "code": "USD",
  "name": "United States (US) dollar",
  "symbol": "$"
}
```

## Example Usage

You can use this action to:

- Display a dropdown of available currencies in your application
- Convert prices between different currencies
- Validate currency codes entered by users

After running this action, you can access the currencies using the output variable you specified.