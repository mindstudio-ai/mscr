# Get Country Data

This action retrieves detailed information about a specific country, including its states, from your WooCommerce store.

## Prerequisites

Before using this action, make sure you have:

1. A WooCommerce store
2. WooCommerce API credentials (Consumer Key and Consumer Secret)
3. Configured the WooCommerce service in MindStudio with:
   - Your store URL (e.g., `https://example.com`)
   - Your API Consumer Key
   - Your API Consumer Secret

## Configuration

### Country Code

Enter the ISO3166 alpha-2 country code for the country you want to retrieve data for. This is a two-letter code that represents a country.

Examples:
- `us` - United States
- `ca` - Canada
- `uk` - United Kingdom
- `au` - Australia
- `de` - Germany
- `fr` - France
- `br` - Brazil

The country code is case-insensitive, so both `US` and `us` will work.

### Output Variable

Enter a name for the variable that will store the country data. This variable will contain a JSON object with the following structure:

```json
{
  "code": "BR",
  "name": "Brazil",
  "states": [
    { "code": "AC", "name": "Acre" },
    { "code": "AL", "name": "Alagoas" },
    { "code": "SP", "name": "São Paulo" }
    // ... other states
  ]
}
```

You can reference this data in subsequent steps of your workflow.

## Use Cases

- Populate dropdown menus with states/provinces for a selected country
- Validate shipping addresses
- Customize content based on a user's country
- Implement country-specific business logic