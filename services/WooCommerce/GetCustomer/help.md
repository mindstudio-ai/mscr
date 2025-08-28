# Get Customer

This action retrieves a customer by ID from your WooCommerce store.

## Configuration

### Customer Information
- **Customer ID**: Enter the unique identifier of the customer you want to retrieve. This is a numeric value (e.g., `25`).

### Output
- **Output Variable**: Specify a name for the variable that will store the retrieved customer information. This variable will contain all customer details returned by the WooCommerce API.

## Authentication

This connector requires the following credentials to be configured in the WooCommerce service settings:
- **Store URL**: Your WooCommerce store URL (e.g., `https://mystore.com`)
- **API Consumer Key**: Your WooCommerce REST API consumer key
- **API Consumer Secret**: Your WooCommerce REST API consumer secret

You can generate these credentials in your WordPress admin panel under WooCommerce → Settings → Advanced → REST API.

## Example Response

The output variable will contain a customer object similar to this:

```json
{
  "id": 25,
  "date_created": "2023-05-15T12:00:00",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "company": "",
    "address_1": "123 Main St",
    "address_2": "",
    "city": "Anytown",
    "state": "CA",
    "postcode": "12345",
    "country": "US",
    "email": "john.doe@example.com",
    "phone": "555-123-4567"
  },
  "shipping": {
    "first_name": "John",
    "last_name": "Doe",
    "company": "",
    "address_1": "123 Main St",
    "address_2": "",
    "city": "Anytown",
    "state": "CA",
    "postcode": "12345",
    "country": "US"
  },
  "is_paying_customer": true,
  "avatar_url": "https://secure.gravatar.com/avatar/example",
  "meta_data": []
}
```