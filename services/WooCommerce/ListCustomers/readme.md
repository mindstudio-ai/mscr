# List Customers

This connector retrieves a paginated list of customers from your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with REST API access enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your store URL configured in the connector settings

## Configuration Options

### Customer List Options

- **Page Number**: The page of results to return, starting from 1
- **Results Per Page**: Number of customers to return per page (maximum 100)
- **Sort Order**: Choose between ascending (A-Z) or descending (Z-A) order
- **Sort By**: Select the field to sort customers by (Name, ID, or Registration Date)

### Filters (Optional)

- **Search Term**: Search for customers by name or email (partial matches)
- **Email Filter**: Filter customers by exact email address match
- **Role**: Filter customers by their user role in your store

### Output

- **Output Variable**: Name of the variable where the list of customers will be stored

## Example Response

The connector returns an array of customer objects with details like:

```json
[
  {
    "id": 26,
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer",
    "username": "john.doe",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postcode": "12345",
      "country": "US",
      "email": "customer@example.com",
      "phone": "555-555-5555"
    },
    "shipping": {
      // shipping address details
    },
    "is_paying_customer": true
    // additional fields...
  }
]
```

## Common Use Cases

- Retrieve customer data for reporting
- Export customer information to other systems
- Filter customers by specific criteria for targeted marketing