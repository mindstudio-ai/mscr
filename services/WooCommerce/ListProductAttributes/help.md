# List Product Attributes

This action retrieves all product attributes from your WooCommerce store.

## What are Product Attributes?

Product attributes in WooCommerce are characteristics of your products that help customers filter and find products. Common examples include:

- Color
- Size
- Material
- Brand

## Configuration

### Context

- **View**: Returns basic attribute information (default)
- **Edit**: Returns additional fields that may require higher permissions

### Output Variable

The name of the variable where the list of attributes will be stored. This variable will contain an array of attribute objects with the following structure:

```json
[
  {
    "id": 1,
    "name": "Color",
    "slug": "pa_color",
    "type": "select",
    "order_by": "menu_order",
    "has_archives": true
  },
  {
    "id": 2,
    "name": "Size",
    "slug": "pa_size",
    "type": "select",
    "order_by": "menu_order",
    "has_archives": false
  }
]
```

## Requirements

Make sure you have configured your WooCommerce connection with:
- Store URL
- API Consumer Key
- API Consumer Secret

You can generate these credentials in your WordPress admin under WooCommerce → Settings → Advanced → REST API.