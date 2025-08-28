# Update WooCommerce Order

This action allows you to update an existing order in your WooCommerce store.

## Configuration

### Order Details

- **Order ID**: Enter the numeric ID of the order you want to update. You can find this in your WooCommerce dashboard.
- **Order Status**: (Optional) Select a new status for the order from the dropdown menu.
- **Customer Note**: (Optional) Add a note that will be visible to the customer.

### Advanced Options

- **Additional JSON**: (Optional) Provide additional fields to update in JSON format. This is useful for updating complex order properties like billing details, shipping information, or custom meta data.

Example:
```json
{
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  },
  "meta_data": [
    {
      "key": "tracking_number",
      "value": "123456789"
    }
  ]
}
```

### Output

- **Output Variable**: Name of the variable that will store the updated order details. This variable will contain the complete order object returned by the WooCommerce API.

## Authentication

This connector uses the WooCommerce API credentials configured in your service settings:
- Store URL
- API Consumer Key
- API Consumer Secret

Make sure these are properly set up before using this action.