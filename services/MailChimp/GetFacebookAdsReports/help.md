# Get Facebook Ads Reports

This connector retrieves Facebook ads reports from your MailChimp account, allowing you to analyze the performance of your Facebook ad campaigns.

## Configuration

### Report Filtering

- **Number of Records**: The number of records to return. Default is 10, maximum is 1000.
- **Offset**: The number of records to skip. Used for pagination when you have more records than the count parameter.
- **Sort By**: Choose a field to sort the results:
  - Created Date: When the ad was created
  - Updated Date: When the ad was last updated
  - End Time: When the ad ended
- **Sort Direction**: Choose ascending (oldest first) or descending (newest first) order.

### Output

- **Output Variable**: Name of the variable where the Facebook ads report data will be stored.

## Example Output

The connector returns a JSON object containing your Facebook ads reports with metrics like:

```json
{
  "facebook_ads": [
    {
      "id": "123abc",
      "web_id": 12345,
      "name": "My Facebook Ad",
      "status": "active",
      "create_time": "2023-01-15T10:30:00Z",
      "start_time": "2023-01-16T08:00:00Z",
      "end_time": "2023-02-16T08:00:00Z",
      "report_summary": {
        "reach": 15000,
        "impressions": 25000,
        "clicks": 500,
        "click_rate": 0.02,
        "ecommerce": {
          "total_revenue": 1250.50,
          "currency_code": "USD"
        }
      },
      "audience": {
        "type": "Custom Audience"
      },
      "budget": {
        "total_amount": 500,
        "currency_code": "USD"
      }
    }
  ],
  "total_items": 5
}
```

## Notes

- You need to have Facebook ads set up in your MailChimp account to retrieve reports.
- Make sure your MailChimp API key and server prefix are correctly configured in the service settings.