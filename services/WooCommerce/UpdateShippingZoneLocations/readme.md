# Update Shipping Zone Locations

This action replaces all locations of a specific WooCommerce shipping zone with a new set of locations.

## Configuration

### Shipping Zone ID
Enter the ID of the shipping zone you want to update. This is a numeric value that can be found in your WooCommerce admin dashboard under Shipping Zones.

Example: `5`

### Locations
Enter a JSON array of location objects that will replace the existing locations for the shipping zone. Each location object must include:

- `code`: Location code (examples: "US" for United States, "US:CA" for California, "EU" for Europe)
- `type`: Location type (must be one of: postcode, state, country, continent)

Example:
```json
[
  {"code": "US:CA", "type": "state"},
  {"code": "US:NY", "type": "state"},
  {"code": "CA", "type": "country"}
]
```

For postcodes, you can use formats like:
```json
[{"code": "90210", "type": "postcode"}]
```

### Output Variable
Specify a name for the variable that will store the response from the WooCommerce API. This variable will contain an array of the updated location objects.

## Authentication

This action uses your WooCommerce store credentials that you've configured in the WooCommerce service settings:
- Store URL
- API Consumer Key
- API Consumer Secret

Make sure these are properly set up before using this action.