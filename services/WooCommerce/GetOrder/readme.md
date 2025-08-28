# Get Order

This connector retrieves a specific order from your WooCommerce store by its ID. It returns the complete order details including line items, customer information, totals, and status.

## Prerequisites

- You need a WooCommerce store with API access configured
- You must have your Consumer Key and Consumer Secret from WooCommerce
- Your store URL must be properly configured in the connector settings

## Configuration

### Order ID
Enter the numeric ID of the order you want to retrieve. You can find order IDs in your WooCommerce admin dashboard under Orders.

Example: `727`

### Decimal Points
Select how many decimal places should be included in numeric fields (like prices and totals) in the response.

Default is 2 decimal places (e.g., $19.99).

### Output Variable
Enter a name for the variable that will store the order details. You can reference this variable in subsequent steps of your workflow.

## Response

The connector will return the complete order object including:
- Order ID and number
- Order status
- Customer details
- Line items with products
- Shipping and billing information
- Payment details
- Order totals and taxes

## Troubleshooting

If you receive an error:
- Verify the Order ID exists in your WooCommerce store
- Check that your API credentials are correct
- Ensure your store URL is properly formatted (https://yourdomain.com)