# WooCommerce List Orders

This connector allows you to retrieve a list of orders from your WooCommerce store with various filtering options.

## Configuration

### Filtering Options

- **Status**: Select a specific order status to filter by, or leave as "Any" to include all statuses.
- **Customer ID**: Enter a customer ID to show only orders from a specific customer.
- **Product ID**: Enter a product ID to show only orders containing a specific product.
- **Date Range - After**: Show orders created after this date (ISO8601 format, e.g., `2023-01-01T00:00:00Z`).
- **Date Range - Before**: Show orders created before this date (ISO8601 format, e.g., `2023-12-31T23:59:59Z`).

### Pagination Options

- **Page**: The page number of results to return (default: 1).
- **Items Per Page**: Number of orders to return per page (default: 10, max: 100).
- **Sort Order**: Sort orders by descending (newest first) or ascending (oldest first).
- **Sort By**: Field to sort orders by (date, modified date, ID, or title).

### Output Options

- **Output Variable**: Name of the variable where the list of orders will be stored. This will contain an array of order objects.

## Example Output

The output will be an array of order objects, each containing details like:

```json
[
  {
    "id": 727,
    "parent_id": 0,
    "status": "processing",
    "currency": "USD",
    "version": "6.0.0",
    "prices_include_tax": false,
    "date_created": "2023-03-22T16:14:03",
    "date_modified": "2023-03-22T16:14:03",
    "customer_id": 2,
    "discount_total": "0.00",
    "discount_tax": "0.00",
    "shipping_total": "10.00",
    "shipping_tax": "0.00",
    "cart_tax": "1.95",
    "total": "37.95",
    "total_tax": "1.95",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "969 Market",
      "address_2": "",
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
      "company": "",
      "address_1": "969 Market",
      "address_2": "",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US"
    },
    "line_items": [
      {
        "id": 315,
        "name": "Woo Album #2",
        "product_id": 87,
        "variation_id": 0,
        "quantity": 1,
        "tax_class": "",
        "subtotal": "9.00",
        "subtotal_tax": "0.45",
        "total": "9.00",
        "total_tax": "0.45",
        "taxes": [
          {
            "id": 75,
            "total": "0.45",
            "subtotal": "0.45"
          }
        ],
        "meta_data": [],
        "sku": "",
        "price": 9
      }
    ]
  }
]
```

## Notes

- This connector requires your WooCommerce store URL, consumer key, and consumer secret to be configured in the service settings.
- The number of orders returned may be limited by your server's settings.
- For large stores, consider using filters to limit the number of results returned.