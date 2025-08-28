# Get Top Sellers Report

This connector retrieves a list of top-selling products from your WooCommerce store for a specified time period.

## Configuration

### Period
Select the time period for which you want to retrieve top sellers:
- **Week**: Top sellers from the current week
- **Month**: Top sellers from the current month
- **Last Month**: Top sellers from the previous month
- **Year**: Top sellers from the current year

### Date Range (Optional)
Instead of using a predefined period, you can specify a custom date range:

- **Start Date**: The beginning of your date range in YYYY-MM-DD format (e.g., 2023-01-01)
- **End Date**: The end of your date range in YYYY-MM-DD format (e.g., 2023-12-31)

> Note: If you provide both a period and a date range, the date range will take precedence.

### Output Variable
Specify a name for the variable that will store the top sellers report results. You can reference this variable in subsequent steps of your workflow.

## Example Response

The connector will return an array of products with the following structure:

```json
[
  {
    "title": "Happy Ninja",
    "product_id": 37,
    "quantity": 1,
    "_links": {
      "about": [{ "href": "https://example.com/wp-json/wc/v3/reports" }],
      "product": [{ "href": "https://example.com/wp-json/wc/v3/products/37" }]
    }
  },
  {
    "title": "Woo Album #4",
    "product_id": 96,
    "quantity": 1,
    "_links": {
      "about": [{ "href": "https://example.com/wp-json/wc/v3/reports" }],
      "product": [{ "href": "https://example.com/wp-json/wc/v3/products/96" }]
    }
  }
]
```