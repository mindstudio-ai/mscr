# Retrieve Product Custom Field Names

This action retrieves a list of product custom field names from your WooCommerce store.

## Prerequisites

- Your WooCommerce store URL
- WooCommerce REST API credentials (Consumer Key and Consumer Secret)
- API credentials must have read permissions

## Configuration

### Query Parameters

- **Results Per Page**: Number of results to return per page (default: 10)
- **Page**: Page number for paginated results (default: 1)
- **Search**: Optional filter to search for specific field names
- **Sort Order**: Order results in ascending or descending order (default: descending)

### Output

- **Output Variable**: The name of the variable where the list of custom field names will be stored

## Example Usage

After configuring this action, the output variable will contain an array of strings representing your product custom field names:

```json
[
  "Custom field 1",
  "Custom field 2",
  "Custom field 3",
  "Custom field 4"
]
```

You can use this list in subsequent actions to work with your product custom fields.

## Notes

- If you have many custom fields, you may need to paginate through the results by increasing the page number in subsequent requests
- The search parameter can help you find specific custom fields when you have many