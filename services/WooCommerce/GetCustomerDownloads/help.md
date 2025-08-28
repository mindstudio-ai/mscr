# Get Customer Downloads

This connector retrieves all downloadable products that a specific customer has purchased from your WooCommerce store. It returns a list of downloads with their permissions and download links.

## Configuration

### Customer Information
- **Customer ID**: Enter the numeric ID of the customer whose downloads you want to retrieve. You can find this ID in your WooCommerce admin dashboard under Customers.

### Output
- **Output Variable**: The name of the variable where the list of customer downloads will be stored. This variable will contain an array of download objects.

## Example Output

The output will be an array of download objects, each containing details like:

```json
[
  {
    "download_id": "91447fd1849316bbc89dfb7e986a6006",
    "download_url": "https://yourstore.com/?download_file=87&order=wc_order_58d17c18352&email=customer%40example.com&key=91447fd1849316bbc89dfb7e986a6006",
    "product_id": 87,
    "product_name": "Product Name",
    "download_name": "File Name",
    "order_id": 723,
    "order_key": "wc_order_58d17c18352",
    "downloads_remaining": "3",
    "access_expires": "never",
    "access_expires_gmt": "never",
    "file": {
      "name": "File Name",
      "file": "http://yourstore.com/wp-content/uploads/file.pdf"
    }
  }
]
```

## Notes

- This connector requires that you have already configured your WooCommerce store URL, API Consumer Key, and API Consumer Secret in the connector settings.
- The customer must exist in your WooCommerce store and have purchased downloadable products.
- If the customer has no downloads, an empty array will be returned.