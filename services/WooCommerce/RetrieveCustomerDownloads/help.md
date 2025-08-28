# Retrieve Customer Downloads

This connector retrieves download permissions and links for a specific WooCommerce customer.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store set up on your WordPress site
2. API credentials (Consumer Key and Consumer Secret) with appropriate permissions
3. The customer ID for the customer whose downloads you want to retrieve

## Configuration

### Customer Information

- **Customer ID**: Enter the numeric ID of the customer whose downloads you want to retrieve. 
  - Example: `26`
  - You can find customer IDs in your WooCommerce admin panel under Customers

### Output

- **Output Variable**: Enter a name for the variable that will store the customer's download information.
  - This variable will contain an array of download objects with details like download URLs, product information, and access expiration dates.

## What This Connector Returns

The connector returns an array of download objects for the specified customer. Each download object includes:

- Download ID and URL
- Product information (ID and name)
- Download name
- Order information (ID and key)
- Downloads remaining (if limited)
- Access expiration dates
- File information (name and file path)

## Troubleshooting

- If you receive a 401 error, check your WooCommerce API credentials
- If you receive a 404 error, verify that the customer ID exists
- Ensure the customer has purchased downloadable products