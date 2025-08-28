# WooCommerce Batch Orders

This connector allows you to perform multiple operations on WooCommerce orders in a single request, including creating new orders, updating existing orders, and deleting orders.

## Configuration

### Create Orders
Enter a JSON array of orders you want to create. Each order object should include payment details, billing/shipping information, line items, etc.

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
      { "product_id": 79, "quantity": 1 },
      { "product_id": 93, "quantity": 1 }
    ],
    "shipping_lines": [
      { "method_id": "flat_rate", "method_title": "Flat Rate", "total": "30.00" }
    ]
  }
]
```

### Update Orders
Enter a JSON array of orders you want to update. Each order must include an `id` field.

Example:
```json
[
  { "id": 727, "status": "completed" },
  { "id": 728, "status": "processing", "customer_note": "Please deliver after 5pm" }
]
```

### Delete Orders
Enter a comma-separated list of order IDs you want to delete.

Example:
```
723, 724, 725
```

### Output Variable
Enter a name for the variable that will store the results of the batch operation. The output will contain information about all created, updated, and deleted orders.

## Notes

- You must provide at least one operation (create, update, or delete).
- The WooCommerce API limits batch operations to 100 objects by default.
- Make sure your JSON is properly formatted to avoid errors.