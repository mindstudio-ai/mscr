# List Payment Gateways

This connector retrieves all payment gateways configured in your WooCommerce store.

## What it does

When executed, this connector will:
1. Connect to your WooCommerce store using your API credentials
2. Retrieve a list of all payment gateways (like credit card, PayPal, bank transfers, etc.)
3. Return detailed information about each gateway including their ID, title, description, and enabled status

## Configuration

This connector requires no additional configuration. Just provide an output variable name to store the results.

## Output

The connector returns an array of payment gateway objects. Each gateway object contains:

```json
{
  "id": "bacs",
  "title": "Direct bank transfer",
  "description": "Make your payment directly into our bank account...",
  "order": 0,
  "enabled": true,
  "method_title": "BACS",
  "method_description": "Allows payments by BACS...",
  "method_supports": ["products"],
  "settings": {
    // Gateway-specific settings
  }
}
```

## Requirements

Before using this connector, make sure you have:
1. A WooCommerce store URL configured in your environment
2. WooCommerce REST API Consumer Key and Secret with read permissions

## Common use cases

- Display available payment methods to customers
- Check which payment gateways are currently enabled
- Use gateway information to customize checkout experiences