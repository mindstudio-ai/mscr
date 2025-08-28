# Get Tax Rate

This connector retrieves detailed information about a specific tax rate from your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with at least one tax rate configured
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. Your store URL configured in the connector settings

## Configuration

### Tax Rate ID

Enter the unique identifier of the tax rate you want to retrieve. This is a numeric value that can be found in your WooCommerce admin dashboard under **WooCommerce > Settings > Tax > Standard Rates** (or other tax rate tabs).

Example: `72`

### Output Variable

Specify a name for the variable that will store the retrieved tax rate information. This variable will contain all details about the tax rate, including country, state, rate percentage, and other configuration options.

## Response Structure

The connector will return a tax rate object with the following structure:

```json
{
  "id": 72,
  "country": "US",
  "state": "AL",
  "postcode": "35041",
  "city": "Cardiff",
  "postcodes": ["35014", "35036", "35041"],
  "cities": ["Alpine", "Brookside", "Cardiff"],
  "rate": "4.0000",
  "name": "State Tax",
  "priority": 0,
  "compound": false,
  "shipping": false,
  "order": 1,
  "class": "standard"
}
```

## Common Issues

- **Tax Rate Not Found**: If you provide an ID that doesn't exist, the connector will return an error.
- **Authentication Errors**: Ensure your WooCommerce API credentials are correctly configured in the connector settings.