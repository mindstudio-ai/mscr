# List Tax Classes

This action retrieves all tax classes from your WooCommerce store.

## Prerequisites

Before using this action, ensure you have:

1. A WooCommerce store with API access enabled
2. Your WooCommerce REST API Consumer Key and Consumer Secret
3. Your store URL configured in the connector settings

## Configuration

This action doesn't require any input parameters. It simply fetches all tax classes from your WooCommerce store.

## Output

The action returns an array of tax class objects. Each tax class object contains:

- `slug`: The unique identifier for the tax class (e.g., "standard")
- `name`: The display name of the tax class (e.g., "Standard Rate")

Example output:
```json
[
  {
    "slug": "standard",
    "name": "Standard Rate"
  },
  {
    "slug": "reduced-rate",
    "name": "Reduced Rate"
  },
  {
    "slug": "zero-rate",
    "name": "Zero Rate"
  }
]
```

## Use Cases

- Retrieve tax classes to display in a dropdown menu
- Check what tax classes are available before creating new tax rates
- Validate tax class slugs before using them in other operations