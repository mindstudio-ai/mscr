# Get Current Currency

This action retrieves the current currency settings from your WooCommerce store.

## What it does

When executed, this action will:
1. Connect to your WooCommerce store using your API credentials
2. Retrieve information about the active currency including:
   - Currency code (e.g., "USD")
   - Currency name (e.g., "United States (US) dollar") 
   - Currency symbol (e.g., "$")
3. Store this information in the output variable you specify

## Prerequisites

Before using this action, make sure you have:
- A WooCommerce store with API access enabled
- Your WooCommerce Consumer Key and Consumer Secret
- Your store URL configured in the connector settings

## Configuration

### Output Variable
Enter a name for the variable that will store the currency information. You can reference this variable in subsequent actions using the format `{{variableName}}`.

## Example Output

```json
{
  "code": "USD",
  "name": "United States (US) dollar",
  "symbol": "$",
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/data/currencies/USD" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/data/currencies" }]
  }
}
```