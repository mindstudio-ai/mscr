# Facebook Ad Product Activity Report

This connector retrieves a breakdown of product activity for a Facebook ad outreach in Mailchimp. It allows you to see how products are performing in relation to your Facebook ad campaigns.

## Required Configuration

- **Facebook Ad Outreach ID**: Enter the ID of your Facebook ad outreach campaign. This can be found in your Mailchimp account under the Facebook Ads section.
- **Output Variable**: Name of the variable where the product activity report will be stored for use in subsequent steps.

## Advanced Options

- **Number of Products**: The number of products to return in the results (default: 10, maximum: 1000).
- **Offset**: Number of records to skip for pagination purposes (default: 0).
- **Sort By**: Choose how to sort the returned products:
  - Product Title
  - Total Revenue
  - Total Purchased
- **Fields to Include**: Optionally specify which fields to include in the response as a comma-separated list.
  Example: `title,sku,total_revenue,total_purchased`

## Example Response

The connector returns data in this format:

```json
{
  "products": [
    {
      "title": "Product Name",
      "sku": "SKU123",
      "image_url": "https://example.com/image.jpg",
      "total_revenue": 1250.50,
      "total_purchased": 25,
      "currency_code": "USD",
      "recommendation_total": 10,
      "recommendation_purchased": 5
    },
    // Additional products...
  ],
  "total_items": 50
}
```

## Notes

- You must have a Mailchimp account with Facebook Ads integration set up.
- The Mailchimp API key and server prefix must be configured in the service settings.