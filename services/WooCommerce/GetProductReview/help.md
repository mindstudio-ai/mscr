# Get Product Review

This connector retrieves a single product review by ID from your WooCommerce store.

## Prerequisites
- A WooCommerce store with the REST API enabled
- WooCommerce API credentials (Consumer Key and Consumer Secret)
- The ID of the product review you want to retrieve

## Configuration

### Review ID
Enter the numeric ID of the product review you want to retrieve. You can find review IDs in your WooCommerce admin panel under Products > Reviews.

Example: `22`

### Output Variable
Enter a name for the variable that will store the retrieved review data. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns a JSON object containing the product review data with fields like:

```json
{
  "id": 22,
  "date_created": "2018-10-18T17:59:17",
  "date_created_gmt": "2018-10-18T20:59:17",
  "product_id": 22,
  "status": "approved",
  "reviewer": "John Doe",
  "reviewer_email": "john.doe@example.com",
  "review": "Nice album!",
  "rating": 5,
  "verified": false
}
```

## Troubleshooting

- **404 Error**: The review ID doesn't exist in your store
- **Authentication Error**: Check your WooCommerce API credentials in the connector settings
- **Connection Error**: Verify your store URL is correct and accessible