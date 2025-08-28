# List Data Endpoints

This connector retrieves a list of available data endpoints from your WooCommerce store. These endpoints provide access to various types of data such as continents, countries, currencies, and more.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store URL
2. WooCommerce REST API credentials (Consumer Key and Consumer Secret)

You can generate API credentials in your WordPress admin panel under:
**WooCommerce → Settings → Advanced → REST API → Add key**

## Configuration

### Output Variable

Enter a variable name that will store the list of data endpoints returned by the WooCommerce API. This variable will contain an array of objects with information about each available endpoint.

## Example Response

The output variable will contain data similar to this:

```json
[
  {
    "slug": "continents",
    "description": "List of supported continents, countries, and states.",
    "_links": {
      "self": [{ "href": "https://example.com/wp-json/wc/v3/data/continents" }],
      "collection": [{ "href": "https://example.com/wp-json/wc/v3/data" }]
    }
  },
  {
    "slug": "countries",
    "description": "List of supported states in a given country.",
    "_links": {
      "self": [{ "href": "https://example.com/wp-json/wc/v3/data/countries" }],
      "collection": [{ "href": "https://example.com/wp-json/wc/v3/data" }]
    }
  },
  {
    "slug": "currencies",
    "description": "List of supported currencies.",
    "_links": {
      "self": [{ "href": "https://example.com/wp-json/wc/v3/data/currencies" }],
      "collection": [{ "href": "https://example.com/wp-json/wc/v3/data" }]
    }
  }
]
```

You can use this data to explore available WooCommerce data endpoints or as input for other actions in your workflow.