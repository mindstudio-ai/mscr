# Create Tax Rate

This connector creates a new tax rate in your WooCommerce store.

## Configuration

### Tax Rate Information

- **Tax Rate Name**: Enter a descriptive name for the tax rate (e.g., "State Tax", "VAT", "GST").
- **Country**: Enter the two-letter ISO country code where this tax applies (e.g., "US" for United States, "GB" for United Kingdom).
- **State/Province**: Optional. Enter the state or province code where this tax applies (e.g., "CA" for California, "NY" for New York).
- **Tax Rate (%)**: Enter the tax percentage as a number (e.g., "6" for 6%, "7.5" for 7.5%).

### Additional Settings

- **Cities**: Optional. Enter a comma-separated list of cities where this tax applies (e.g., "New York, Albany, Buffalo").
- **Postcodes/ZIP Codes**: Optional. Enter a comma-separated list of postcodes or ZIP codes where this tax applies (e.g., "10001, 10002, 10003").
- **Tax Class**: Select the tax class this rate belongs to (Standard, Reduced Rate, or Zero Rate).
- **Apply to Shipping**: Choose whether this tax should be applied to shipping costs.
- **Compound Tax**: Choose whether this tax should be calculated on top of other taxes. When enabled, this tax will be calculated on the subtotal plus other taxes.

### Output

- **Output Variable**: The name of the variable where the created tax rate information will be stored. This will include the tax rate ID and other details returned by WooCommerce.

## Example Use Case

Creating a 6% sales tax for California:
- Tax Rate Name: California Sales Tax
- Country: US
- State/Province: CA
- Tax Rate (%): 6
- Cities: (leave empty to apply to all cities in California)
- Postcodes/ZIP Codes: (leave empty to apply to all ZIP codes in California)
- Tax Class: standard
- Apply to Shipping: No
- Compound Tax: No