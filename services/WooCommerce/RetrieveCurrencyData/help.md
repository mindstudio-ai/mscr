# Retrieve Currency Data

This action retrieves detailed information about a specific currency from your WooCommerce store.

## Prerequisites
- A WooCommerce store with REST API access
- API Consumer Key and Secret with read permissions
- Your store URL configured in the connector settings

## Configuration

### Currency Code
Enter the ISO4217 currency code you want to retrieve information for. This is a standard international currency code like:
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- BRL (Brazilian Real)

The code is case-insensitive, so both "usd" and "USD" will work.

### Output Variable
Enter a name for the variable that will store the currency data. This variable will contain a JSON object with the following properties:
- `code`: The currency code (e.g., "USD")
- `name`: The full name of the currency (e.g., "United States dollar")
- `symbol`: The currency symbol (e.g., "$")

## Example Response

```json
{
  "code": "USD",
  "name": "United States dollar",
  "symbol": "$",
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/data/currencies/USD" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/data/currencies" }]
  }
}
```

## Troubleshooting
- If you receive an error, verify that your WooCommerce API credentials are correct
- Ensure the currency code is valid
- Check that your store URL is correctly configured in the connector settings