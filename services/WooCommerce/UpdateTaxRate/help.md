# Update Tax Rate

This connector allows you to update an existing tax rate in your WooCommerce store.

## Prerequisites
- You need a WooCommerce store with API access enabled
- You need to know the ID of the tax rate you want to update
- Your WooCommerce API credentials must be configured in the service settings

## Configuration

### Tax Rate Details
- **Tax Rate ID**: Enter the numeric ID of the tax rate you want to update. You can find this in your WooCommerce admin dashboard under WooCommerce > Settings > Tax > Standard Rates, or by using the "List Tax Rates" connector.
- **Tax Rate Name**: A descriptive name for the tax rate (e.g., "California Sales Tax").
- **Country**: Two-letter country code where this tax applies (e.g., "US" for United States).
- **State**: Two-letter state/province code where this tax applies (e.g., "CA" for California).
- **Tax Rate**: The percentage rate as a decimal number (e.g., "4.0000" for 4%).

### Additional Options
- **Priority**: Determines the order of calculation for multiple tax rates. Lower numbers are calculated first.
- **Compound**: When set to "Yes", this tax will be calculated on top of other taxes.
- **Apply to Shipping**: When set to "Yes", this tax will be applied to shipping costs.
- **Tax Class**: The classification for this tax rate (e.g., "standard", "reduced-rate").
- **Cities**: A comma-separated list of city names where this tax applies (e.g., "Los Angeles, San Francisco, San Diego").
- **Postcodes**: A comma-separated list of postal/ZIP codes where this tax applies (e.g., "90001, 90002, 90003").
- **Order**: Determines the display order in the admin interface.

### Output
- **Output Variable**: The name of the variable that will store the updated tax rate information.

## Notes
- You only need to provide the fields you want to update. Leave other fields blank to keep their current values.
- The response will contain the complete updated tax rate object.