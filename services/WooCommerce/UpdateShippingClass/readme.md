# Update Shipping Class

This connector allows you to update an existing shipping class in your WooCommerce store.

## Configuration

### Shipping Class Details

- **Shipping Class ID**: Enter the numeric ID of the shipping class you want to update. This is required.
  
- **Name** (optional): The display name of the shipping class (e.g., "Priority").
  
- **Slug** (optional): The URL-friendly version of the name. Usually lowercase and contains only letters, numbers, and hyphens (e.g., "priority").
  
- **Description** (optional): A detailed description of the shipping class. You can use multiple lines to provide a comprehensive description.

### Output

- **Output Variable**: Specify a name for the variable that will store the updated shipping class information. You can reference this variable in subsequent steps of your workflow.

## Example Response

The output variable will contain the complete shipping class object:

```json
{
  "id": 32,
  "name": "Priority",
  "slug": "priority",
  "description": "Priority mail.",
  "count": 0,
  "_links": {
    "self": [{ "href": "https://yourstore.com/wp-json/wc/v3/products/shipping_classes/32" }],
    "collection": [{ "href": "https://yourstore.com/wp-json/wc/v3/products/shipping_classes" }]
  }
}
```

## Notes

- You only need to include the fields you want to update. Empty fields will be ignored.
- Your WooCommerce store URL, consumer key, and consumer secret must be configured in the connection settings.