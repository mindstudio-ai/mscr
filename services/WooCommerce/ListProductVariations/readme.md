# List Product Variations

This connector retrieves a list of variations for a specific WooCommerce product from your store.

## Configuration

### Product Information
- **Product ID**: Enter the numeric ID of the parent product for which you want to retrieve variations. This is required.

### Filtering Options
- **Results Per Page**: Number of variations to return per page (default: 10, max: 100)
- **Page Number**: The page of results to return (default: 1)
- **Search Term**: Filter variations by searching their names or descriptions
- **Sort Order**: Choose whether to sort results in ascending or descending order
- **Sort By**: Choose the field to sort results by (date, ID, title, or modified date)
- **SKU**: Filter variations by a specific SKU
- **Stock Status**: Filter variations by their stock status (in stock, out of stock, or on backorder)

### Output
- **Output Variable**: Name of the variable that will store the retrieved product variations

## Example Response

The connector returns an array of variation objects with details like:

```json
[
  {
    "id": 733,
    "date_created": "2023-03-22T20:03:02",
    "date_modified": "2023-03-22T20:03:02",
    "description": "",
    "permalink": "https://example.com/product/t-shirt/?attribute_pa_color=blue&attribute_pa_size=medium",
    "sku": "t-shirt-blue-m",
    "price": "25",
    "regular_price": "25",
    "sale_price": "",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "on_sale": false,
    "status": "publish",
    "purchasable": true,
    "virtual": false,
    "downloadable": false,
    "downloads": [],
    "download_limit": -1,
    "download_expiry": -1,
    "tax_status": "taxable",
    "tax_class": "",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "backorders_allowed": false,
    "backordered": false,
    "weight": "",
    "dimensions": {
      "length": "",
      "width": "",
      "height": ""
    },
    "shipping_class": "",
    "shipping_class_id": 0,
    "image": {
      "id": 732,
      "src": "https://example.com/wp-content/uploads/2023/03/t-shirt-blue.jpg",
      "alt": ""
    },
    "attributes": [
      {
        "id": 1,
        "name": "Color",
        "option": "Blue"
      },
      {
        "id": 2,
        "name": "Size",
        "option": "Medium"
      }
    ]
  }
]
```

## Notes
- You must have valid WooCommerce API credentials configured in the service settings.
- The Product ID must be for a variable product (a product that has variations).