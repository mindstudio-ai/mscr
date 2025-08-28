# Create Product Tag

This action creates a new product tag in your WooCommerce store.

## Configuration

### Tag Details

- **Name** (required): Enter the name of the product tag you want to create (e.g., "Summer Collection", "Clearance", "New Arrivals").

- **Slug** (optional): A URL-friendly identifier for the tag. If not provided, WooCommerce will automatically generate one based on the name.
  - Example: For "Summer Collection", you might use "summer-collection"
  - Only use lowercase letters, numbers, dashes, and underscores

- **Description** (optional): A detailed description of what this tag represents. This can include HTML formatting.

- **Output Variable**: Name of the variable that will store the created tag information. This variable will contain the complete tag object including its ID, name, slug, description, and other metadata.

## Example Response

The output variable will contain a JSON object similar to:

```json
{
  "id": 34,
  "name": "Summer Collection",
  "slug": "summer-collection",
  "description": "Products for the summer season",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://your-store.com/wp-json/wc/v3/products/tags/34" }],
    "collection": [{ "href": "https://your-store.com/wp-json/wc/v3/products/tags" }]
  }
}
```

You can use this output in subsequent steps to reference the newly created tag.