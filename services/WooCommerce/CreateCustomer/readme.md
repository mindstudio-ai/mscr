# Create a Customer in WooCommerce

This action creates a new customer account in your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store URL configured in your connection settings
2. Your WooCommerce REST API Consumer Key and Consumer Secret added to your connection settings

## Configuration

### Customer Information

- **Email**: The customer's email address (required)
- **First Name**: The customer's first name
- **Last Name**: The customer's last name
- **Username**: A username for the customer. If not provided, WooCommerce will generate one based on the email address
- **Password**: A password for the customer. If not provided, WooCommerce will generate a random password

### Billing Information (Optional)

Fill in any billing details you want to associate with the customer:

- Address details (name, company, street address, city, state, postal code, country)
- Contact information (email, phone)

Country codes should be provided as two-letter codes (e.g., US, CA, GB).

### Shipping Information (Optional)

Fill in any shipping details you want to associate with the customer. These are typically the delivery address details.

### Output

- **Output Variable**: Choose a name for the variable that will store the created customer information. This will contain the full customer object returned by WooCommerce, including the customer ID.

## Example Use Cases

- Creating customer accounts during a registration process
- Importing customers from another system
- Setting up test accounts with specific information

## Notes

- At minimum, you only need to provide an email address to create a customer
- If you don't provide a username or password, WooCommerce will generate them automatically
- The response will include the customer ID which you can use for future operations