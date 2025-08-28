# Create Product Review

This action creates a new product review for a WooCommerce product.

## Prerequisites

Before using this action, make sure you have:
- Set up your WooCommerce store URL in the connector settings
- Added your WooCommerce API Consumer Key and Consumer Secret in the connector settings
- Enabled REST API access in your WooCommerce store

## Configuration

### Review Details

- **Product ID**: Enter the numeric ID of the product being reviewed. You can find this in your WooCommerce admin panel when viewing a product.
- **Review Content**: The text content of the review.
- **Reviewer Name**: The name of the person who wrote the review.
- **Reviewer Email**: The email address of the reviewer.
- **Rating**: Select a rating from 1 to 5 stars.
- **Review Status**: Choose the initial status for the review:
  - Approved: Immediately visible on your site
  - Hold: Requires manual approval
  - Spam: Marked as spam
  - Trash: Sent to trash
- **Verified Purchase**: Indicate whether the reviewer has purchased the product.

### Output

- **Output Variable**: The name of the variable that will store the created review information. This variable will contain details like the review ID, creation date, and other metadata.

## Example Use Cases

- Adding customer testimonials to your store
- Creating sample reviews for new products
- Importing reviews from another platform

## Troubleshooting

If you encounter errors:
- Verify your WooCommerce API credentials are correct
- Ensure the product ID exists in your store
- Check that the reviewer email is in a valid format