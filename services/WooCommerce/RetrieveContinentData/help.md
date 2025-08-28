# Retrieve Continent Data

This connector retrieves detailed information about a specific continent from your WooCommerce store, including the list of countries within that continent and their associated data.

## Configuration

### Continent Code
Select the continent you want to retrieve data for from the dropdown menu. Options include:
- Africa
- Antarctica
- Asia
- Europe
- North America
- Oceania
- South America

### Output Variable
Enter a name for the variable that will store the continent data. This variable will be available for use in subsequent steps of your workflow.

## Output Format

The output will be a JSON object containing:
- `code`: The two-letter continent code (e.g., "EU")
- `name`: The full name of the continent (e.g., "Europe")
- `countries`: An array of country objects, each containing:
  - `code`: Two-letter country code
  - `name`: Country name
  - Currency information (for some countries)
  - Measurement units
  - States/provinces (if applicable)
- `_links`: API navigation links

## Example Output

```json
{
  "code": "EU",
  "name": "Europe",
  "countries": [
    { "code": "AD", "name": "Andorra", "states": [] },
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
    }
    // Additional countries...
  ],
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/data/continents/eu" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/data/continents" }]
  }
}
```

## Requirements

This connector requires:
- A valid WooCommerce store URL
- WooCommerce API Consumer Key
- WooCommerce API Consumer Secret

These should be configured in the WooCommerce service settings.