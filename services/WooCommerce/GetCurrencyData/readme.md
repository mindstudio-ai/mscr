# Get Currency Data

This action retrieves detailed information about a specific currency from your WooCommerce store.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store with API access enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your store URL configured in the WooCommerce connector settings

## Configuration

### Currency Information

- **Currency Code**: Enter the ISO4217 currency code you want to retrieve information for. This is case-insensitive.
  - Examples: `USD`, `EUR`, `GBP`, `BRL`, `JPY`

### Output

- **Output Variable**: Specify a variable name to store the currency data. This will contain an object with the currency details.

## Output Format

The output variable will contain a JSON object with the following structure:

```json
{
  "code": "USD",
  "name": "United States dollar",
  "symbol": "$"
}
```

## Example Use Cases

- Retrieve currency symbols for displaying prices in your application
- Get currency information for international transactions
- Verify currency codes before processing payments

## Troubleshooting

- If you receive a 401 error, check your WooCommerce API credentials
- If you receive a 404 error, verify that the currency code is valid
- Make sure your store URL is correctly configured in the connector settings