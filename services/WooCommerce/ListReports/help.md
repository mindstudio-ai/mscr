# List Reports

This action retrieves a list of all available report endpoints from your WooCommerce store.

## What This Action Does

When you run this action, it will:

1. Connect to your WooCommerce store using your API credentials
2. Retrieve a complete list of all available report endpoints
3. Store the results in your specified output variable

## Configuration

### Output Variable
Enter a name for the variable where you want to store the list of reports. You can reference this variable in later steps of your workflow.

## Example Response

The output will be an array of report objects, each containing:

```json
[
  {
    "slug": "sales",
    "description": "List of sales reports.",
    "_links": {
      "self": [{ "href": "https://example.com/wp-json/wc/v3/reports/sales" }],
      "collection": [{ "href": "https://example.com/wp-json/wc/v3/reports" }]
    }
  },
  {
    "slug": "top_sellers",
    "description": "List of top sellers products.",
    "_links": {
      "self": [{ "href": "https://example.com/wp-json/wc/v3/reports/top_sellers" }],
      "collection": [{ "href": "https://example.com/wp-json/wc/v3/reports" }]
    }
  }
]
```

## Prerequisites

Before using this action, make sure you have:
- Set up your WooCommerce store URL in the connector settings
- Added your WooCommerce API Consumer Key and Consumer Secret to the connector settings