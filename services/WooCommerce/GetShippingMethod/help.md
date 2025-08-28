# Get Shipping Method

This connector retrieves detailed information about a specific shipping method from a WooCommerce shipping zone.

## Prerequisites

Before using this connector, you need to set up the following environment variables in your MindStudio project:

- **Store URL**: Your WooCommerce store URL (e.g., `https://example.com`)
- **API Consumer Key**: Your WooCommerce API consumer key (starts with `ck_`)
- **API Consumer Secret**: Your WooCommerce API consumer secret (starts with `cs_`)

## Configuration

### Shipping Zone ID

Enter the numeric ID of the shipping zone that contains the shipping method you want to retrieve. You can find this ID in your WooCommerce admin panel under Shipping settings or by using the "List All Shipping Zones" endpoint.

Example: `5`

### Shipping Method ID

Enter the instance ID of the specific shipping method within the zone. This is the unique identifier for the shipping method instance.

Example: `26`

### Output Variable

Specify a name for the variable that will store the shipping method details. You can reference this variable in subsequent steps of your workflow.

## Output

The connector will return a detailed object containing all information about the shipping method, including:

- Basic details (ID, title, order, enabled status)
- Method type information
- All configuration settings for the shipping method

Example output:
```json
{
  "instance_id": 26,
  "title": "Flat rate",
  "order": 1,
  "enabled": true,
  "method_id": "flat_rate",
  "method_title": "Flat rate",
  "method_description": "Lets you charge a fixed rate for shipping.",
  "settings": {
    "title": {"value": "Flat rate", "default": "Flat rate", ...},
    "tax_status": {"value": "taxable", "default": "taxable", ...},
    "cost": {"value": "10.00", "default": "", ...},
    "type": {"value": "class", "default": "class", ...}
  }
}
```