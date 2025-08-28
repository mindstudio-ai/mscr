# Get List Growth History

This connector retrieves the growth history for a specific MailChimp list for a given month. It provides detailed information about subscriber activity including total subscribed members, new unsubscribes, cleaned emails, and more.

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience settings or in the URL when viewing a list.
  
- **Month**: Specify the month for which you want to retrieve growth history in the format `YYYY-MM` (e.g., `2023-01` for January 2023).

### Output

- **Output Variable**: Name of the variable where the growth history data will be stored. This variable will contain all the metrics for the specified list and month.

## Example Response

The connector will return data similar to this:

```json
{
  "list_id": "abc123def",
  "month": "2023-01",
  "subscribed": 5000,
  "unsubscribed": 25,
  "cleaned": 10,
  "pending": 15,
  "deleted": 5,
  "transactional": 0
}
```

## Common Issues

- **Invalid List ID**: Make sure you're using the correct list ID from your MailChimp account.
- **Invalid Month Format**: The month must be in the format `YYYY-MM`.
- **No Data Available**: If there's no growth history for the specified month, you'll receive an empty response.