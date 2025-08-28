# WooCommerce Batch Update Settings

This connector allows you to update multiple WooCommerce settings at once within a specified settings group.

## Configuration

### Settings Group ID
Enter the ID of the settings group you want to update. Common group IDs include:
- `general` - General store settings
- `products` - Product display settings
- `tax` - Tax settings
- `shipping` - Shipping options
- `checkout` - Checkout settings
- `account` - Customer account settings

### Settings to Update
Enter the settings you want to update in JSON format. Each setting should have an `id` and a `value` property.

**Example:**
```json
[
  {"id": "woocommerce_currency", "value": "USD"},
  {"id": "woocommerce_demo_store", "value": "yes"},
  {"id": "woocommerce_allowed_countries", "value": "all"}
]
```

Common settings include:
- `woocommerce_currency` - Store currency (e.g., "USD", "EUR", "GBP")
- `woocommerce_demo_store` - Enable demo store notice ("yes" or "no")
- `woocommerce_allowed_countries` - Countries you sell to ("all", "specific", etc.)
- `woocommerce_default_country` - Default customer location (e.g., "US:CA")
- `woocommerce_shop_page_id` - Shop page ID

### Output Variable
The name of the variable that will store the API response containing the updated settings.

## Authentication
This connector uses your WooCommerce API credentials configured at the service level:
- Store URL
- API Consumer Key
- API Consumer Secret

Make sure these are properly set up in your WooCommerce service configuration.