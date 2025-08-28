# Update Product Review

This action allows you to update an existing product review in your WooCommerce store.

## Required Fields

- **Review ID**: The unique identifier of the review you want to update. You can find this in your WooCommerce dashboard under Products > Reviews.
- **Output Variable**: The name of the variable where the updated review information will be stored.

## Optional Fields

- **Status**: Change the status of the review (approved, on hold, spam, etc.)
- **Reviewer Name**: Update the name of the person who left the review
- **Reviewer Email**: Update the email address of the reviewer
- **Review Content**: Update the actual text content of the review
- **Rating**: Change the star rating (0-5 stars)
- **Verified**: Set whether the review is from a verified buyer or not

## Notes

- You only need to include the fields you want to change
- The output will contain the complete updated review information
- Make sure your WooCommerce API credentials have permission to manage reviews

## Example

If you want to update a review to change its rating to 5 stars and mark it as verified:
1. Enter the Review ID (e.g., `42`)
2. Select `5 Stars` for Rating
3. Select `True` for Verified
4. Leave other fields blank if you don't want to change them
5. Set an output variable name (e.g., `updatedReview`)