# Create Shipping Zone

This action creates a new shipping zone in your WooCommerce store. Shipping zones allow you to group geographical regions and apply specific shipping methods and rates to them.

## Prerequisites

- You must have a WooCommerce store set up
- You need to configure your WooCommerce API credentials in the service connection settings

## Configuration

### Zone Name

Enter a descriptive name for your shipping zone. This should identify the geographical area this zone will cover.

Examples:
- "United States"
- "Europe"
- "International"
- "Local Delivery"

### Output Variable

The name of the variable that will store the created shipping zone details. This will contain information such as:
- The zone ID
- The zone name
- The zone order

## What's Next?

After creating a shipping zone, you'll typically want to:

1. Add locations to the zone (countries, states, postcodes)
2. Add shipping methods to the zone (flat rate, free shipping, etc.)

You can use other WooCommerce actions to complete these additional steps.