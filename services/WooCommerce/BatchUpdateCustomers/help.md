# Batch Update Customers

This connector allows you to perform batch operations on WooCommerce customers, including creating new customers, updating existing ones, and deleting customers - all in a single API call.

## Configuration

### Create New Customers
Enter a JSON array of customer objects to create. Each object should include customer information such as email, name, and other details.

Example:
```json
[
  {
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "username": "john.doe",
    "billing": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "",
      "address_1": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US",
      "email": "john.doe@example.com",
      "phone": "(555) 555-5555"
    }
  }
]
```

### Update Existing Customers
Enter a JSON array of customer objects to update. Each object **must include an `id`** field to identify the customer, along with the fields you want to update.

Example:
```json
[
  {
    "id": 42,
    "email": "updated.email@example.com"
  },
  {
    "id": 43,
    "billing": {
      "phone": "(111) 222-3333"
    }
  }
]
```

### Delete Customers
Enter a comma-separated list of customer IDs to delete.

Example:
```
42, 43, 44
```

### Output Variable
The name of the variable that will store the results of the batch operation. The output will contain information about all created, updated, and deleted customers.

## Notes
- You must provide at least one of the three operations (create, update, or delete)
- WooCommerce typically limits batch operations to 100 items per request
- For security reasons, make sure you have proper permissions to perform these operations