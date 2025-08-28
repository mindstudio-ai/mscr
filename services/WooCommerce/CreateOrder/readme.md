# Create WooCommerce Order

This connector creates a new order in your WooCommerce store with customer information, products, and shipping details.

## Configuration

### Order Details
- **Payment Method ID**: The identifier for the payment method (e.g., `bacs` for bank transfer, `cod` for cash on delivery, `paypal` for PayPal)
- **Payment Method Title**: The name of the payment method as shown to customers
- **Set as Paid**: If set to "Yes", the order will be marked as paid immediately, which sets the status to "processing" and reduces stock levels

### Billing Information
Enter the customer's billing details including name, contact information, and address. For country and state fields, use standard codes (e.g., "US" for United States, "CA" for California).

### Shipping Information
- **Same as Billing**: Select "Yes" to use the billing address as the shipping address
- If you select "No", fill in the shipping address details separately

### Line Items
Enter the products to include in the order as a JSON array. Each product requires at least a `product_id` and `quantity`. For variable products, include the `variation_id`.

Example:
```json
[
  {"product_id": 123, "quantity": 2},
  {"product_id": 456, "variation_id": 789, "quantity": 1}
]
```

### Shipping Method
- **Method ID**: The identifier for the shipping method (e.g., `flat_rate`, `free_shipping`)
- **Method Title**: The name of the shipping method as shown to customers
- **Shipping Cost**: The total shipping cost (e.g., "10.00")

### Output
- **Order ID Variable**: The name of the variable where the newly created order ID will be stored

## Example
A complete order might include a customer purchasing 2 t-shirts with flat rate shipping, paid via bank transfer, and shipped to their billing address.