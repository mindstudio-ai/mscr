# WooCommerce Batch Tax Rates

This connector allows you to perform batch operations on tax rates in your WooCommerce store. You can create, update, or delete multiple tax rates in a single request.

## Configuration

### Operation Type

Select the type of batch operation you want to perform:

- **Create new tax rates**: Add new tax rates to your store
- **Update existing tax rates**: Modify properties of existing tax rates
- **Delete tax rates**: Remove tax rates from your store
- **Mixed operations**: Perform any combination of create, update, and delete operations

### Create Tax Rates

When creating tax rates, provide a JSON array of tax rate objects. Each object should include:

```json
[
  {
    "country": "US",         // Two-letter country code
    "state": "AL",           // Two-letter state code
    "rate": "4.0000",        // Tax rate percentage (string)
    "name": "State Tax",     // Display name for the tax
    "shipping": false,       // Whether to apply to shipping (true/false)
    "order": 1               // Priority order (number)
  },
  {
    "country": "US",
    "state": "AZ",
    "rate": "5.6000",
    "name": "State Tax",
    "shipping": false,
    "order": 2
  }
]
```

### Update Tax Rates

When updating tax rates, provide a JSON array of tax rate objects. Each object must include the `id` of the tax rate to update, along with the properties you want to change:

```json
[
  {
    "id": 72,                // Required: ID of the tax rate to update
    "rate": "5.0000",        // New tax rate percentage
    "name": "Updated Tax"    // New display name
  },
  {
    "id": 73,
    "shipping": true,        // Change shipping applicability
    "order": 3               // Change priority order
  }
]
```

### Delete Tax Rates

When deleting tax rates, provide a comma-separated list of tax rate IDs to remove:

```
72, 73, 74
```

### Output Variable

Specify a name for the variable that will store the API response. This variable will contain the results of your batch operation, including any newly created tax rates with their assigned IDs.

## Notes

- You can create, update, or delete up to 100 tax rates per request
- For mixed operations, you can include any combination of create, update, and delete actions
- The response will include details of all processed tax rates