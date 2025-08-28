# Update Payment Gateway

This connector allows you to update a WooCommerce payment gateway's settings and status.

## Configuration

### Gateway ID
Enter the ID of the payment gateway you want to update. Common gateway IDs include:
- `bacs` - Direct bank transfer
- `cod` - Cash on delivery
- `paypal` - PayPal
- `stripe` - Stripe
- `cheque` - Check payments

### Gateway Status
Select whether to enable or disable the payment gateway:
- **Enable** - Make the gateway available during checkout
- **Disable** - Hide the gateway from customers
- **Don't change** - Keep the current status

### Settings (JSON)
You can update specific settings for the payment gateway by providing a JSON object. The format should be:

```json
{
  "setting_key": {
    "value": "new_value"
  }
}
```

#### Examples:

To update the title of a payment method:
```json
{
  "title": {
    "value": "Bank Transfer (BACS)"
  }
}
```

To update multiple settings:
```json
{
  "title": {
    "value": "Pay by Credit Card"
  },
  "description": {
    "value": "Pay securely using your credit card."
  }
}
```

## Output

The connector will return the complete updated payment gateway object, including all settings and the current status.