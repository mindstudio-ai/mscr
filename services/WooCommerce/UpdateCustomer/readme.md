# Update a WooCommerce Customer

This connector allows you to update an existing customer in your WooCommerce store.

## Prerequisites

- You need the WooCommerce API credentials (Consumer Key and Consumer Secret) configured in your service connection.
- You need to know the ID of the customer you want to update.

## Configuration

### Customer Information

- **Customer ID**: The unique identifier of the customer you want to update. This is required.
- **First Name**: The customer's first name.
- **Last Name**: The customer's last name.
- **Email**: The customer's email address.

### Billing Information

- **First Name**: Billing first name.
- **Last Name**: Billing last name.
- **Company**: Billing company name.
- **Address Line 1**: Billing street address.
- **Address Line 2**: Billing apartment, suite, unit, etc.
- **City**: Billing city.
- **State/Province**: Billing state or province.
- **Postal Code**: Billing postal code.
- **Country**: Billing country (2-letter country code, e.g., US, CA, GB).
- **Phone**: Billing phone number.
- **Email**: Billing email address.

### Shipping Information

- **First Name**: Shipping first name.
- **Last Name**: Shipping last name.
- **Company**: Shipping company name.
- **Address Line 1**: Shipping street address.
- **Address Line 2**: Shipping apartment, suite, unit, etc.
- **City**: Shipping city.
- **State/Province**: Shipping state or province.
- **Postal Code**: Shipping postal code.
- **Country**: Shipping country (2-letter country code, e.g., US, CA, GB).

### Output

- **Output Variable**: The name of the variable where the updated customer information will be stored.

## Notes

- You only need to provide the fields you want to update. Empty fields will be ignored.
- If you update the customer's first name, last name, or email, you may also want to update the corresponding billing/shipping information to keep them in sync.