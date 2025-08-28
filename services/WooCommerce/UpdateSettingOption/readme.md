# Update WooCommerce Setting Option

This connector allows you to update the value of a single WooCommerce setting option.

## Configuration

### Group ID
Enter the settings group ID that contains the setting you want to update. Common group IDs include:
- `general` - General store settings
- `products` - Product display settings
- `tax` - Tax settings
- `shipping` - Shipping options
- `checkout` - Checkout settings
- `account` - Customer account settings

### Setting ID
Enter the specific setting ID you want to update. Examples include:
- `woocommerce_allowed_countries` - Countries where you sell to
- `woocommerce_default_country` - Store location country/state
- `woocommerce_currency` - Store currency
- `woocommerce_price_display_suffix` - Price display suffix

You can find setting IDs by first retrieving all settings in a group using the WooCommerce API.

### New Value
Enter the new value for the setting. The format depends on the setting type:
- For text settings: enter the text value
- For select settings: enter the option key (not the label)
- For checkbox settings: use `yes` or `no`
- For array settings: provide a comma-separated list

**Examples:**
- For currency: `USD`
- For allowed countries: `all`, `all_except`, or `specific`
- For checkbox options: `yes` or `no`

### Output Variable
The name of the variable where the updated setting information will be stored. This will contain the complete setting object including ID, label, type, value, and other metadata.

## Example Response

```json
{
  "id": "woocommerce_allowed_countries",
  "label": "Selling location(s)",
  "type": "select",
  "default": "all",
  "options": {
    "all": "Sell to all countries",
    "all_except": "Sell to all countries, except for…",
    "specific": "Sell to specific countries"
  },
  "value": "all_except"
}
```