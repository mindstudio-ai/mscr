# Get Setting Option

This action retrieves a single WooCommerce setting option from your store by specifying its group ID and setting ID.

## When to use this action

Use this action when you need to:
- Check the current value of a specific WooCommerce setting
- Retrieve configuration details like allowed countries, currency settings, or product options
- Get information about setting options before updating them

## Required inputs

### Group ID
The settings group ID that contains the setting you want to retrieve. Common group IDs include:
- `general` - General store settings
- `products` - Product display and behavior settings
- `tax` - Tax calculation settings
- `shipping` - Shipping options
- `checkout` - Checkout process settings
- `account` - Customer account settings

### Setting ID
The specific setting ID within the group. Examples:
- `woocommerce_allowed_countries` - Countries you sell to
- `woocommerce_currency` - Store currency
- `woocommerce_default_country` - Store location
- `woocommerce_shop_page_id` - Shop page

## Output

This action returns the complete setting object, which typically includes:
- `id` - The setting identifier
- `label` - Human-readable name
- `description` - Explanation of the setting
- `type` - Setting type (select, text, checkbox, etc.)
- `default` - Default value
- `options` - Available options (for select-type settings)
- `value` - Current value
- `group_id` - The group this setting belongs to

## Example output

```json
{
  "id": "woocommerce_allowed_countries",
  "label": "Selling location(s)",
  "description": "This option lets you limit which countries you are willing to sell to.",
  "type": "select",
  "default": "all",
  "options": {
    "all": "Sell to all countries",
    "all_except": "Sell to all countries, except for…",
    "specific": "Sell to specific countries"
  },
  "tip": "This option lets you limit which countries you are willing to sell to.",
  "value": "all",
  "group_id": "general"
}
```

## Notes

- You must have already configured your WooCommerce store URL, Consumer Key, and Consumer Secret in the connector settings.
- The API requires appropriate permissions to access settings.