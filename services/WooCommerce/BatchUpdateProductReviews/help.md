# Batch Update Product Reviews

This connector allows you to create, update, and delete multiple WooCommerce product reviews in a single request, making it efficient for bulk operations.

## Configuration

### Create Reviews
Enter a JSON array of review objects you want to create. Each review object should include:
- `product_id` (required): The ID of the product being reviewed
- `review` (required): The content of the review
- `reviewer` (required): Name of the reviewer
- `reviewer_email` (required): Email of the reviewer
- `rating` (required): Rating from 1-5
- `status` (optional): Status of the review (default is "approved")
- `verified` (optional): Whether the review is from a verified buyer (true/false)

Example:
```json
[
  {
    "product_id": 22, 
    "review": "Excellent product, highly recommended!", 
    "reviewer": "Jane Smith", 
    "reviewer_email": "jane@example.com", 
    "rating": 5
  },
  {
    "product_id": 35, 
    "review": "Good quality but arrived late", 
    "reviewer": "John Doe", 
    "reviewer_email": "john@example.com", 
    "rating": 4,
    "verified": true
  }
]
```

### Update Reviews
Enter a JSON array of review objects you want to update. Each object must include:
- `id` (required): The ID of the review to update
- Any fields you want to update (review, reviewer, rating, etc.)

Example:
```json
[
  {
    "id": 123,
    "review": "Updated review text after using the product longer",
    "rating": 4
  },
  {
    "id": 456,
    "status": "approved"
  }
]
```

### Delete Reviews
Enter a comma-separated list of review IDs you want to delete.

Example:
```
123, 456, 789
```

### Result Variable
Enter a name for the variable that will store the results of the batch operation. This variable will contain information about all created, updated, and deleted reviews.

## Notes
- You must provide at least one operation (create, update, or delete)
- WooCommerce limits batch operations to 100 objects total by default
- The response will include details of all successful operations