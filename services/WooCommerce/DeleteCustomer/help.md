# Delete Customer

This connector allows you to permanently delete a customer from your WooCommerce store.

## Configuration

### Customer Information
- **Customer ID**: Enter the unique identifier of the customer you want to delete. This is a numeric value (e.g., 25).

### Delete Options
- **Force Delete**: Select "Yes" to permanently delete the customer. This parameter is required by the WooCommerce API to confirm you want to delete the customer rather than just moving them to trash.

- **Reassign Posts To User ID** (Optional): If the customer has created any content on your site, you can reassign their posts to another user by entering that user's ID here. Leave blank if not needed.

### Output
- **Output Variable**: Enter a name for the variable that will store the deleted customer data. This variable will contain all the customer information that was deleted, including their ID, email, name, and other details.

## Example Response

The output variable will contain a JSON object similar to this:

```json
{
  "id": 25,
  "email": "john.doe@example.com",
  "first_name": "James",
  "last_name": "Doe",
  "role": "customer",
  "username": "john.doe",
  "billing": {
    "first_name": "James",
    "last_name": "Doe",
    "company": "",
    "address_1": "969 Market",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US",
    "email": "john.doe@example.com",
    "phone": "(555) 555-5555"
  },
  "shipping": {
    "first_name": "James",
    "last_name": "Doe",
    "address_1": "969 Market",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US"
  }
}
```