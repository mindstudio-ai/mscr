# List Product Tags

This connector retrieves a paginated list of product tags from your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with REST API access enabled
2. Your WooCommerce Consumer Key and Consumer Secret
3. Your store URL configured in the connector settings

## Configuration Options

### Query Parameters

- **Page**: The page number of results to return (default: 1)
- **Items Per Page**: Number of items to return per page (default: 10, maximum: 100)
- **Search Term**: Filter tags by searching for specific text in the name
- **Order**: Sort order of the results (ascending or descending)
- **Order By**: Field to sort the results by (ID, name, slug, description, or count)
- **Hide Empty**: Choose whether to hide tags that have no associated products
- **Output Variable**: Name of the variable where the results will be stored

## Output

The connector returns an array of product tag objects. Each tag object contains:

```json
{
  "id": 34,
  "name": "Leather Shoes",
  "slug": "leather-shoes",
  "description": "",
  "count": 0,
  "_links": {
    "self": [{"href": "https://example.com/wp-json/wc/v3/products/tags/34"}],
    "collection": [{"href": "https://example.com/wp-json/wc/v3/products/tags"}]
  }
}
```

## Example Usage

To retrieve the first 20 product tags sorted by name in ascending order:
1. Set **Items Per Page** to `20`
2. Set **Order** to `Ascending`
3. Set **Order By** to `Name`
4. Set **Output Variable** to `productTags`

You can then use `productTags` in subsequent steps of your workflow.