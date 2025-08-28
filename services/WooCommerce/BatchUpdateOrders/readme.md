# Batch Update Orders

This connector allows you to create, update, and delete multiple WooCommerce orders in a single API request. This is much more efficient than making separate API calls for each operation.

## Prerequisites

- You must have a WooCommerce store with API access configured
- Your WooCommerce API credentials must be set up in the connection settings

## Usage

You can use any combination of the three operations (create, update, delete) in a single request. At least one operation must be provided.

### Creating Orders

Enter a JSON array of order objects to create. Each object should include:
- Payment details
- Billing/shipping information
- Line items (products)

Example:
```json
[
  {
    "payment_method": "bacs",
    "payment_method_title": "Direct Bank Transfer",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "969 Market",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US",
      "email": "john.doe@example.com",
      "phone": "(555) 555-5555"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "969 Market",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US"
    },
    "line_items": [
      {"product_id": 79, "quantity": 1},
      {"product_id": 93, "quantity": 1}
    ],
    "shipping_lines": [
      {"method_id": "flat_rate", "method_title": "Flat Rate", "total": "30.00"}
    ]
  }
]
```

### Updating Orders

Enter a JSON array of order objects to update. Each object must include:
- The order ID
- Any fields you want to update

Example:
```json
[
  {"id": 727, "status": "completed"},
  {"id": 728, "shipping_methods": "Local Delivery"}
]
```

### Deleting Orders

Enter a JSON array of order IDs to delete.

Example:
```json
[723, 724, 725]
```

### Output

The connector will return the complete API response, which includes the results of all operations (create, update, delete). The response will be stored in the variable you specify.

## Limitations

- By default, WooCommerce limits batch operations to 100 objects per request
- All operations are performed in a single transaction - if one fails, the entire batch may fail