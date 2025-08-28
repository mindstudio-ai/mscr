# Update Shipping Method in WooCommerce

This connector allows you to update the settings of a shipping method within a WooCommerce shipping zone.

## What You'll Need

- **Shipping Zone ID**: The ID of the shipping zone containing the method you want to update
- **Shipping Method Instance ID**: The instance ID of the specific shipping method to update

## Finding Your Zone and Method IDs

If you don't know your zone and method IDs, you can find them by:

1. Going to your WooCommerce admin dashboard
2. Navigate to WooCommerce → Settings → Shipping → Shipping Zones
3. Inspect the URL when editing a zone to find the zone ID
4. For method IDs, you may need to use the WooCommerce API to list all methods in a zone first

## Configuration Options

### Method Settings

- **Method Title**: The name customers will see during checkout (e.g., "Flat rate shipping")
- **Enabled**: Set to "Yes" to make this shipping method available to customers
- **Cost**: For flat rate methods, enter the shipping cost (e.g., "10.00")
- **Tax Status**: Choose whether this shipping method is taxable
- **Calculation Type**: For methods with multiple shipping classes, choose how to calculate the total

## Notes

- You only need to provide the settings you want to change
- Leave other fields blank to keep their current values
- The connector will return the complete updated shipping method object

## Example Use Case

Update a flat rate shipping method to cost $20 and rename it to "Standard Shipping":
- Zone ID: 5
- Method ID: 26
- Method Title: Standard Shipping
- Cost: 20.00