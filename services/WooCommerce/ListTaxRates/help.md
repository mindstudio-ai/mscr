# List Tax Rates

This connector retrieves a paginated list of tax rates from your WooCommerce store.

## Prerequisites

Before using this connector, you need:

1. A WooCommerce store
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. These credentials must be configured in the WooCommerce service settings

## Configuration Options

### Pagination

- **Page Number**: The page of results to return. Leave blank for the first page.
- **Items Per Page**: Number of tax rates to return per page. Default is 10 if left blank.

### Sorting

- **Sort Order**: Choose whether to sort tax rates in ascending or descending order.
- **Sort By**: Select which field to sort the tax rates by:
  - ID: Sort by tax rate ID
  - Order: Sort by the order field (default)
  - Priority: Sort by priority level

### Filtering

- **Tax Class**: Filter tax rates by tax class (e.g., "standard", "reduced-rate"). Leave blank to return all tax classes.

### Output

- **Output Variable**: Name of the variable that will store the list of tax rates. This will be an array of tax rate objects.

## Example Response

The connector returns an array of tax rate objects that look like this:

```json
[
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
]
```