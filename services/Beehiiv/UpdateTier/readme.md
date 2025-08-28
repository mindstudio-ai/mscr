# Update Tier

This connector allows you to update an existing subscription tier for a specific publication in your beehiiv account.

## Configuration

### Publication & Tier
- **Publication ID**: Enter the ID of the publication that contains the tier you want to update. Must be in the format `pub_XXXX-XXXX-XXXX-XXXX`.
- **Tier ID**: Enter the ID of the tier you want to update. Must be in the format `tier_XXXX-XXXX-XXXX-XXXX`.

### Tier Details
- **Name**: (Optional) Enter a new name for the tier (e.g., "Gold Tier", "Premium Membership").
- **Description**: (Optional) Enter a new description for the tier that explains what subscribers will receive.

### Price Settings
- **Update Prices**: Select whether you want to update the pricing for this tier.
  - If you select "Yes", additional price configuration fields will be used.
  
If updating prices:
- **Price ID**: Enter the ID of the existing price to update. Must be in the format `price_XXXX-XXXX-XXXX-XXXX`.
- **Currency**: Select the currency for the price (USD, AUD, CAD, EUR, INR, or BRL).
- **Amount (in cents)**: Enter the price amount in cents (e.g., enter "500" for $5.00).
- **Interval**: Select the billing interval (Monthly, Yearly, One-time, or Donation).
- **Interval Display**: (Optional) Enter custom text to display for the interval (e.g., "per month").
- **Call to Action**: (Optional) Enter text to display on the checkout button (e.g., "Subscribe Now").
- **Delete Price**: Select whether to delete this price. Selecting "Yes" will remove this price from the tier.

### Output
- **Output Variable**: Enter a name for the variable that will store the updated tier information.

## Example Usage

To update a tier named "Gold" with a new description and a monthly price of $9.99:

1. Enter your publication ID (e.g., `pub_12345678-1234-1234-1234-123456789012`)
2. Enter your tier ID (e.g., `tier_12345678-1234-1234-1234-123456789012`)
3. Enter "Gold" as the name
4. Enter "Premium content with exclusive access to special features" as the description
5. Select "Yes" for Update Prices
6. Enter your price ID (e.g., `price_12345678-1234-1234-1234-123456789012`)
7. Select "USD" as the currency
8. Enter "999" as the amount (in cents)
9. Select "Monthly" as the interval
10. Enter "updatedTier" as the output variable

The connector will update your tier and return the updated information in the `updatedTier` variable.