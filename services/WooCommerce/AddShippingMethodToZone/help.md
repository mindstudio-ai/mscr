# Add Shipping Method to Zone

This connector allows you to add a shipping method to an existing shipping zone in your WooCommerce store.

## Prerequisites

- You need to have WooCommerce installed and configured on your WordPress site
- You need your WooCommerce REST API credentials (Consumer Key and Consumer Secret)
- You need to know the ID of the shipping zone you want to add the method to

## Configuration

### Zone ID

Enter the numeric ID of the shipping zone where you want to add the shipping method. You can find the zone ID by:

1. Going to your WordPress admin
2. Navigating to WooCommerce → Settings → Shipping
3. Looking at the URL when you edit a shipping zone (it will contain something like `&zone_id=5`)

Example: `5`

### Shipping Method

Select the type of shipping method you want to add to the zone:

- **Flat Rate**: Charge a fixed rate for shipping
- **Free Shipping**: Offer free shipping, optionally with minimum order requirements
- **Local Pickup**: Allow customers to pick up orders from your store location

### Output Variable

Enter a name for the variable that will store the details of the created shipping method. You can use this variable in subsequent steps of your workflow.

## After Creation

After adding the shipping method, you may need to configure its settings (like cost for Flat Rate) using the WooCommerce admin interface or through additional API calls.