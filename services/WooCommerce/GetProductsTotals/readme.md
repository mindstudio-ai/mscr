# Get Products Totals

This action retrieves totals for products by type from your WooCommerce store. It returns a breakdown of product counts categorized by product type (simple, variable, grouped, external).

## When to use this action

Use this action when you need to:
- Get a quick overview of your product inventory by type
- Monitor the distribution of different product types in your store
- Create reports or dashboards showing product type statistics

## Prerequisites

Before using this action, make sure you have:
1. A WooCommerce store URL configured in your connection settings
2. Your WooCommerce API Consumer Key configured in your connection settings
3. Your WooCommerce API Consumer Secret configured in your connection settings

## Configuration

### Output Variable
Enter a name for the variable that will store the product totals data. This variable will contain an array of objects, with each object representing a product type and its count.

## Output Format

The output will be an array of objects with the following structure:

```json
[
  { "slug": "external", "name": "External/Affiliate product", "total": 1 },
  { "slug": "grouped", "name": "Grouped product", "total": 1 },
  { "slug": "simple", "name": "Simple product", "total": 21 },
  { "slug": "variable", "name": "Variable product", "total": 3 }
]
```

Each object in the array contains:
- `slug`: The product type identifier
- `name`: The human-readable name of the product type
- `total`: The number of products of this type in your store