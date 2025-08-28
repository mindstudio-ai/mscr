# Delete Tax Rate

This connector allows you to permanently delete a tax rate from your WooCommerce store.

## Prerequisites
- You need a WooCommerce store with REST API access configured
- You need your WooCommerce API Consumer Key and Consumer Secret
- You need to know the ID of the tax rate you want to delete

## Configuration

### Tax Rate ID
Enter the unique identifier of the tax rate you want to delete. This is a numeric value (e.g., `72`).

### Confirm Deletion
Since deletion is permanent and cannot be undone, you must explicitly confirm this action by selecting "Yes, permanently delete this tax rate" from the dropdown.

### Output Variable
Specify a variable name to store the details of the deleted tax rate. This will contain information about the tax rate that was deleted, including its ID, country, state, rate, and other properties.

## Example Response

The output variable will contain a JSON object with details of the deleted tax rate, similar to:

```json
{
  "id": 72,
  "country": "US",
  "state": "AL",
  "postcode": "35041",
  "city": "Cardiff",
  "postcodes": ["35014", "35036", "35041"],
  "cities": ["Alpine", "Brookside", "Cardiff"],
  "rate": "4.0000",
  "name": "US Tax",
  "priority": 0,
  "compound": false,
  "shipping": false,
  "order": 1,
  "class": "standard"
}
```

## Important Notes
- This action permanently deletes the tax rate and cannot be undone
- Make sure you have the correct tax rate ID before proceeding
- You must confirm the deletion by selecting "Yes" in the confirmation dropdown