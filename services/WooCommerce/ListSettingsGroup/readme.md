# List Settings Group Options

This connector retrieves all setting options within a specified WooCommerce settings group. Use it to view and analyze the configuration options available in different parts of your WooCommerce store.

## Configuration

### Settings Group
Select which settings group you want to retrieve options from:
- **General** - Store address, selling locations, currency options
- **Products** - Measurements, reviews, inventory settings
- **Tax** - Tax calculations, rates, and classes
- **Shipping** - Shipping options and calculations
- **Checkout** - Payment gateways and checkout process options
- **Account** - Customer account settings
- **Email** - Email notifications configuration
- **Advanced** - Page setup, API, webhooks, and other advanced settings

### Output Variable
Specify a name for the variable that will store the retrieved settings. You can reference this variable in subsequent steps of your workflow.

## Example Response

The connector returns an array of setting objects. Each setting includes properties like:

```json
[
  {
    "id": "woocommerce_currency",
    "label": "Currency",
    "description": "This controls what currency prices are listed at in the catalog and which currency gateways will take payments in.",
    "type": "select",
    "default": "USD",
    "value": "USD",
    "options": {
      "USD": "United States dollar ($)",
      "EUR": "Euro (€)",
      "GBP": "Pound sterling (£)"
    }
  },
  {
    "id": "woocommerce_price_thousand_sep",
    "label": "Thousand separator",
    "description": "This sets the thousand separator of displayed prices.",
    "type": "text",
    "default": ",",
    "value": ","
  }
]
```

## Use Cases

- Retrieve store configuration for analysis or reporting
- Check current settings before making changes
- Export settings for documentation or backup purposes
- Compare settings across different WooCommerce stores