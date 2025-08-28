# Delete Product Review

This connector allows you to delete a product review from your WooCommerce store by its ID.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store with the REST API enabled
2. Your WooCommerce API Consumer Key and Consumer Secret
3. Your WordPress site URL configured in the connector settings

## Configuration

### Review ID

Enter the ID of the product review you want to delete. This is a required field.

Example: `123`

You can find the review ID in your WooCommerce admin panel under Products > Reviews, or by using the "List Product Reviews" connector.

### Result Variable

Specify a variable name to store the deletion result. The result will contain information about the deleted review, including:

```json
{
  "deleted": true,
  "previous": {
    "id": 123,
    "product_id": 31,
    "status": "approved",
    "reviewer": "John Doe",
    "reviewer_email": "john.doe@example.com",
    "review": "Great product!",
    "rating": 5,
    "verified": true
  }
}
```

## Important Notes

- This action permanently deletes the review. The operation cannot be undone.
- You must have appropriate permissions in your WooCommerce store to delete reviews.
- If the review ID doesn't exist, the connector will return an error.