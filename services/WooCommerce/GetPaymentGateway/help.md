# Get Payment Gateway

This action retrieves detailed information about a specific payment gateway in your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with payment gateways configured
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)
3. Added these credentials to your MindStudio environment variables

## Configuration

### Gateway ID

Enter the ID of the payment gateway you want to retrieve information about. Common gateway IDs include:

- `bacs` - Direct bank transfer
- `cheque` - Check payments
- `cod` - Cash on delivery
- `paypal` - PayPal
- `stripe` - Stripe

Example: `bacs`

### Output Variable

Specify a variable name to store the payment gateway details. This variable will contain all information about the payment gateway, including its settings, enabled status, and description.

## Response Example

The output variable will contain an object similar to this:

```json
{
  "id": "bacs",
  "title": "Direct bank transfer",
  "description": "Make your payment directly into our bank account...",
  "order": 0,
  "enabled": true,
  "method_title": "BACS",
  "method_description": "Allows payments by BACS, more commonly known as direct bank/wire transfer.",
  "method_supports": ["products"],
  "settings": {
    "title": {
      "id": "title",
      "label": "Title",
      "description": "This controls the title which the user sees during checkout.",
      "type": "text",
      "value": "Direct bank transfer",
      "default": "Direct bank transfer"
    },
    // Additional settings...
  }
}
```

## Common Use Cases

- Check if a payment gateway is enabled
- Retrieve configuration settings for a payment gateway
- Display payment gateway information to customers