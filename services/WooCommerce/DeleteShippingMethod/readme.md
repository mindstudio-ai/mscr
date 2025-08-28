# Delete Shipping Method

This connector allows you to permanently delete a shipping method from a specific shipping zone in your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:
1. Your WooCommerce store URL configured in the service settings
2. Your WooCommerce API Consumer Key and Secret configured in the service settings
3. The ID of the shipping zone and the instance ID of the shipping method you want to delete

## Configuration

### Shipping Zone Information

- **Zone ID**: Enter the numeric ID of the shipping zone containing the method you want to delete. For example, `5`.
  - You can find zone IDs by viewing your shipping zones in WooCommerce admin or by using the "List All Shipping Zones" connector.

- **Method ID**: Enter the instance ID of the shipping method you want to delete. For example, `26`.
  - This is the instance ID of the method, not the method_id. Each shipping method added to a zone gets a unique instance ID.
  - You can find method instance IDs by viewing the shipping methods in a zone or by using the "List Shipping Methods in Zone" connector.

### Output

- **Output Variable**: Enter a name for the variable that will store the details of the deleted shipping method.
  - This variable will contain information about the method that was deleted, including its ID, title, and settings at the time of deletion.

## Important Notes

- Deletion is permanent and cannot be undone.
- You must have appropriate permissions in your WooCommerce store to delete shipping methods.
- The connector automatically sets `force=true` as required by the WooCommerce API for permanent deletion.