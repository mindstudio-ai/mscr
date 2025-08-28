# Retrieve Customers Totals

This action retrieves customer totals from your WooCommerce store, categorized by type (paying and non-paying customers).

## What This Action Does

When executed, this action will:
1. Connect to your WooCommerce store using your API credentials
2. Retrieve a summary of your customer totals
3. Return data showing how many paying and non-paying customers you have

## Configuration

### Output Variable
Enter a name for the variable that will store the customer totals data. You'll be able to use this variable in subsequent steps of your workflow.

## Output Format

The action returns an array of customer types with their respective totals:

```json
[
  { "slug": "paying", "name": "Paying customer", "total": 2 },
  { "slug": "non_paying", "name": "Non-paying customer", "total": 1 }
]
```

## Requirements

Before using this action, make sure you have:
1. A WooCommerce store with REST API access enabled
2. Your WooCommerce Consumer Key and Consumer Secret
3. Your store URL

These credentials should be configured in the WooCommerce service settings.