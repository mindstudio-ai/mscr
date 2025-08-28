# List Shipping Methods

This action retrieves all shipping method instances configured within a specific WooCommerce shipping zone.

## When to use this action

Use this action when you need to:
- Get details about shipping methods available in a specific zone
- Check if certain shipping methods are enabled
- Retrieve shipping method settings and configuration

## Required inputs

### Zone ID
Enter the numeric ID of the shipping zone you want to retrieve shipping methods from. 
For example: `5`

You can find your zone IDs by:
1. Going to your WooCommerce admin dashboard
2. Navigating to WooCommerce → Settings → Shipping → Shipping Zones
3. Hovering over a zone name and looking at the URL in your browser's status bar (it will contain the zone ID)

## Output

The action returns an array of shipping method objects. Each object contains:

- `instance_id`: Unique identifier for the shipping method instance
- `title`: Display title of the shipping method
- `order`: Sort order position
- `enabled`: Boolean indicating if the method is enabled
- `method_id`: Identifier for the shipping method type (e.g., "flat_rate", "free_shipping")
- `method_title`: Title of the shipping method type
- `method_description`: Description of the shipping method
- `settings`: Configuration settings specific to the method type

## Example output

```json
[
  {
    "instance_id": 26,
    "title": "Flat rate",
    "order": 1,
    "enabled": true,
    "method_id": "flat_rate",
    "method_title": "Flat rate",
    "method_description": "Lets you charge a fixed rate for shipping.",
    "settings": {
      "title": { "value": "Flat rate" },
      "cost": { "value": "10.00" }
    }
  },
  {
    "instance_id": 27,
    "title": "Free shipping",
    "order": 2,
    "enabled": true,
    "method_id": "free_shipping",
    "method_title": "Free shipping",
    "method_description": "Free shipping is a special method which can be triggered with coupons and minimum spends.",
    "settings": {
      "requires": { "value": "min_amount" },
      "min_amount": { "value": "50.00" }
    }
  }
]
```