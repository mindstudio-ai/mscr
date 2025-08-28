# Get Continent Data

This connector retrieves detailed information about a specific continent from your WooCommerce store, including its countries and their associated data.

## Configuration

### Continent Code
Select the 2-letter continent code for which you want to retrieve data:
- **Africa (af)**: Retrieves data for the African continent
- **Antarctica (an)**: Retrieves data for Antarctica
- **Asia (as)**: Retrieves data for the Asian continent
- **Europe (eu)**: Retrieves data for the European continent
- **North America (na)**: Retrieves data for the North American continent
- **Oceania (oc)**: Retrieves data for Oceania
- **South America (sa)**: Retrieves data for the South American continent

### Output Variable
Specify a variable name to store the continent data. This variable will contain a JSON object with the following structure:

```json
{
  "code": "EU",
  "name": "Europe",
  "countries": [
    {
      "code": "BE",
      "name": "Belgium",
      "currency_code": "EUR",
      "currency_pos": "left",
      "decimal_sep": ",",
      "dimension_unit": "cm",
      "num_decimals": 2,
      "thousand_sep": " ",
      "weight_unit": "kg",
      "states": []
    },
    // More countries...
  ]
}
```

## Prerequisites

Make sure you have configured your WooCommerce connection with:
- Your store URL
- API Consumer Key
- API Consumer Secret

These credentials can be found in your WooCommerce admin panel under WooCommerce > Settings > Advanced > REST API.